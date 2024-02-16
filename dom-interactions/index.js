async function onPageLoad() {
    await helper_updatePortfolioGallery(); //fetch from api works to display. (index-updaters.js)
}

(async function () {
    await onPageLoad();
})()