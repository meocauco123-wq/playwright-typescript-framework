import { expect, Locator, Page } from '@playwright/test';



export class InventoryPage {
    readonly page: Page;

    readonly title: Locator;
    readonly inventoryItems: Locator;
    readonly productNames: Locator;
    readonly productPrices: Locator;
    readonly cartBadge: Locator;

    constructor(page: Page) {
        this.page = page;

        this.title = page.locator('.title');

        this.inventoryItems = page.locator('.inventory_item');

        this.productNames = page.locator('[data-test="inventory-item-name"]');

        this.productPrices = page.locator('[data-test="inventory-item-price"]');

        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    }

    async verifyPageLoaded() {
        await expect(this.title).toHaveText('Products');

        await expect(this.page).toHaveURL(/inventory/);
    }

    async getProductCount(): Promise<number> {
        return await this.inventoryItems.count();
    }

    async getProductNames(): Promise<string[]> {
        return await this.productNames.allTextContents();

    }

    async getProductPrices(): Promise<string[]> {
        return await this.productPrices.allTextContents();
    }

    async getCartCount(): Promise<number> {
        
        if (await this.cartBadge.count() === 0) {
            return 0;
        }
        
        const count = await this.cartBadge.textContent();

        return Number(count);
    }

    async addProductToCart(productId: string) {
        const addCart = this.page.locator(`[data-test="add-to-cart-${productId}"]`);
        await addCart.click();
    }

    async removeProductFromCart(productId: string) {
        const removeCart = this.page.locator(`[data-test="remove-${productId}"]`);
        await removeCart.click();
    }

    async openProductDetails(productId: string) {
        const productLink = this.page.locator(`.inventory_item:has([data-test="add-to-cart-${productId}"]) .inventory_item_name`);
        await productLink.click();
    }

    async getProductNameOnDetailsPage(): Promise<string> {
        const nameLocator = this.page.locator('.inventory_details_name');
        return await nameLocator.textContent() || '';
    }

    async getProductDescriptionOnDetailsPage(): Promise<string> {
        const descriptionLocator = this.page.locator('.inventory_details_desc');
        return await descriptionLocator.textContent() || '';
    }

    async getProductPriceOnDetailsPage(): Promise<string> {
        const priceLocator = this.page.locator('.inventory_details_price');
        return await priceLocator.textContent() || '';
    }

}