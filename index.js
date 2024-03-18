const SMTPServer = require("smtp-server").SMTPServer;

const PORT = process.env.PORT
const server = new SMTPServer({
    allowInsecureAuth: true,
    authOptional: true,
  onConnect(session, callback) {
    console.log("Connected to %s", session.id);
    callback(); // Accept the connection
  },
  onMailFrom(address, session, callback) {
    console.log("Mail from %s", address.address, session.id);
    callback(); // Accept the address
  },
  onRcptTo(address, session, callback) {
    console.log("Receiving mail for %s", address.address, session.id);
    callback(); // Accept the address
  },
  onData(stream, session, callback) {
    stream.on("data", (chunk) => {
      console.log(chunk.toString("utf8"));
    });
    stream.on("end", () => {
      callback(); // Accept the message
    });
  }

});

server.listen(PORT, () => {
  console.log("SMTP server listening on port 25");
});