if (UsersManager.isLogged()) {
    const galleryModal = document.getElementById("gallery-modal");
    const addPhotoModal = document.getElementById("addPhoto-modal");

    /**** Modals-Header: Close both modals at the same time ****/
    const closeBtns_AllModals = document.querySelectorAll(".close-all-modals");
    closeBtns_AllModals.forEach((btn) => {
        btn.addEventListener("click", () => {
            helper_resetAddPhotoForm();
            addPhotoModal.close();
            galleryModal.close();
        })
    })

    //////////////////////////////////
    //////*** MODAL: GALLERY ***//////
    //////////////////////////////////

    const show_GalleryModal = document.getElementById("show-gallery-modal");

    function domHelper_addEventListeners_deleteWorkBtn() {
        const deleteWorkBtns = document.querySelectorAll(".btn-delete-work");
        deleteWorkBtns.forEach(deleteBtn => {
            deleteBtn.addEventListener("click", async event => {
                const workId = deleteBtn.dataset.workid
                try {
                    await WorksManager.deleteWork(workId)
                    displayPopoverInfoMessage("Projet supprimé avec succès")
                    await helper_updateModalGallery();
                    await helper_updatePortfolioGallery();
                    domHelper_addEventListeners_deleteWorkBtn();  // Update Event Listener after deleting a Work
                } catch (error) {
                    console.error('Error: ', error);
                }
            })
        })
    }

    // SHOW gallery modal & LOAD operations
    show_GalleryModal.addEventListener("click", async () => {
        // open gallery modal
        galleryModal.showModal();

        // populate gallery modal
        await helper_updateModalGallery();

        // add event listener for delete buttons
        domHelper_addEventListeners_deleteWorkBtn();
    })

    // CLOSE gallery modal
    /* Note:
     * le bouton 'X' de gallery-modal est celui du modal-header commun aux deux vues modales 
     * et il correspond à close-all-modals.
     */

    //CLOSE on outside-click of the modal window
    galleryModal.addEventListener("mousedown", (event) => {
        if (event.target == galleryModal) {
            galleryModal.close()
        }
    })

    //////////////////////////////////
    ////*** END MODAL: GALLERY ***////
    //////////////////////////////////

    ////////////////////////////////////
    //////*** MODAL: ADD PHOTO ***//////
    ////////////////////////////////////
    const showBtns_AddPhotoModal = document.querySelectorAll(".showModal-addPhoto");
    const closeBtns_AddPhotoModal = document.querySelectorAll(".closeModal-addPhoto");

    const addPhoto_form = document.querySelector(".addPhoto__form");
    const addPhoto_choseImgBtns = document.querySelectorAll(".addPhoto__chooseImg-button");
    const addPhoto_imgInput = document.getElementById("addPhoto__hidden-img-input");
    const addPhoto_titleInput = document.getElementById("addPhoto__title");
    const addPhoto_categorySelect = document.getElementById("addPhoto__category");
    const addPhoto_submitBtn = document.getElementById("addPhoto__submit");

    const fromValidityState = new FormValidityState([
        {
            name: "addPhoto_imgInput",
            htmlElement: addPhoto_imgInput,
            customValidation: () => helper_validateImageInput(addPhoto_imgInput.files[0])
        },
        {
            name: "addPhoto_titleInput",
            htmlElement: addPhoto_titleInput
        },
        {
            name: "addPhoto_categorySelect",
            htmlElement: addPhoto_categorySelect
        }
    ])

    /***** AddPhoto Modal: show/close *****/
    // SHOW add-photo modal
    showBtns_AddPhotoModal.forEach((btn) => {
        btn.addEventListener("click", async () => {
            helper_resetAddPhotoForm();
            addPhotoModal.showModal();
            //enable/disable submit button
            addPhoto_submitBtn.disabled = !fromValidityState.isFormValid();
        })
    })

    // CLOSE add-photo modal
    closeBtns_AddPhotoModal.forEach((btn) => {
        btn.addEventListener("click", () => {
            helper_resetAddPhotoForm();
            addPhotoModal.close();
        })
    })
    //CLOSE on outside-click of the modal window
    addPhotoModal.addEventListener("mousedown", (event) => {
        if (event.target == addPhotoModal) {
            helper_resetAddPhotoForm();
            addPhotoModal.close()
        }
    })

    /***** AddPhoto Modal: form *****/
    /** photo input: placeholder/preview logic
     * 
     * 1- Click events: link (add/change)-photo-buttons 'click' event to hidden input[type="file"] 'click' event
     * 
     * 2- Change event: use hidden input[type="file"] 'change' event to implement preview operations
     */

    // 1 - Photo Input: link click events
    addPhoto_choseImgBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            addPhoto_imgInput.click();
        })
    })
    // 2- Photo Input: validation and preview operation
    addPhoto_imgInput.addEventListener('input', () => {
        if (!addPhoto_imgInput.files.length) { return; }
        const file = addPhoto_imgInput.files[0];

        //cant use built-in setCustomValidity and reportValidity because the input[type='file'] is hidden...
        const errorMessage = document.getElementById("addPhoto__errorMessage")

        try {
            fromValidityState.onInputValidation('addPhoto_imgInput');
            helper_photoInput_displayPreview(file)
            errorMessage.innerText = "";
            errorMessage.style.display = "none";
        } catch (error) {
            helper_resetPhotoInput();
            errorMessage.innerText = error.message;
            errorMessage.style.display = "block";
        } finally {
            //enable/disable submit button
            addPhoto_submitBtn.disabled = !fromValidityState.isFormValid();
        }
    });

    /** Title input **/
    addPhoto_titleInput.addEventListener("input", event => {
        fromValidityState.onInputValidation('addPhoto_titleInput');
        //enable/disable submit button
        addPhoto_submitBtn.disabled = !fromValidityState.isFormValid();
    });

    /** Category: populate select with categories options  **/
    CategoriesManager.getCategories()
        .then(categories => {
            categories.forEach(category => {
                addPhoto_categorySelect.appendChild(
                    helper_createModalSelectOption(category)
                )
            })
        })

    /** Category input **/
    addPhoto_categorySelect.addEventListener("input", event => {
        fromValidityState.onInputValidation('addPhoto_categorySelect');
        //enable/disable submit button
        addPhoto_submitBtn.disabled = !fromValidityState.isFormValid();
    });

    /** Submit form **/
    addPhoto_form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(addPhoto_form);
        try {
            await WorksManager.addWork(formData);
            displayPopoverInfoMessage("Photo du projet ajoutée avec succès")
            helper_resetAddPhotoForm();
            await helper_updateModalGallery();
            domHelper_addEventListeners_deleteWorkBtn();
            await helper_updatePortfolioGallery();
            addPhotoModal.close();
        } catch (error) {
            console.error('Error: ', error);
        } finally {
            //enable/disable submit button
            addPhoto_submitBtn.disabled = !fromValidityState.isFormValid();
        }
    })
    ////////////////////////////////////
    ////*** END MODAL: ADD PHOTO ***////
    ////////////////////////////////////
}
