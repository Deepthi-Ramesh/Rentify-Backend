const express = require("express");
const router = express.Router();

const todoController = require('./controllers');


router.post('/app',todoController.registeruser);
router.post('/login',todoController.loginuser);
router.post('/deleteproperty',todoController.deleteproperty);
 router.get('/fetchproperties/:userid',todoController.displayproperties);
 router.post('/addproperty',todoController.addproperty);
 router.post('/liketheproperty',todoController.liketheproperty);
 router.put("/updateproperty",todoController.updateproperty);
 router.get('/fetchpropertiesforbuyer',todoController.displaypropertiesforbuyer);
 router.get('/getsellerdetails/:id',todoController.getsellerdetails);

 router.post('/sendmaildeatils',todoController.sendmail);
module.exports=router;