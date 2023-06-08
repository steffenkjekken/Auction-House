const feedbackModal = document.getElementById("regBody");

let successReg = `<div class="modal-content">
<div class="modal-header">
  <h5 class="modal-title" id="feedback">Profile succesfully registered</h5>
  <button type="button" class="btn-close" data-dismiss="modal">
  </button>
</div>
<div class="modal-body">
  Redirecting you back to our login in a few seconds
</div>
<div class="modal-footer">
  <button type="button" class="btn btn-success" data-dismiss="modal" onclick="window.location.href='index.html';">Take me to login page now</button>
</div>
</div>`

function regSuccess () {
    feedbackModal.innerHTML = successReg
}

export async function register (url, data) {
    try {
        const options = {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(data),
        };
        console.log(url, data, options);

        const response = await fetch(url, options); 
        console.log(response);
        const answer = await response.json();
        console.log(answer);

        if (response.ok){
            regSuccess()
            setTimeout(() => {
                window.location.reload();
             }, 5000);
        }

        else if (!answer.ok) {
            alert("Wrong Email or Password")
        }

    } catch(error) {
        console.warn(error);
    }
};