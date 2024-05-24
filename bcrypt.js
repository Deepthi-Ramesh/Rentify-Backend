const bcrypt=require('bcryptjs');

function hashing(userpassword){
    // const saltround=10;
    // const salt = await bcrypt.genSalt(saltround);
    // const hash =  await bcrypt.hash(userpassword,salt);
    
    bcrypt.hash(userpassword, 10, function(err, hash) {
        if (err) { 
            throw (err);
         }
         else{
            console.log(hash);
         }
    
})
}
//  function retreivehashing(userpassword,storepassword){
//     bcrypt.compare(userpassword,storepassword,(err,result)=>{
//         if(err){
//             return err;
//         }
//         if(result){
//              console.log("Password matched")
//             return result;
//         }
//         else {
//             console.log(result);
//             console.log('Passwords do not match! Authentication failed.');
//             return result;
//         }
//     })
// }



function retreivehashing(userpassword,storepassword){
    bcrypt.compare(userpassword, storepassword, function(err, result) {
        if (err) { 
            throw (err); }

        console.log(result);
        return result;
    });
}
module.exports = {
    hashing,retreivehashing
}

