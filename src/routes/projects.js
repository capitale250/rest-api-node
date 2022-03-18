import {projectsModel} from '../modules/models.js'
import {parserError} from '../config/errorhandles.js'


export class Projects{
    // create project
    static createProject(req, res) {
     
                const file = req.file
                //console.log(req.file)
                if (!file) {
                    const error = new Error('Please upload a file')
                    error.httpStatusCode = 400
                    return next(error)
                }
                res.setHeader('Content-Type', 'application/json')
                projectsModel.create({
                Title : req.body.title,
                ProjectImage : req.file.path ,
                Description : req.body.description,
                projectsDate: new Date()
                }, 
                function(err, project) {
                    if (err){
                        res.json(parserError(err));
                    }else{
                        res.json(project)
                        //console.log('project created')
                    }   
                }
            );
            }

    // list all projects
    static getProject(req, res) {
        var id = req.query.id
        //console.log('id:' + id);
        if (id) {
            projectsModel.findById(id, (err, projectData) =>{
                if(err){
                    res.send(err)
                }
                res.json(projectData)
            })
        }else{
            projectsModel.find(function(err, projects) {
                if (err)
                    res.send(err)
                res.json(projects);
                //console.log('projects returned')
            });
        }
            

    }
}
