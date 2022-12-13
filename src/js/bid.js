async function placeBid (url, data) {
    try {
        const accessToken = localStorage.getItem('accessToken'); 
        //console.log(accessToken)
        const response = await fetch(url, {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
               Authorization: `Bearer ${accessToken}`,
           },
          })
        
          if (response.ok) {
            await response.json()
            window.location.reload();
          }

    } 
    catch(error) {
        console.warn(error);
    }
};



document.body.addEventListener("click", (event) => {
    let ID = event.target.id;
    const BID_URL = `https://api.noroff.dev/api/v1/auction/listings/${ID}/bids`

    if
    (event.target.classList.contains('bid')){
        console.log(event.target.id);

        let input = document.getElementById(event.target.id)
        let theBid = {
            amount: Number(input.value)
        } 
        console.log(input.value);
        let noMisclicksHere = confirm("Are you sure you want to place bid?")
        if (noMisclicksHere == true) {
            placeBid(BID_URL, theBid)
        }
        
    }
    console.log(BID_URL);
});
//console.log(BID_URL);

