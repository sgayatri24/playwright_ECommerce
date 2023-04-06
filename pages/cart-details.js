//This class contains the page locators from the Cart details page & the methods to perform actions on them

exports.CartDetails = class CartDetails {

    constructor(page) {
        this.page = page
        this.cartIcon = page.locator("//a[@class='action showcart']")
        this.removeItem = page.getByRole('link', { name: 'Remove' })
        this.confirmDelete = page.getByRole('button', { name: 'OK' })
        this.closeCartButton = page.getByRole('button', { name: 'Close' })
        this.quantityTextbox = page.getByRole('spinbutton', { name: 'Qty:' })
        this.updateButton = page.getByRole('button', { name: 'Update' })
        this.quantityText = page.locator('#mini-cart').getByText('Qty')

    }

    //Click on cart icon to see details
    async seeCartDetails() {
        await this.cartIcon.click();
    }

    //Click on remove button
    async removeItemFromCart() {
        await this.removeItem.click();
    }

    //Click on confirm delete button
    async confirmDeletion() {
        await this.confirmDelete.click();
    }

    //Click on close cart button
    async closeCart() {
        await this.closeCartButton.click();
    }

    //Update the quantity & click on update button
    async updateQuantity(new_quantity) {
        await this.quantityTextbox.click();
        await this.quantityTextbox.fill('');
        await this.quantityTextbox.fill(new_quantity);
        await this.quantityText.click();
        await this.updateButton.click();
    }
}