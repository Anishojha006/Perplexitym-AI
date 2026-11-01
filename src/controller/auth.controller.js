import userModel from '../models/user.model.js';


export async function registerUser(req, res) {
    const { username, email, password } = req.body;
    const isuserAlreadyExist = await userModel.findOne({
        $or: [
            { name: username },
            { email: email }
        ]
    })

    if (isuserAlreadyExist) {
        return res.stautus(400).json({
            message: "user already exist",
            success: false,
            err: "User already exists"
        })
    }


    const user = await userModel.create({
        username, email, password
    })

}