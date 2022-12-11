const listOutURL = "https://api.noroff.dev/api/v1/auction/listings?limit=12?&_seller=true&_bids=true&sort=created&sortOrder=desc";
const heroURL = "https://api.noroff.dev/api/v1/auction/listings?limit=4?&_seller=true&_bids=true?&sort=created&sortOrder=desc"
const limit = "12";

const outDiv = document.querySelector("div#container")
const heroImgs = document.querySelectorAll("img.product");

const listImg = (items) => {
    for (let img of items) {
        console.log(img.media)
        heroImgs.src.append(img.media)
    }
}

const listPosts = (items) => {
    //console.log (items);
    outDiv.innerHTML = "";
    let newDivs = "";
    console.log(newDivs);
    for (let item of items) {

        let expire = new Date(item.endsAt);
        let formatedDate = expire.toLocaleString("en-GB", {
            dateStyle: 'medium',
            timeStyle: 'short',
            hour12: false,
        });

        let bid = [];
        item.bids.forEach(element => {
            bid.push(element.amount);
         });

        var lastBid = bid[bid.length - 1];
        //console.log(lastBid);

        if (lastBid == null) {
            lastBid = "No bids yet";
            }
        //Replace img if not found
        if (item.media == "") {
            item.media = "https://cdn.discordapp.com/attachments/931268688412299274/1026475050578231376/no-user-image-icon-0.jpg";
            }

        newDivs += `<div class="col-6 col-lg-3 mb-4 pb-4 mb-lg-0">
        <div class="card h-100 itemcard pb-2">
          <img src="${item.media}"
            class="card-img-top ratio-1x1" alt="${item.title}" />
          <div class="card-body">
            <div class="d-flex flex-column mb-3">
              <h5 class="mb-0">${item.title}</h5>
              <h6 class="text-dark mb-0">Price: ${lastBid}</h5>
            </div>
            <div class="input-group mb-3" data-visible="loggedIn">
            <input type="text" class="form-control" placeholder="Place your bid" aria-label="Place your bid" aria-describedby="basic-addon2">
            <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button">Bid</button>
            </div>
            </div>
            <div class="d-flex align-content-end flex-column mb-1">
              <p class="text-dark mb-0">Bids: ${item._count.bids}</p>
              <p class="text-muted mb-0">Available: <span class="fw-bold">${formatedDate}</span></p>
            </div>
          </div>
        </div>
      </div>`
    }
    //console.log(newDivs);
    outDiv.innerHTML = newDivs;

};

let allItems = [];

export async function getPosts (url) {
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
        const items = await response.json();
        console.log(items);
        allItems = items;
        listPosts(items, outDiv)
        listImg(items)

    } catch(error) {
        console.warn(error);
    }
};

getPosts(listOutURL);
listPosts(allItems)