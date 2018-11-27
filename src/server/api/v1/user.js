let _ = require('underscore'),
    Joi = require('joi');

module.exports = app => {
  app.get('/v1/users',(req,res) => {
    res.send(app.Users.getUsers());
  });

  app.get('/v1/user/:username',(req,res) => {
    if (/\d*/.test(req.params.username)) {
      let userid = req.params.username;
      let data = _.findWhere( app.Users.getUsers(), { id : Number(userid) });
      if (!data){
        res.status(404).send( { error : `${userid} not found`});
      } else {
        let payload = {
          username: data.username,
          phone_number: data.phone_number,
          created_on : data.created_on
        };
        res.status(200).send(payload);
      }
    } else {
      let user = _.findWhere( app.Users.getUsers(), { username : req.params.username });

      if (!user)
        return res.status(404).send( { error : "user not found" });

      res.status(200).send( { username : user.username, id : user.user_id });
    }
  });

  // Gets the user’s profile information
  app.get('/v1/user/:userid', (req,res) => {
    let userid = req.params.userid;

    console.log('here we are?');
    console.log(userid);
    let data = _.findWhere( app.Users.getUsers(), { id : Number(userid) });
    if (!data){
      res.status(404).send( { error : `${userid} not found`});
    } else {
        let payload = {
          username: data.username,
          phone_number: data.phone_number,
          created_on : data.created_on
        };
        res.status(200).send(payload);
    }
  });

  // Gets the user’s clipboards
  app.get('/v1/user/:userid/clipboards',(req,res) => {

    let boards = app.Boards.filter(board => board.user_id === Number(req.params.userid) );
    boards = boards.map(board => app.Boards.filterForSend(board));

    res.status(200).send(boards);
  });

  // Creates a new user
  app.post('/v1/user/',(req,res) => {
    res.redirect(307,'/v1/auth/register');
  });

  // Updates a :userid’ profile information
  app.put('/v1/user/:userid',(req,res) => {
    res.status(500).send('not implemented');
  });

  // Deletes a user from the database
  app.delete('/v1/user/:userid',(req,res) => {
    res.status(500).send('not implemented');
  });

};
