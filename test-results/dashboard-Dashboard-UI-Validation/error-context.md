# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: dashboard.spec.js >> Dashboard UI Validation
- Location: dashboard.spec.js:3:1

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /.*manager/
Received string:  "https://pms-rent-frontend.onrender.com/#/login"
Timeout: 5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    9 × unexpected value "https://pms-rent-frontend.onrender.com/#/login"

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e6]:
    - generic [ref=e7]:
      - heading "RENTGENIUX" [level=3] [ref=e8]
      - list [ref=e9]:
        - listitem [ref=e10]:
          - img [ref=e11]
          - text: Transparent financial reporting.
        - listitem [ref=e13]:
          - img [ref=e14]
          - text: Unified in-app communication.
        - listitem [ref=e16]:
          - img [ref=e17]
          - text: Secure role based access.
      - img "City Image" [ref=e19]:
        - img [ref=e22]
    - img "Tree Image":
      - generic:
        - img
    - generic [ref=e23]:
      - img "Login Image" [ref=e24]:
        - img [ref=e27]
      - heading "Sign In" [level=5] [ref=e28]
      - paragraph [ref=e29]: Welcome to RentGENIUX, Please enter your login details.
      - generic [ref=e30]:
        - generic [ref=e31]:
          - text: Username
          - textbox [ref=e36]: your-username
        - generic [ref=e38]:
          - text: Password
          - generic [ref=e41]:
            - textbox [ref=e43]: your-password
            - img [ref=e45] [cursor=pointer]
        - button "Forgot Password?" [ref=e51] [cursor=pointer]:
          - generic [ref=e52]: Forgot Password?
        - button "Login" [ref=e53] [cursor=pointer]:
          - generic [ref=e54]: Login
        - paragraph [ref=e55]: Contact us to get started with RentGeniux Contact Us
  - alert [ref=e56]:
    - generic [ref=e58]:
      - img [ref=e59]: warning
      - generic [ref=e60]: Username does not exist
```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test');
  2  | 
  3  | test('Dashboard UI Validation', async ({ page }) => {
  4  | 
  5  |   // 🔹 Step 1: Login
  6  |   await page.goto('https://pms-rent-frontend.onrender.com/#/login');
  7  | 
  8  |   await page.fill('[name="username"]', 'your-username');
  9  |   await page.fill('[name="password"]', 'your-password');
  10 |   await page.click('button[type="submit"]');
  11 | 
  12 |   await page.waitForTimeout(5000);
  13 | 
  14 |   // 🔹 Step 2: Verify Dashboard URL
> 15 |   await expect(page).toHaveURL(/.*manager/);
     |                      ^ Error: expect(page).toHaveURL(expected) failed
  16 | 
  17 |   // 🔹 Step 3: Validate Welcome Text
  18 |   await expect(page.locator('text=Hey')).toBeVisible();
  19 | 
  20 |   // 🔹 Step 4: Validate Cards
  21 |   await expect(page.locator('text=Total Revenue')).toBeVisible();
  22 |   await expect(page.locator('text=Occupancy Rate')).toBeVisible();
  23 |   await expect(page.locator('text=Open Tickets')).toBeVisible();
  24 |   await expect(page.locator('text=Total Rent Collected')).toBeVisible();
  25 |   await expect(page.locator('text=Outstanding Rent')).toBeVisible();
  26 | 
  27 |   // 🔹 Step 5: Validate Buttons
  28 |   await expect(page.locator('text=Add Property')).toBeVisible();
  29 |   await expect(page.locator('text=Add Owner')).toBeVisible();
  30 | 
  31 |   // 🔹 Step 6: Validate Charts Section
  32 |   await expect(page.locator('text=Yearly Revenue')).toBeVisible();
  33 |   await expect(page.locator('text=Units Status')).toBeVisible();
  34 | 
  35 | });
```