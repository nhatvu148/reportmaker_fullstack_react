const express = require("express");
const mysql = require("mysql");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(express.json({ extended: false }));

// MongoDB
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));

// mySQL
const QUERY_PROJECTS =
  "SELECT pjid, pjname_en FROM projectdata.t_projectmaster WHERE scode = 0";
const QUERY_SUBS = "SELECT subid, subname_en FROM projectdata.m_submaster";

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
  res.json({ msg: "Welcome" });
});

app.post("/api/projects/add", (req, res) => {
  const {
    name,
    workdate,
    count,
    pjid,
    pjname,
    subid,
    subname
  } = req.body.params;
  const INSERT_PRODUCTS_QUERY = `INSERT INTO projectdata.t_personalrecode (name, workdate, count, pjid, pjname, subid, subname) VALUES('${name}','${workdate}','${count}','${pjid}','${pjname}','${subid}','${subname}')`;
  connection.query(INSERT_PRODUCTS_QUERY, (error, results, fields) => {
    if (error) {
      return res.send(error);
    } else {
      console.log(results);
      return res.send("Successfully added employee");
    }
  });
});

app.put("/api/projects/update", (req, res) => {
  const {
    name,
    workdate,
    count,
    pjid,
    pjname,
    subid,
    subname
  } = req.body.params;
  console.log(req.body.params);
  const UPDATE_PRODUCTS_QUERY = `UPDATE projectdata.t_personalrecode SET pjid = '${pjid}', pjname = '${pjname}', subid = '${subid}', subname = '${subname}' WHERE name = '${name}' AND workdate = '${workdate}' AND count = '${count}'`;
  connection.query(UPDATE_PRODUCTS_QUERY, (error, results, fields) => {
    if (error) {
      return res.send(error);
    } else {
      console.log(results);
      return res.send("Successfully updated employee");
    }
  });
});

app.delete("/api/projects/delete", (req, res) => {
  const { name, workdate, count } = req.query;
  const DELETE_PRODUCTS_QUERY = `DELETE FROM projectdata.t_personalrecode WHERE name = '${name}' AND workdate = '${workdate}' AND count = '${count}'`;
  connection.query(DELETE_PRODUCTS_QUERY, (error, results, fields) => {
    if (error) {
      return res.send(error);
    } else {
      console.log(results);
      return res.send("Successfully deleted employee");
    }
  });
});

app.get("/api/personal", (req, res) => {
  const { name, workdate } = req.query;
  const QUERY_PERSONAL = `SELECT pjid, subid, comment, worktime, starthour, startmin, endhour, endmin FROM projectdata.t_personalrecode WHERE name = '${name}' && workdate = '${workdate}'`;
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

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
