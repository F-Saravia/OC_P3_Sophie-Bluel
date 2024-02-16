class CategoriesManager {
    static countAllCategories = 0;
    static async getCategories() {
        let categories = ClientStorage.getCategories()
        if (!categories) {
            categories = await HTTPRequests.getCategories();
            ClientStorage.setCategories(categories);
        }
        this.countAllCategories = categories.length;
        return categories;
    }

    static async getCategoryByID(categoryID) {
        const categories = await CategoriesManager.getCategories()
        return categories.find(category => category.id === categoryID);
    }
}