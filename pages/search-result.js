//This class contains the page locators from the Search result page & the methods to perform actions on them

exports.SearchResult = class SearchResult {

    constructor(page, seleted_jacket) {
        this.page = page
        this.selectedJacket = page.getByText(seleted_jacket)
    }

    //Click to open selected jacket's details
    async openJacketDetails() {
        await this.selectedJacket.click();
    }
}