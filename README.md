# Playwright Demo Framework

A beginner-friendly Playwright test automation framework with demo tests against public websites.

## Project Structure

```
playwright/
├── pages/                    # Page Object Model classes
│   ├── TodoPage.ts           # Todo app page object
│   └── LoginPage.ts          # Login page object
├── tests/                    # Test files
│   ├── todo-app.spec.ts      # Todo MVC app tests
│   ├── login.spec.ts         # Login/logout tests
│   └── visual-and-api.spec.ts # Navigation, assertions & API tests
├── test-data/                # Test data (JSON)
│   ├── users.json            # User credentials
│   ├── todos.json            # Todo items
│   └── urls.json             # Demo URLs reference
├── playwright.config.ts      # Playwright configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies and scripts
```

## Prerequisites

- **Node.js** version 18 or later — [download here](https://nodejs.org/)
- **npm** (comes with Node.js)

Verify your installation:

```bash
node --version   # should print v18.x or higher
npm --version
```

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Install Playwright browsers

```bash
npx playwright install
```

This downloads Chromium, Firefox, and WebKit browser binaries.

## Running Tests

### Run all tests (all browsers)

```bash
npm test
```

### Run tests on a specific browser

```bash
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

### Run tests in headed mode (see the browser)

```bash
npm run test:headed
```

### Run tests with Playwright UI mode (interactive)

```bash
npm run test:ui
```

### Run tests in debug mode (step through)

```bash
npm run test:debug
```

### Run a specific test file

```bash
npx playwright test tests/todo-app.spec.ts
npx playwright test tests/login.spec.ts
```

### Run tests matching a keyword

```bash
npx playwright test -g "should add a new todo"
```

## Reports

### HTML Report

After running tests, an HTML report is automatically generated. To open it:

```bash
npm run report
```

This opens a detailed, interactive report in your browser showing:
- Pass/fail status for each test
- Test duration
- Screenshots on failure
- Video recordings on failure
- Trace viewer for debugging

### JSON Report

A JSON report is also saved to `test-results/results.json` for CI integration.

### Trace Viewer

When a test fails on the first retry, a trace is captured. View it with:

```bash
npx playwright show-trace test-results/<test-folder>/trace.zip
```

The trace viewer shows:
- Step-by-step actions
- DOM snapshots before and after each action
- Network requests
- Console logs

## Multi-Browser Testing

The framework is configured to run tests across **5 browser profiles**:

| Project         | Browser / Device    |
|-----------------|---------------------|
| `chromium`      | Desktop Chrome      |
| `firefox`       | Desktop Firefox     |
| `webkit`        | Desktop Safari      |
| `mobile-chrome` | Pixel 5 (mobile)    |
| `mobile-safari` | iPhone 12 (mobile)  |

Run a specific project:

```bash
npx playwright test --project=chromium
npx playwright test --project=mobile-chrome
```

Run multiple projects:

```bash
npx playwright test --project=chromium --project=firefox
```

## Demo URLs Used

| URL | What It Tests |
|-----|---------------|
| https://demo.playwright.dev/todomvc | Todo CRUD, filtering, page objects |
| https://the-internet.herokuapp.com/login | Login/logout, form submission |
| https://the-internet.herokuapp.com/checkboxes | Checkbox interactions |
| https://the-internet.herokuapp.com/dropdown | Dropdown selection |
| https://jsonplaceholder.typicode.com | API testing (GET, POST) |

## Key Concepts Demonstrated

- **Page Object Model (POM)** — reusable page classes in `pages/`
- **Test Data Separation** — JSON files in `test-data/`
- **Multi-Browser Testing** — Chromium, Firefox, WebKit + mobile
- **API Testing** — `request` fixture for REST API tests
- **Auto-Retries** — configurable retry on failure
- **Screenshots & Videos** — captured on failure
- **Traces** — full execution trace for debugging
- **HTML Reports** — interactive test report

## Useful Commands Reference

| Command | Description |
|---------|-------------|
| `npx playwright test` | Run all tests |
| `npx playwright test --headed` | Run with visible browser |
| `npx playwright test --ui` | Interactive UI mode |
| `npx playwright test --debug` | Step-through debugger |
| `npx playwright show-report` | Open HTML report |
| `npx playwright codegen <url>` | Record and generate test code |
| `npx playwright test --project=chromium` | Run on specific browser |

## Code Generation

Playwright can record your browser actions and generate test code:

```bash
npm run codegen
```

This opens a browser and a code inspector. Interact with any website and Playwright writes the test code for you.
