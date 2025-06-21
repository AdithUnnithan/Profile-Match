// Questions
const questions = [
  {
    id: "q1",
    text: "Favorite spot to spend time together?",
    options: ["Lovers park", "Library", "Benchs near the Mahabharath painting", "Back canteen", "2nd floor of campus cafe"],
  },
  {
    id: "q2",
    text: "What is your love language?",
    options: ["Physical touch", "Words of affirmation", "Quality time", "Receiving gifts", "Acts of service"],
  },
  {
    id: "q3",
    text: "What do you usually look for in someone you're dating?",
    options: ["Personality", "Physical attraction", "Colour", "Vibe"],
  },
  {
    id: "q4",
    text: "What type of relationship are you looking for?",
    options: ["Casual dating", "Long term relationship", "Just to meet new ppl", "Situationship"],
  },
  {
    id: "q5",
    text: "Which one of these is your dating alter ego?",
    options: ["Possessive", "Toxic", "Clingy", "Unpredictable"],
  },
];

// Profile form
const profileForm = document.getElementById("profileForm");
if (profileForm) {
  profileForm.onsubmit = (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const instagram = document.getElementById("instagram").value;
    const gender = document.querySelector('input[name="gender"]:checked')?.value;
    const preference = document.querySelector('input[name="preference"]:checked')?.value;
    if (name && instagram && gender && preference) {
      localStorage.setItem("campusConnectUser", JSON.stringify({ name, instagram, gender, preference }));
      window.location.href = "quiz.html";
    }
  };
}

// Quiz page
const quizForm = document.getElementById("quizForm");
if (quizForm) {
  questions.forEach((q, i) => {
    const qDiv = document.createElement("div");
    qDiv.innerHTML = `<label><strong>${i + 1}. ${q.text}</strong></label>`;
    q.options.forEach((opt) => {
      qDiv.innerHTML += `
        <label><input type="radio" name="${q.id}" value="${opt}" required /> ${opt}</label><br/>
      `;
    });
    quizForm.appendChild(qDiv);
  });

  quizForm.onsubmit = (e) => {
    e.preventDefault();
    const answers = questions.map((q) => document.querySelector(`input[name="${q.id}"]:checked`)?.value);
    localStorage.setItem("campusConnectQuiz", JSON.stringify({ answers }));
