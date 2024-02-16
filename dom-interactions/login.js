function onPageLoad() {
    onLoad_updatePageHeader();
    onLoad_updateLoginSection();
}

onPageLoad();

// header > login/logout click event handler
document.getElementById("login-logout").addEventListener("click", event => {
    event.preventDefault();
    if (UsersManager.isLogged()) {
        UsersManager.logout();
        window.location.reload();
    }
    else {
        window.location.replace("./login.html");
    }
})

// section login > login-form submit event handler
!UsersManager.isLogged() && document.getElementById("login-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    let email = document.getElementById("email-input");
    let password = document.getElementById("password-input");
    const errorMessage = document.getElementById("login-errorMessage")

    try {
        await UsersManager.login({ email: email.value, password: password.value });
        errorMessage.innerText = "";
        errorMessage.style.display = "none";
    } catch (error) {
        errorMessage.innerText = error.message;
        errorMessage.style.display = "block";
    }
})
