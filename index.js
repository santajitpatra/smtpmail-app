const SMTPServer = require("smtp-server").SMTPServer;

const server = new SMTPServer({
    allowInsecureAuth: true,
    authOptional: true,
  onConnect(session, callback) {
    callback(); // Accept the connection
  },
  onMailFrom(address, session, callback) {
    callback(); // Accept the address
  },
  onRcptTo(address, session, callback) {
    callback(); // Accept the address
  },
  onData(stream, session, callback) {
    stream.on("data", (chunk) => {
      console.log(chunk.toString("utf8"));
    });
    stream.on("end", () => {
      callback(); // Accept the message
    });
    // stream.resume();
  }

});

server.listen(25, "0.0.0.0", () => {
  console.log("SMTP server listening on port 25");
});