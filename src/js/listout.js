const listOutURL = "https://api.noroff.dev/api/v1/auction/listings?_active=true&_seller=true&_bids=true&sort=created&sortOrder=desc";
const frontpageURL = "https://api.noroff.dev/api/v1/auction/listings?limit=28&_active=true&_seller=true&_bids=true&sort=created&sortOrder=desc"


const outDiv = document.querySelector("div#container")

document.addEventListener("DOMContentLoaded", function() {
    console.log("frontpage");
    getPosts(frontpageURL);
  });

if (window.location.toString().includes("listings")){
    console.log("listings");
    getPosts(listOutURL);

    const searchBar = document.querySelector("input#searchBar");
    searchBar.addEventListener("keyup", filterPost);
}

let newDivs = "";


const listEntries = (items) => {
    //console.log (items);
    outDiv.innerHTML = "";
    console.log(newDivs);
    console.log(window.location)

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

        let lastbidText = ""

        if (lastBid == null) {
            lastBid = "No bids yet"
            lastbidText = `<p class="fs-6 mb-0">${lastBid}</p>`;
            }

            else {
                lastbidText = `<p class="fs-6 mb-0">Highest bid: $ ${lastBid}</p>`;
            }
            
        //Replace img if not found
        if (item.media == "") {
            item.media = ["https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"] ;
            }

        //console.log(typeof item._count);

        newDivs += `<div class="col-6 col-lg-3 mb-4 pb-4 mb-lg-0">
        <div class="card h-100 itemcard">
          <img src="${item.media[0]}"
            class="card-img-top ratio-1x1" alt="${item.title}" />
          <div class="card-body d-flex flex-column pb-0 mb-0">
            <div class="d-flex h-100 flex-column mb-2">
              <h5 class="mb-0 flex-grow-1">${item.title}</h5>
            </div>
            <div class="mb-3">
            ${lastbidText}
            <p class="text-muted small mb-0">Bids: ${item._count.bids}</p>
            </div>
            <div class="d-flex align-items-center mt-auto flex-column mb-1">
              <p class="text-muted small mb-0"><i class="bi bi-stopwatch"></i>
              <span class="fw-bold">${formatedDate}</span></p>
            </div>
          </div>
          <a href="specific.html?id=${item.id}" class="btn btn-secondary text-light rounded-bottom">View listing</a>
        </div>
      </div>`
    }
    
    outDiv.innerHTML = newDivs;

};


let allEntries = [];

async function getPosts (url) {
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
        listEntries(items, outDiv)
        //listImg(items)        
        allEntries = items;
        heroImgs()

    } catch(error) {
        console.warn(error);
    }
};

console.log(allEntries);

function heroImgs (url) { 

    let randomEntry = [];

    const entriesWithImg = allEntries.filter((t) => t.media[0] != ["https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"]);
    console.log(entriesWithImg);
    console.log(allEntries);
    
    for(let i = 0; i < 6; i++) {
        randomEntry.push(entriesWithImg[Math.floor(Math.random()*entriesWithImg.length)]);
    }

    let result = randomEntry.map(({id, media, title, _count}) => ({id, media, title, _count}));
    let imgArray = result.map(subarray => subarray.media[0])
    let idArray = result.map(subarray => subarray.id)
    let titleArray = result.map(subarray => subarray.title)
    let priceArray = result.map(subarray => subarray._count.bids)
    console.log(idArray);

    Array.from(document.querySelectorAll("img.product")).forEach((img, index) => {
        img.insertAdjacentHTML(
            "afterend", 
            `<a href="specific.html?id=${idArray[index]}" class="stretched-link decoratione-none">
            <div class="productTitle p-2 d-flex flex-row">
                <p class="logo fs-5 title text-wrap fw-bolder mb-0">${titleArray[index]}</p>
                <p class="fw-light mb-0 price">Highest bid: $${priceArray[index]}</p>
            <div>
            </a>`)
        img.src = imgArray[index]
      });

    console.log(imgArray);
}

function filterPost () {
    const filterQuery = searchBar.value;
    console.log(filterQuery);

    const filtered = allEntries.filter((post)=>{
        const filteredTitle = post.title.toUpperCase().indexOf(filterQuery.toUpperCase().trim()) > -1;

        return filteredTitle
    })
    listEntries(filtered);
}

//document.addEventListener("DOMContentLoaded", listImg);
  