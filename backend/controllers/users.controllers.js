const express = require('express')
const jwt = require("jsonwebtoken")
const User = require ('../models/users.model')

exports.signup = (req , res)=>{
    let {name, email, username, password, proficiencyLevel} = req.body;

    let user = new User({
        name,
        email,
        username,
        password,
        proficiencyLevel,
    })

    user.save().then((user)=>{
        res.status(200).json({"Message":"User Created" , user:user})
    }).catch(err=>{
        res.status(500).json({"Message":"User already exists!" , err:err})
    })
}

exports.login = (req, res)=>{

    let{email, password} = req.body;
    User.findOne({email:email}).then((foundUser)=>{
        if(!foundUser){
            res.status(404).send({"Message":"User not found. Try signing up!"})
        }else{
            if(foundUser.password == password){
                let token = jwt.sign({
                    id:foundUser._id,
                    name:foundUser.name
                },
                "rehnumaAI",{
                    expiresIn: '48h'
                })
                res.status(200).send({"Message":"Successfully LOGGED IN", user:foundUser, token:token})
            }else{
                res.status(500).send({"Message":"Invalid Password"})
            }
        }
    })
}
exports.getUser = async (req, res) => {
    let decodedID;
    let token = req.headers['token'];
    
    jwt.verify(token, "rehnumaAI", async (err, decoded) => {
      if (err) {
        return res.status(500).send({ message: "Not Authorized" });
      }
      req.decoded = decoded;
      decodedID = decoded.id;
      try {
        const user = await User.findById(decodedID);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
      } catch (error) {
        console.error('Error decoding token:', error);
        res.status(401).json({ message: 'Unauthorized' });
      }
    });
  };

  exports.deleteUser = async (req, res) => {
    const userId = req.params.id;

    try {
      const user = await User.findByIdAndDelete(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      return res.status(500).json({ message: 'An error occurred while deleting the user' });
    }
  }