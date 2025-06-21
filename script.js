const questions = [
  {
    id: "q1",
    text: "Favorite spot to spend time together?",
    options: ["Lovers park", "Library", "Benchs near the mahabharath painting", "Back canteen", "2nd floor of campus cafe"]
  },
  {
    id: "q2",
    text: "What is your love language?",
    options: ["Physical touch", "Words of affirmation", "Quality time", "Receiving gifts", "Acts of service"]
  },
  {
    id: "q3",
    text: "What do you look for in a partner?",
    options: ["Personality", "Physical attraction", "Colour", "Vibe"]
  },
  {
    id: "q4",
    text: "What type of relationship are you looking for?",
    options: ["Casual dating", "Long term relationship", "Just to meet new ppl", "Situationship"]
  },
  {
    id: "q5",
    text: "Your dating alter ego?",
    options: ["Possessive", "Toxic", "Clingy", "Unpredictable"]
  }
];

function buildQuizForm() {
  const form = document.getElementById("quizForm");
  if (!form) return;

  questions.forEach((q, index) => {
    const div = document.createElement("div");
    div.innerHTML = `<p><strong>${index + 1}. ${q.text}</strong></p>`;
    q.options.forEach(option => {
      const id = `${q.id}-${option}`;
      div.innerHTML += `
        <label>
          <input type="radio" name="${q.id}" value="${option}" required />
          ${option}
        </label><br/>
      `;
    });
    form.appendChild(div);
    form.appendChild(document.createElement("hr"));
  });

  const button = document.createElement("button");
  button.textContent = "Submit Answers";
  button.type = "submit";
  form.appendChild(button);

  form.addEventListener("submit", e => {
    e.preventDefault();
    const answers = questions.map(q => {
      const selected = document.querySelector(`input[name="${q.id}"]:checked`);
      return selected?.value || "";
    });
    localStorage.setItem("campusConnectQuiz", JSON.stringify({ answers }));
    window.location.href = "matches.html";
  });
}

function showMatches() {
  const quizData = JSON.parse(localStorage.getItem("campusConnectQuiz") || "{}");
  const userData = JSON.parse(localStorage.getItem("campusConnectUser") || "{}");
  const matchesDiv = document.getElementById("matchesContainer");
  if (!quizData.answers || !userData || !mockUsers) return;

  const preference = userData.preference;
  const answers = quizData.answers;

  const matches = mockUsers
    .filter(u => preference === "any" || u.gender === preference)
    .map(user => {
      const score = user.answers.reduce((acc, ans, i) => acc + (ans === answers[i] ? 1 : 0), 0);
      return { ...user, score };
    })
    .filter(u => u.score >= 3)
    .sort((a, b) => b.score - a.score);

  if (matches.length === 0) {
    matchesDiv.innerHTML = "<p>No strong matches found.</p>";
    return;
  }

  matches.forEach(match => {
    matchesDiv.innerHTML += `
      <div class="match">
        <h3>${match.name}</h3>
        <p>Instagram: <a href="https://instagram.com/${match.instagramId}" target="_blank">@${match.instagramId}</a></p>
        <p>Match Score: ${match.score}/5</p>
      </div>
    `;
  });
}

function startOver() {
  localStorage.clear();
  window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("profileForm")) {
    document.getElementById("profileForm").addEventListener("submit", e => {
      e.preventDefault();
      const data = {
        name: document.getElementById("name").value,
        instagramId: document.getElementById("instagramId").value,
        gender: document.getElementById("gender").value,
        preference: document.getElementById("preference").value
      };
      localStorage.setItem("campusConnectUser", JSON.stringify(data));
      window.location.href = "quiz.html";
    });
  }

  buildQuizForm();
  showMatches();
});
