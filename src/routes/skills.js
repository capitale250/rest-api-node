import {skillsModel} from '../modules/models.js'



export class Skills{
    // list skills
    static createSkills(req, res) {
     
        const file = req.file
        //console.log(req.file)
        if (!file) {
            const error = new Error('Please upload a file')
            error.httpStatusCode = 400
            return next(error)
        }
        skillsModel.findOne({Title : req.body.title},function(skill){
            if(skill){
                const error = new Error('skill arleady exit  a file')
                error.httpStatusCode = 400
                return next(error)
            }else{

    
        skillsModel.create({
        Title : req.body.title,
        SkillImage : '/images/skills/' + file.filename,
        //Description : 'A portfolio website where i can meet with my clients',
        SkillDate: new Date()
        }, 
        function(err, skill) {
            if (err){
                res.json(parserError(err));
            }else{
                res.json(skill)
                //console.log('skills created')
            }   
        }
    );
}
})
            }

    static getSkills(req, res) {
        var id = req.query.id
        if (id) {
            skillsModel.findById(id, (err, skillsData) =>{
                if(err){
                    res.send(err)
                }
                res.json(skillsData)
            })
        }else{
            skillsModel.find(function(err, skills) {
                if (err)
                    res.send(err)
                res.json(skills);
                console.log('projects returned')
            });
        }
    }
}
