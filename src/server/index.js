/* Copyright G. Hemingway, @2018 */
"use strict";

let path = require("path"),
  express = require("express"),
  bodyParser = require("body-parser"),
  logger = require("morgan"),
  session = require("express-session"),
  mongoose = require("mongoose"),
  envConfig = require("simple-env-config");

const env = process.env.NODE_ENV ? process.env.NODE_ENV : "dev";

/**********************************************************************************************************/

const setupServer = async () => {
  // Get the app config
  const conf = await envConfig("./config/config.json", env);
  const port = process.env.PORT ? process.env.PORT : conf.port;

  // Setup our Express pipeline
  let app = express();
  if (env !== "test") app.use(logger("dev"));

  app.use(logger("dev"));
  // Setup pipeline session support
  app.store = session({
    name: "session",
    secret: "clippy-webapp",
    resave: false,
    saveUninitialized: false,
    cookie: {
      path: "/"
    }
  });

  app.use(app.store);
  // Finish with the body parser
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // Import our routes
  require("./api")(app);

  app.users = require('./models/user').users;


  // Run the server itself
  let server;
  server = app.listen(port, () => {
    console.log(`MockApi ${env} listening on: ${server.address().port}`);
  });
};

/**********************************************************************************************************/

// Run the server
setupServer();
