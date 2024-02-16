

/************************
*** PORTFOLIO SECTION ***
************************/

// -------------------
// PORTFOLIO SECTION : helper functions for the portfolio section

// --- PORTFOLIO SECTION, GALLERY : cards & populate helper functions ---

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

// --- END PORTFOLIO SECTION : helpers-functions and helper-class ---

/*** END PORTFOLIO SECTION ***/
