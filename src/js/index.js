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

    register(BASE_URL+"auth/register", regData);
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