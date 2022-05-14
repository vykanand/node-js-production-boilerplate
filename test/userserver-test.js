let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../src/Userserver-4050');
const request = require('supertest');

var Chance = require('chance');
var chance = new Chance();

chai.use(chaiHttp);
const chaiSubset = require('chai-subset');

chai.use(chaiSubset);


let should = chai.should();

var expect = chai.expect

describe('test_register_user_with_invalid_firstname', () => {
      it('Sending Invalid firstname should respond with bad request error along with error', (done) => {

      	var test_data = {email: chance.email(), firstname: "4#35e@", lastname: "Wills", password: "Testing@1029"}

      	chai.request(server)
            .post('/api/auth/register')
            .send(test_data)
            .end((err, res) => {

             res.should.have.status(400)
             res.body.errors.should.be.an('array')

             res.body.should.containSubset({results:null, errors:[{type:'invalid',field:'firstname',message:'Invalid firstname entered'}], pagination:null});
                  
              done();
            });
      	
      });
});




describe('test_register_user_with_invalid_lastname', () => {
      it('Sending Invalid lastname should respond with bad request error along with error', (done) => {

      	var test_data = {email: chance.email(), firstname: "John", lastname: "2#35@", password: "Testing@1029"}
      	 chai.request(server)
            .post('/api/auth/register')
            .send(test_data)
            .end((err, res) => {
                  
             res.should.have.status(400)
             res.body.errors.should.be.an('array')

             res.body.should.containSubset({results:null, errors:[{type:'invalid',field:'lastname',message:'Invalid lastname entered'}], pagination:null});
                  
              done();
            });

      });
});

describe('test_register_user_with_invalid_email', () => {
      it('Sending Invalid email should respond with bad request error along with error', (done) => {

      	var test_data = {email: "test@", firstname: "John", lastname: "Wills", password: "Testing@1029"}
      	 
      	 chai.request(server)
            .post('/api/auth/register')
            .send(test_data)
            .end((err, res) => {
                  
             res.should.have.status(400)
             res.body.errors.should.be.an('array')

             res.body.should.containSubset({results:null, errors:[{type:'invalid',field:'email',message:'Invalid email entered'}], pagination:null});
                  
              done();
            });
      });
});

describe('test_register_user_with_duplicate_email', () => {
      it('Sending Duplicate email should respond with bad request error along with error', (done) => {

      	var test_data = {email: "test@example.com", firstname: "John", lastname: "Doe", password: "Testing@1029"}
      	 
      	 chai.request(server)
            .post('/api/auth/register')
            .send(test_data)
            .end((err, res) => {
                  
             res.should.have.status(400)
             res.body.errors.should.be.an('array')

             res.body.should.containSubset({results:null, errors:[{type:'duplicate',field:'email',message:'User already exists!'}], pagination:null});
                  
              done();
            });

      });
});


describe('test_register_user_with_invalid_password', () => {
      it('Sending Invalid Password should respond with bad request error along with error', (done) => {

      	var test_data = {email: chance.email(), firstname: "John", lastname: "Doe", password: "11"}
      	 
      	 chai.request(server)
            .post('/api/auth/register')
            .send(test_data)
            .end((err, res) => {
                  
            res.should.have.status(400)
             res.body.errors.should.be.an('array')

             res.body.should.containSubset({results:null, errors:[{type:'invalid',field:'password',message:'Password should contain atleast 8 letters one uppercase letter, one lowercase letter, special char & number'}], pagination:null});
                  
              done();
            });

      });
});


describe('test_register_user_with_invalid_both_email_password', () => {
      it('Sending Invalid Email & Password should respond with bad request error along with error', (done) => {

            var test_data = {email: "test@", firstname: "John", lastname: "Doe", password: "11"}
             
             chai.request(server)
            .post('/api/auth/register')
            .send(test_data)
            .end((err, res) => {
                  
              res.should.have.status(400)
             res.body.errors.should.be.an('array')

             res.body.should.containSubset({results:null, errors:[
                  {type:'invalid',field:'email',message:'Invalid email entered'},
                  {type:'invalid',field:'password',message:'Password should contain atleast 8 letters one uppercase letter, one lowercase letter, special char & number'}
                  ], pagination:null});

             // res.body.should.have.property('error').property('type', 'Invalid')
             // res.body.should.have.property('error').property('field', 'Email_password')
             // res.body.should.have.property('error').property('message', 'Please provide valid email and Password')
                  
              done();
            });

      });
});