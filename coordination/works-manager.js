class WorksManager {
    static async getWorks() {
        let works = ClientStorage.getWorks()
        if (!works) {
            works = await HTTPRequests.getWorks();
            ClientStorage.setWorks(works);
        }
        return works;
    }

    static async addWork(formData) {
        console.log(`FormData: ${formData}`)
        const userToken = ClientStorage.getCurrentUserToken();
        const postedWork = await HTTPRequests.addWork(formData, userToken);
        if (postedWork) {
            const { categoryId, ...work } = postedWork
            work.category = await CategoriesManager.getCategoryByID(categoryId);
            ClientStorage.addWork(work);
        }
    }

    static async deleteWork(workId) {
        const userToken = ClientStorage.getCurrentUserToken();
        const deletionSuccess = await HTTPRequests.deleteWork(workId, userToken);
        if (deletionSuccess) {
            ClientStorage.deleteWork(workId);
        }
    }
}