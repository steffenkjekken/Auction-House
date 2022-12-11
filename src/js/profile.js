let profilecard = document.getElementById("profileCard");
let userName = document.getElementById("username");
let avatar = document.getElementById("avatar");
let dropdownMenu = document.getElementById("profilemenu");
let appendDiv = document.getElementById("appendListings");
let avatarInput = document.getElementById("avatarInput");

profilecard.innerHTML = "";
let userInfo = "";
let userListings = "";


const user = localStorage.getItem('username');
const userURL = `https://api.noroff.dev/api/v1/auction/profiles/${user}?_listings=true`;
const avatarURL = `https://api.noroff.dev/api/v1/auction/profiles/${user}/media`

async function getProfile (url) {
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
        //console.log(profile);

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

        listinfo(profile)

    } catch(error) {
        console.warn(error);
    }
}
};

getProfile(userURL);

const listinfo = (profile) => {
    //console.log (profile);

    avatar.src = profile.avatar
        if(profile.avatar == ""){
           avatar.src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
        }

        userInfo += `<div class="d-flex flex-column align-items-center text-center">
        <img src="${avatar.src}" alt="${profile.name}" class="rounded-circle p-1 bg-primary" width="110">
        <div class="mt-3">
            <h4>${profile.name}</h4>
            <p class="text-secondary mb-1">Number of auctions Won: ${profile.wins}</p>
            <p class="text-muted font-size-sm">Number of listings: ${profile.listings}</p>
            <button class="btn btn-primary" id="updateAvatar" data-bs-toggle="modal" data-bs-target="#avatarModal">Update Avatar</button>
        </div>
        </div>
        <hr class="my-4">
        <ul class="list-group list-group-flush">
        <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
            <h6 class="mb-0">Auctions Won:</h6>
            <span class="text-secondary">${profile.wins}</span>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
            <h6 class="mb-0">Listings:</h6>
            <span class="text-secondary">${profile.listings}</span>
        </li>
    </ul>`

    profilecard.innerHTML = userInfo;

    userListings += `<div class="col-sm-4">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="d-flex align-items-center mb-3">${profile.listing}</h5>
                                <p>Web Design</p>
                                <div class="progress mb-3" style="height: 5px">
                                    <div class="progress-bar bg-primary" role="progressbar" style="width: 80%" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                        </div>
                    </div>`
    
    appendDiv.insertAdjacentHTML("afterend", userListings);

};

async function updateAvatar (url, data) {
    try {
        const accessToken = localStorage.getItem('accessToken'); 
        //console.log(accessToken)
        const response = await fetch(avatarURL, {
            method: "put",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
               Authorization: `Bearer ${accessToken}`,
           },
          })
        
          if (response.ok) {
            return await response.json()
          }

    } 
    catch(error) {
        console.warn(error);
    }
};

document.body.addEventListener("click", (event) => {
    if
    (event.target.id == 'submitAvatar'){
        event.preventDefault()

        const avatar = avatarInput.value.trim();
        const avatarData = {
            avatar
        }
        updateAvatar(avatarURL, avatarData)
        setTimeout(function(){
            window.location.reload();
         }, 1500);
        
    }});