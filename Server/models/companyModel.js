import mongoose, { Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const companySchema = new Schema({
    companyName: {
        type: String,
        required: [true, "Please enter company name"],
    },
    email: {
        type: String,
        required: [true, "Please enter company email"],
        unique: true,
        validate: [validator.isEmail, "Please enter valid email address"]
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [6, "Your password must be longer than 6 characters"],
        select: true
    },
    contact: { type: String },
    location: { type: String },
    profileUrl: { type: String },
    jobPosts: { type: String },
    about : { type: Schema.Types.ObjectId, ref: 'Jobs' },
},
{ timestamps: true }
);

companySchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return 
    }
    const salt = bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

//Compare Password
companySchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

//JWT Token
companySchema.methods.createJWT = async function () {
    return  jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

const Companies = mongoose.model("Companies", companySchema);

export default Companies;