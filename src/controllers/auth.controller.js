var authValidation =  require('../validations/auth.validation');
var User = require('../models/User.model.js');
const catchAsync = require('../utils/catchAsync');
const redis = require('redis');
const client = redis.createClient();


exports.registerUser = catchAsync(async (req, res, next)=> {
    
    var firstName = req.body.firstname;
    var lastName = req.body.lastname;
    var userEmail = req.body.email;
    var userPassword = req.body.password;

    var response = null;
    var error = [];
    var status_code = 400

    if(!authValidation.validName(firstName)){
        error.push( {type:'invalid',field:'firstname',message:'Invalid firstname entered'} )
    }
    if(!authValidation.validName(lastName)){
        error.push( {type:'invalid',field:'lastname',message:'Invalid lastname entered'} )
    }
    if(!authValidation.validEmail(userEmail)){
        error.push( {type:'invalid',field:'email',message:'Invalid email entered'} )
    }
    if(!authValidation.validPassword(userPassword)){
        error.push( {type:'invalid',field:'password',message:'Password should contain atleast 8 letters one uppercase letter, one lowercase letter, special char & number'} )
    }

    if (error.length > 0) {
       
        response = {results:null, errors:error, pagination:null};
        res.status(400);
        res.send(response);

    }else{


    var create_User = new User({ firstname: firstName, lastname:lastName ,email:userEmail,password:userPassword});

    // // Save the new model instance, passing a callback
    await create_User.save(function (err, user) {
    if (err && err.keyPattern.email == 1){
    error.push( {type:'duplicate',field:'email',message:'User already exists!'} )
    response = {results:null, errors:error, pagination:null};
    res.status(400);
    res.send(response);
    }else{

    response = {results:user, errors:null, pagination:null};
    res.status(200) 
    res.send(response)
    }

    });

    }

    
    
});

exports.getUser = catchAsync(async (req, res, next)=> {

   const usr = await User.find({_id:req.query.id});
   res.send(usr)
      
});

exports.getUserbyParam = catchAsync(async (req, res, next)=> {
    const usr = await User.find({_id:req.params.id})
    res.send(usr)
});

exports.PatchUser = catchAsync(async (req, res, next)=> {

});