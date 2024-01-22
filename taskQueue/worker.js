const { Worker } = require("bullmq");
const Job = require("../models/Job");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

const Redis = require("ioredis");
const connection = new Redis(process.env.REDIS_EXTERNAL_URL, {
	maxRetriesPerRequest: null,
});

const { executeCpp } = require("../execution/executeCpp");
const { executePy } = require("../execution/executePy");
const { executeJava } = require("../execution/executeJava");
const { executeJs } = require("../execution/executeJs");
const { executeGo } = require("../execution/executeGo");

const worker = new Worker(
	"job-queue",
	async (job) => {
		await jobHandler(job);
	},
	{
		connection,
		concurrency: 50,
	}
);

async function jobHandler(job) {
	const jobData = await Job.findById(job.data.id);
	if (!jobData) {
		throw new Error("No jobs found");
	}

	let output;
	try {
		jobData.startedAt = new Date();
		switch (jobData.language) {
			case "cpp":
				output = await executeCpp(jobData._id);
				break;
			case "py":
				output = await executePy(jobData.filepath, jobData.input);
				break;
			case "java":
				output = await executeJava(jobData._id);
				break;
			case "go":
				output = await executeGo(jobData.filepath, jobData.input);
				break;
			default:
				output = await executeJs(jobData.filepath, jobData.input);
		}

		const newJobData = await Job.findById(jobData._id);
		if (!newJobData) {
			throw new Error("No jobs found");
		}

		fs.rmSync(newJobData.filepath, { recursive: true, force: true });
		if (fs.existsSync(newJobData.outputfilepath)) {
			fs.rmSync(newJobData.outputfilepath, { recursive: true, force: true });
		}

		newJobData.completedAt = new Date();
		newJobData.status = "success";
		newJobData.output = JSON.stringify(output);
		await newJobData.save();
	} catch (err) {
		jobData.completedAt = new Date();
		jobData.status = "error";
		jobData.output = JSON.stringify(err);
		await jobData.save();
	}
	return true;
}

worker.on("completed", (job) => {
	// console.log(`${job.id} has completed!`);
});
worker.on("failed", (job, err) => {
	console.log(`${job.id} has failed with ${err.message}`);
});

module.exports = worker;
