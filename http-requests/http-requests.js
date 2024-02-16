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

    /* LOGIN FUNCTIONS:
     *  - private function: assign messages to api errors
     *  - http request
     */

    static #assignErrorMessage_login(status) {
        const message = {
            "401": "Compte introuvable ou non authorisé.\nVérifiez votre adresse mail ou mot de passe s'il vous plaît",
            "404": "Compte introuvable ou non authorisé.\nVérifiez votre adresse mail ou mot de passe s'il vous plaît"
        }
        return message[status] ?? "Connexion utilisateur: erreur inattendue.\n Veuillez ressayer ultérieurement.";
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

    /* GET CATEGORIES FUNCTIONS:
     *  - private function: assign messages to api errors
     *  - http request
     */

    static #assignErrorMessage_getCategories(status) {
        const message = {
            "401": "Vous n'êtes pas authorisé à acceder à cette ressource",
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

    /* GET WORKS FUNCTIONS:
     *  - private function: assign messages to api errors
     *  - http request
     */

    static #assignErrorMessage_getWorks(status) {
        const message = {
            "401": "Vous n'êtes pas authorisé à acceder à cette ressource",
            "404": "Ressource introuvable."
        }
        return message[status] ?? "Chargement des projets: erreur inattendue.\n Veuillez ressayer ultérieurement.";
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

    /* ADD WORKS FUNCTIONS:
     *  - private function: assign messages to api errors
     *  - http request
     */
    static #assignErrorMessage_addWork(status) {
        const message = {
            "400": "Erreur dans  la saisie.\n Veuillez vérifier  les champs s'il vous plaît.",
            "401": "Vous n'est pas authorisé à ajouter des projets à la galerie"
        }
        return message[status] ?? "Ajout d'un projet: erreur inattendue.\n Veuillez ressayer ultérieurement.";
    }

    static async addWork(formData, userToken) {
        return fetch(
            routes['post-work'](),
            {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${userToken}`
                },
                body: formData
            }
        )
            .then(response => {
                if (!response.ok) {
                    throw new CodedError(
                        response.status,
                        HTTPRequests.#assignErrorMessage_addWork(response.status)
                    )
                }
                return response.json();
            })
    }

    /* DELETE WORKS FUNCTIONS:
     *  - private function: assign messages to api errors
     *  - http request
     */

    static #assignErrorMessage_deleteWork(status) {
        const message = {
            "401": "Vous n'est pas authorisé à supprimer des projets de la galerie"
        }
        return message[status] ?? "Suppression d'un projet: erreur inattendue.\n Veuillez ressayer ultérieurement.";
    }

    static async deleteWork(workId, userToken) {
        return fetch(
            routes["delete-work"](workId),
            {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${userToken}`
                }
            }
        )
            .then(response => {
                if (!response.ok) {
                    throw new CodedError(
                        response.status,
                        HTTPRequests.#assignErrorMessage_deleteWork(response.status)
                    )
                }
                return true;
            })
    }
}