//////////////////////////////////
//////*** MODAL: GALLERY ***//////
//////////////////////////////////
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
//////////////////////////////////
////*** END MODAL: GALLERY ***////
//////////////////////////////////

////////////////////////////////////
//////*** MODAL: ADD PHOTO ***//////
////////////////////////////////////

function helper_validateImageInput(file) {
    //file types allowed -> jpeg, jpg, png
    const fileTypes = ["image/jpeg", "image/png", "image/jpg"];
    // max file size -> 4MB
    const maxFileSize = 4 * 1024 * 1024;
    if (!fileTypes.includes(file.type)) {
        throw new CodedError("img-format", "Format non accepté.  Veuillez choisir une image au format .jpeg/.jpg/.png");
    }

    if (file.size > maxFileSize) {
        throw new CodedError("img-size", "L'image est trop grande. Maximum 4mo.");
    }
    return true;
}

function helper_resetPhotoInput() {
    const inputFile = document.getElementById("addPhoto__hidden-img-input")
    const placeholder = document.querySelector(".addPhoto__img-placeholder-container");
    const previewContainer = document.querySelector(".addPhoto__img-preview-container");
    const previewImg = document.querySelector(".addPhoto__img-preview-container img");
    const previewFileName = document.querySelector(".addPhoto__img-preview-container p");

    placeholder.classList.remove("hidden");
    previewContainer.classList.add("hidden");

    inputFile.value = "";
    inputFile.files[0] = null;
    previewFileName.innerText = "";
    previewImg.src = "";
    previewImg.alt = "";

}

function helper_resetAddPhotoForm() {
    const form_AddPhotoModal = document.querySelector(".addPhoto__form");
    const errorMessage = document.getElementById("addPhoto__errorMessage")
    form_AddPhotoModal.reset();
    helper_resetPhotoInput();
    errorMessage.innerText = "";
    errorMessage.style.display = "none";
}

function helper_createModalSelectOption(jsonCategory) {
    const { id, name } = jsonCategory;
    let option = document.createElement('option');
    option.value = id;
    option.innerText = name;
    return option;
}

function helper_photoInput_displayPreview(file = null) {
    const placeholder = document.querySelector(".addPhoto__img-placeholder-container");
    const previewContainer = document.querySelector(".addPhoto__img-preview-container");
    const previewImg = document.querySelector(".addPhoto__img-preview-container img");
    const previewFileName = document.querySelector(".addPhoto__img-preview-container p");

    placeholder.classList.add("hidden");
    previewContainer.classList.remove("hidden");
    previewFileName.innerText = file.name;
    previewImg.alt = `Prévisualisation de l'image: ${file.name}`;
    previewImg.src = URL.createObjectURL(file);
    previewImg.onload = () => { URL.revokeObjectURL(previewImg.src); };
}
////////////////////////////////////
////*** END MODAL: ADD PHOTO ***////
////////////////////////////////////
