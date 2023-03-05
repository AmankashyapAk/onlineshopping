var express = require('express');
const { check } = require('express-validator');
var router = express.Router()

const { signout, signup, signin, isSignedIn } = require("../controllers/auth");
// const signout = (req, res)=>{
//     res.json({
//         messsage: "user signout"
//     })
// };


router.post("/signup",[
    check("name", "name should be atleast 4 char").isLength({min: 5}),
    check("email", "email is requird").isEmail()
], signup);

router.post("/signin",[
    check("password", "password should be atleast 1 char").isLength({min: 1}),
    check("email", "email is requird").isEmail()
], signin);
router.get("/signout", signout);

router.get("/testroute", isSignedIn, (req,res) => {
    res.json(req.auth);
});
module.exports = router;