const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const ConnectDb = require("./dbConnect");
const http = require('http');
const app = express();
const server = http.createServer(app);
const { Server } = require('socket.io')
require("dotenv").config({ path: `${__dirname}/.env` });
const io = new Server(process.env.SOCKET_PORT, {

});
const Token = require("./helper/token")
var encryptDecrypt = require("./helper/encryptDecrypt");
const port = 9003;
app.use(express.json());
ConnectDb();
app.use(
  cors({
    origin: "*",
  })
);
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store')
  next()
})
io.on('connection', (socket) => {
  let token = socket.handshake.query.token;
  let tdata;
  if (token) {
    tdata = Token.verify("", token);
  }
  if (tdata && tdata !== "undefined") {
    socket.join(tdata.id);
  }

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

});
const attachSocketIO = (io) => {
  return (req, res, next) => {
    req.io = io;
    next();
  };
};
app.use(attachSocketIO(io));
app.use((req, res, next) => {
  if ((req.method === "POST" || req.method === "PUT") && req.is('application/json')) {
    if (!req.body.params) {
      res.status(404).json({ success: false });
    }
    let data = encryptDecrypt.decrypt(req.body.params);
    req.body = JSON.parse(data);
  }

  let mediaUrls = ["/patientImage/", "/patientDocument/getDocumentFiles/", "/assessmentFile/"];
  for (let i of mediaUrls) {
    if (req.originalUrl.includes(i)) {
      return next();
    }
  }

  let checkUrl = ["/register", "/signIn", "/school/signIn", "/student/signIn", "/forgotPaasword", "/resetpassword", "/create-password"];
  if (checkUrl.includes(req.originalUrl)) {
    next();
  }
  else if (req.headers.token) {
    let tdata = Token.verify(req, req.headers.token);
    if (!tdata) {
      return res
        .status(401)
        .json({ success: false, message: "Token is expired" });
    } else {
      next();
    }
  }
  else {
   //return res.status(401).json({ sucess: false, message: "Token is required" });
   next();
  }
});

app.use("/", routes);
server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
