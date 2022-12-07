class Auth {
	constructor() {
		const auth = localStorage.getItem("accessToken");
		this.validateAuth(auth);
	}

	validateAuth(auth) {
		if (auth != null) {
            document.body.classList.add("logged-in")
	    }
    }

	logOut() {
		localStorage.removeItem("accessToken");
        localStorage.removeItem("username");
        document.body.classList.remove("logged-in")
	}

    
}
