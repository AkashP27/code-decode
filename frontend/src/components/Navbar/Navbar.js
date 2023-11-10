import React, { useState } from "react";
import classes from "./Navbar.module.css";
import classesSide from "../Sidebar/Sidebar.module.css";
import cpp from "../../images/c++.svg";
import python from "../../images/python.svg";
import java from "../../images/java.svg";
import javascript from "../../images/javascript.svg";

const Navbar = ({ setLanguage }) => {
	const [isClicked, setIsClicked] = useState(false);

	const handleClick = () => {
		setIsClicked(!isClicked);
	};

	return (
		<>
			<div className={classes.navbar}>
				<div className={classes.logo}>
					<div className={classes.logo_name}>
						<span className={classes.logo_first}>CODE</span>
						<span className={classes.logo_second}>DECODE</span>
					</div>
					<span className={classes.logo_text}>Online Compiler</span>
				</div>

				<div className={isClicked ? classes.nav_act : classes.nav_menu}>
					<div
						className={classes.language}
						onClick={() => {
							setLanguage("cpp");
						}}
					>
						<div className={classesSide.change_lang_active}>
							<img src={cpp} alt="" className="icon" />
						</div>
						<span className={classes.language_text}>C++ Online Compiler</span>
					</div>

					<div
						className={classes.language}
						onClick={() => {
							setLanguage("py");
						}}
					>
						<div className={classesSide.change_lang_active}>
							<img src={python} alt="" className="icon" />
						</div>
						<span className={classes.language_text}>
							Python Online Compiler
						</span>
					</div>

					<div
						className={classes.language}
						onClick={() => {
							setLanguage("java");
						}}
					>
						<div className={classesSide.change_lang_active}>
							<img src={java} alt="" className="icon" />
						</div>
						<span className={classes.language_text}>Java Online Compiler</span>
					</div>

					<div
						className={classes.language}
						onClick={() => {
							setLanguage("js");
						}}
					>
						<div className={classesSide.change_lang_active}>
							<img src={javascript} alt="" className="icon" />
						</div>
						<span className={classes.language_text}>
							Javascript Online Compiler
						</span>
					</div>
				</div>

				<div id={classes.mobile} onClick={handleClick}>
					<i
						id={classes.bar}
						className={isClicked ? "fas fa-times" : "fas fa-bars"}
					></i>
				</div>
			</div>
		</>
	);
};

export default Navbar;
