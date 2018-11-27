const jwt = require('jsonwebtoken'),
      _ = require('underscore');

module.exports = app => {
  app.post('/v1/auth/register',(req,res) => {
    let data = req.body;
    if (!data.username) {
      res.status(500).send({ error: "username must be sent in the body" });
    } else if (!data.password){
      res.status(500).send( { error : "password must be sent in the body"});
    } else if (!data.phone_number){
      res.status(500).send( { error : "phone number must be sent" });
    }

    // ensure uniqueness
    let user = _.findWhere( app.Users.getUsers(), {username : data.username });
    if (user){
      res.status(500).send( { error : "username in use" });
    } else {
      // bare minimum fields
      let newUser = { username : data.username,
        password : data.password,
        phone_number : data.phone_number};


      app.Users.save(newUser);

      let token = jwt.sign( { id : newUser.id }, app.conf.superdupersecrets, {
        expiresIn : 60 * 60 * 24
      });

      res.status(201).send( { auth : true , token : token });
    }
  });


  app.get('/v1/auth/verify',(req,res) => {
    let token = req.headers['x-access-token'];
    if (!token)
      return res.status(500).send( { auth: false, message : 'no token provided' });

    jwt.verify(token, app.conf.superdupersecrets, (err, decoded) => {
      if (err)
        return res.status(500).send( { auth: false, message : "Failed to authorize token" });

      let user = _.findWhere( app.Users, { id : decoded.id });

      res.status(200).send(user);
    });
  });
};