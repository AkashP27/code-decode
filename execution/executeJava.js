const path = require("path");
const Job = require("../models/Job");
const fs = require("fs");
const { executeGeneral } = require("./executeGeneral");

const outputDir = path.join(__dirname, "outputs");
// D:\Akash\MERN\code-decode\outputs

if (!fs.existsSync(outputDir)) {
	fs.mkdirSync(outputDir, { recursive: true });
}

const executeJava = async (jobId) => {
	const jobData = await Job.findById(jobId);

	const id = path.basename(jobData.filepath).split(".")[0];
	const outputPath = path.join(outputDir, `${id}.java`);
	// D:\Akash\MERN\code-decode\outputs\Main.java
	const command = `javac -d ${outputPath} ${jobData.filepath} && cd ${outputPath} && java ${id}`;

	jobData.outputfilepath = outputPath;
	jobData.save();

	return await executeGeneral(jobData.input, command);
};

module.exports = { executeJava };
