const path = require("path");
const fs = require("fs");
const { executeGeneral } = require("./executeGeneral");

const outputDir = path.join(__dirname, "outputs");

if (!fs.existsSync(outputDir)) {
	fs.mkdirSync(outputDir, { recursive: true });
}

const executeCpp = async (filepath, input) => {
	const id = path.basename(filepath).split(".")[0];
	let command = "";
	if (process.platform == "win32" || process.platform == "win64") {
		const outputPath = path.join(outputDir, `${id}.exe`);
		command = `g++ ${filepath} -o ${outputPath} && cd ${outputDir} && ${id}.exe`;
	} else {
		const outputPath = path.join(outputDir, `${id}.out`);
		command = `g++ ${filepath} -o ${outputPath} && cd ${outputDir} && ./${id}.out`;
	}
	// const outputPath = path.join(outputDir, `${id}.out`);
	// command = `g++ ${filepath} -o ${outputPath} && cd ${outputDir} && ./${id}.out`;

	return await executeGeneral(input, command);
};

module.exports = { executeCpp };
