/////////////////////////////////
//////*** GALLERY MODAL ***//////
/////////////////////////////////
function helper_createModalWorkCard(jsonWork) {
    const { id, title, imageUrl } = jsonWork;
    let card = document.createElement("figure")
    card.innerHTML = `
    <img loading="lazy" src="${imageUrl}" alt="${title}"/>
    <button class="btn-delete-work" data-workid=${id}>
        <i class="fa-solid fa-trash-can"></i>
    </button>
    `
    return card;
}

function helper_populateModalGallery(arrayOfWorks) {
    if (!Array.isArray(arrayOfWorks)) {
        throw new Error("Must be an array of work objects")
    }

    const galleryContainer = document.querySelector(".modal-view .gallery");
    galleryContainer.innerHTML = ""

    arrayOfWorks.forEach(work => {
        galleryContainer.appendChild(
            helper_createModalWorkCard(work)
        )
    });
}

async function helper_updateModalGallery() {
    let worksToDisplay = await WorksManager.getWorks();
    if (worksToDisplay) {
        helper_populateModalGallery(worksToDisplay);
    }
}
/////////////////////////////////////
//////*** END GALLERY MODAL ***//////
/////////////////////////////////////