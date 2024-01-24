import React, { useState } from "react";
import classes from "./SettingsModal.module.css";

const SettingsModal = ({
	closeModal,
	fontSize,
	setFontSize,
	editorTheme,
	setEditorTheme,
}) => {
	const [fontDropdownClicked, setfontDropdownClicked] = useState(false);
	const [settingsDropdownClicked, setSettingsDropdownClicked] = useState(false);
	const fontOptions = ["12px", "14px", "16px", "18px", "20px", "22px"];

	return (
		<>
			<div className={classes.modal_wrapper}>
				<div className={classes.modal_container}>
					<div className={classes.modal_title}>
						<h3>Editor Settings</h3>
						<i className="fas fa-times" onClick={() => closeModal(false)}></i>
					</div>

					<div className={classes.modal_body}>
						<div className={classes.modal_body_left}>
							<h4>Font Size</h4>
							<p>Choose your preferred font size</p>
						</div>
						<div className={classes.dropdown} style={{ zIndex: "999" }}>
							<div
								className={classes.dropdown_btn}
								onClick={() => {
									setfontDropdownClicked(!fontDropdownClicked);
									setSettingsDropdownClicked(false);
								}}
							>
								{`${fontSize}`}
								<i class="fa fa-caret-down"></i>
							</div>
							{fontDropdownClicked && (
								<div className={classes.dropdown_content}>
									{fontOptions.map((option, index) => (
										<div
											key={index}
											className={classes.dropdown_item}
											onClick={(e) => {
												setFontSize(option);
												// setSelected(e.target.textContent);
												setfontDropdownClicked(false);
											}}
										>
											<div>{option}</div>
											<div className={classes.check}>
												{`${fontSize}` === `${option}` && (
													<i class="fa fa-check"></i>
												)}
											</div>
										</div>
									))}
								</div>
							)}
						</div>
					</div>
					<div className={classes.modal_body}>
						<div className={classes.modal_body_left}>
							<h4>Editor Theme</h4>
							<p>Select your preferred Editor Theme</p>
						</div>
						<div className={classes.dropdown}>
							<div
								className={classes.dropdown_btn}
								onClick={() =>
									setSettingsDropdownClicked(!settingsDropdownClicked)
								}
							>
								{`${editorTheme}`}
								<i class="fa fa-caret-down"></i>
							</div>
							{settingsDropdownClicked && (
								<div className={classes.dropdown_content}>
									{/* {Object.entries(themeOptions).forEach(([key, value]) => (
										<div
											className={classes.dropdown_item}
											onClick={(e) => {
												setEditorTheme(value);
												setSettingsDropdownClicked(false);
											}}
										>
											{key}
										</div>
									))} */}
									<div
										className={classes.dropdown_item}
										onClick={(e) => {
											setEditorTheme("#252526");
											setSettingsDropdownClicked(false);
										}}
									>
										{"vs-dark"}
										<div className={classes.check}>
											{`${editorTheme}` === `#252526` && (
												<i class="fa fa-check"></i>
											)}
										</div>
									</div>
									<div
										className={classes.dropdown_item}
										onClick={(e) => {
											setEditorTheme("#282a36");
											// setSelected(e.target.textContent);
											setSettingsDropdownClicked(false);
										}}
									>
										{"Dracula"}
										<div className={classes.check}>
											{`${editorTheme}` === `#282a36` && (
												<i class="fa fa-check"></i>
											)}
										</div>
									</div>
									<div
										className={classes.dropdown_item}
										onClick={(e) => {
											setEditorTheme("#272822");
											setSettingsDropdownClicked(false);
										}}
									>
										{"Monokai"}
										<div className={classes.check}>
											{`${editorTheme}` === `#272822` && (
												<i class="fa fa-check"></i>
											)}
										</div>
									</div>
									<div
										className={classes.dropdown_item}
										onClick={(e) => {
											setEditorTheme("#073642");
											setSettingsDropdownClicked(false);
										}}
									>
										{"Solarized Dark"}
										<div className={classes.check}>
											{`${editorTheme}` === `#073642` && (
												<i class="fa fa-check"></i>
											)}
										</div>
									</div>
									<div
										className={classes.dropdown_item}
										onClick={(e) => {
											setEditorTheme("#000000");
											setSettingsDropdownClicked(false);
										}}
									>
										{"Dark"}
										<div className={classes.check}>
											{`${editorTheme}` === `#000000` && (
												<i class="fa fa-check"></i>
											)}
										</div>
									</div>
									<div
										className={classes.dropdown_item}
										onClick={(e) => {
											setEditorTheme("#f5f5f5");
											setSettingsDropdownClicked(false);
										}}
									>
										{"Light"}
										<div className={classes.check}>
											{`${editorTheme}` === `#f5f5f5` && (
												<i class="fa fa-check"></i>
											)}
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default SettingsModal;
