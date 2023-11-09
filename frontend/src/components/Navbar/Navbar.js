import React from "react";
import classes from "./Navbar.module.css";

const Navbar = () => {
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
			</div>
		</>
	);
};

export default Navbar;
