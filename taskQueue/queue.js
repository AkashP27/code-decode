const { Queue } = require("bullmq");
const worker = require("./worker");
const dotenv = require("dotenv");
dotenv.config();

const Redis = require("ioredis");
const connection = new Redis(process.env.REDIS_EXTERNAL_URL, {
	maxRetriesPerRequest: null,
});

const queue = new Queue("job-queue", { connection });

const addJobToQueue = async (jobId) => {
	await queue.add("sourcecode", { id: jobId });
};

module.exports = { addJobToQueue };
