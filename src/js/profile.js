let profilecard = document.getElementById("profileCard");
let userName = document.getElementById("username");
let avatar = document.getElementById("avatar");
let dropdownMenu = document.getElementById("profilemenu");
let appendDiv = document.getElementById("appendListings");
let avatarInput = document.getElementById("avatarInput");
let userHeading = document.querySelector("h3.userListings")

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

        listinfo(profile)

    } catch(error) {
        console.warn(error);
    }
}
};

getProfile(userURL);

const listinfo = (profile) => {
    console.log (profile);

    userHeading.innerHTML =  `${profile.name} listings (${profile.listings.length})`

    avatar.src = profile.avatar
        if(profile.avatar == ""){
           avatar.src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
        }

        userInfo += `<div class="d-flex flex-column align-items-center text-center">
        <div class="container col-5 col-md-4 col-lg-8">
        <img src="${avatar.src}" alt="${profile.name}" class="rounded-circle p-1 bg-primary">
        </div>
        <div class="mt-3">
            <h4>${profile.name}</h4>
            <p class="text-secondary mb-1">Number of auctions Won: ${profile.wins.length}</p>
            <p class="text-muted font-size-sm">Number of listings: ${profile.listings.length}</p>
            <hr class="my-4">
            <button class="btn btn-primary" id="updateAvatar" data-bs-toggle="modal" data-bs-target="#avatarModal">Update Avatar</button>
        </div>
        </div>`

    profilecard.innerHTML = userInfo;

    for (const item of profile.listings){

        console.log(item);

    

    userListings += `<div class="col-sm-6 p-2">
                        <div class="card">
                            <div class="card-body itemcard py-2">
                                <h5 class="d-flex align-items-center mb-3">${item.title}</h5>
                                <img src="${item.media[0]}" class="card-img-top ratio-1x1 profileListingImg" alt="${item.title}" />
                            </div>
                            <a href="specific.html?id=${item.id}" class="btn btn-secondary text-light rounded-bottom stretched-link">View listing</a>
                        </div>
                    </div>`
    }
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