module.exports = app => {

  // Gets the item associated with itemID
  app.get('/v1/boarditem/:itemID',(req,res) => {
   res.status(500).send('not implemented')
  });


  // Removes the board item associated with itemID
  app.delete('/v1/boarditem/:itemID',(req,res) => {
    res.status(500).send('not implemented')
  });

};