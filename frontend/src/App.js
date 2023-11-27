import React from "react";
import "./App.css";
import MainEditor from "./components/MainEditor/MainEditor";
import { Toaster } from "react-hot-toast";

function App() {
	return (
		<>
			{/* <div className="content"> */}
			<MainEditor />
			{/* </div> */}
			<Toaster
				toastOptions={{
					success: {
						style: {
							background: "#383b40",
							color: "#ffffffab",
							padding: "10px",
							fontFamily: "Questrial",
						},
					},
				}}
				containerStyle={{
					top: 20,
					left: 20,
					bottom: 20,
					right: 20,
				}}
			/>
		</>
	);
}

export default App;
