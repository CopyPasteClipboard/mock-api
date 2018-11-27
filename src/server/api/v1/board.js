let _ = require('underscore');

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
    let items = _.where(app.Items, { board_id : req.params.boardId });

    if (!items) {
      return res.status(404).send( { error : "clipboard not found" });
    }

    let item = _.max(items, item => Number(item.id) );

    res.status(200).send([item]);
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

	  console.log(req.body);
    if (!req.body.new_item)
      return res.status(422).send( { error : "could not create new board item"});

    let item = {
      board_id : req.params.boardid,
      text_content : req.body.new_item
    };

    app.Items.makeItem(item);

    res.status(200).send(item);
  });

};
