//This class contains the page locators from the Home page & the methods to perform actions on them

exports.HomePage = class HomePage {

    constructor(page) {
        this.page = page
        this.searchBox = page.getByPlaceholder('Search entire store here...')
        this.searchButton = page.getByTitle("Search")
    }

    //Type the search item (jacket) & click on search button
    async searchItem(item) {
        await this.searchBox.click();
        await this.page.keyboard.type(item, { delay: 100 });
        await this.searchButton.click();
    }
}