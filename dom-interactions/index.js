async function onPageLoad() {
    onLoad_updatePageHeader(); //depends if user is logged in or not. (index-updaters.js)
    await onLoad_updatePortfolioHeader(); //depends if user is logged in or not. (index-updaters.js)
    await helper_updatePortfolioGallery(); //fetch from api works to display. (index-updaters.js)
}

(async function () {
    await onPageLoad();

    // page-header, login/logout button: onclick
    document.getElementById("login-logout").addEventListener("click", event => {
        event.preventDefault();
        if (UsersManager.isLogged()) {
            UsersManager.logout();
            window.location.reload()
        }
        else {
            window.location.replace("./login.html");
        }
    })

    /* Portfolio section interactions
     *
     * Portfolio-Header:
     * 
     *      1- user is logged-in:
     *          button 'Modifer' => interaction: display gallery-modal
     * 
     *      2- user is logged-out:
     *          filter buttons => interaction: update displayed works
     */

    // 1- 'Modifier' => display gallery-modal
    // due to loading operations at the appearance of the gallery-modal
    // this interaction allowing to show the modal it's located at modals.js => /***** Gallery Modal *****/

    // 2- Filter buttons
    if (!UsersManager.isLogged()) {
        //instance to keep track of selected categories (class definition at index-updaters.js)
        const filtersState = new FiltersState()

        //dom elements: filter buttons (tous + categories buttons)
        const filterBtn_Tous = document.querySelector(".filter-all-categories");
        const filterBtns_Categories = document.querySelectorAll(".filter-category-value");

        //initialize "Tous" button with 'button-green' because by default filter buttons are set to 'button-white'
        if (filtersState.none_or_all_categories_are_selected()) {
            helper_setFilterButtonState(filterBtn_Tous, "green");
        }

        //INTERACTION: Button "Tous"
        filterBtn_Tous.addEventListener("click", () => {
            const categoryId = parseInt(filterBtn_Tous.value);
            filtersState.toggleCategory(categoryId);
            helper_setFilterButtonState(filterBtn_Tous, "green");

            filterBtns_Categories.forEach((categoryBtn) => {
                helper_setFilterButtonState(categoryBtn, "white");
            });
        })

        //INTERACTION: each category filter-button
        filterBtns_Categories.forEach((categoryBtn) => {
            const categoryId = parseInt(categoryBtn.value);
            categoryBtn.addEventListener("click", () => {
                filtersState.toggleCategory(categoryId);
                helper_toggleFilterButtonState(categoryBtn);

                //update 'Tous' if necessary
                if (filtersState.none_or_all_categories_are_selected()) {
                    filtersState.toggleCategory(-1);  // -1 is the id of "Tous" category
                    helper_setFilterButtonState(filterBtn_Tous, "green");
                    filterBtns_Categories.forEach((button) =>
                        helper_setFilterButtonState(button, "white")
                    );
                } else {
                    helper_setFilterButtonState(filterBtn_Tous, "white");
                }
            })

        })
    }
})()