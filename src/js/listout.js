const listOutURL = "https://api.noroff.dev/api/v1/auction/listings";
const limit = "12";

const outDiv = document.querySelector("div#container")

var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;

console.log(dateTime)

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
        console.log(lastBid);

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
            <div class="d-flex justify-content-between mb-5">
              <h5 class="mb-0">${item.title}</h5>
              <h5 class="text-dark mb-0">Bids: ${lastBid}</h5>
            </div>
            <div class="d-flex flex-column mb-2">
            <h5 class="text-dark mb-0">Bids: ${item._count.bids}</h5>
              <p class="text-muted mb-0">Available: <span class="fw-bold">${formatedDate}</span></p>
              <div class="ms-auto text-warning">
                <i class="fa fa-star"></i>
              </div>
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

    } catch(error) {
        console.warn(error);
    }
};

getPosts(listOutURL + "?limit=" + limit +"?&_seller=true&_bids=true");
listPosts(allItems)