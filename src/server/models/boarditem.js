/**
 * /
 * id                  SERIAL PRIMARY KEY,
 * board_name          VARCHAR(100),
 * created_on          DATE NOT NULL,
 * most_recent_item    INTEGER REFERENCES board_item(id),
 * user_id             INTEGER REFERENCES user(id) NOT NULL
 */

let boarditems = [];
let foreign_key = 0;

const makeItem = ({board_id, text_content}) => {
  let item= {};
  item.id = foreign_key;
  foreign_key++;

  item.board_id = board_id;
  item.text_content = text_content;

  console.log(item);

  boarditems.push(item);
};

boarditems.makeItem = makeItem;

module.exports = {
  BoardItems : boarditems
};
