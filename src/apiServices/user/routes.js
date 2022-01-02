const express = require("express");
const router  = express.Router();
const UserController = require("./controller");
const {userModel} = require("src/services/sequelize/index")
const userController = new UserController(userModel);
router.get("/", async (req,res)=>{
	const {username, password} = req.body;
	if( username == undefined ) return res.json( {error: "need a username"} )
	if( password == undefined ) return res.json( {error: "need a password"} )

	const userAuth = await userController.authUser({username, password});
	if(userAuth) {
		return res.send("ok")
	}

	return res.send("fail")
})

module.exports = router;
