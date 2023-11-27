import React, { useState, useRef, useEffect } from "react";
import classes from "../MainEditor.module.css";
import Editor, { useMonaco } from "@monaco-editor/react";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-hot-toast";

const override = {
	display: "block",
	margin: "200px auto",
};

const DesktopEditor = ({
	input,
	setInput,
	previousCode,
	setPreviousCode,
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
	const monaco = useMonaco();
	const editorCodeRef = useRef(null);
	const [fullScreen, setFullScreen] = useState(false);
	const [copyText, setCopyText] = useState(file.value);

	useEffect(() => {
		setInput("");
		setCopyText(file.value);
	}, [file, setInput]);

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

	useEffect(() => {
		let e = document.getElementById("fullscreen");
		e.requestFullscreen();
	}, [fullScreen]);

	const handleInput = (e) => {
		setInput(e.target.value);
	};

	const handleEditorChange = (editor, monaco) => {
		setPreviousCode(editor);
		setCopyText(editor);
	};

	const handleEditorCode = (editor, monaco) => {
		editorCodeRef.current = editor;
		setCopyText(editorCodeRef.current.getValue());

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
					foreground: "#000000",
					token: "variable",
				},
			],
			colors: {
				"editor.background": "#252526",
				// "editor.background": "#252444",
			},
		});
		monaco.editor.setTheme("my-theme");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const code = editorCodeRef.current.getValue();
		handleSubmitToServer(code, input);
	};

	return (
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
							<span className={classes.tooltiptext} style={{ left: "-100%" }}>
								Copy to Clipboard
							</span>
						</div>
						<div className={classes.tooltip}>
							<i
								class="fas fa-expand"
								onClick={() => {
									setFullScreen(!fullScreen);
								}}
							></i>
							<span className={classes.tooltiptext} style={{ left: "-150%" }}>
								Editor to Full Screen
							</span>
						</div>
						<div className={classes.tooltip}>
							<i
								className="fa fa-undo"
								onClick={() => {
									setShowResetModal(true);
								}}
							></i>
							<span className={classes.tooltiptext} style={{ left: "-150%" }}>
								Reset to default code definition
							</span>
						</div>
						<div className={classes.tooltip}>
							<i
								className="fa fa-cog"
								onClick={() => setShowSettingsModal(true)}
							></i>
							<span className={classes.tooltiptext} style={{ left: "-50%" }}>
								Editor Settings
							</span>
						</div>
					</div>
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
				<div
					id="fullscreen"
					style={{ background: "#252526", height: "calc(100vh - 21vh)" }}
				>
					<Editor
						// height="calc(100vh - 21vh)"
						// height="100vh"
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
								<button className={classes.clear} onClick={() => setInput("")}>
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
	);
};

export default DesktopEditor;
