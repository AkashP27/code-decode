const path = require("path");
const Job = require("../models/Job");
const fs = require("fs");
const { executeGeneral } = require("./executeGeneral");

const outputDir = path.join(__dirname, "outputs");

if (!fs.existsSync(outputDir)) {
	fs.mkdirSync(outputDir, { recursive: true });
}

const executeCpp = async (jobId) => {
	const jobData = await Job.findById(jobId);

	const id = path.basename(jobData.filepath).split(".")[0];
	let command = "";
	let outputPath = "";
	if (process.platform == "win32" || process.platform == "win64") {
		outputPath = path.join(outputDir, `${id}.exe`);
		command = `g++ ${jobData.filepath} -o ${outputPath} && cd ${outputDir} && ${id}.exe`;
	} else {
		outputPath = path.join(outputDir, `${id}.out`);
		command = `g++ ${jobData.filepath} -o ${outputPath} && cd ${outputDir} && ./${id}.out`;
	}

	// const outputPath = path.join(outputDir, `${id}.out`);
	// command = `g++ ${jobData.filepath} -o ${outputPath} && cd ${outputDir} && ./${id}.out`;

	jobData.outputfilepath = outputPath;
	jobData.save();
	return await executeGeneral(jobData.input, command);
};

module.exports = { executeCpp };
