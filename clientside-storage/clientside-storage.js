class ClientStorage {

    // ---------------------------
    // --- CURRENT USER STORAGE ---
    // ---------------------------
    static setCurrentUser(jsonUserData) {
        localStorage.setItem("SBPortfolio-userData", JSON.stringify(jsonUserData))
    }

    static getCurrentUser() {
        return JSON.parse(localStorage.getItem("SBPortfolio-userData"))
    }

    static getCurrentUserToken() {
        return JSON.parse(localStorage.getItem("SBPortfolio-userData")).token;
    }

    static clearCurrentUser() {
        localStorage.removeItem("SBPortfolio-userData");
    }
}