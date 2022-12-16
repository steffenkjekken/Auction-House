import { login } from "./login.js";
import { register } from "./register.js";
import { getProfile } from "./profileinfo.js";

const BASE_URL = "https://api.noroff.dev/api/v1/auction/"


const nameInput = document.querySelector("input#Name");
const emailInput = document.querySelector("input#loginEmail");
const passwordInput = document.querySelector("input#loginPassword");
const regEmailInput = document.querySelector("input#regEmail");
const regPasswordInput = document.querySelector("input#regPassword");
const avatarInput = document.querySelector("input#Avatar");
const feedbackModal = document.getElementById("regBody");

const regBTN = document.getElementById("register");

const nameAlert = document.querySelector("#nameHelp")
const passwordAlert = document.querySelector("#passwordHelp")
const emailAlert = document.querySelector("#emailHelp")
const avatarAlert = document.querySelector("#avatarHelp")

const regPasswordAlert = document.querySelector("#regPasswordHelp")
const regEmailAlert = document.querySelector("#regEmailHelp")

console.log(emailAlert);

let validated = false;
let regValidatet = false


let successReg = `<div class="modal-content">
<div class="modal-header">
  <h5 class="modal-title" id="feedback">Profile succesfully registered</h5>
  <button type="button" class="btn-close" data-dismiss="modal">
  </button>
</div>
<div class="modal-body">
  Redirecting you back to our login page automaticlly in
  <div id="modal-time"></div> seconds
</div>
<div class="modal-footer">
  <button type="button" class="btn btn-success" data-dismiss="modal" onclick="window.location.href='index.html';">Take me to login page now</button>
</div>
</div>`


regBTN.addEventListener("click", (event) => {
  
    event.preventDefault();
    console.log("You've pressed submit...");
    const name = nameInput.value.trim();
    let regEmail = regEmailInput.value.trim();
    let password = regPasswordInput.value.trim();
    const avatar = avatarInput.value.trim();

    const regData = {
        name,
        email: regEmail, 
        password,
        avatar
    }
    console.log(regEmail)

    validateName(name);
    validateRegEmail(regEmail);
    validateRegPassword(password);
    validateAvatar(avatar);

    console.log(regValidatet)

    if (regValidatet === true){
      register(BASE_URL+"auth/register", regData);
      }
    }
);

document.body.addEventListener("click", (event) => {
    if
    (event.target.id == "login"){
    
    event.preventDefault();
    let email = emailInput.value.trim();
    let password = passwordInput.value.trim();
    console.log(password);

    const loginData = {
        email, 
        password
    };
    validateEmail(email)
    validatePassword(password)

    console.log(validated)

    if (validated){
    login(BASE_URL+"auth/login", loginData)
    }
    }
});

getProfile();

function validateName(name) {
  if ( name.match(/^[a-zA-Z0-9_]+$/)) {
          nameAlert.innerHTML = "";
          validated = true;
          regValidatet = true;
      } else {
          nameAlert.innerHTML = "<p>The name value must not contain punctuation symbols apart from underscore (_).</p>";
          validated = false;
          regValidatet = false;
      }
      if (!name) { 
          nameAlert.innerHTML = "<p>Name missing</p>";
          validated = false;
          regValidatet = false;
  }
  console.log(validated)
}

function validateEmail(email) {
  if (email.match(/[\w\-.]+@(stud.)?noroff.no$/)) {
      emailAlert.innerHTML = "";
      validated = true;
      } else {
      emailAlert.innerHTML = "<p>You need a noroff email to login</p>";
      validated = false;
      }
      if (!email) { 
      emailAlert.innerHTML = "<p>Email missing</p>";
      validated = false;
  }
  console.log(validated)
}

function validateRegEmail(regEmail) {
  if (regEmail.match(/[\w\-.]+@(stud.)?noroff.no$/)) {
      regEmailAlert.innerHTML = "";
      regValidatet = true;
      } else {
      regEmailAlert.innerHTML = "<p>You need a noroff email to register</p>";
      regValidatet = false;
      }
      if (!regEmail) { 
      regEmailAlert.innerHTML = "<p>Email missing</p>";
      regValidatet = false;
  }
  console.log(validated)
}

function validatePassword(password) {
  if ( password.match(/[a-zA-Z0-9]{8,}/) ) {
      passwordAlert.innerHTML = "";
      validated = true;
      } else {
      passwordAlert.innerHTML = "<p>The password value must be at least 8 characters.</p>";
      validated = false;
      }
      if (!password) { 
      passwordAlert.innerHTML = "<p>Password missing</p>";
      validated = false;
  }
}

function validateRegPassword(password) {
  if ( password.match(/[a-zA-Z0-9]{8,}/) ) {
      regPasswordAlert.innerHTML = "";
      regValidatet = true;
      } else {
      regPasswordAlert.innerHTML = "<p>The password value must be at least 8 characters.</p>";
      regValidatet = false;
      if (!password) { 
      regPasswordAlert.innerHTML = "<p>Password missing</p>";
      regValidatet = false;
      }
  }
  console.log(validated)
}


function validateAvatar(avatar) {
  if ( avatar.match(/^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/) ) {
      avatarAlert.innerHTML = "";
      regValidatet = true;
      } else {
      avatarAlert.innerHTML = "<p>A URL with image is required</p>";
      regValidatet = false;
      }
      if (!avatar) { 
      avatarAlert.innerHTML = "";
      regValidatet = true;
  }
}