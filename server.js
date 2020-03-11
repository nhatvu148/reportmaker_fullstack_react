const express = require("express");
const mysql = require("mysql");
const connectDB = require("./config/db");
const fs = require("fs");
const CreateReport = require("./CreateReport");
const path = require("path");
require("dotenv").config();

const app = express();

connectDB();

CreateReport();

app.use(express.json({ extended: false }));

// MongoDB
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));

// mySQL
const QUERY_PROJECTS =
  "SELECT pjid, pjname_en, pjname_jp FROM projectdata.t_projectmaster WHERE scode = 0";
const QUERY_SUBS =
  "SELECT subid, subname_en, subname_jp FROM projectdata.m_submaster";

// const db_config = {
//   host: "localhost",
//   user: "root",
//   password: "123456789",
//   database: "projectdata"
// };

const db_config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASS
};

let connection;

const handleDisconnect = () => {
  connection = mysql.createConnection(db_config);
  // Recreate the connection, since the old one cannot be reused.

  connection.connect(err => {
    if (err) {
      // The server is either down or restarting (takes a while sometimes).
      console.log("Error when connecting to db:", err);
      setTimeout(handleDisconnect, 2000);
      // We introduce a delay before attempting to reconnect, to avoid a hot loop,
      // and to allow our node script to process asynchronous requests in the meantime.
    }

    console.log("Connected as thread id: " + connection.threadId);
  });

  connection.on("error", function(err) {
    console.log("db error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      // Connection to the MySQL server is usually lost due to either server restart,
      // or a connnection idle timeout (the wait_timeout server variable configures this)
      handleDisconnect();
    } else {
      throw err;
    }
  });
};

handleDisconnect();

// console.log(connection);

// app.get("/", (req, res) => {
//   res.json({ msg: "Welcome to TechnoStar!" });
// });

app.get("/xlsx", (req, res) => {
  const file = fs.createReadStream("./public/20200225_20200228_Akiyama.xlsx");
  file.pipe(res);
});

app.post("/api/projects/add", (req, res) => {
  const {
    name,
    workdate,
    count,
    pjid,
    pjname,
    subid,
    subname,
    comment,
    worktime,
    starthour,
    startmin,
    endhour,
    endmin
  } = req.body.params;
  const INSERT_PRODUCTS_QUERY = `INSERT INTO projectdata.t_personalrecode
  (name, workdate, count, pjid, pjname, deadline, expecteddate, subid, subname, comment, worktime, starthour, startmin, endhour, endmin)
  VALUES('${name}','${workdate}','${count}','${pjid}','${pjname}',
  (SELECT deadline FROM projectdata.t_projectmaster WHERE pjid = '${pjid}'),
  (SELECT expecteddate FROM projectdata.t_projectmaster WHERE pjid = '${pjid}'),
  '${subid}','${subname}', '${comment}', '${worktime}', '${starthour}', '${startmin}', '${endhour}', '${endmin}')`;
  connection.query(INSERT_PRODUCTS_QUERY, (error, results, fields) => {
    if (error) {
      return res.send(error);
    } else {
      console.log(`${name} added data at ${Date()}`);
      return res.send("Successfully added weekly data");
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
    subname,
    comment,
    worktime,
    starthour,
    startmin,
    endhour,
    endmin
  } = req.body.params;
  console.log(req.body.params);
  const UPDATE_PRODUCTS_QUERY = `UPDATE projectdata.t_personalrecode
  SET pjid = '${pjid}', pjname = '${pjname}',
  deadline = (SELECT deadline FROM projectdata.t_projectmaster WHERE pjid = '${pjid}'),
  expecteddate = (SELECT expecteddate FROM projectdata.t_projectmaster WHERE pjid = '${pjid}'),
  subid = '${subid}', subname = '${subname}', comment = '${comment}', worktime = '${worktime}',
  starthour = '${starthour}', startmin = '${startmin}', endhour = '${endhour}', endmin = '${endmin}'
  WHERE name = '${name}' AND workdate = '${workdate}' AND count = '${count}'`;
  connection.query(UPDATE_PRODUCTS_QUERY, (error, results, fields) => {
    if (error) {
      return res.send(error);
    } else {
      console.log(`${name} updated data at ${Date()}`);
      return res.send("Successfully updated weekly data");
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
      console.log(`${name} deleted data at ${Date()}`);
      return res.send("Successfully deleted weekly data");
    }
  });
});

app.get("/api/personal", (req, res) => {
  const { name, workdate } = req.query;
  const QUERY_PERSONAL = `SELECT pjid, subid, comment, worktime, starthour, startmin, endhour, endmin
    FROM (SELECT PC.*, PJ.scode FROM projectdata.t_personalrecode AS PC
    JOIN projectdata.t_projectmaster AS PJ
    ON PC.pjid = PJ.pjid
    WHERE scode = 0) AS TB WHERE name = '${name}' && workdate = '${workdate}'`;
  connection.query(QUERY_PERSONAL, (error, results, fields) => {
    if (error) {
      return res.send(error);
    } else {
      console.log(`${name} logged in at ${Date()}`);
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

app.get("/api/daily", (req, res) => {
  const { name, sortBy } = req.query;
  const QUERY_DAILY = `SELECT workdate, pjid, pjname, deadline, expecteddate,
  subid, subname, comment, worktime, starthour, startmin, endhour, endmin
    FROM (projectdata.t_personalrecode) WHERE name = '${name}' ORDER BY workdate ${sortBy}`;
  connection.query(QUERY_DAILY, (error, results, fields) => {
    if (error) {
      return res.send(error);
    } else {
      console.log(`${name} queried daily history at ${Date()}`);
      return res.json({
        data: results
      });
    }
  });
});

app.get("/api/comments", (req, res) => {
  const { name } = req.query;
  const QUERY_COMMENTS = `SELECT pjid, comment, CC FROM (SELECT pjid, comment, COUNT(comment) AS CC
  FROM (SELECT PC.*, PJ.scode FROM projectdata.t_personalrecode AS PC
    JOIN projectdata.t_projectmaster AS PJ
    ON PC.pjid = PJ.pjid
    WHERE scode = 0) AS TB
    WHERE TB.name = '${name}' GROUP BY comment) AS B
    ORDER BY CC DESC`;
  connection.query(QUERY_COMMENTS, (error, results, fields) => {
    if (error) {
      return res.send(error);
    } else {
      // console.log(res);
      return res.json({
        data: results
      });
    }
  });
});

// Serve static assets in production
// if (process.env.NODE_ENV === "production") {
//   // Set static folder
//   app.use(express.static("client/build"));

//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
//   );
// }

app.use(express.static("client/build"));

app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
);

// For development:
// const PORT = process.env.PORT || 4000;

// For client build:
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
