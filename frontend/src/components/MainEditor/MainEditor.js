import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import classes from "./MainEditor.module.css";
import defaultValues from "../../utils/defaultValues";
import MobileEditor from "./MobileEditor/MobileEditor";
import DesktopEditor from "./DesktopEditor/DesktopEditor";

const MainEditor = () => {
	// const [code, setCode] = useState();
	const [language, setLanguage] = useState("cpp");

	const [width, setWidth] = useState(window.innerWidth);

	React.useEffect(() => {
		const handleWindowResize = () => setWidth(window.innerWidth);
		window.addEventListener("resize", handleWindowResize);

		// Return a function from the effect that removes the event listener
		return () => window.removeEventListener("resize", handleWindowResize);
	}, []);

	const file = defaultValues[language];

	return (
		<>
			<Navbar setLanguage={setLanguage} />
			<div className={classes.content}>
				<Sidebar setLanguage={setLanguage} />
				{width < 800 ? (
					<MobileEditor file={file} language={language} />
				) : (
					<DesktopEditor file={file} language={language} />
				)}
			</div>
		</>
	);
};

export default MainEditor;
