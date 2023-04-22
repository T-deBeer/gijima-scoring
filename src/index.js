import io from "socket.io-client";
const socket = io("http://localhost:3000");

window.onload = () => {
  localStorage.setItem("scoreTeam1", 0);
  localStorage.setItem("scoreTeam2", 0);
};

const team1_Name = document.getElementById("inputName1");
const team2_Name = document.getElementById("inputName2");
const addScoreTeam1 = document.getElementById("addTeam1");
const addScoreTeam2 = document.getElementById("addTeam2");
const nextQuarter = document.getElementById("nxtQuarter");
const endGame = document.getElementById("endGame");
const reset = document.getElementById("reset");

if (team1_Name) {
  team1_Name.addEventListener("input", (e) => {
    socket.emit("team1Change", e.target.value);
  });
}

if (team2_Name) {
  team2_Name.addEventListener("input", (e) => {
    socket.emit("team2Change", e.target.value);
  });
}

if (addScoreTeam1) {
  addScoreTeam1.addEventListener("click", (e) => {
    localStorage.setItem(
      "scoreTeam1",
      parseInt(localStorage.getItem("scoreTeam1")) + 1
    );
    socket.emit("scoreTeam1Change", localStorage.getItem("scoreTeam1"));
  });
}

if (addScoreTeam2) {
  addScoreTeam2.addEventListener("click", (e) => {
    localStorage.setItem(
      "scoreTeam2",
      parseInt(localStorage.getItem("scoreTeam2")) + 1
    );
    socket.emit("scoreTeam2Change", localStorage.getItem("scoreTeam2"));
  });
}

if (reset) {
  reset.addEventListener("click", (e) => {
    const baseScore = {
      team1Name: "Team 1",
      team2Name: "Team 2",
      team1Score: 0,
      team2Score: 0,
      timing: "Q1",
    };

    socket.emit("resetNetballScore", baseScore);
    team1_Name.value = "";
    team2_Name.value = "";
    localStorage.setItem("scoreTeam1", 0);
    localStorage.setItem("scoreTeam2", 0);
  });
}

if (nextQuarter) {
  nextQuarter.addEventListener("click", (e) => {
    var timingSection = document.getElementById("timing").innerHTML;

    var newValue = "";
    switch (timingSection) {
      case "Q1":
        newValue = "Q2";
        break;
      case "Q2":
        newValue = "Q3";
        break;
      case "Q3":
        newValue = "Q4";
        break;
      case "Q4":
        newValue = "Q1";
        break;
    }

    socket.emit("nextQuarter", newValue);
  });
}

if (endGame) {
  endGame.addEventListener("click", (e) => {
    socket.emit("nextQuarter", "Final Results");
  });
}

socket.on("team1Update", (value) => {
  var elms = document.querySelectorAll("[id='team1Name']");

  for (var i = 0; i < elms.length; i++) {
    elms[i].innerHTML = value;
  }
});

socket.on("team2Update", (value) => {
  var elms = document.querySelectorAll("[id='team2Name']");

  for (var i = 0; i < elms.length; i++) {
    elms[i].innerHTML = value;
  }
});

socket.on("scoreUpdateTeam1", (value) => {
  var elms = document.querySelectorAll("[id='team1Score']");

  for (var i = 0; i < elms.length; i++) {
    elms[i].innerHTML = value;
  }
});

socket.on("scoreUpdateTeam2", (value) => {
  var elms = document.querySelectorAll("[id='team2Score']");

  for (var i = 0; i < elms.length; i++) {
    elms[i].innerHTML = value;
  }
});

socket.on("updateQuarter", (value) => {
  var elms = document.querySelectorAll("[id='timing']");

  for (var i = 0; i < elms.length; i++) {
    elms[i].innerHTML = value;
  }
});

socket.on("netballScoreboardReset", (baseScore) => {
  var elms = document.querySelectorAll("[id='team1Name']");

  for (var i = 0; i < elms.length; i++) {
    elms[i].innerHTML = baseScore.team1Name;
  }

  var elms = document.querySelectorAll("[id='team2Name']");

  for (var i = 0; i < elms.length; i++) {
    elms[i].innerHTML = baseScore.team2Name;
  }

  var elms = document.querySelectorAll("[id='team1Score']");

  for (var i = 0; i < elms.length; i++) {
    elms[i].innerHTML = baseScore.team1Score;
  }

  var elms = document.querySelectorAll("[id='team2Score']");

  for (var i = 0; i < elms.length; i++) {
    elms[i].innerHTML = baseScore.team2Score;
  }

  var elms = document.querySelectorAll("[id='timing']");

  for (var i = 0; i < elms.length; i++) {
    elms[i].innerHTML = baseScore.timing;
  }
});
