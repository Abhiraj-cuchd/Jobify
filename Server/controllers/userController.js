import mongoose from "mongoose";
import Users from "../models/userModel.js";
import { ObjectId } from "mongodb";

export const updateUser = async (req, res, next) => {
    const { firstName, lastName, email, contact, location, profileUrl, jobTitle, about } = req.body;

    try {

        if (!firstName || !lastName || !email || !contact || !location || !profileUrl || !jobTitle || !about) {
            next("Please provide all required fields");
        }

        const id = req.body.user.userId;

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);

        const updatedUser = { firstName, lastName, email, contact, location, profileUrl, jobTitle, about, _id: new ObjectId(id) };

        const user = await Users.findByIdAndUpdate(id, updatedUser, { new: true });

        const token = user.createJWT();

        user.password = undefined;

        res.status(201).json({
            suceess: true,
            message: 'User Updated successfully',
            user,
            token
        });


    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
};

export const getUser = async (req, res, next) => {
    try {

        const id = req.body.user.userId;
        const user = await Users.findOne({ '_id': new ObjectId(id) });
        
        if (!user) {
            return res.status(200).send({
                message: 'User not found',
                success: false,
            });
        }
        user.password = undefined;
        res.status(200).send({
            success: true,
            user: user
        });
        

    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "auth Error", success: false, error: error.message });
    }
}