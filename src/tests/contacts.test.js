import chai from 'chai'

import chaiHttp from 'chai-http'
import request from 'supertest'
import app from '../../index.js'
import jest from 'jest'
import {newsletterModel, contactsModel} from '../modules/models.js'
const token = "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMjY3NjVjYzczZmRhY2NhMmJkYzUzZiIsImlhdCI6MTY0Nzg2MzU4NCwiZXhwIjoxNjQ3OTQ5OTg0fQ.Ebxl4yBRMZoAIpBP0kNUzxRaQwNaY1e96CP7S6zZWsI"
const agent = request.agent(app);
chai.use(chaiHttp)

var contact = {
    "name":"js2",
    "email":"js@gmail.com",
    "message":"mn vip"
}
beforeAll(function(done){
    
    agent
    .post('/api/contacts/add')
    .set("Authorization", token)
    .send(contact)
    .end((err, res) => {
        if(err) done(err)                    
        // chai.expect(res).have.status(200);
        // chai.expect(res.body).be.a('object');
    done();
    });
},100000)
describe('Contact', function(){
   
    it('it should GET all the Contacts', (done) => {
        chai.request(app)
            .get('/api/contacts/view')
            .end((err, res) => {
                if(err) done(err)
                chai.expect(res).have.status(200);
                chai.expect(res.body).length(res.body.length).greaterThan(0);
                done();
            })
    },100000);
    it('should delete a Contact', (done) =>{
        contactsModel.findOne({Name: "js2"}).then(function(result){
            chai.request(app)
            .post('/api/contacts/delete')
            .set('Content-Type', 'application/json')
            .set("Authorization", token)
            .send({"id":result._id})
            .then((res) => {
                chai.expect(res).have.status(200);
                chai.expect(res.body).be.a('object');
                chai.expect(res.body).to.have.deep.property("_id")
                done();
            })   
            .catch((err) =>{
                console.log(err)
                done(err)
            })                 
        })
    },150000)
    // it('should view a Contact', (done) =>{
  
    it('should insert a contact', (done) =>{
        var icontacts = {
            "name":"armstrong",
            "email":"ax@gmail.com",
            "message":"hi there"
        }
       
        chai.request(app)
        .post('/api/contacts/add')
        .set("Authorization", token)
        .send(icontacts)
        .end((err, res) => {
            if(err) done(err)                    
            chai.expect(res).have.status(200);
            chai.expect(res.body).be.a('object');
            done();
        });
    },100000)
    it("should return 403", (done)=>{
        chai.request(app)
        .post("/api/contacts/add")
        .send(
            {"name":"json"},
            {"email":"json@man.rw"},
            {"message":"hello there"}
        )
        .then((res) =>{
            chai.expect(res).to.have.status(403)
            done()
        })
        .catch((err) =>{
            done(err)
        })
            
    })
})


afterAll(function(done){
    
    contactsModel.findOne({Name: "armstrong"}).then(function(result){
        chai.request(app)
        .post('/api/contacts/delete')
        .set('Content-Type', 'application/json')
        .set("Authorization", token)
        .send({"id":result._id})
        .then((res) => {
            chai.expect(res).have.status(200);
            // agent.close(done)
            done();
        })   
        .catch((err) =>{
            done(err)
        })                 
    })
},100000)

