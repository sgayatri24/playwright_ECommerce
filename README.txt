This document contains name of the test script & its details which are used for testing of the below story:
Story:
“As a user of an ECommerce website, I want to be able to search for a jacket and add it to my Cart”

Test script name: add-jacket-to-cart.spec.js (present under /tests folder)
There are 2 scenarios tested-
	1. Happy-path: User is able to search jacket on the ecommerce website & add it to cart
 	2. Use case  : User is able to perform various actions on cart details page

Other supporting files (present under /pages folder) used for POM design pattern-
1. home-page.js
2. search-result.js
3. jacket-details.js
4. cart-details.js
 

To run the test script use command-
npx playwright test add-jacket-to-cart

Expected output-
PS C:\Playwright_assignment> npx playwright test add-jacket-to-cart --headed

Running 2 tests using 2 workers
  2 passed (15.2s)

To open last HTML report run:

  npx playwright show-report

PS C:\Playwright_assignment>