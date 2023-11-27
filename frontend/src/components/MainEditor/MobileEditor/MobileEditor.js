import React, { useState, useRef, useEffect } from "react";
import classes from "../MainEditor.module.css";
import Editor, { useMonaco } from "@monaco-editor/react";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-hot-toast";

const override = {
	display: "block",
	margin: "200px auto",
};

const MobileEditor = ({
	input,
	setInput,
	previousCode,
	setPreviousCode,
	changedCode,
	setChangedCode,
	file,
	loading,
	output,
	handleSubmitToServer,
	renderTimeFromServer,
	clearOutput,
	setShowResetModal,
	setShowSettingsModal,
	fontSize,
	editorTheme,
}) => {
	const [isFileClicked, setIsFileClicked] = useState("main");
	const editorCodeRef = useRef(null);
	const monaco = useMonaco();
	const [fullScreen, setFullScreen] = useState(false);
	const [copyText, setCopyText] = useState(file.value);

	useEffect(() => {
		setIsFileClicked("main");
		setPreviousCode(file.value);
		setChangedCode(file.value);
		setInput("");
		setCopyText(file.value);
	}, [file.value]);

	useEffect(() => {
		let e = document.getElementById("fullscreen");
		e.requestFullscreen();
	}, [fullScreen]);

	useEffect(() => {
		if (monaco) {
			let identifierColor = "";
			editorTheme === "#ffffff"
				? (identifierColor = "#000000")
				: (identifierColor = "#ffffff");

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
					{
						foreground: `${identifierColor}`,
						token: "identifier",
					},
					{
						foreground: `${identifierColor}`,
						token: "delimiter",
					},
				],
				colors: {
					"editor.background": `${editorTheme}`,
					"editorCursor.foreground": `${identifierColor}`,
				},
			});
			monaco.editor.setTheme("my-theme");
		}
	}, [editorTheme, monaco]);

	const handleInput = (e) => {
		setInput(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsFileClicked("output");

		let code = "";
		changedCode !== previousCode
			? (code = changedCode)
			: isFileClicked === "output"
			? (code = previousCode)
			: (code = editorCodeRef.current.getValue());

		handleSubmitToServer(code, input);
	};

	const handleEditorChange = (editor) => {
		setPreviousCode(editor);
		setChangedCode(editor);
		setCopyText(editor);
	};

	const handleEditorCode = (editor, monaco) => {
		editorCodeRef.current = editor;
		setPreviousCode(editorCodeRef.current.getValue());

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
				"editor.background": `${editorTheme}`,
			},
		});
		monaco.editor.setTheme("my-theme");
	};

	return (
		<>
			<div className={classes.mobile_topbar}>
				<div className={classes.mobile_files}>
					<button
						className={
							isFileClicked === "main"
								? classes.active
								: classes.mobile_topbar_button
						}
						onClick={() => {
							setIsFileClicked("main");
						}}
					>
						{file.name}
					</button>
					<button
						className={
							isFileClicked === "output"
								? classes.active
								: classes.mobile_topbar_button
						}
						onClick={() => {
							setIsFileClicked("output");
							setPreviousCode(editorCodeRef.current.getValue());
						}}
					>
						Output
					</button>
				</div>
				<div className={classes.editor_run_button}>
					<button
						type="button"
						className={classes.run}
						onClick={handleSubmit}
						disabled={loading}
					>
						<i className="fas fa-play"></i>
					</button>
				</div>
			</div>
			{isFileClicked === "main" && (
				<>
					<div className={classes.editor_wrapper}>
						<div className={classes.editor_topbar}>
							<div className={classes.editor_filename}>{file.name}</div>
							<div className={classes.editor_topbar_wrapper}></div>
							<div className={classes.editor_dropdown}>
								<div className={classes.tooltip}>
									<i
										class="fas fa-copy"
										onClick={() => {
											navigator.clipboard.writeText(copyText);
											toast.success("Copied to clipboard");
										}}
									></i>
								</div>
								<div className={classes.tooltip}>
									<i
										class="fas fa-expand"
										onClick={() => {
											setFullScreen(!fullScreen);
										}}
									></i>
								</div>
								<div className={classes.tooltip}>
									<i
										className="fa fa-undo"
										onClick={() => {
											setShowResetModal(true);
										}}
									></i>
								</div>
								<div className={classes.tooltip}>
									<i
										className="fa fa-cog"
										onClick={() => setShowSettingsModal(true)}
									></i>
								</div>
							</div>
							{/* <div className={classes.editor_clear_button}>
								<button className={classes.clear} onClick={() => resetCode()}>
									Reset
								</button>
							</div> */}
						</div>
						<div id="fullscreen" style={{ height: "calc(100vh - 17vh)" }}>
							<Editor
								// height="calc(100vh - 17vh)"
								height="100%"
								width="100%"
								// theme="vs-dark"
								theme="my-theme"
								path={file.name}
								// defaultLanguage={file.language}
								defaultValue={file.value}
								value={previousCode}
								onMount={handleEditorCode}
								options={{
									automaticLayout: true,
									autoIndent: "full",
									fontFamily: "monospace",
									fontSize: fontSize,
									readOnly: false,
									matchBrackets: "always",
									minimap: {
										enabled: false,
									},
									scrollBeyondLastLine: false,
									scrollbar: {
										horizontalSliderSize: 4,
										verticalSliderSize: 4,
									},
									roundedSelection: false,
									renderLineHighlight: "none",
								}}
								onChange={handleEditorChange}
							/>
						</div>
					</div>
				</>
			)}

			{isFileClicked === "output" && (
				<>
					<div className={classes.terminal_wrapper}>
						<div className={classes.editor_topbar}>
							<div className={classes.terminal_filename}>Output</div>
							<div className={classes.editor_topbar_wrapper}>
								{renderTimeFromServer()}
							</div>
							<div className={classes.editor_clear_button}>
								<button className={classes.clear} onClick={() => clearOutput()}>
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
									<div className={classes.terminal_filename}>Input</div>
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
									placeholder="Enter multiple input at once before running...!"
									value={input}
									onChange={handleInput}
								/>
							</>
						)}
					</div>
				</>
			)}
		</>
	);
};

export default MobileEditor;
