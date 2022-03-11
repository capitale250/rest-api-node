import {contactsModel} from '../modules/models.js'

// list all contacts
export class Contacts {
    static getContacts(req, res) {
        contactsModel.find(function(err, contacts) {
            if (err)
                res.send(err)
            res.json(contacts);
            //console.log('Contacts returned')
        });
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
                            res.json(err.errors);
                        }else{
                            res.json(Contact)
                            //console.log('Contact created')
                        }   
                    }
                );
            }
   
    static deleteContact(req, res) {
     
                var id = req.body.id
                contactsModel.findOneAndDelete(id, 
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
