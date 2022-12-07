const user = localStorage.getItem('username');
var userName = document.getElementById("username");
var dropdownMenu = document.getElementById("profilemenu")
console.log(userName);
userName.innerHTML = user;

async function getProfile (url) {
    try {
        const accessToken = localStorage.getItem('accessToken'); 
        //console.log(accessToken)
        const options = {
            method: 'GET', 
            headers: {
                 "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        };
        //console.log(url, options);

        const response = await fetch(url, options); 
        //console.log(response);
        const profile = await response.json()
        console.log(profile)

        dropdownMenu.insertAdjacentHTML("afterbegin", 
        `
        <li class="dropdown mb-2">
        <button type="button" class="btn btn-secondary w-100 m-0 pe-none text-light">
        <i class="bi bi-coin h6"></i>
        ${profile.credits}
        </button>
        </li>
        `)

    } catch(error) {
        console.warn(error);
    }
};

const profileURL = `https://api.noroff.dev/api/v1/auction/profiles/${user}?_listings=true`;


getProfile(profileURL);
