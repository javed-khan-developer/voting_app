const express = require('express')
const router = express.Router()
const User = require("./../models/user")
const { jwtAuthMiddleware, generateToken } = require('./../jwt');


//Post route to add a person
router.post('/signup', async (req, res) => {
    try {
        const data = req.body;  ///assuming the request body contains the user data 
        //create a new user document using the mongoose model
        const newUser = new User(data)
        //save the new user to the database 
        const response = await newUser.save();
        console.log('data saved');
        const payLoad = {
            id: response.id
        }
        console.log('payload', JSON.stringify(payLoad));

        const token = generateToken(payLoad);

        console.log('Token is : ', token);
        res.status(200).json({ response: response, token: token })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}
)

//Login route
router.post('/login', async (req, res) => {
    try {
        //Extract username & password from request body 
        const { adhaarCardNumber, password } = req.body;
        //Find the user by adhaarCardNumber
        const user = await User.findOne({ adhaarCardNumber: adhaarCardNumber });
        //If user doesnot exists or password does not match, return error
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid userName or password' })
        }
        //generate token
        const payLoad = {
            id: user.id
        }
        const token = generateToken(payLoad);
        //return token as response
        res.json({ token })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

//Profile route
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try {
        const userdata = req.user;
        const userid = userdata.id;
        const user = await User.findById(userid)
        res.status(200).json({ user });

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})


router.put('/profile/password', jwtAuthMiddleware, async (req, res) => {
    try {
        const userId = req.user; //Extract the id from the token
        const { currentPassword, newPassword } = req.body; //Extract current & new password from request body
        //Find the user by userId
        const user = await User.findById(userId);

        //If password does not match, return error
        if (!(await user.comparePassword(currentPassword))) {
            return res.status(401).json({ error: 'Invalid userName or password' })
        }

        //update the user password
        user.password=newPassword;
        await user.save();

        console.log('password updated')
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }

})

module.exports = router;