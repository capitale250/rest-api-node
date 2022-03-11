import jwt from 'jsonwebtoken'
import config from './src/routes/config.js'
function verifyToken(req, res, next) {


  // var token = req.headers['x-access-token'];
  // if (!token) 
  //   return res.status(403).send({ auth: false, message: 'No token provided.' });
  // verifies secret and checks exp

  // const bearerHeader = req.headers['authorization'];
  // if (typeof bearerHeader !== 'undefined') {
  //     const bearer = bearerHeader.split(' ')
  //     const bearerToken = bearer[1]
  //     req.token = bearerToken;}
  // jwt.verify(token, config.secret, function(err, decoded) {      
  //   if (err) 
  //     return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });    

  //   if everything is good, save to request for use in other routes
  //   req.userId = decoded.id;
  //   next();
  // })
  // const bearerHeader = req.headers['x-access-token'];
  // console.log(bearerHeader )
  //   if (typeof bearerHeader !== 'undefined') {
  //       const bearer = bearerHeader.split(' ')
  //       const bearerToken = bearer[1]
  //       req.token = bearerToken;
  //       next()
  //   }else{
  //       res.sendStatus(403)
  //   }



    // check header or url parameters or post parameters for token
    var token = req.headers['x-access-token'];
    console.log(token )
    if (!token) 
      return res.status(403).send({ auth: false, message: 'No token provided.' });
  
    // verifies secret and checks exp
    jwt.verify(token, config.secret, function(err, decoded) {      
      if (err) 
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });    
  
      // if everything is good, save to request for use in other routes
      req.userId = decoded.id;
      next();
    });
  
  

}

export {verifyToken as default}