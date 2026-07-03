import { test, expect } from '@playwright/test';
import { InventoryPage } from '../../../pages/saucedemo/inventory.page';
import { LoginPage } from '../../../pages/saucedemo/login.page';
import { users } from '../../../data/saucedemo/users';
import { products } from '../../../data/saucedemo/products';

test.describe('Inventory feature', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);

        await loginPage.openLoginPage();
        await loginPage.login(
            users.standard.username,
            users.standard.password
        );
        await loginPage.verifyLoginSuccess();
    });

    test('INV-001: INVENTORY page loaded successfully', async () => {
        await inventoryPage.verifyPageLoaded();
    });

    test('INV - 002: Display products after successful login', async () => {
        const productCount = await inventoryPage.getProductCount();
        expect(productCount).toBeGreaterThan(0);
        //expect(productCount).toBeGreaterThanOrEqual(Object.keys(products).length);
        expect(productCount).toBe(Object.keys(products).length);
    });

    test('INV-003: Product names displayed', async () => {
        const names = await inventoryPage.getProductNames();
        expect(names.length).toBeGreaterThan(0);

        for (const name of names) { 
            expect(name.trim()).not.toBe('');
        }
        expect(names).toEqual(Object.values(products).map(product => product.name));
    });

    test('INV-004: Product prices displayed', async () => {
        const prices = await inventoryPage.getProductPrices();
        //console.log('Product prices:', prices); remove this line after debugging
        expect(prices.length).toBeGreaterThan(0);

        for (const price of prices) {
            expect(price.trim()).not.toBe('');
            expect(price).toMatch(/^\$\d+(\.\d{2})?$/);
        }
       
       const actualPrices = prices.map(price =>
            parseFloat(price.replace('$', ''))        );
        const expectedPrices = Object.values(products).map(product => product.price);
        expect(actualPrices).toEqual(expectedPrices);
        // expect(prices).toEqual(Object.values(products).map(product => product.price));
    });

    test('INV-005: Add product to cart', async () => {
       await inventoryPage.addProductToCart(products.bikeLight.id);

       const cartCount = await inventoryPage.getCartCount();
       expect(cartCount).toBe(1);
    });

    test('INV-006: Add multiple products to cart', async () => {
        const productIds = [products.backpack.id, products.bikeLight.id];
        for (const productId of productIds) {
            await inventoryPage.addProductToCart(productId);
        }

        const cartCount = await inventoryPage.getCartCount();
        expect(cartCount).toBe(2);
    });

    test('INV-007: Remove product from Cart', async() => {
        await inventoryPage.addProductToCart(products.bikeLight.id);
        await inventoryPage.removeProductFromCart(products.bikeLight.id);

        const cartCount = await inventoryPage.getCartCount();
        expect(cartCount).toBe(0);

    });

    test('INV-008: Add all products to Cart', async() => {
        const productIds = Object.values(products).map(p => p.id);
        for (const productId of productIds) {
            await inventoryPage.addProductToCart(productId);
        }

        const cartCount = await inventoryPage.getCartCount();
        expect(cartCount).toBe(productIds.length);  

    });

    test('INV-009: Verify cart badge update', async() => {
        await inventoryPage.addProductToCart(products.backpack.id);

        let cartCount = await inventoryPage.getCartCount();
        expect(cartCount).toBe(1);

        await inventoryPage.addProductToCart(products.bikeLight.id);

        cartCount = await inventoryPage.getCartCount();
        expect(cartCount).toBe(2);

        await inventoryPage.removeProductFromCart(products.backpack.id);

        cartCount = await inventoryPage.getCartCount();
        expect(cartCount).toBe(1);

    });

    test('INV-010: verify Product details page', async() => {
        await inventoryPage.openProductDetails(products.backpack.id);
        
        const productName = await inventoryPage.getProductNameOnDetailsPage();
        expect(productName).toBe(products.backpack.name);
        const productDescription = await inventoryPage.getProductDescriptionOnDetailsPage();
        expect(productDescription).toBe(products.backpack.description);
        const productPrice = await inventoryPage.getProductPriceOnDetailsPage();
        expect(productPrice).toBe(`$${products.backpack.price}`);

    });
});
