const { Connection, Request, TYPES } = require("tedious");
const config = require("./config.json");
const bcrypt = require("bcrypt");
const user = require("../model/user");

var connection = new Connection(config);

function startDB() {
  return new Promise((resolve, reject) => {
    connection.on("connect", (err) => {
      if (err) {
        console.log("connection failed");
        reject(err);
        request.addParameter("name", TYPES.VarChar, name);
        throw err;
      } else {
        console.log("Connected");
        resolve();
      }
    });
    connection.connect();
  });
}

module.exports.sqlConnection = connection;

module.exports.startDB = startDB;

function update(payload) {
  return new Promise((resolve, reject) => {
    const updateStatements = Object.keys(payload).map((key, index) => {
      if (index + 1 === Object.keys(payload).length) {
        return `SET ${key} = ${payload[key]}`;
      }
      return `SET ${key} = ${payload[key]},`;
    });
    console.log(updateStatements);
    const sql = `UPDATE [user] name, birthday, email, gender, country, hashed_password) VALUES (@name, @birthday, @email, @gender, @country, @hashed_password)`;
    const request = new Request(sql, (err) => {
      if (err) {
        reject(err);
        console.log(err);
      }
    });

    request.addParameter("name", TYPES.VarChar, payload.name);
    request.addParameter("birthday", TYPES.Date, payload.birthday);
    request.addParameter("email", TYPES.VarChar, payload.email);
    request.addParameter("gender", TYPES.VarChar, payload.gender);
    request.addParameter("country", TYPES.VarChar, payload.country);
    request.addParameter(
      "hashed_password",
      TYPES.VarChar,
      payload.hashed_password
    );
  });
}

module.exports.update = update;

//funktion til at poste user i database
function insert(payload) {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO [user] (name, birthday, email, gender, hashed_password) VALUES (@name, @birthday, @email, @gender, @hashed_password)`;
    const request = new Request(sql, (err) => {
      if (err) {
        reject(err);
        console.log(err);
      }
    });

    request.addParameter("name", TYPES.VarChar, payload.name);
    request.addParameter("birthday", TYPES.Date, payload.birthday);
    request.addParameter("email", TYPES.VarChar, payload.email);
    request.addParameter("gender", TYPES.VarChar, payload.gender);
    // request.addParameter("country", TYPES.VarChar, payload.country);
    request.addParameter(
      "hashed_password",
      TYPES.VarChar,
      payload.hashed_password
    );

    const newUser = new user({
      name: payload.name,
      birthday: payload.birthday,
      email: payload.email,
      gender: payload.gender,
      country: payload.country,
      hashed_password: payload.hashed_password,
    });
    //console.log(newUser.name)

    request.on("requestCompleted", (row) => {
      console.log("User inserted", row);
      resolve("user inserted", row);
    });
    connection.execSql(request);
  });
}

module.exports.insert = insert;

function select() {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM [user]";
    const request = new Request(sql, (err, rowcount) => {
      if (err) {
        reject(err);
        console.log(err);
      } else if (rowcount == 0) {
        reject({ message: "User does not exist" });
      }
    });

    request.on("done", (rowcount, more, rows) => {
      console.log(row);
    });

    const selectedUser = {};
    request.on("row", (columns) => {
      columns.map(({ value, metadata }) => {
        selectedUser[metadata.colName] = value;
      });
      resolve(selectedUser);
    });
    connection.execSql(request);
  });
}
module.exports.select = select;

//function til at logge ind p?? sin profil
function login(email, hashed_password) {
  return new Promise((resolve, reject) => {
    //const sql = 'SELECT email FROM Register WHERE email = @email'
    const sql =
      "SELECT id FROM [user] WHERE email = @email AND hashed_password = @hashed_password";
    const request = new Request(sql, (err, rowcount) => {
      if (err) {
        reject(err);
        console.log(err);
      } else if (rowcount == 0) {
        reject({ message: "User does not exist" });
      }
    });
    request.addParameter("email", TYPES.VarChar, email);
    request.addParameter("hashed_password", TYPES.VarChar, hashed_password);

    request.on("row", (columns) => {
      resolve(columns);
      console.log("login succes");
    });
    connection.execSql(request);
  });
}
module.exports.login = login;
