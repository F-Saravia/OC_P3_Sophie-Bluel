const routes = {
    'login': () => "http://localhost:5678/api/users/login",
    'get-categories': () => "http://localhost:5678/api/categories",
    'get-works': () => "http://localhost:5678/api/works",
    'post-work': () => "http://localhost:5678/api/works",
    'delete-work': (id) => `http://localhost:5678/api/works/${id}`
}

class HTTPRequests {

    // ---------------------------
    // --- USERS REQUESTS ---
    // ---------------------------
    static #assignErrorMessage_login(status) {
        const message = {
            "401": "Compte introuvable ou non authorisé.\nVérifiez votre adresse mail ou mot de passe s'il vous plaît",
            "404": "Compte introuvable ou non authorisé.\nVérifiez votre adresse mail ou mot de passe s'il vous plaît"
        }
        return message[status] ?? "Connexion utilisateur: erreur inattendue. Veuillez ressayer ultérieurement.";
    }

    static async login(jsonUserEmailAndPassword) {
        return await fetch(
            routes["login"](),
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(jsonUserEmailAndPassword)
            }
        )
            .then((response) => {
                if (!response.ok) {
                    throw new CodedError(
                        response.status,
                        HTTPRequests.#assignErrorMessage_login(response.status)
                    );
                }
                return response.json()
            })
    }

    // ---------------------------
    // --- CATEGORIES REQUESTS ---
    // ---------------------------
    static #assignErrorMessage_getCategories(status) {
        const message = {
            "401": "Vous n'êtes pas authorisé `acceder à cette ressource",
            "404": "Ressource introuvable."
        }
        return message[status] ?? "Chargement des catégories: erreur inattendue.\n Veuillez ressayer ultérieurement.";
    }

    static async getCategories() {
        return fetch(routes["get-categories"]())
            .then((response) => {
                if (!response.ok) {
                    throw new CodedError(
                        response.status,
                        HTTPRequests.#assignErrorMessage_getCategories(response.status)
                    );
                }
                return response.json()
            })
    }

    // ---------------------------
    // ---  WORKS REQUESTS ---
    // ---------------------------
    static #assignErrorMessage_getWorks(status) {
        const message = {
            "401": "Vous n'êtes pas authorisé `acceder à cette ressource",
            "404": "Ressource introuvable."
        }
        return message[status] ?? "Chargement des projets: erreur inattendue. Veuillez ressayer ultérieurement.";
    }

    static async getWorks() {
        return fetch(routes["get-works"]())
            .then((response) => {
                if (!response.ok) {
                    throw new CodedError(
                        response.status,
                        HTTPRequests.#assignErrorMessage_getWorks(response.status)
                    );
                }
                return response.json()
            })

    }
}