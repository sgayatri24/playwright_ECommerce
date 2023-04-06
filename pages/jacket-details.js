//This class contains the page locators from the Jacket details page & the methods to perform actions on them

exports.JacketDetails = class JacketDetails {

    constructor(page,jacket_size,jacket_color) {
        this.page = page
        this.jacketSize = page.getByRole('option', { name: jacket_size })
        this.jacketColor = page.getByRole('option', { name: jacket_color })
        this.addToCart = page.getByRole('button', { name: 'Add to Cart' })
    }

    //Click to select size & color
    async selectSizeAndColor() {
        await this.jacketSize.click();
        await this.jacketColor.click();
    }

    //Click on add to cart button
    async clickOnAdd() {
        await this.addToCart.click();
    }
}