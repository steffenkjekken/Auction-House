const BASE_URL = "https://api.noroff.dev/api/v1/auction/"

const nameInput = document.querySelector("input#Name");
const emailInput = document.querySelector("input#loginEmail");
const passwordInput = document.querySelector("input#loginPassword");
const regEmailInput = document.querySelector("input#regEmail");
const regPasswordInput = document.querySelector("input#regPassword");
const avatarInput = document.querySelector("input#Avatar");

const registerButton = document.querySelector("button#register");
const loginButton = document.querySelector("button#login");

async function login (url, data) {
    try {
        const options = {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(data),
        };
        console.log(url, data, options);

        const response = await fetch(url, options); 
        console.log(response);
        const answer = await response.json();
        console.log(answer);

        if (response.ok){
            localStorage.setItem('username', answer.name);
            localStorage.setItem('accessToken', answer.accessToken);
            location.reload()
        }

        else if (!answer.ok) {
            alert("Wrong Email or Password")
        }

    } catch(error) {
        console.warn(error);
    }
};

loginButton.addEventListener("click", (event) => {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    console.log(password);

    const loginData = {
        email, 
        password
    };

    login(BASE_URL+"auth/login", loginData)
});

async function register (url, data) {
    try {
        const options = {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(data),
        };
        console.log(url, data, options);

        const response = await fetch(url, options); 
        console.log(response);
        const answer = await response.json();
        console.log(answer);

        if (response.ok){
            localStorage.setItem('username', answer.name);
            localStorage.setItem('accessToken', answer.accessToken);
            location.reload()
        }

        else if (!answer.ok) {
            alert("Wrong Email or Password")
        }

    } catch(error) {
        console.warn(error);
    }
};

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
});