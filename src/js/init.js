const auth = new Auth();

document.getElementById("logout").addEventListener("click", (e) => {
	auth.logOut();
});

document.getElementById("logoutMobile").addEventListener("click", (e) => {
	auth.logOut();
});