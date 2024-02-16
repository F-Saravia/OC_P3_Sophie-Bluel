class UsersManager {

    static async login(jsonEmailAndPassword) {
        const userData = await HTTPRequests.login(jsonEmailAndPassword);
        ClientStorage.setCurrentUser(userData)
        window.location.replace("./index.html");
    }

    static isLogged() { return !!ClientStorage.getCurrentUser() }

    static logout() {
        ClientStorage.clearCurrentUser()
    }

    static getUserData() { return ClientStorage.getCurrentUser() }
}