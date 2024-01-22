const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const { generateFile } = require("./execution/generateFile");
const { addJobToQueue } = require("./taskQueue/queue");
const Job = require("./models/Job");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config({ path: "./.env" });

mongoose
	.connect(process.env.MONGO_URL)
	.then(console.log("Connected to Mongo"))
	.catch((err) => {
		console.log(err);
	});

app.get("/", (req, res) => {
	res.json("Hello codedecode..!");
});

app.get("/status", async (req, res) => {
	const jobId = req.query.id;
	if (!jobId) {
		return res
			.status(400)
			.json({ success: false, error: "Job Id is required" });
	}

	try {
		const job = await Job.findById(jobId);
		if (!job) {
			return res.status(404).json({ success: false, error: "Invalid Job Id" });
		}
		return res.status(200).json({ success: true, job });
	} catch (err) {
		return res.status(400).json({ success: false, err: JSON.stringify(err) });
	}
});

app.post("/run", async (req, res) => {
	const { language = "cpp", code, input } = req.body;

	if (!code) {
		return res
			.status(400)
			.json({ success: false, message: "Code is required" });
	}

	let job;
	try {
		const filepath = await generateFile(language, code);
		job = await Job({
			language,
			filepath,
			input,
			submittedAt: Date.now(),
			startedAt: Date.now(),
		}).save();
		const jobId = job._id;
		addJobToQueue(jobId);
		res.status(201).json({ success: true, jobId });
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, error: JSON.stringify(error) });
	}
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server running on ${PORT}`);
});
