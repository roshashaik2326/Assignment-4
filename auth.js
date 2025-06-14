function registerUser(user) {
  return new Promise((resolve, reject) => {
    const existing = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = existing.find(u => u.username === user.username);
    if (userExists) {
      reject("User already exists.");
    } else {
      existing.push(user);
      localStorage.setItem("users", JSON.stringify(existing));
      resolve("User registered successfully.");
    }
  });
}

function loginUser(username, password) {
  return new Promise((resolve, reject) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      resolve("Login successful.");
    } else {
      reject("Invalid credentials.");
    }
  });
}

const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("signup").value.trim();
    const password = document.getElementById("password").value.trim();
    const age = parseInt(document.getElementById("age").value);
    const newUser = { username, password, age };
    registerUser(newUser)
      .then(msg => {
        alert(msg);
        window.location.href = "login.html";
      })
      .catch(err => alert(err));
  });
}

const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("login").value.trim();
    const password = document.getElementById("login-password").value.trim();
    loginUser(username, password)
      .then(msg => {
        alert(msg);
      })
      .catch(err => alert(err));
  });
}
