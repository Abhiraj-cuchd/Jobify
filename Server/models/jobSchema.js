import mongoose, { Schema } from "mongoose";

const jobSchema = new Schema({
    company: { type: Schema.Types.ObjectId, ref: 'Companies' },
    jobTitle: { type: String, required: [true, "Job Title is Required"] },
    jobType: { type: String, required: [true, "Job Type is Required"] },
    jobLocation: { type: String, required: [true, "Job Location is Required"] },
    salary: { type: Number, required: [true, "Salary is Required"] },
    vacancy: { type: Number, required: [true, "Vacancy is Required"] },
    detail: [{
        desc: { type: String },
        requirements: { type: String },
    }],
    experience: { type: String, default: 0 },
    application: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
}, { timeStamps: true });

const Jobs = mongoose.model("Jobs", jobSchema);

export default Jobs;
