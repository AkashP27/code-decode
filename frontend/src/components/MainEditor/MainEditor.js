import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import classes from "./MainEditor.module.css";
import defaultValues from "../../utils/defaultValues";
import MobileEditor from "./MobileEditor/MobileEditor";
import DesktopEditor from "./DesktopEditor/DesktopEditor";
import ResetModal from "../Modal/ResetModal";
import SettingsModal from "../Modal/SettingsModal";
import axios from "axios";
import moment from "moment";

const baseURL = process.env.REACT_APP_BASEURL;

const MainEditor = () => {
	const [output, setOutput] = useState("");
	const [loading, setLoading] = useState(false);
	const [jobDetails, setJobDetails] = useState(null);
	// const [code, setCode] = useState();
	const [language, setLanguage] = useState("cpp");
	const [showResetModal, setShowResetModal] = useState(false);
	const [showSettingsModal, setShowSettingsModal] = useState(false);
	const [fontSize, setFontSize] = useState("14px");
	const [editorTheme, setEditorTheme] = useState("#252526");

	const file = defaultValues[language];

	const [input, setInput] = useState("");
	const [previousCode, setPreviousCode] = useState(file.value);
	const [changedCode, setChangedCode] = useState(previousCode);

	const [width, setWidth] = useState(window.innerWidth);

	React.useEffect(() => {
		const handleWindowResize = () => setWidth(window.innerWidth);
		window.addEventListener("resize", handleWindowResize);

		// Return a function from the effect that removes the event listener
		return () => window.removeEventListener("resize", handleWindowResize);
	}, []);

	const handleSubmitToServer = async (code, input) => {
		setLoading(true);

		const data = {
			language,
			code,
			input,
		};

		try {
			setOutput("");
			setJobDetails(null);
			const response = await axios.post(`${baseURL}/run`, data);
			// setOutput(response.data.jobId);

			let intervalId;
			intervalId = setInterval(async () => {
				const res = await axios.get(`${baseURL}/status`, {
					params: { id: response.data.jobId },
				});

				const { success, job, error } = res.data;
				if (success) {
					const { status, output } = job;
					setJobDetails(job);
					if (status === "pending") return;
					setLoading(false);
					const op = JSON.parse(output);
					setOutput(op);
					clearInterval(intervalId);
				} else {
					setLoading(false);
					console.log(error);
					setOutput(error);
					clearInterval(intervalId);
				}
			}, 1000);
		} catch (error) {
			if (error.response) {
				setLoading(false);
				setOutput(error.response.data.err);
			} else {
				setLoading(false);
				setOutput("Error connecting to server");
			}
		}
	};

	const renderTimeFromServer = () => {
		if (!jobDetails) {
			return "";
		}

		let result = "";
		let { submittedAt, startedAt, completedAt } = jobDetails;
		submittedAt = moment(submittedAt);
		result += `Submitted at: ${submittedAt}`;

		if (!startedAt || !completedAt) {
			return `${result.slice(0, 38)}`;
		}

		const start = moment(startedAt);
		const end = moment(completedAt);
		const executionTime = end.diff(start, "seconds", true);
		return result.replace(result, `Execution time: ${executionTime}s`);
	};

	const codeReset = () => {
		setInput("");
		setPreviousCode(file.value);
		setChangedCode(file.value);
	};

	return (
		<>
			{showResetModal && (
				<ResetModal closeModal={setShowResetModal} setResetCode={codeReset} />
			)}
			{showSettingsModal && (
				<SettingsModal
					closeModal={setShowSettingsModal}
					fontSize={fontSize}
					setFontSize={setFontSize}
					editorTheme={editorTheme}
					setEditorTheme={setEditorTheme}
				/>
			)}
			<Navbar language={language} setLanguage={setLanguage} />
			<div className={classes.content}>
				<Sidebar setLanguage={setLanguage} />
				{width < 800 ? (
					<MobileEditor
						input={input}
						setInput={setInput}
						previousCode={previousCode}
						setPreviousCode={setPreviousCode}
						changedCode={changedCode}
						setChangedCode={setChangedCode}
						file={file}
						loading={loading}
						output={output}
						handleSubmitToServer={handleSubmitToServer}
						renderTimeFromServer={renderTimeFromServer}
						clearOutput={() => setOutput("")}
						setShowResetModal={setShowResetModal}
						setShowSettingsModal={setShowSettingsModal}
						fontSize={fontSize}
						editorTheme={editorTheme}
					/>
				) : (
					<DesktopEditor
						input={input}
						setInput={setInput}
						previousCode={previousCode}
						setPreviousCode={setPreviousCode}
						file={file}
						loading={loading}
						output={output}
						handleSubmitToServer={handleSubmitToServer}
						renderTimeFromServer={renderTimeFromServer}
						clearOutput={() => setOutput("")}
						setShowResetModal={setShowResetModal}
						setShowSettingsModal={setShowSettingsModal}
						fontSize={fontSize}
						editorTheme={editorTheme}
					/>
				)}
			</div>
		</>
	);
};

export default MainEditor;
