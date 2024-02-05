import React, { useState, useEffect } from "react";
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

	const themeOptions = new Map([
		["#252526", "vs-dark"],
		["#282a36", "Dracula"],
		["#272822", "Monokai"],
		["#073642", "Solarized Dark"],
		["#000000", "Dark"],
		["#fefefe", "Light"],
	]);

	const handleOutsideClick = (e) => {
		if (e.target.classList.contains(classes.modal_wrapper)) {
			closeModal(false);
		}
	};

	useEffect(() => {
		document.body.style.overflowY = "hidden";
		document.addEventListener("mousedown", handleOutsideClick);

		return () => {
			document.body.style.overflowY = "scroll";
			document.removeEventListener("mousedown", handleOutsideClick);
		};
	}, [closeModal]);

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
								{`${themeOptions.get(editorTheme)}`}
								<i class="fa fa-caret-down"></i>
							</div>
							{settingsDropdownClicked && (
								<div className={classes.dropdown_content}>
									{[...themeOptions.entries()].map(([key, value]) => (
										<div
											key={key}
											className={classes.dropdown_item}
											onClick={(e) => {
												setEditorTheme(key);
												setSettingsDropdownClicked(false);
											}}
										>
											<div>{value}</div>
											<div className={classes.check}>
												{`${editorTheme}` === `${key}` && (
													<i class="fa fa-check"></i>
												)}
											</div>
										</div>
									))}
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
