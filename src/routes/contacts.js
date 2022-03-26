import {contactsModel} from '../modules/models.js'
import {parserError} from '../config/errorhandles.js'

// list all contacts
export class Contacts {
    static getContacts(req, res) {
        contactsModel.find(function(err, contacts) {
            if (err)
                res.send(err)
            res.json(contacts);
            //console.log('Contacts returned')
        }).sort({"Email":-1,_id:0});
    }
    // create a new contact
    static createContact(req, res) {
               
                contactsModel.create({
                    Name : req.body.name,
                    Email : req.body.email,
                    Message : req.body.message,
                    ContactDate: new Date()
                    }, 
                    function(err, Contact) {
                        if (err){
                            res.json(parserError(err));
                        }else{
                            res.json(Contact)
                            //console.log('Contact created')
                        }   
                    }
                );
            }
   
    static deleteContact(req, res) {
     
                var id = req.body.id
                contactsModel.findByIdAndDelete(id, 
                    function(err, emailInfo) {
                        if (err){
                            res.json(err);
                        }else{
                            res.json(emailInfo)
                            //console.log('deleted')
                        }   
                    }
                );
            }
 
}
