"use strict";

const crypto = require("crypto");

/**
 * /
 * id                  SERIAL PRIMARY KEY,
 * board_name          VARCHAR(100),
 * created_on          DATE NOT NULL,
 * most_recent_item    INTEGER REFERENCES board_item(id),
 * user_id             INTEGER REFERENCES user(id) NOT NULL
 */

let boards = [];
let foreign_key = 0;

const makeBoard = ({board_name, user_id}) => {
  let board = {};
  board.id = foreign_key;
  foreign_key++;

  board.board_name = board_name;
  board.user_id = user_id;
  board.created_on = new Date();

  boards.push(board);
};

const filterForSend = board => {
  return {
      id : board.id,
      board_name : board.board_name
  }
};

boards.makeBoard = makeBoard;
boards.filterForSend = filterForSend;

boards.makeBoard( { board_name : "default", user_id : 0 });

module.exports = {
  Boards : boards
};

