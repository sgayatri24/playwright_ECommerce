/*This file contains tests to verify if a user of ecommerce website can select a random jacket & add it to the cart.
 * 
 * There are 2 scenarios tested-
 * 
 * 1. Happy-path: User is able to search for a jacket on the ecommerce website & add it to cart
 *  This test verifies following points-
 *      a. Land on ECommerce website's home page & search for a jacket using the search box
 *      b. Alert notification after adding the jacket
 *      c. Check quantity as 1 & the price greater than $0.00
 *      
 * 2. Use case: User is able to perform various actions on cart details page
 *  This test verifies following points-
 *      a. Remove jacket from cart and add it back again
 *      b. Update the quantity of jacket and sees correct price & quantity
*/

//Import different POM classes
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { SearchResult } from '../pages/search-result';
import { JacketDetails } from '../pages/jacket-details';
import { CartDetails } from '../pages/cart-details';

test.beforeEach(async ({ page }) => {
    await page.goto('https://magento.softwaretestingboard.com/');
});

//Test scenario 1
test('Happy-path: User can search for a jacket and add it to the cart', async ({ page }) => {

    //Initialize objects for POM classes
    const HOME = new HomePage(page)
    const JACKET = new SearchResult(page, 'Adrienne Trek Jacket')
    const ADD_JACKET = new JacketDetails(page, 'M', 'Orange')
    const CART_VALUES = new CartDetails(page)

    //Verify user is on the home page
    await expect(page).toHaveTitle("Home Page");

    await HOME.searchItem('jacket')

    //Verify search result
    await expect(page).toHaveURL("https://magento.softwaretestingboard.com/catalogsearch/result/?q=jacket");

    await JACKET.openJacketDetails()

    //Verify jacket's details page is displayed
    await expect(page).toHaveURL("https://magento.softwaretestingboard.com/adrienne-trek-jacket.html");

    await ADD_JACKET.selectSizeAndColor()

    //Verify default quantity is 1
    const defaultQuantityField = page.getByLabel('Qty');
    const defaultQuantity = await defaultQuantityField.getAttribute('value');
    await expect(defaultQuantity).toEqual('1');

    await ADD_JACKET.clickOnAdd()

    //Verify alert is displayed when add button is clicked
    await expect(page.getByRole("alert")).toBeVisible();

    //Verify cart item quantity 1 is displayed on the jacket details page
    await expect(page.locator(".counter-number").getByText("1")).toBeVisible();

    await CART_VALUES.seeCartDetails()

    //Verify on the cart details page, 1 is displayed as the quantity
    await expect(page.locator("//span[@class='count']").getByText("1")).toBeVisible();

    //Verify the total cart amount is greater than $0.00
    var priceWithCurrency = await page.locator("(//span[@class='price'])[1]").textContent();
    var price = parseFloat(priceWithCurrency.replace('$', ''));
    expect(price).toBeGreaterThan(0.00);
});


//Test scenario 2
test('Use case: User can remove jacket from cart, add it back and update quantity', async ({ page }) => {

    //Initialize objects for POM classes
    const HOME = new HomePage(page)
    const JACKET = new SearchResult(page, 'Adrienne Trek Jacket')
    const ADD_JACKET = new JacketDetails(page, 'M', 'Orange')
    const CART_VALUES = new CartDetails(page)

    await HOME.searchItem('jacket')

    await JACKET.openJacketDetails()

    //Verify user sees error message if he clicks on add button without selecting size and color
    await ADD_JACKET.clickOnAdd()
    await expect(page.locator('[id="super_attribute\\[143\\]-error"]')).toBeVisible();    //error message for no size selected
    await expect(page.locator('[id="super_attribute\\[93\\]-error"]')).toBeVisible();    //error message for no color selected

    await ADD_JACKET.selectSizeAndColor()

    await ADD_JACKET.clickOnAdd()

    await expect(page.getByRole("alert")).toBeVisible();

    await CART_VALUES.seeCartDetails()

    await CART_VALUES.removeItemFromCart()

    //Verify user sees item removal confirmation message
    await expect(page.getByText('Are you sure you would like to remove this item from the shopping cart?')).toBeVisible();

    await CART_VALUES.confirmDeletion()

    //Verify user sees no items in the cart once they are removed
    await expect(page.getByText('You have no items in your shopping cart.')).toBeVisible();

    await CART_VALUES.closeCart()

    //Verify user is able to add the item again
    await ADD_JACKET.clickOnAdd()

    await expect(page.getByRole("alert")).toBeVisible();

    await expect(page.locator(".counter-number").getByText("1")).toBeVisible();

    await CART_VALUES.seeCartDetails()

    await expect(page.locator("//span[@class='count']").getByText("1")).toBeVisible();

    //Verify total cart price is greater than $0.00
    var priceWithCurrency = await page.locator("(//span[@class='price'])[1]").textContent();
    var priceOfOne = parseFloat(priceWithCurrency.replace('$', ''));
    expect(priceOfOne).toBeGreaterThan(0.00);

    await CART_VALUES.updateQuantity('2')

    //Verify user sees correct quantity & price after updating the quantity as 2 on cart details page
    await expect(page.locator("//span[@class='count']").getByText("2")).toBeVisible();

    //Verify user sees correct price for 2 items
    var priceWithCurrencyforTwo = await page.locator("(//span[@class='price'])[1]").textContent();
    var priceOfTwo = parseFloat(priceWithCurrencyforTwo.replace('$', ''));
    expect(priceOfTwo).toEqual(2 * priceOfOne);
});