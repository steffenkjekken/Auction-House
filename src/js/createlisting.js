const listItemURL = "https://api.noroff.dev/api/v1/auction/listings"

let input = document.querySelector("input#InputTags");
let select = document.querySelector("select#time")
let titleInput = document.querySelector("input#InputTitle")
let descriptionInput = document.querySelector("textarea#InputDescription")
let mediaInput = document.querySelector("input#InputMedia")
let dateInput = document.querySelector("input#endDate")

// initialize Tagify on the above input node reference and change the format.
var tagify = new Tagify(input, {
    delimiters: ',',
    originalInputValueFormat: valuesArr => valuesArr.map(item => item.value).join(',')
  })

let timeInput = document.querySelector("select#time");

const d = new Date();
let hour = d.getHours();
hour = ("0" + hour + ":00").slice(-5);
let option = document.createElement("option")
option.selected = true;
option.append(hour)

timeInput.insertAdjacentElement("beforeend", option)

console.log(hour);

for (var i = 00; i<=23; i++){
    var opt = document.createElement('option');
    opt.value = i;
    if (opt.value < 10)
        opt.value = "0"+i;
    opt.innerHTML = opt.value + ":00"
    select.appendChild(opt);
}

let responseD;

async function listItem (url, data) {
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

          console.log(response);
          console.log(data);
        
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
    (event.target.id == 'submitItem'){
    event.preventDefault()

    const title = titleInput.value.trim()
    const description = descriptionInput.value.trim()
    const media = mediaInput.value.trim()
    const date = dateInput.value.trim()

    responseD = new Date (date + "T" + hour)
    console.log(responseD)
    console.log(typeof date + typeof hour)

    const listingResponse = {
        title,
        description,
        media,
        responseD
    }

    listItem(listItemURL, listingResponse);

    console.log(listingResponse);

}});