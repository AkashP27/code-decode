const { executeGeneral } = require("./executeGeneral");

const executePy = async (filepath, input) => {
	const command = `python3 ${filepath}`;
	return await executeGeneral(input, command);
};

module.exports = { executePy };
