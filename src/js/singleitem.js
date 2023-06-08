const queryString = document.location.search;
const searchParams = new URLSearchParams(queryString);
const id = searchParams.get("id");
console.log(id)

const user = localStorage.getItem('username');

const singleListingURL = `https://api.noroff.dev/api/v1/auction/listings/${id}/`


const outDiv = document.querySelector("div.outDiv")

async function getSinglePost (url) {
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
        console.log(response);
        const item = await response.json();
        console.log(item);
        listItem(item)

    } catch(error) {
        console.warn(error);
    }

};


const listItem = (item) => {
    //console.log (items);
    outDiv.innerHTML = "";
    let newDivs = "";
    console.log(newDivs);

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

        let lastBid = bid[bid.length - 1];
        

        let bidArray = [];
        item.bids.forEach(element => {
            bidArray.push(element);
         });

         let bidElement = [];
         bidElement.innerHTML = ""

         bidArray = bidArray.sort(function (a, b) {  return parseFloat(b.amount) - parseFloat(a.amount);  });
         
        let bidInfo = ``;
        bidArray.forEach((el) => {
            bidInfo += `
                <li class="list-group-item d-flex justify-content-between"><p>$${el.amount}</p> <p>${el.bidderName}</p></li> 
            `;
        });

        let tagBadges =``;
        item.tags.forEach((tag) => {
            tagBadges += `<span class="badge rounded-pill text-bg-primary">${tag}</span> `;
        })

        let sellerInfo = Object.values(item.seller)

        console.log(sellerInfo);

        let lastbidText = ""

        if (lastBid == null) {
            lastBid = "No bids yet"
            lastbidText = `<p class="lead py-2">${lastBid}</p>`;
            }

            else {
                lastbidText = `<p class="lead py-2">Highest bid: $ ${lastBid}</p>`;
            }
            
        //Replace img if not found
        if (item.media == "") {
            item.media = "";
            }

        const editDelete = `
        <div class="dropdown ms-auto d-grid gap-2 d-flex justify-content-end">
        <button class="btn btn-primary text-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Update Item
        </button>
        <ul class="dropdown-menu dropdown-menu-dark">
            <li><a class="dropdown-item" href="listitem.html?id=${item.id}">Update</a></li>
            <li><button class="dropdown-item" id="deleteEntry" data-delete="${item.id}">Delete</button></li>
        </ul>
        </div>
        `


        newDivs += `
        ${user === item.seller.name ? editDelete :""}
    <div class="row flex-md-row flex-column align-items-center">
        <h1 class="text-break d-md-none display-5 fw-bold">${item.title}</h1>
        <div class="col-12 col-md-6 col-lg-6 mb-auto py-4">
            <img src="${item.media[0]}" class="d-block mx-lg-auto img-fluid specificImg" alt="${item.title}">
            <hr class="divider">
        </div>
        <div class="col-12 col-md-6 mb-auto align-items-center">
            <h1 class="text-break d-none d-md-block display-5 fw-bold">${item.title}</h1>
            ${lastbidText}
            <p class="strong">${item.description}</p>
            ${tagBadges}

            <hr class="divider">
            <div class="col-12 col-md-8 d-flex justify-content-between" data-visible="loggedIn">
            <div class="col-5 col-md-10">
                    <input pattern="(/\D+/g, '')" class="form-control" id="${item.id}" placeholder="Place bid" aria-label="Place bid" aria-describedby="basic-addon2">
            </div>
                    <button class="btn bid btn-secondary text-light mx-2 px-5 placeBid" id="${item.id}" type="button">Bid</button>
            </div>
            <p class="small text-muted">Listing ends at: ${formatedDate}</p>
            <div class="accHeight my-4">
                <div class="accordion-item col-12">
                    <button class="btn btn-outline-primary col-12 viewBids" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    View bids
                    </button>
                    <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionhExample">
                        <div class="accordion-body align-items-start col-12 mt-2">
                            <ul class="list-group">
                                ${bidInfo}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="d-flex flex-row justify-content-end">
        <img src="${sellerInfo[2]}" width="42" height="42" class="rounded-circle"></img>
        <p class="strong mx-2 py-2">${sellerInfo[0]}</p>
        </div>
    </div>
    `


    console.log(item.seller.name);
    //console.log(newDivs);
    outDiv.innerHTML = newDivs;

    let viewBidsBtn = document.querySelector("button.viewBids")

    if (item.bids == 0){
        viewBidsBtn.innerText = "No bids to show"
        viewBidsBtn.setAttribute("disabled", "")
    }


    const deleteBtn = document.querySelectorAll("button#deleteEntry")

deleteBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        let itemId = btn.getAttribute("data-delete");
        if ( confirm('Are you sure you want to delete post?')){
            deletePosts(singleListingURL)
            }

    })
});
};

async function deletePosts (url) {
    try {
        const accessToken = localStorage.getItem('accessToken'); 
        //console.log(accessToken)
        const options = {
            method: 'DELETE', 
            headers: {
                 "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        };
        //console.log(url, options);

        const response = await fetch(url, options); 
        console.log(response);
        window.location.href = document.referrer;

    } catch(error) {
        console.warn(error);
    }
};


getSinglePost(singleListingURL + "?_seller=true&_bids=true");

