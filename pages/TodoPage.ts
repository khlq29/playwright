import { type Page, type Locator } from '@playwright/test';

export class TodoPage {
  readonly page: Page;
  readonly newTodoInput: Locator;
  readonly todoItems: Locator;
  readonly todoCount: Locator;
  readonly clearCompletedButton: Locator;
  readonly toggleAllCheckbox: Locator;
  readonly filterAll: Locator;
  readonly filterActive: Locator;
  readonly filterCompleted: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newTodoInput = page.getByPlaceholder('What needs to be done?');
    this.todoItems = page.getByTestId('todo-item');
    this.todoCount = page.getByTestId('todo-count');
    this.clearCompletedButton = page.getByRole('button', { name: 'Clear completed' });
    this.toggleAllCheckbox = page.getByLabel('Mark all as complete');
    this.filterAll = page.getByRole('link', { name: 'All' });
    this.filterActive = page.getByRole('link', { name: 'Active' });
    this.filterCompleted = page.getByRole('link', { name: 'Completed' });
  }

  async goto() {
    await this.page.goto('./');
  }

  async addTodo(text: string) {
    await this.newTodoInput.fill(text);
    await this.newTodoInput.press('Enter');
  }

  async addMultipleTodos(items: string[]) {
    for (const item of items) {
      await this.addTodo(item);
    }
  }

  async toggleTodo(index: number) {
    await this.todoItems.nth(index).getByRole('checkbox').check();
  }

  async deleteTodo(index: number) {
    await this.todoItems.nth(index).hover();
    await this.todoItems.nth(index).getByRole('button', { name: 'Delete' }).click();
  }

  async editTodo(index: number, newText: string) {
    await this.todoItems.nth(index).dblclick();
    const editInput = this.todoItems.nth(index).getByRole('textbox', { name: 'Edit' });
    await editInput.fill(newText);
    await editInput.press('Enter');
  }

  async filterByAll() {
    await this.filterAll.click();
  }

  async filterByActive() {
    await this.filterActive.click();
  }

  async filterByCompleted() {
    await this.filterCompleted.click();
  }
}
