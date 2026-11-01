import userModel from '../models/user.model.js';

export async function registerUser(req, res) {
  const { username, email, password } = req.body;
  const userAlreadyExist  = await userModel.findOne({
    $or:[
        {name:username},
        {email:email}
    ]
  })

  
}