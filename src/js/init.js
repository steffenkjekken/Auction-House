const auth = new Auth();

document.getElementById("logout").addEventListener("click", (e) => {
	auth.logOut();
});