const express = require("express");
const cors = require("cors");
const nodeCleanup = require("node-cleanup");
// const Sequelize = require("sequelize");
const path = require("path");

const app = express();
app.use(
  cors({
    origin: true,
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
app.options(
  '*',
  cors({
    origin: true,
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

require("dotenv").config();

const { PORT_NUMBER } = process.env;
const whatsapp = require("./config/whatsapp");

const indexRoute = require("./routes/index");
const sessionRoute = require("./routes/session");

// app.use(cors("*"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", indexRoute)
app.use("/api/session", sessionRoute);

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "/views/index.html"));
// });

const listenerCallback = () => {
  whatsapp.init();
};

app.listen(PORT_NUMBER, listenerCallback);

nodeCleanup(whatsapp.cleanup);
