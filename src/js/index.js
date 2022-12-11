import { login } from "./login.js";
import { register } from "./register.js";
import { getPosts } from "./listout.js";
import { getProfile } from "./profileinfo.js";

const BASE_URL = "https://api.noroff.dev/api/v1/auction/"


const nameInput = document.querySelector("input#Name");
const emailInput = document.querySelector("input#loginEmail");
const passwordInput = document.querySelector("input#loginPassword");
const regEmailInput = document.querySelector("input#regEmail");
const regPasswordInput = document.querySelector("input#regPassword");
const avatarInput = document.querySelector("input#Avatar");
const feedbackModal = document.getElementById("regBody");

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


document.body.addEventListener("click", (event) => {
    if
    (event.target.id == 'register'){

    event.preventDefault();
    console.log("You've pressed submit...");
    const name = nameInput.value.trim();
    const email = regEmailInput.value.trim();
    const password = regPasswordInput.value.trim();
    const avatar = avatarInput.value.trim();

    const regData = {
        name,
        email, 
        password,
        avatar
    }
    console.log(regData)
    if (register != true ){
        feedbackModal.innerHTML = successReg;
        function Timer() {
            var counter = 5;
            var myTimer = setInterval(function() {
              document.getElementById("modal-time").innerHTML = counter;
              counter--;
              if (counter < 0) {
                clearInterval(myTimer);
                window.location="index.html";
              }
            }, 1000);
        }
        Timer();
    }
    register(BASE_URL+"auth/register", regData);

    if (register == true ){
        console.log("true")
        }
    }

    if
    (event.target.id == "login"){
    
    event.preventDefault();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    console.log(password);

    const loginData = {
        email, 
        password
    };

    login(BASE_URL+"auth/login", loginData)
    }
});

getPosts();
getProfile();