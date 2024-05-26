const express = require("express");
const router = express.Router();

const Controller = require('./controllers');


router.post('/app',Controller.registeruser);
router.post('/login',Controller.loginuser);
router.post('/deleteproperty',Controller.deleteproperty);
 router.get('/fetchproperties/:userid',Controller.displayproperties);
 router.post('/addproperty',Controller.addproperty);
 router.post('/liketheproperty',Controller.liketheproperty);
 router.put("/updateproperty",Controller.updateproperty);
 router.get('/fetchpropertiesforbuyer',Controller.displaypropertiesforbuyer);
 router.get('/getsellerdetails/:id',Controller.getsellerdetails);
 router.post('/sendmaildeatils',Controller.sendmail);
 

module.exports=router;

