if (UsersManager.isLogged()) {
    const galleryModal = document.getElementById("gallery-modal");
    const addPhotoModal = document.getElementById("addPhoto-modal");

    /**** Modals-Header: Close both modals at the same time ****/
    const closeBtns_AllModals = document.querySelectorAll(".close-all-modals");
    closeBtns_AllModals.forEach((btn) => {
        btn.addEventListener("click", () => {
            galleryModal.close();
            addPhotoModal.close();
        })
    })

    /////////////////////////////////
    //////*** GALLERY MODAL ***//////
    /////////////////////////////////

    const show_GalleryModal = document.getElementById("show-gallery-modal");

    function domHelper_addEventListeners_deleteWorkBtn() {
        const deleteWorkBtns = document.querySelectorAll(".btn-delete-work");
        deleteWorkBtns.forEach(deleteBtn => {
            deleteBtn.addEventListener("click", async event => {

                displayPopoverInfoMessage("Projet supprimé avec succès")

            })
        })
    }

    // Gallery-modal: show & load operations
    show_GalleryModal.addEventListener("click", async () => {
        // open gallery modal
        galleryModal.showModal();

        // populate gallery modal
        await helper_updateModalGallery();

        // add event listener for delete buttons
        domHelper_addEventListeners_deleteWorkBtn();
    })

    // Gallery-modal: close, button 'X'
    /* Note:
     * le bouton 'X' de gallery-modal est celui du modal-header commun aux deux vues modales 
     * et il correspond à close-all-modals.
     */

    //Gallery-modal: close on outside-click of the modal window
    galleryModal.addEventListener("mousedown", (event) => {
        if (event.target == galleryModal) {
            galleryModal.close()
        }
    })

    /////////////////////////////////////
    //////*** END GALLERY MODAL ***//////
    /////////////////////////////////////
}