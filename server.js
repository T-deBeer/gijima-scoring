import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { Server } from "socket.io";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const app = express();
const options = {
  cors: true,
  origin: ["http://localhost:3000"],
};

const server = app.listen(PORT, () => {
  console.log("Server started");
});

const io = new Server(server, options);

app.use(express.static("./dist"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/dist/index.html");
});

app.get("/netball/dashboard", (req, res) => {
  res.sendFile(__dirname + "/dist/netball/dash.html");
});

app.get("/netball/scoreboard", (req, res) => {
  res.sendFile(__dirname + "/dist/netball/score.html");
});

io.on("connection", (socket) => {
  console.log("Someone connected");

  socket.on("team1Change", (newName) => {
    io.emit("team1Update", newName);
  });

  socket.on("team2Change", (newName) => {
    io.emit("team2Update", newName);
  });

  socket.on("scoreTeam1Change", (newScore) => {
    io.emit("scoreUpdateTeam1", newScore);
  });

  socket.on("scoreTeam2Change", (newScore) => {
    io.emit("scoreUpdateTeam2", newScore);
  });

  socket.on("nextQuarter", (newQuarter) => {
    io.emit("updateQuarter", newQuarter);
  });

  socket.on("resetNetballScore", (currentScoreboard) => {
    io.emit("netballScoreboardReset", currentScoreboard);
  });
});
