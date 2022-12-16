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
            location.reload()
        }

        else if (!answer.ok) {
            alert("Wrong Email or Password")
        }

    } catch(error) {
        console.warn(error);
    }
};