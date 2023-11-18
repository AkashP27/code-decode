const { spawn } = require("child_process");

const executeGeneral = (input, command) => {
	return new Promise((resolve, reject) => {
		const child = spawn(command, {
			shell: true,
		});

		child.stdin.write(`${input}`);
		child.stdin.end();

		let stdoutData = "";
		let stderrData = "";
		let errData = "";
		child.stdout.on("data", async (data) => {
			// console.log(`child stdout:\n${data}`);
			stdoutData += data;
		});

		child.stderr.on("data", (data) => {
			stderrData += data;
		});

		child.on("error", (err) => {
			errData += err;
			reject({ err, stderr });
		});

		child.on("close", (code) => {
			stderrData && reject(stderrData);
			stdoutData && resolve(stdoutData);
			if (code !== 0) {
				reject(` Program died with ${code}`);
			}
		});
	});
};

module.exports = { executeGeneral };
