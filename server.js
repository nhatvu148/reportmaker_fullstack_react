const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(cors());

const QUERY_PROJECTS =
  "SELECT pjid, pjname_en FROM t_projectmaster WHERE scode = 0";
const QUERY_SUBS = "SELECT subid, subname_en FROM m_submaster";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456789",
  database: "projectdata"
});

connection.connect(error => {
  if (error) {
    return error;
  }
});

// console.log(connection);

app.get("/", (req, res) => {
  res.send("Hello React");
});

app.get("/api/projects/add", (req, res) => {
  const { name, workdate, count, pjid, pjname, subid, subname } = req.query;
  const INSERT_PRODUCTS_QUERY = `INSERT INTO t_personalrecode (name, workdate, count, pjid, pjname, subid, subname) VALUES('${name}','${workdate}','${count}','${pjid}','${pjname}','${subid}','${subname}')`;
  connection.query(INSERT_PRODUCTS_QUERY, (error, results, fields) => {
    if (error) {
      return res.send(error);
    } else {
      console.log(results);
      return res.send("Successfully added employee");
    }
  });
});

app.get("/api/personal", (req, res) => {
  const { name, workdate } = req.query;
  const QUERY_PERSONAL = `SELECT pjid, subid, comment, worktime, starthour, startmin, endhour, endmin FROM t_personalrecode WHERE name = '${name}' && workdate = '${workdate}'`;
  connection.query(QUERY_PERSONAL, (error, results, fields) => {
    if (error) {
      return res.send(error);
    } else {
      console.log(res);
      return res.json({
        data: results
      });
    }
  });
});

app.get("/api/projects", (req, res) => {
  connection.query(QUERY_PROJECTS, (error, results, fields) => {
    if (error) {
      return res.send(error);
    } else {
      return res.json({
        data: results
      });
    }
  });
});

app.get("/api/subs", (req, res) => {
  connection.query(QUERY_SUBS, (error, results, fields) => {
    if (error) {
      return res.send(error);
    } else {
      return res.json({
        data: results
      });
    }
  });
});

app.listen(4000, () => {
  console.log("Listening on port 4000");
});
