# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\Addproperty.spec.js >> Manager → Navigate to Add Property
- Location: tests\Addproperty.spec.js:3:1

# Error details

```
Test timeout of 100000ms exceeded.
```

```
Error: page.waitForURL: Test timeout of 100000ms exceeded.
=========================== logs ===========================
waiting for navigation to "**/manager" until "load"
  navigated to "https://rentgeniux.onrender.com/#/login"
============================================================
```

# Page snapshot

```yaml
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
        - textbox [ref=e36]: victoria
      - generic [ref=e38]:
        - text: Password
        - generic [ref=e41]:
          - textbox [ref=e43]: Victoria@123
          - img [ref=e45] [cursor=pointer]
      - button "Forgot Password?" [ref=e51] [cursor=pointer]:
        - generic [ref=e52]: Forgot Password?
      - button "Login" [ref=e53] [cursor=pointer]:
        - generic [ref=e54]: Login
      - paragraph [ref=e55]: Contact us to get started with RentGeniux Contact Us
```

# Test source

```ts
  1   | const { test, expect } = require('@playwright/test');
  2   | 
  3   | test('Manager → Navigate to Add Property', async ({ page }) => {
  4   |     test.setTimeout(100000);
  5   |     // Open application
  6   |     await page.goto('https://rentgeniux.onrender.com/#/login');
  7   | 
  8   |     // Login
  9   |     await page.locator('input[name="username"]').fill('victoria');
  10  |     await page.locator('input[name="password"]').fill('Victoria@123');
  11  |     await page.getByRole('button', { name: 'Login' }).click();
  12  | 
  13  |     // Wait for dashboard
> 14  |     await page.waitForURL('**/manager');
      |                ^ Error: page.waitForURL: Test timeout of 100000ms exceeded.
  15  |     await page.waitForLoadState('networkidle');
  16  | 
  17  |     // Click Properties menu
  18  |     await page.locator('button.nav-btn')
  19  |         .filter({ hasText: 'Properties' })
  20  |         .click();
  21  | 
  22  |     // Wait for submenu
  23  |     await page.waitForTimeout(1000);
  24  | 
  25  |     // Example: Click Manage Properties
  26  |     // Change the text if your submenu name is different
  27  |     await page.locator('button.submenu-btn')
  28  |         .filter({ hasText: 'Manage Properties' })
  29  |         .click();
  30  | // Verify Add Property page is opened
  31  |     await page.waitForLoadState('networkidle');
  32  | 
  33  |     await page.locator('div.text-black.text-weight-medium', {
  34  |   hasText: 'Add Property'
  35  | }).click();
  36  | 
  37  | await page.waitForTimeout(5000)
  38  |  
  39  | // Click the dropdown
  40  | await page.locator('input[role="combobox"]').click();
  41  | 
  42  | // Wait for options to appear
  43  | await page.waitForSelector('[role="option"]');
  44  | 
  45  | // Select the first person
  46  | await page.locator('[role="option"]').first().click();
  47  | 
  48  | await page.locator('span.block', { hasText: 'Continue' }).click();
  49  | await page.waitForTimeout(1000)
  50  | 
  51  | const propertyData = require('../testdata/addpropertydata');
  52  | const property = propertyData[1];
  53  |        
  54  | // Property Name
  55  | await page.locator('input[type="text"]').first().fill(property.propertyName);
  56  | 
  57  | // Property Type Dropdown
  58  | await page.locator('input[role="combobox"]').nth(0).click();
  59  | await page.waitForSelector('[role="option"]');
  60  | await page.getByText('Large').click();
  61  | 
  62  | // Year Built
  63  | await page.locator('input[type="number"]').nth(0).fill(property.yearBuilt);
  64  | 
  65  |      // Click dropdown
  66  | // Open Furnishing Status dropdown
  67  | 
  68  | 
  69  | // Wait for dropdown options
  70  | await page.waitForTimeout(1000);
  71  | 
  72  | // Print options for debugging
  73  | const options = await page.locator('.q-item').allTextContents();
  74  | console.log(options);
  75  | 
  76  | // Select first option
  77  | await page.locator('.q-item').first().click();
  78  | 
  79  | // Open Furnishing Status dropdown
  80  | // Open Furnishing Status dropdown
  81  | await page.locator('input[role="combobox"]').nth(1).click();
  82  | 
  83  | // Wait for options
  84  | await page.waitForTimeout(2000);
  85  | 
  86  | // Click the first visible option
  87  | await page.locator('[role="option"]').first().click({ force: true });
  88  | 
  89  | await page.locator('input[type="search"][role="combobox"]')
  90  |   .fill(property.address);
  91  | 
  92  | await page.locator('input[type="text"]').nth(1).fill(property.city);
  93  | 
  94  | await page.locator('input[placeholder="Enter country"]').fill(property.country);
  95  | 
  96  | // Open dropdown
  97  | await page.locator('input[role="combobox"]').last().click();
  98  | 
  99  | // Wait for options to appear
  100 | await page.waitForSelector('[role="option"]');
  101 | await page.waitForTimeout(1000);
  102 | 
  103 | // Select first option
  104 | await page.locator('[role="option"]').first().click();
  105 | 
  106 | await page.waitForTimeout(1000);
  107 | 
  108 | await page.getByPlaceholder('Enter city name').fill(property.city);
  109 | 
  110 | await page.locator('input[placeholder="Enter state"]').fill(property.state);
  111 | 
  112 | // By class - target all matching inputs and pick the last one (zip is the last text field)
  113 | await page.locator('input[placeholder="Enter zipcode"]').fill(property.zipCode);
  114 | 
```