import React, { useState, useRef, useEffect } from "react";
import classes from "../MainEditor.module.css";
import Editor from "@monaco-editor/react";
import { optionsEditor } from "../../../utils/editorOptions";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
	display: "block",
	margin: "200px auto",
};

const DesktopEditor = ({
	file,
	loading,
	output,
	handleSubmitToServer,
	renderTimeFromServer,
	clearOutput,
}) => {
	const [input, setInput] = useState("");
	const editorCodeRef = useRef(null);

	useEffect(() => {
		setInput("");
	}, [file]);

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
			<div className={classes.terminal_wrapper}>
				<div className={classes.editor_topbar}>
					<div className={classes.editor_filename}>Output</div>
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
							<div className={classes.editor_filename}>Input</div>
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
