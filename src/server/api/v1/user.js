module.exports = app => {
  // Gets the user’s profile information
  app.get('/v1/user/:userid', (req,res) => {
    res.status(500).send('not implemented');
  });

  // Gets the user’s clipboards
  app.get('/v1/user/:userid/clipboards',(req,res) => {
    res.status(500).send('not implemented');
  });

  // Creates a new user
  app.post('/v1/user/:userid',(req,res) => {
    res.status(500).send('not implemented');
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
