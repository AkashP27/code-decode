const { spawn } = require("child_process");
const { executeGeneral } = require("./executeGeneral");

const executeJs = async (filepath, input) => {
	const command = `node ${filepath}`;
	return await executeGeneral(input, command);
	// return new Promise((resolve, reject) => {
	// 	exec(`node ${filepath}`, (err, stdout, stderr) => {
	// 		err && reject({ err, stderr });
	// 		stderr && reject(stderr);
	// 		resolve(stdout);
	// 	});
	// });
};

module.exports = { executeJs };
