/* Copyright G. Hemingway @2018 - All rights reserved */
"use strict";

const crypto = require("crypto");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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

  users.append(user);
};

let users = [];

users.save = save;
users.validateUser = validateUser;

module.exports = {
  Users : users
};
