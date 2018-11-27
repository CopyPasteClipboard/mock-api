"use strict";

const crypto = require("crypto");

let primary_key = 0;
let users = [];

/***************** User Model *******************/
/**
 *      id              SERIAL PRIMARY KEY,
 *      username        VARCHAR (320) UNIQUE NOT NULL,
 *      password_hash   VARCHAR(53) NOT NULL,
 *      salt            VARCHAR(53) NOT NULL,
 *      phone_number    CHAR(10) UNIQUE NOT NULL,
 *      created_on      DATE NOT NULL,
 */

const makeSalt = () => Math.round(new Date().valueOf() * Math.random()) + "";

const encryptPassword = (salt, password) =>
  crypto
    .createHmac("sha512", salt)
    .update(password)
    .digest("hex");

let validateUser = (user, password) => {
  return encryptPassword(user.salt,password) === user.hash;
};

let save = user => {
  user.salt = makeSalt();
  user.hash = encryptPassword(user.salt,user.password);
  delete user['password'];

  user.id = primary_key;
  primary_key++;

  user.created_on = new Date();
  users.push(user);
};

const getUsers = () => {
  return users;
};

const getLastUser = () => {
  return users[users.length - 1];
};

users.save = save;
users.getUsers = getUsers;
users.validateUser = validateUser;
users.getLastUser = getLastUser;
users.primary_key = primary_key;


users.save( { username : "bananaland", password : "coffeeyummy", phone_number : "5037087892" });

module.exports = {
  Users : users
};
