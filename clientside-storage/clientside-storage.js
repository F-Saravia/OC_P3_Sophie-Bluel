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

    // ---------------------------
    // --- CATEGORIES STORAGE ---
    // ---------------------------

    static setCategories(jsonCategories) {
        localStorage.setItem("SBPortfolio-categories", JSON.stringify(jsonCategories));
    }

    static getCategories() {
        return JSON.parse(localStorage.getItem("SBPortfolio-categories"))
    }

    // ---------------------------
    // --- WORKS STORAGE ---
    // ---------------------------

    static setWorks(works) {
        localStorage.setItem("SBPortfolio-works", JSON.stringify(works))
    }

    static getWorks() {
        return JSON.parse(localStorage.getItem("SBPortfolio-works"))
    }

    // TO-DO: improve add logic...¿¿direct string manipulation??
    static addWork(jsonWork) {
        const works = ClientStorage.getWorks();
        works.push(jsonWork);
        ClientStorage.setWorks(works);
    }

    // TO-DO: improve delete logic...¿?
    static deleteWork(workId) {
        const works = ClientStorage.getWorks();
        ClientStorage.setWorks(
            works.filter(work => work.id != workId)
        );
    }
}