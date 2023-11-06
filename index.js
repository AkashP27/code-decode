const express = require("express");
const cors = require("cors");
const { generateFile } = require("./execution/generateFile");
const { executeCpp } = require("./execution/executeCpp");
const { executePy } = require("./execution/executePy");
const { executeJava } = require("./execution/executeJava");
const { executeJs } = require("./execution/executeJs");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.send("Test...!");
});

app.post("/run", async (req, res) => {
	const { language = "cpp", code, input } = req.body;

	if (!code) {
		return res
			.status(400)
			.json({ status: "fail", message: "Code is required" });
	}

	try {
		const filepath = await generateFile(language, code);
		// console.log(filepath);

		let output;
		switch (language) {
			case "cpp":
				output = await executeCpp(filepath, input);
				break;
			case "py":
				output = await executePy(filepath, input);
				break;
			case "java":
				output = await executeJava(filepath, input);
				break;
			default:
				output = await executeJs(filepath);
		}

		return res.json({ filepath, output });
	} catch (err) {
		res.status(500).json({ err });
	}
});

const PORT = 5000;
app.listen(PORT, () => {
	console.log(`Server running on ${PORT}`);
});
