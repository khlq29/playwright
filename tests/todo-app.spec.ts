import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';
import todoData from '../test-data/todos.json';

test.describe('Todo App', () => {
  let todoPage: TodoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.goto();
  });

  test('should add a new todo item', async () => {
    await todoPage.addTodo(todoData.singleItem);

    await expect(todoPage.todoItems).toHaveCount(1);
    await expect(todoPage.todoItems.first()).toContainText(todoData.singleItem);
  });

  test('should add multiple todo items', async () => {
    await todoPage.addMultipleTodos(todoData.items);

    await expect(todoPage.todoItems).toHaveCount(todoData.items.length);
  });

  test('should mark a todo as completed', async () => {
    await todoPage.addTodo(todoData.singleItem);
    await todoPage.toggleTodo(0);

    await expect(todoPage.todoItems.first()).toHaveClass(/completed/);
  });

  test('should delete a todo item', async () => {
    await todoPage.addMultipleTodos(todoData.items.slice(0, 2));
    await expect(todoPage.todoItems).toHaveCount(2);

    await todoPage.deleteTodo(0);

    await expect(todoPage.todoItems).toHaveCount(1);
  });

  test('should edit a todo item', async () => {
    await todoPage.addTodo(todoData.singleItem);
    await todoPage.editTodo(0, 'Updated Todo');

    await expect(todoPage.todoItems.first()).toContainText('Updated Todo');
  });

  test('should display the correct item count', async () => {
    await todoPage.addMultipleTodos(todoData.items.slice(0, 3));

    await expect(todoPage.todoCount).toContainText('3 items left');
  });

  test('should filter active items', async () => {
    await todoPage.addMultipleTodos(todoData.items.slice(0, 3));
    await todoPage.toggleTodo(0);

    await todoPage.filterByActive();

    await expect(todoPage.todoItems).toHaveCount(2);
  });

  test('should filter completed items', async () => {
    await todoPage.addMultipleTodos(todoData.items.slice(0, 3));
    await todoPage.toggleTodo(0);

    await todoPage.filterByCompleted();

    await expect(todoPage.todoItems).toHaveCount(1);
  });

  test('should clear completed items', async () => {
    await todoPage.addMultipleTodos(todoData.items.slice(0, 3));
    await todoPage.toggleTodo(0);

    await todoPage.clearCompletedButton.click();

    await expect(todoPage.todoItems).toHaveCount(2);
  });

  test('should toggle all todos', async () => {
    await todoPage.addMultipleTodos(todoData.items.slice(0, 3));
    await todoPage.toggleAllCheckbox.check();

    for (const item of await todoPage.todoItems.all()) {
      await expect(item).toHaveClass(/completed/);
    }
  });
});
