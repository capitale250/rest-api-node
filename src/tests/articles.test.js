import chai from 'chai'
// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const request = require('supertest');
// const app= require('../../index.js');
import chaiHttp from 'chai-http'
import request from 'supertest'
import app from '../../index.js'
import jest from 'jest'
import {newsletterModel, articlesModel} from '../modules/models.js'
// const {articlesModel} = require('../../index.js');




chai.use(chaiHttp)
const agent = request.agent(app);

const token = "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMjY3NjVjYzczZmRhY2NhMmJkYzUzZiIsImlhdCI6MTY0NzI1MjI1NCwiZXhwIjoxNjQ3MzM4NjU0fQ.f9gakJuJHprHFkQ8N8HjjNcr9P2ExU19ctwJTOUh2p4"
// beforeAll(() => jest.setTimeout(90 * 1000))
beforeAll( function(done){
 
    // chai.request(app)
     agent
    .post('/api/articles/add')
    .set("Authorization", token)
    .set('Content-Type', 'multipart/form-data')
    .field("title","1article to delete" )
    .attach("article_image", "download.jpg")
    .field("description", "this is the article to delete from the test")
    .end((err, res) => {
        //if(err) done(err)                    
        //chai.expect(res).have.status(200);
        //chai.expect(res.body).be.a('object');
    done();
    });

},50000)

describe('Articles', function(){
    
    it('should insert an article', function(done){
        // chai.request(app)
        agent
            .post('/api/articles/add')
            .set("Authorization", token)
            .set('Content-Type', 'multipart/form-data')
            .field("title","2Yeah from tests" )
            .attach("article_image", "download.jpg")
            .field("description", "this is from the test")
            .end((err, res) => {
                if(err) done(err)                    
                agent.expect(res).have.status(200);
                agent.expect(res.body).be.a('object');
                agent.expect(res.body).to.have.deep.property("_id")
            done();
            });
    },20000)
    
  
    it('should view an article', (done)=>{
        chai.request(app)
        .get('/api/articles/view')
        .query({"id":"6228905ace8eac57c10d6568"})
        // .then((res)=>{
        //     chai.expect(res).have.status(200)
        //     chai.expect(res.body).be.a('object')
        //     chai.expect(res.body).to.have.deep.property("_id")
        //     done()
        // })
        // .catch((err) =>{
        //     done(err)
        // })
        .end((err, res) => {
            if(err) done(err)                    
            chai.expect(res).have.status(200);
            chai.expect(res.body).be.a('object');
            chai.expect(res.body).to.have.deep.property("_id")
        done();
        });
    },20000)
    it('should view all articles', function(done){
        request(app)
        .get('/api/articles/view')
        .end((err, res) => {
            if(err) done(err)
            chai.expect(res).have.status(200)
            chai.expect(res.body).length(res.body.length).greaterThan(0)
            chai.expect(res.body).to.be.an('array')
            done()
        })
    },20000)
    it('should update an article', (done)=>{
        var tdate = new Date()
        request(app)
        .post('/api/articles/update')
        .set("Authorization", token)
        .send({"title":"Coolest from postman (updated from test)"})
        .send({"id":"6228905ace8eac57c10d6568"})
        .then((res)=>{
            chai.expect(res).have.status(200)
            chai.expect(res.body).to.be.an('object')
            chai.expect(res.body).to.have.deep.property('Title').does.not.eql("Coolest from postman (updated from test")
            done()
        })
        .catch((err)=>{
            done(err)
        })
    })
    it('should delete article', function(done){
        
        articlesModel.findOne({Title: "1article to delete"}).then(function(result){
            chai.request(app)
            .post('/api/articles/delete')
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
})
})
afterAll(function(){
    articlesModel.findOne({Title: "2Yeah from tests"}).then(function(result){
        chai.request(app)
        .post('/api/articles/delete')
        .set('Content-Type', 'application/json')
        .set("Authorization", token)
        .send({"id":result._id})
        .then((res) => {
            chai.expect(res).have.status(200);
            chai.expect(res.body).be.a('object');
            chai.expect(res.body).to.have.deep.property("_id")
        })   
        .catch((err) =>{
            console.log(err)
        })                 
    })
    request(app)
        .post('/api/articles/update')
        .set("Authorization", token)
        .send({"title":"Coolest from postman"})
        .send({"id":"5f6386f45bcb341881d85681"})
        .then((res)=>{
            chai.expect(res).have.status(200)
            chai.expect(res.body).to.be.an('object')
            chai.expect(res.body).to.have.deep.property('Title').eql("Coolest from postman (updated from test)")
            //done()
        })
        .catch((err)=>{
            //done(err)   //  --verbose --silent   "test": "jest --watchAll --coverage --runInBand  --require babel-register ./src/tests",
        })
})

