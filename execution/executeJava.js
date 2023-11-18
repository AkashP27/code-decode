const path = require("path");
const fs = require("fs");
const { executeGeneral } = require("./executeGeneral");

const outputDir = path.join(__dirname, "outputs");
// D:\Akash\MERN\code-decode\outputs

if (!fs.existsSync(outputDir)) {
	fs.mkdirSync(outputDir, { recursive: true });
}

const executeJava = async (filepath, input) => {
	const id = path.basename(filepath).split(".")[0];
	const outputPath = path.join(outputDir, `${id}.java`);
	// D:\Akash\MERN\code-decode\outputs\Main.java
	const command = `javac -d ${outputPath} ${filepath} && cd ${outputPath} && java ${id}`;

	return await executeGeneral(input, command);
};

module.exports = { executeJava };
