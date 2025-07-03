import mongoose from "mongoose";
// Schema für User
const userSchema = new mongoose.Schema({
  role: { type: String, enum: ["company", "applicant"], default: "applicant" },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true, minlength: 3 },
  subscribedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "company" }],
});
const User = mongoose.model("User", userSchema);
export default User;
