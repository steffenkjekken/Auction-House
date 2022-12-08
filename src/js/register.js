const nameInput = document.querySelector("input#registerName");
const emailInput = document.querySelector("input#registerEmail");
const passwordInput = document.querySelector("input#registerPassword");
const avatarInput = document.querySelector("input#registerAvatar");

export async function register (url, data) {
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
            modal.style.display ="block";
            function Timer() {
                var counter = 5;
                var myTimer = setInterval(function() {
                  document.getElementById("modal-time").innerHTML = counter;
                  counter--;
                  if (counter < 0) {
                    clearInterval(myTimer);
                    location.reload();
                  }
                }, 1000);
              }
              Timer();
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
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const avatar = avatarInput.value.trim();

    const regData = {
        name,
        email, 
        password,
        avatar
    }

    register(BASE_URl+"auth/login", regData);
    }
});