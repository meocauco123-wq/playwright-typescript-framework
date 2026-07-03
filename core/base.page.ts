import {Page} from '@playwright/test';
import { config } from './config';

export class BasePage {
    constructor(protected page: Page) {}

    async visit(path: string) {
        await this.page.goto(`${config.baseURL}${path}`);
    }
}