import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import classes from "./MainEditor.module.css";
import defaultValues from "../../utils/defaultValues";
import MobileEditor from "./MobileEditor/MobileEditor";
import DesktopEditor from "./DesktopEditor/DesktopEditor";
import axios from "axios";
import moment from "moment";

const baseURL = process.env.REACT_APP_BASEURL;

const MainEditor = () => {
	const [output, setOutput] = useState("");
	const [loading, setLoading] = useState(false);
	const [jobDetails, setJobDetails] = useState(null);
	// const [code, setCode] = useState();
	const [language, setLanguage] = useState("cpp");

	const [width, setWidth] = useState(window.innerWidth);

	React.useEffect(() => {
		const handleWindowResize = () => setWidth(window.innerWidth);
		window.addEventListener("resize", handleWindowResize);

		// Return a function from the effect that removes the event listener
		return () => window.removeEventListener("resize", handleWindowResize);
	}, []);

	const file = defaultValues[language];

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
		let { startedAt, completedAt } = jobDetails;
		if (!startedAt || !completedAt) {
			return result;
		}

		const start = moment(startedAt);
		const end = moment(completedAt);
		const executionTime = end.diff(start, "seconds", true);
		result += `Execution time: ${executionTime}s`;

		return result;
	};

	return (
		<>
			<Navbar setLanguage={setLanguage} />
			<div className={classes.content}>
				<Sidebar setLanguage={setLanguage} />
				{width < 800 ? (
					<MobileEditor
						file={file}
						loading={loading}
						output={output}
						handleSubmitToServer={handleSubmitToServer}
						renderTimeFromServer={renderTimeFromServer}
						clearOutput={() => setOutput("")}
					/>
				) : (
					<DesktopEditor
						file={file}
						loading={loading}
						output={output}
						handleSubmitToServer={handleSubmitToServer}
						renderTimeFromServer={renderTimeFromServer}
						clearOutput={() => setOutput("")}
					/>
				)}
			</div>
		</>
	);
};

export default MainEditor;
