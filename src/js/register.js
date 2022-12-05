let nameInput = document.querySelector("input#registerName");
let emailInput = document.querySelector("input#registerEmail");
let passwordInput = document.querySelector("input#registerPassword");
let avatarInput = document.querySelector("input#registerAvatar");

const registerButton = document.querySelector("button#register");

async function register (url, data) {
    try {
        let options = {
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
    let name = nameInput.value.trim();
    let email = emailInput.value.trim();
    let password = passwordInput.value.trim();
    let avatar = avatarInput.value.trim();

    const regData = {
        name,
        email, 
        password,
        avatar
    }

    register(BASE_URl+"auth/login", regData);
    }
});