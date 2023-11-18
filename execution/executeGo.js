const { executeGeneral } = require("./executeGeneral");

const executeGo = async (filepath, input) => {
	const command = `go run ${filepath}`;
	return await executeGeneral(input, command);
};

module.exports = { executeGo };
