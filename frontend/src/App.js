import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import MainEditor from "./components/MainEditor/MainEditor";

function App() {
	return (
		<>
			<Navbar />
			<div className="content">
				<MainEditor />
			</div>
		</>
	);
}

export default App;
