import React, { useState } from "react";
import classes from "./Sidebar.module.css";
import cpp from "../../images/c++.svg";
import python from "../../images/python.svg";
import java from "../../images/java.svg";
import javascript from "../../images/javascript.svg";

const Sidebar = ({ setLanguage }) => {
	const [divState, setDivState] = useState({
		activeObject: 1,
		objects: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
	});

	const toggleActive = (index) => {
		setDivState({ ...divState, activeObject: divState.objects[index] });
	};

	const toggleActiveStyles = (index) => {
		if (divState.objects[index] === divState.activeObject) {
			return classes.change_lang_inactive;
		}
		return classes.change_lang_active;
	};

	return (
		<>
			<div className={classes.sidebar}>
				<div className={classes.sidebar_wrapper}>
					<div
						className={toggleActiveStyles(1)}
						onClick={() => {
							setLanguage("cpp");
							toggleActive(1);
						}}
					>
						<img src={cpp} alt="" className="icon" />
					</div>
				</div>

				<div className={classes.sidebar_wrapper}>
					<div
						className={toggleActiveStyles(2)}
						onClick={() => {
							setLanguage("py");
							toggleActive(2);
						}}
					>
						<img src={python} alt="" className="icon" />
					</div>
				</div>

				<div className={classes.sidebar_wrapper}>
					<div
						className={toggleActiveStyles(3)}
						onClick={() => {
							setLanguage("java");
							toggleActive(3);
						}}
					>
						<img src={java} alt="" className="icon" />
					</div>
				</div>

				<div className={classes.sidebar_wrapper}>
					<div
						className={toggleActiveStyles(4)}
						onClick={() => {
							setLanguage("js");
							toggleActive(4);
						}}
					>
						<img src={javascript} alt="" className="icon" />
					</div>
				</div>
				{/* <label>Language</label>
				<select value={language} onChange={(e) => setLanguage(e.target.value)}>
					<option value="cpp">C++</option>
					<option value="py">Python</option>
					<option value="java">Java</option>
				</select> */}
			</div>
		</>
	);
};

export default Sidebar;
