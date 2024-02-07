import React, { useState } from "react";
import classes from "./Sidebar.module.css";
import cpp from "../../images/c++.svg";
import python from "../../images/python.svg";
import java from "../../images/java.svg";
import javascript from "../../images/javascript.svg";
import golang from "../../images/golang.svg";

const Sidebar = ({ setLanguage }) => {
	const languages = [
		{ id: 1, name: "cpp", icon: cpp },
		{ id: 2, name: "py", icon: python },
		{ id: 3, name: "java", icon: java },
		{ id: 4, name: "go", icon: golang },
		{ id: 5, name: "js", icon: javascript },
	];

	const [activeLanguage, setActiveLanguage] = useState("cpp");

	const handleClick = (language) => {
		setLanguage(language);
		setActiveLanguage(language);
	};

	const getClassName = (language) => {
		return language === activeLanguage
			? `${classes.change_lang_active}`
			: `${classes.change_lang_inactive}`;
	};

	return (
		<>
			<div className={classes.sidebar}>
				{languages.map((language) => (
					<div className={classes.sidebar_wrapper}>
						<div
							key={language.id}
							className={getClassName(language.name)}
							onClick={() => handleClick(language.name)}
						>
							<img src={language.icon} alt="" className="icon" />
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default Sidebar;
