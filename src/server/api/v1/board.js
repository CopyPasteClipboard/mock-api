module.exports = app => {

  // Creates a new clipboard for the user
  app.post('/v1/clipboard/:boardId',(req,res) => {
    res.status(500).send('not implemented');
  });

  // Edits the clipboard (say, the clipboard name)
  app.put('/v1/clipboard/:boardId',(req,res) => {
    res.status(500).send('not implemented');
  });

  // Gets all items currently in the clipboard
  // ?type=mostRecent || type=all
  app.get('/v1/clipboard/:boardId',(req,res) => {
    res.status(500).send('not implemented');
  });

  // deletes the associated clipboard
  app.delete('/v1/clipboard/:boardId',(req,res) => {
    res.status(500).send('not implemented');
  });

  // Clears the clipboard
  app.delete('/v1/clipboard/:boardID/clear',(req,res) => {
    res.status(500).send('not implemented');
  });

  // Adds an item to the clipboard
  app.post('/v1/clipboard/:boardid/boarditem',(req,res) => {
    res.status(500).send('not implemented');
  });


};