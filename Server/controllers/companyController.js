import mongoose from "mongoose";
import Companies from "../models/companyModel.js";

export const register = async (req, res, next) => {

    const { name, email, password } = req.body;

    if (!firstName || !lastName || !email || !contact || !location || !profileUrl || !jobTitle || !about) {
        next("Please provide all required fields");
    }

    try {

        const account = await Companies.findOne({ email });

        if (account) {
            return res.status(400).send({
                message: 'Company already exists, Please Login',
                success: false,
            });
        }

        const company = await Companies.create({
            name,
            email,
            password
        });

        const token = company.createJWT();

        account.password = undefined;
        res.status(201).send({
            success: true,
            message: 'Account created successfully',
            user: {
                id: company._id,
                name: company.name,
                email: company.email,
            },
            token
        });

    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }

}

export const signIn = async (req, res, next) => {
    const { email, password } = req.body;

    try {

        if (!email || !password) {
            next("Please Provide User Credentials");
            return;
        }

        const company = await Companies.findOne({ email }).select("+password");

        if (!company) {
            next("Invalid Credentials");
            return;
        }

        const isMatch = await company.comparePassword(password);
        if (!isMatch) {
            next("Invalid Credentials");
            return;
        }

        company.password = undefined;

        const token = company.createJWT();

        res.status(200).send({
            success: true,
            message: 'User Logged in successfully',
            user: company,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
}

export const updateCompanyProfile = async (req, res, next) => {
    const { firstName, lastName, email, contact, location, profileUrl, jobTitle, about } = req.body;

    try {
        
        if (!firstName || !lastName || !email || !contact || !location || !profileUrl || !jobTitle || !about) {
            next("Please provide all required fields");
        }

        const id = req.body.user.userId;

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);

        const updatedCompany = { firstName, lastName, email, contact, location, profileUrl, jobTitle, about, _id: new ObjectId(id) };

        const company = await Companies.findByIdAndUpdate(id, updatedCompany, { new: true });

        const token = company.createJWT();

        company.password = undefined;

        res.status(201).json({
            suceess: true,
            message: 'Company Updated successfully',
            company,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
}

export const getCompanyProfile = async (req, res, next) => {
    try {

        const id = req.body.user.userId;
        const company = await Companies.findOne({ '_id': new ObjectId(id) });
        
        if (!company) {
            return res.status(200).send({
                message: 'Company not found',
                success: false,
            });
        }
        company.password = undefined;
        res.status(200).json({
            success: true,
            data: company
        });
        

    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "auth Error", success: false, error: error.message });
    }
}

export const getAllCompanies = async (req, res, next) => { 
    try {
        const {search, sort, location} = req.query;

        const queryObject = {};

        if(search) {
            queryObject.name = { $regex: search, $options: 'i' }; 
        }

        if(location) {
            queryObject.location = { $regex: location, $options: 'i' }; 
        }
        

        let queryResult = await Companies.find(queryObject).select("-password");

        if (sort === "Newest") {
            queryResult = queryResult.sort('-createdAt');
        }
        else if (sort === "Oldest") {
            queryResult = queryResult.sort('createdAt');
        }
        else if (sort === "A-Z") {
            queryResult = queryResult.sort('name');
        }
        else if (sort === "Z-A") {
            queryResult = queryResult.sort('-name');
        }

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 20;
        const skip = (page -1) * limit;

        const total = await Companies.countDocuments(queryResult);

        const numOfPages = Math.ceil(total / limit);

        queryResult = queryResult.limit(limit * page);

        const companies = await queryResult;

        res.status(200).send({
            success: true,
            total,
            page,
            numOfPages,
            data: companies
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "auth Error", success: false, error: error.message });
    }
 }

export const getCompnayJobListings = async (req, res, next) => {
     const { search, sort } = {};

     if(search) {
        queryObject.location = { $regex: search, $options: 'i' };
     }

        if (sort === "Newest") {
            queryResult = queryResult.sort('-createdAt');
        }
        else if (sort === "Oldest") {
            queryResult = queryResult.sort('createdAt');
        }
        else if (sort === "A-Z") {
            queryResult = queryResult.sort('name');
        }
        else if (sort === "Z-A") {
            queryResult = queryResult.sort('-name');
        }

        let queryResult = await Companies.findById({ _id: new ObjectId(id)}).populate({
            path: "jobPosts",
            options: { sort : sorting }   
        });

        const companies = await queryResult;

        res.status(200).json({
            success: true,
            data: companies
        });
}

export const getCompanyById = async (req, res, next) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No company with id: ${id}`);

        const company = await Companies.findById({ _id: new ObjectId(id)}).populate({
            path: 'jobPosts',
            options: {
                sort: "-_id"
            }
        });

        company.password = undefined;

        res.status(200).send({
            success: true,
            data: company
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "auth Error", success: false, error: error.message });
    }
}