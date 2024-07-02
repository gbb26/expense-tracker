const { generateToken } = require("../helpers/jwt-token");
const { hashPassword, comparePasswords } = require("../helpers/passHash");
const User = require("../models/user")

const signUpUser = async (req, res) => {
    try {
        const userDataToSave = {
            name: req?.body?.name,
            email: req?.body?.email,
            password: await hashPassword(req?.body?.password),
        }
        const existingUser = await User.findOne({ email: userDataToSave?.email }, { _id: 1 });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists :( try logging in" });
        }
        const newUser = new User(userDataToSave);
        newUser.save();
        return res.status(201).json({ message: "User Created :)", data: { name: userDataToSave.name, email: userDataToSave.email } })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email: email }, { _id: 1, password: 1 });
        if (!existingUser) {
            return res.status(400).json({ message: "User does not exists!!!" });
        }
        const isPassMatch = comparePasswords(password, existingUser?.password)
        if (!isPassMatch) {
            return res.status(400).json({ message: "wrong password! try again" });
        }

        const access_token = await generateToken(existingUser._id, email);
        // return res.cookie('token', access_token, { httpOnly: true }).send();
        return res.json({ token: access_token })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error!" });
    }
}

const logOutUser = async (req, res) => {
    try {
        res.cookie('token', "").send();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error!" });
    }
}
module.exports = { signUpUser, loginUser, logOutUser }