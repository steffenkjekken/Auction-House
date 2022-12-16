const user = localStorage.getItem('username');
let userName = document.getElementById("username");
let avatar = document.getElementById("avatar");
let dropdownMenu = document.getElementById("profilemenu")
let mobileMenu = document.getElementById("profilemenuMobile")
let userNamemobile = document.getElementById("usernameMobile");
let avatarmobile = document.getElementById("avatarMobile")
let tokens = document.getElementById("tokens")

const profileURL = `https://api.noroff.dev/api/v1/auction/profiles/${user}?_listings=true`;

const auth = localStorage.getItem("accessToken");

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
        userNamemobile.innerHTML = user;
        userName.innerHTML = user;

        avatarmobile.src = profile.avatar
        avatar.src = profile.avatar
        if(profile.avatar == ""){
           avatar.src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
        }

        tokens.insertAdjacentHTML("beforeend", `<p class="h4 px-1"><i class="bi bi-coin h4"></i> ${profile.credits}</p>`)

        dropdownMenu.insertAdjacentHTML("afterbegin", 
        `
        
        <p class="dropdown-item-text rounded bg-secondary text-light text-center mx-2 p-2">
        ${profile.credits}
        <i class="bi bi-coin h6" alt="credits"></i>
        </p>
        
        `)

        return user;

    } catch(error) {
        console.warn(error);
    }
}
};
getProfile(profileURL);