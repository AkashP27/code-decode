import React, { useRef, useState } from "react";
import axios from "axios";
import Editor from "@monaco-editor/react";
import ClipLoader from "react-spinners/ClipLoader";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import classes from "./MainEditor.module.css";
import defaultValues from "../../utils/defaultValues";
import { optionsEditor } from "../../utils/editorOptions";
import moment from "moment";

const override = {
	display: "block",
	margin: "200px auto",
};

const baseURL = process.env.REACT_APP_BASEURL;

const MainEditor = () => {
	// const [code, setCode] = useState();
	const [language, setLanguage] = useState("cpp");
	const [output, setOutput] = useState("");
	const [input, setInput] = useState("");
	const [loading, setLoading] = useState(false);
	const [jobDetails, setJobDetails] = useState(null);

	const [isMobile, setIsMobile] = useState({ main: "main", output: "output" });
	const [isFileClicked, setIsFileClicked] = useState(true);
	const [isOutputClicked, setIsOutputClicked] = useState(false);

	const file = defaultValues[language];
	const editorCodeRef = useRef(null);

	const handleInput = (e) => {
		setInput(e.target.value);
	};

	const handleEditorCode = (editor, monaco) => {
		editorCodeRef.current = editor;

		monaco.editor.defineTheme("my-theme", {
			base: "vs-dark",
			inherit: true,
			rules: [
				{
					token: "comment",
					foreground: "#5d7988",
					fontstyle: "italic",
				},
				{ token: "constant", foreground: "#e06c75" },
			],
			colors: {
				"editor.background": "#252526",
			},
		});
		monaco.editor.setTheme("my-theme");
	};

	const renderTime = () => {
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

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		JSON.stringify(isMobile) !==
			JSON.stringify({ main: "main", output: "output" }) &&
			setIsMobile({ output: "output" });

		const code = editorCodeRef.current.getValue();

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

				// console.log(res.data);

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

	return (
		<>
			<Navbar setLanguage={setLanguage} />
			<div className={classes.mobile_topbar}>
				<div className={classes.mobile_files}>
					<button
						className={
							isFileClicked ? classes.active : classes.mobile_topbar_button
						}
						onClick={() => {
							setIsMobile({ main: "main" });
							setIsFileClicked((isFileClicked) => !isFileClicked);
							setIsOutputClicked(false);
						}}
					>
						{file.name}
					</button>
					<button
						className={
							isOutputClicked ? classes.active : classes.mobile_topbar_button
						}
						onClick={() => {
							setIsMobile({ output: "output" });
							setIsOutputClicked((isOutputClicked) => !isOutputClicked);
							setIsFileClicked(false);
						}}
					>
						Output
					</button>
				</div>
			</div>
			<div className={classes.content}>
				<Sidebar setLanguage={setLanguage} />
				{isMobile.main === "main" && (
					<div className={classes.editor_wrapper}>
						<div className={classes.editor_topbar}>
							<div className={classes.editor_filename}>{file.name}</div>
							<div className={classes.editor_topbar_wrapper}></div>
							<div className={classes.editor_clear_button}></div>
							<div className={classes.editor_run_button}>
								<button
									type="button"
									className={classes.run}
									onClick={handleSubmit}
									disabled={loading}
								>
									Run
								</button>
							</div>
						</div>
						<Editor
							height="calc(100vh - 17vh)"
							// height="100%"
							width="100%"
							// theme="vs-dark"
							theme="my-theme"
							path={file.name}
							// defaultLanguage={file.language}
							defaultValue={file.value}
							onMount={handleEditorCode}
							options={optionsEditor}
						/>
					</div>
				)}

				{isMobile.output === "output" && (
					<div className={classes.terminal_wrapper}>
						<div className={classes.editor_topbar}>
							<div className={classes.editor_filename}>Output</div>
							<div className={classes.editor_topbar_wrapper}>
								{renderTime()}
							</div>
							<div className={classes.editor_clear_button}>
								<button className={classes.clear} onClick={() => setOutput("")}>
									Clear
								</button>
							</div>
						</div>
						{loading ? (
							<ClipLoader
								color={"#ffffff"}
								loading={loading}
								cssOverride={override}
								size={50}
								width={100}
								display="block"
								aria-label="Loading Spinner"
								data-testid="loader"
							/>
						) : (
							<>
								<div className={classes.editor_output}>{output}</div>

								<div className={classes.editor_topbar}>
									<div className={classes.editor_filename}>Input</div>
									<div className={classes.editor_topbar_wrapper}></div>
									<div className={classes.editor_clear_button}>
										<button
											className={classes.clear}
											onClick={() => setInput("")}
										>
											Clear
										</button>
									</div>
								</div>
								<textarea
									className={classes.editor_input}
									placeholder="Enter multiple input at once...!"
									value={input}
									onChange={handleInput}
								/>
							</>
						)}
					</div>
				)}
			</div>
		</>
	);
};

export default MainEditor;
