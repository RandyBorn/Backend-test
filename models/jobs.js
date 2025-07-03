import mongoose from "mongoose";
// Schema für Job
const jobSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: { type: String, required: true },
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});
const Job = mongoose.model("Job", jobSchema);
export default Job;
