const user = localStorage.getItem('username');
let userName = document.getElementById("username");
let avatar = document.getElementById("avatar");
let dropdownMenu = document.getElementById("profilemenu")

export async function getProfile (url) {
    if (auth != null) {
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

        //console.log(userName);
        userName.innerHTML = user;

        avatar.src = profile.avatar
        if(profile.avatar == ""){
           avatar.src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
        }

        dropdownMenu.insertAdjacentHTML("afterbegin", 
        `
        <li class="dropdown mb-2">
        <button type="button" class="btn btn-secondary w-100 m-0  pe-none text-light">
        <i class="bi bi-coin h6"></i>
        ${profile.credits}
        </button>
        </li>
        `)

        return user;

    } catch(error) {
        console.warn(error);
    }
}
};

const userURL = `https://api.noroff.dev/api/v1/auction/profiles/${user}?_listings=true`;


getProfile(userURL);