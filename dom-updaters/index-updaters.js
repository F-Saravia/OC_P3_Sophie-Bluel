/******************
*** PAGE HEADER ***
******************/
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
/*** END PAGE HEADER ***/

/************************
*** PORTFOLIO SECTION ***
************************/

// -------------------
// PORTFOLIO SECTION : helper functions for the portfolio section

// --- (1) PORTFOLIO SECTION, HEADER : filter buttons helper functions ---

function helper_createFilterButton(jsonCategory) {
    const { id, name } = jsonCategory;
    let filterButton = document.createElement("button");
    filterButton.className = "button-large button-white"
    filterButton.type = "button"
    filterButton.innerText = name;
    filterButton.value = id;
    filterButton.ariaLabel = `Bouton pour montrer les projets de la catégorie ${name}`

    if (id === -1) {
        filterButton.classList.add("filter-all-categories")
    } else {
        filterButton.classList.add("filter-category-value")
    }

    return filterButton
}

function helper_setFilterButtonState(btn, state) {
    if (state === "green") {
        btn.classList.add("button-green");
        btn.classList.remove("button-white");
        return;
    }
    if (state === "white") {
        btn.classList.add("button-white");
        btn.classList.remove("button-green");
        return;
    }
}

function helper_toggleFilterButtonState(btn) {
    btn.classList.toggle("button-white");
    btn.classList.toggle("button-green");
}

// --- (2) PORTFOLIO SECTION, GALLERY : cards & populate helper functions ---

function helper_createPortfolioWorkCard(jsonWork) {
    const { title, imageUrl, category } = jsonWork;
    let card = document.createElement("figure")
    card.innerHTML = `
    <img loading="lazy" src="${imageUrl}" alt="${title}"/>
    <figcaption>${title}</figcaption>
    `
    // <p>Catégorie: ${category.name}</p>

    return card;
}

function helper_populatePortfolioGallery(arrayOfWorks) {
    if (!Array.isArray(arrayOfWorks)) {
        throw new Error("Must be an array of work objects")
    }

    const galleryContainer = document.querySelector("#portfolio .gallery");
    galleryContainer.innerHTML = ""

    arrayOfWorks.forEach(work => {
        galleryContainer.appendChild(
            helper_createPortfolioWorkCard(work)
        )
    });
}

async function helper_updatePortfolioGallery() {
    let worksToDisplay = await WorksManager.getWorks();
    if (worksToDisplay) {
        helper_populatePortfolioGallery(worksToDisplay);
    }
}



// helper class to store/remove selected filters then trigger filtering function then update the gallery
class FiltersState {
    #selectedFilters

    constructor() {
        this.#selectedFilters = [];
    }

    #getWorks_FilteredByCategories() {
        return WorksManager.getWorks()
            .then(
                works => {
                    return this.none_or_all_categories_are_selected()
                        ? works
                        : works.filter(
                            work => this.#selectedFilters.includes(work.categoryId)
                        )
                }
            )
    }

    #updateFilteredGallery() {
        this.#getWorks_FilteredByCategories().then(
            filteredWorks => {
                helper_populatePortfolioGallery(filteredWorks)
            }
        )
    }

    toggleCategory(categoryID) {
        //N.B: -1 corresponds to "Tous" button
        if (categoryID === -1) {
            this.#selectedFilters = [];
        } else {
            //removes the category
            if (this.#selectedFilters.includes(categoryID)) {
                this.#selectedFilters.splice(this.#selectedFilters.indexOf(categoryID), 1);
            }
            //adds the category
            else {
                this.#selectedFilters.push(categoryID)
            }
        }

        this.#updateFilteredGallery();
    }

    none_or_all_categories_are_selected() {
        return this.#selectedFilters.length === 0 || this.#selectedFilters.length === CategoriesManager.countAllCategories;
    }
}
// --- END PORTFOLIO SECTION : helpers-functions and helper-class ---

// -------------------
// PORTFOLIO SECTION : Header Updates

async function onLoad_updatePortfolioHeader() {
    let portfolioHeader = document.querySelector(".portfolio__header");

    // Header-case: user logged-in => Button 'Modifier' instead of filter buttons
    if (UsersManager.isLogged()) {
        portfolioHeader.classList.add("user-logged-in");
        portfolioHeader.classList.remove("user-logged-out");
        const btnModify = document.createElement("button");
        btnModify.type = "button"
        btnModify.id = "show-gallery-modal";
        btnModify.className = "button-small";
        btnModify.ariaLabel = "Bouton pour gérer l'ensemble des projets (ajouter ou supprimer des projets)"
        btnModify.innerHTML = `
        <i class="fa-regular fa-pen-to-square"></i>
        modifier
        `;
        portfolioHeader.appendChild(btnModify);
    }

    // Header-case: user logged-out : Filters buttons ('Tous' + each category) instead of button 'Modifier'
    else {
        //Container  for filter buttons
        portfolioHeader.classList.add("user-logged-out");
        portfolioHeader.classList.remove("user-logged-in");
        const filtersContainer = document.createElement("div");
        filtersContainer.classList.add("filters-container");

        //Button: 'Tous'
        const buttonTous = helper_createFilterButton({ id: -1, name: "Tous" })
        filtersContainer.appendChild(buttonTous)

        //Buttons: categories.forEach(...)
        let categories = await CategoriesManager.getCategories();
        if (categories && Array.isArray(categories)) {
            categories.forEach(category => {
                filtersContainer.appendChild(
                    helper_createFilterButton(category)
                );
            });
        }
        portfolioHeader.appendChild(filtersContainer);
    }
}
// --- END PORTFOLIO SECTION : Header Updates ---

// --- END PORTFOLIO SECTION : Gallery ---
/*** END PORTFOLIO SECTION ***/
