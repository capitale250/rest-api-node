import chai from 'chai'

import chaiHttp from 'chai-http'
import request from 'supertest'
import app from '../../index.js'
import {projectsModel} from '../modules/models.js'


chai.use(chaiHttp)

describe('Projects', function(){
    
    it('it should GET all the Projects', (done) => {
        chai.request(app)
            .get('/api/projects/view')
            .end((err, res) => {
                if(err) done(err)
                chai.expect(res).have.status(200);
                chai.expect(res.body).length(res.body.length).greaterThan(0);
                done();
            })
    },40000);
    it("should return 403 if no Authorization", (done)=>{
        chai.request(app)
        .post("/api/projects/add")
        .send(
            {"title":"json"},
            {"skill_image":"skills.png"},
            {"description":"hello there"}
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
