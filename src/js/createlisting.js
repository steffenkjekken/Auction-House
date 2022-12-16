
const listItemURL = "https://api.noroff.dev/api/v1/auction/listings"

let tagsInput = document.querySelector("input#InputTags");
let select = document.querySelector("select#time")
let titleInput = document.querySelector("input#InputTitle")
let descriptionInput = document.querySelector("textarea#InputDescription")
let mediaInput = document.querySelector("input.mediaInput")
let dateInput = document.querySelector("input#endDate")
let addField = document.querySelector("button#addInput")
let submitBtn = document.querySelector("button#submitItem")
let heading = document.querySelector("h2.heading")

const queryString = document.location.search;
const searchParams = new URLSearchParams(queryString);
const id = searchParams.get("id");
const staticId = id

// initialize Tagify on the above input node reference and change the format.
var tagify = new Tagify(tagsInput, {
    delimiters: ',',
    originalInputValueFormat: valuesArr => valuesArr.map(item => item.value).join(',')
  })

let timeInput = document.querySelector("select#time");

const d = new Date();
let hour = d.getHours();
hour = ("0" + hour + ":00").slice(-5);
let option = document.createElement("option")
option.classList.add("selected")
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

//let InputNumber = 0

addField.addEventListener("click", (e) => {
    let newField = mediaInput.cloneNode(true);
    //InputNumber += 1;
    newField.classList.add("mediaInput")
    mediaInput.classList.add("mediaInput")
    mediaInput.insertAdjacentElement("afterend", newField)
})


async function createEntry (url, data) {
    try {
        const accessToken = localStorage.getItem('accessToken'); 
        //console.log(accessToken)
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
               Authorization: `Bearer ${accessToken}`,
           },
          })

          const answer = await response.json()
          console.log(answer);
        
          if (response.ok) {
            console.log(answer.id);
            window.location = `specific.html?id=${answer.id}`
            await response.json()
          }
    } 
    catch(error) {
        console.warn(error);
    }
};

async function updateEntry (url, entry) {
    try {
        const accessToken = localStorage.getItem('accessToken'); 
        //console.log(accessToken)
        const options = {
            method: 'PUT', 
            headers: {
                 "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(entry),
        };
        //console.log(url, options);

        const response = await fetch(url, options); 
        console.log(response);
        window.location = `specific.html?id=${id}`

    } catch(error) {
        console.warn(error);
    }

};

let mediaArray = [];

document.body.addEventListener("click", (event) => {


const title = titleInput.value.trim()
const description = descriptionInput.value.trim()

const newInputArray = Array.from(document.querySelectorAll('.mediaInput'), ({ value }) => value);
let media = newInputArray

const date = dateInput.value.trim()
responseD = new Date (date + "T" + hour)
const endsAt = responseD.toJSON();

const tags = tagify.value;
let result = tags.map(a => a.value);
//console.log(result);

if (media == ""){
    media = null
}

const listingRequest = {
    title,
    description,
    tags: result,
    media,
    endsAt
}

const updateRequest = {
    title,
    description,
    tags: result,
    media,
}

    if
    (event.target.id == 'submitItem'){
        event.preventDefault()
        createEntry(listItemURL, listingRequest);
        console.log(listingRequest);
    }

    if
    (event.target.id == 'update'){
        event.preventDefault()
        updateEntry(listItemURL + "/" + id, updateRequest)
        console.log(updateRequest);
    }
 
});

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
        populateFields(item)

    } catch(error) {
        console.warn(error);
    }

};

async function populateFields (item) {

    titleInput.value = item.title;
    descriptionInput.value = item.description;

    tagsInput.value = item.tags;

    let mediaLength =  item.media.length
    let mediaArray = item.media

    for (let i = 1; i<mediaLength; i++) {
        addField.click();
      }
    
    Array.from(document.querySelectorAll('.mediaInput')).forEach((mediaFld, index) => {
        mediaFld.value = mediaArray[index]
      });

      console.log(mediaArray);

    dateInput.value = item.endsAt.slice(0,10)
    
    let selectedOption = document.querySelector("option.selected")

    selectedOption.innerHTML = item.endsAt.slice(11,16)
    console.log(selectedOption);

};

document.addEventListener("DOMContentLoaded", (event) => {

    if (id != null){
        heading.innerText = "Update your listing"
        submitBtn.innerText = "Update"
        submitBtn.id = "update"
        console.log("TRUE");
        getSinglePost(listItemURL + "/" + id)
    }
});