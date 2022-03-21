import app from '../../index.js'
import request from 'supertest'
import {newsletterModel} from '../modules/models.js'
import chai from 'chai'
import chaiHttp from 'chai-http'
import { isTaggedTemplateExpression } from '@babel/types';
const agent = request.agent(app)
chai.use(chaiHttp)
const token="bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMjY3NjVjYzczZmRhY2NhMmJkYzUzZiIsImlhdCI6MTY0Nzg2MzU4NCwiZXhwIjoxNjQ3OTQ5OTg0fQ.Ebxl4yBRMZoAIpBP0kNUzxRaQwNaY1e96CP7S6zZWsI"

beforeAll((done)=>{
    chai.request(app)
    .post('/api/newsletter/add')
    .set("Authorization", token)
    .send({"email":"jackswalter@test.rw"})
    .end((err, res) => {
        if(err){
            console(err),
            done(err)
        }                     
        // chai.expect(res).have.status(200);
        // chai.expect(res.body).be.a('object');
    done();
    });
},50000)
describe('newslater',(done)=>{
    it('it should GET all the Newsletter', (done) => {
        chai.request(app)
            .get('/api/newsletter/view')
            .end((err, res) => {
                if(err) done(err)
                chai.expect(res).have.status(200);
                chai.expect(res.body).length(res.body.length).greaterThan(0);
                done();
            })
        },50000)
    
    it('should delete a newsletter', (done) =>{
         newsletterModel.findOne({Email: "jackswalter@test.rw"}).then(function(result){
            chai.request(app)
            .post('/api/newsletter/delete')
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
    },100000)

    it('should insert a newsletters', (done) =>{
      
        chai.request(app)
        .post('/api/newsletter/add')
        .set("Authorization", token)
        .send({"email":"strongs@test.com"})
        .end((err, res) => {
            if(err) done(err)                    
            chai.expect(res).have.status(200);
            chai.expect(res.body).be.a('object');
            chai.expect(res.body).to.have.deep.property("_id")
            done();
        });
    },50000)

})
afterAll(function(done){
    
    newsletterModel.findOne({Email: "strongs@test.com"}).then(function(result){
        chai.request(app)
        .post('/api/newsletter/delete')
        .set('Content-Type', 'application/json')
        .set("Authorization", token)
        .send({"id":result._id})
        .then((res) => {
            chai.expect(res.body).to.have.deep.property("_id")
            done();
        })   
        .catch((err) =>{
            done(err)
        })                 
    })
},100000)