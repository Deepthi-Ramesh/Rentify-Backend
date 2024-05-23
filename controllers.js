const {connection} =require('./model');
const bcrypt =require('bcrypt');
const {mail} = require('./nodemailer');


 const displayproperties=async(req,res)=>{
    try{
      var id = parseInt(req.params.userid);

      console.log("seller id ="+ id);
      var query=`SELECT * from sellerpropertytable where seller_id=${id};`;
   
      connection.query(query,function(err,rows){
         if(err)
           console.log(err);
          else{
            return res.status(200).json({data:rows});
          }
      })
    }
    catch(e){
      console.log(e);
    }
  }


  const loginuser=async(req,res)=>{
    try{
      var user = req.body.User;
      console.log(user.email);
      var query=`SELECT id,password,type from usertable where email='${user.email}';`;

      connection.query(query,function(err,rows,fields){
         if(err)
           console.log(err);
          else{
             if(rows.length>0){
              console.log(rows);
            bcrypt.compare(user.password.toString(),rows[0].password,(err,result)=>{
                if(err){
                  return err;
                }
              if(result){
                console.log("login successfull");
                return res.status(200).json({data:rows})
              }
              })
             }
            ;
   
          }
      })
  
    }
    catch(e){
      console.log(e);
    }
  }


 const registeruser = async(req, res) => {
    try{
      var user = req?.body?.User;
      console.log(user);
      var password=user.password;
    bcrypt.hash(password.toString(), 10, function(err, hash) {
        if (err) { 
            throw (err);
         }
         else{
     
          let query = `INSERT INTO usertable VALUES(default,'${user.firstname}','${user.email}','${user.phoneno}','${hash}','${user.type}');`;
     
          connection.query(query,function(err,rows) {
            if(err) {
              console.log(err);
              if(res.status(500)){
                return res.json({message:err.sqlMessage});
              }
              
            }
            
            console.log("inserted successfully");
            return res.status(200).json({data:[], message:"Todo created successfully"});
           }); 
         }
    
})
   
    } catch(e){
        console.log(e);
        return res.status(500).json({data:[], message:"Internal Server Error"});
    }
  }

  const addproperty = async(req, res) => {
    try{
      var property = req?.body?.Property;
      var noofbathrooms=2;
      var likes=0;
      let query = `INSERT INTO sellerpropertytable VALUES(default,'${property.id}','${property.description}','${property.area}','${property.location}','${property.address}','${property.noofbeadrooms}','${noofbathrooms}','${property.noofhospitals}','${property.noofcolleges}',${likes});`;

          connection.query(query,function(err,rows) {
            if(err) {
              console.log(err);  
            }
            else{
              console.log("inserted successfully");
              return res.status(200).json({data:[], message:"property inserted successfully"});
            }
           }); 
        
    } catch(e){
        console.log(e);
        return res.status(500).json({data:[], message:"Internal Server Error"});
    }
  }

  const updateproperty = async(req, res) => {
    try{
      var property = req?.body?.property;
     // console.log("desc:"+ property.description);
      var noofbathrooms=2;
      let query = `UPDATE sellerpropertytable SET  description='${property.description}' , area='${property.area}',location='${property.location}',address='${property.address}',noofbedrooms='${property.noofbeadrooms}',noofbathrooms='${noofbathrooms}',noofhospitals='${property.noofhospitals}',noofcollges='${property.noofcollges}'where property_id='${property.id}');`;

          connection.query(query,function(err,rows) {
            if(err) {
              console.log(err);  
            }
            else{
              console.log("inserted successfully");
              return res.status(200).json({data:[], message:"property updated successfully"});
            }
           }); 
        
    } catch(e){
        console.log(e);
        return res.status(500).json({data:[], message:"Internal Server Error"});
    }
  }
 const deleteproperty = async(req, res) => {
    try{
      var id = req?.body?.id;
      
      let query = `DELETE  FROM sellerpropertytable where property_id='${id}'`;
      connection.query(query,function(err,rows) {
        if(err) {
          console.log(err);
          return res.status(500).json({data:[], message:"Internal Server Error"});
        }
        
  
        return res.status(200).json({data:[], message:"property deleted successfully"});
       }); 
    } catch(e){
        console.log(e);

        return res.status(500).json({data:[], message:"Internal Server Error"});
    }
  }

  const displaypropertiesforbuyer=async(req,res)=>{
    try{

      var query=`SELECT * from sellerpropertytable;`;

      connection.query(query,function(err,rows){
         if(err)
           console.log(err);
          else{
            return res.status(200).json({data:rows});
          }
      })
    }
    catch(e){
      console.log(e);
    }
  }
  const getsellerdetails=async(req,res)=>{
    try{
     var property_id=req.params.id;
      var query=`SELECT  usertable.name, usertable.email ,usertable.phoneno FROM usertable JOIN sellerpropertytable ON usertable.id = sellerpropertytable.seller_id where sellerpropertytable.property_id=${property_id};`;
      
      connection.query(query,function(err,rows){
         if(err)
           console.log(err);
          else{
            return res.status(200).json({data:rows});
          }
      })
    }
    catch(e){
      console.log(e);
    }
  }

  const liketheproperty = async(req, res) => {
    try{
      var id = req?.body?.id;
      let query = `UPDATE sellerpropertytable SET likes=likes+1 where property_id=${id};`;

          connection.query(query,function(err,rows) {
            if(err) {
              console.log(err);  
            }
            else{
              console.log("property liked successfully");
              return res.status(200).json({data:[], message:"property liked successfully"});
            }
           }); 
        
    } catch(e){
        console.log(e);
        return res.status(500).json({data:[], message:"Internal Server Error"});
    }
  }

  const sendmail=async(req,res)=>{
    try{
      var id=req?.body?.id;
      var sellerdetails=req?.body?.sellerdetails;
      var query=`SELECT * from usertable where id=${id};`;
      var buyermail;
      var mailid;
      connection.query(query,function(err,rows){
         if(err)
           console.log(err);
          else{
            buyermail= rows[0].email;
            buyername=rows[0].name;
            buyerno=rows[0].phoneno;
            mail(sellerdetails.email,'Email Regarding Buyer  Details who is intersted on your property',buyername,buyermail,buyerno);
            mail(buyermail,'Email Regarding Sender Details',sellerdetails.name,sellerdetails.email,sellerdetails.phoneno);
            return res.status(200).json({data:rows});
          }
      })
    
  
    }
    catch(e){
      console.log(e);
    }
  }

  module.exports = {
  
    displayproperties,
    loginuser,
    registeruser,
    addproperty,
    updateproperty,
    deleteproperty,
    displaypropertiesforbuyer,
    getsellerdetails,
    liketheproperty,
    sendmail
  
  }