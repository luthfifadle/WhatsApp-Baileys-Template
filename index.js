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
const whatsapp = require("./helpers/whatsapp");

const sessionRoute = require("./routes/session");
const reservasiRoute = require("./routes/reservasi");
const mainRoute = require("./routes/main");
const paymentRoute = require("./routes/payment");
const messageRoute = require("./routes/message");
const indexRoute = require("./routes/index");

// app.use(cors("*"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/api/session", sessionRoute);
app.use("/api/reservasi", reservasiRoute);
app.use("/api/main", mainRoute);
app.use("/payment", paymentRoute)
app.use("/message", messageRoute)
app.use("/", indexRoute)

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "/views/index.html"));
// });

const listenerCallback = () => {
  whatsapp.init();
};

app.listen(PORT_NUMBER, listenerCallback);

nodeCleanup(whatsapp.cleanup);
