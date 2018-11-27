/* Copyright G. Hemingway @2018 - All rights reserved */
"use strict";

module.exports = app => {
  require("./v1/user")(app);
  require("./v1/board")(app);
  require("./v1/boarditem")(app);
  require("./v1/auth")(app);
};
