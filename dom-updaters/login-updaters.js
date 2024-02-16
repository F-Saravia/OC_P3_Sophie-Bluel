function onLoad_updatePageHeader() {
    const login_logout = document.getElementById("login-logout");
    if (UsersManager.isLogged()) {
        login_logout.innerText = "logout";
        login_logout.ariaLabel = "Bouton pour se déconnecter"
    } else {
        login_logout.innerText = "login";
        login_logout.ariaLabel = "Bouton pour naviguer vers la page de connexion"
    }
}

function onLoad_updateLoginSection() {
    if (UsersManager.isLogged()) {
        const loginForm = document.getElementById("login-form")
        loginForm.remove()
        document.querySelector(".login").innerHTML = `
            <h2>Vous êtes déjà  connecté.</h2>
            <a href="./index.html" aria-label="Lien pour naviguer vers la page d'accueil"> Vers la  page d'accueil </a>
        `
    }
}
