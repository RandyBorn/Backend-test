import Job from "../models/jobs.js";

export const addJob = async (req, res) => {
  if (req.user.role !== "company")
    return res.status(403).send("Nur Unternehmen");

  const { title } = req.body;
  if (!title) return res.status(400).send("Job Titel Anzeige");

  const createdJob = await Job.create({
    companyId: req.user.userId,
    title,
  });

  res.status(201).json(createdJob);
};

export const getJobs = async (req, res) => {
  const jobs = await Job.find().populate("companyId", "name email");
  res.json(jobs);
};
