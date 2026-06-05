# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\maintenance.spec.js >> Manager → Maintenance → Create Request Flow
- Location: tests\maintenance.spec.js:6:1

# Error details

```
Test timeout of 19000ms exceeded.
```

```
Error: page.waitForTimeout: Test timeout of 19000ms exceeded.
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e4]:
    - complementary [ref=e6]:
      - generic [ref=e7]:
        - img "Logo" [ref=e9]:
          - img [ref=e12]
        - button "Collapse sidebar" [ref=e13] [cursor=pointer]:
          - img [ref=e14]
      - navigation [ref=e18]:
        - list [ref=e19]:
          - listitem [ref=e20]:
            - button "Dashboard" [ref=e21] [cursor=pointer]:
              - img [ref=e23]
              - generic [ref=e28]: Dashboard
          - listitem [ref=e29]:
            - button "Calendar" [ref=e30] [cursor=pointer]:
              - img [ref=e32]
              - generic [ref=e34]: Calendar
          - listitem [ref=e35]:
            - button "Owners" [ref=e36] [cursor=pointer]:
              - img [ref=e38]
              - generic [ref=e40]: Owners
              - img [ref=e42]
          - listitem [ref=e44]:
            - button "Properties" [ref=e45] [cursor=pointer]:
              - img [ref=e47]
              - generic [ref=e51]: Properties
              - img [ref=e53]
          - listitem [ref=e55]:
            - button "Tenants" [ref=e56] [cursor=pointer]:
              - img [ref=e58]
              - generic [ref=e61]: Tenants
              - img [ref=e63]
          - listitem [ref=e65]:
            - button "Invoice" [ref=e66] [cursor=pointer]:
              - img [ref=e68]
              - generic [ref=e70]: Invoice
          - listitem [ref=e71]:
            - button "Vendors" [ref=e72] [cursor=pointer]:
              - img [ref=e74]
              - generic [ref=e86]: Vendors
              - img [ref=e88]
          - listitem [ref=e90]:
            - button "Maintenance Requests" [ref=e91] [cursor=pointer]:
              - img [ref=e93]
              - generic [ref=e97]: Maintenance Requests
          - listitem [ref=e98]:
            - button "Report & Analysis" [ref=e99] [cursor=pointer]:
              - img [ref=e101]
              - generic [ref=e104]: Report & Analysis
              - img [ref=e106]
          - listitem [ref=e108]:
            - button "Communications" [ref=e109] [cursor=pointer]:
              - img [ref=e111]
              - generic [ref=e113]: Communications
              - img [ref=e115]
          - listitem [ref=e117]:
            - button "Account Creation" [ref=e118] [cursor=pointer]:
              - img [ref=e120]
              - generic [ref=e123]: Account Creation
          - listitem [ref=e124]:
            - button "Profile" [ref=e125] [cursor=pointer]:
              - img [ref=e127]
              - generic [ref=e131]: Profile
      - generic [ref=e134]:
        - img "User avatar" [ref=e136]
        - generic [ref=e137] [cursor=pointer]:
          - generic [ref=e138]: Victoria N
          - generic [ref=e139]: mukeshmeenakshi3001+67@gmail.com
        - button "Logout" [ref=e140] [cursor=pointer]:
          - img [ref=e141]
    - generic [ref=e144]:
      - banner [ref=e145]:
        - toolbar [ref=e146]:
          - generic [ref=e147]:
            - button "More" [ref=e148] [cursor=pointer]:
              - img [ref=e150]
            - listitem [ref=e153] [cursor=pointer]:
              - img [ref=e157]
              - generic [ref=e158]:
                - generic [ref=e159]: Victoria N
                - generic [ref=e160]: Property Manager
      - main [ref=e162]:
        - generic [ref=e164]:
          - button [ref=e165] [cursor=pointer]:
            - img [ref=e167]: arrow_back_ios
          - generic [ref=e168]: Raise Maintenance Requests
        - generic [ref=e170]:
          - generic [ref=e172]:
            - generic [ref=e173]: Search Tenant*
            - generic [ref=e175]:
              - generic [ref=e176]:
                - combobox "Tenant is required" [ref=e179]
                - generic [ref=e181]: error
                - generic [ref=e183] [cursor=pointer]: arrow_drop_down
              - alert [ref=e186]: Tenant is required
          - generic [ref=e187]:
            - generic [ref=e188]:
              - generic [ref=e189]: Select Category*
              - generic [ref=e192] [cursor=pointer]:
                - combobox [ref=e195]
                - generic [ref=e197]: arrow_drop_down
            - generic [ref=e199]:
              - generic [ref=e200]: Priority*
              - generic [ref=e203] [cursor=pointer]:
                - generic [ref=e205]:
                  - generic [ref=e206]: Medium
                  - combobox "Medium" [ref=e207]
                - generic [ref=e209]: arrow_drop_down
          - generic [ref=e211]:
            - generic [ref=e212]: Describe the Issue*
            - textbox [ref=e217]:
              - /placeholder: Please provide details about the maintenance issue...
              - text: AC leakage in Hall.
          - generic [ref=e219]:
            - generic [ref=e220]: Upload Images
            - generic [ref=e221] [cursor=pointer]:
              - generic [ref=e222]: cloud_upload
              - generic [ref=e223]: Drag & Drop or Choose file to upload
              - generic [ref=e224]: "Maximum file size: 5MB, Supported formats: JPG, JPEG, PNG, HEIF, HEIC. You can upload up to 5 images."
          - generic [ref=e225]:
            - generic [ref=e226]: Tenant Availability
            - generic [ref=e227]:
              - generic [ref=e228]:
                - generic [ref=e229]:
                  - generic [ref=e230]: Preferred Availability Date*
                  - generic [ref=e233]:
                    - textbox "Clear" [ref=e235]:
                      - /placeholder: MM/DD/YYYY
                      - text: 06/06/2026
                    - button "Clear" [ref=e237] [cursor=pointer]: cancel
                    - generic [ref=e239] [cursor=pointer]: event
                - generic [ref=e241]:
                  - generic [ref=e242]: Preferred Slot (vendor availability time 8AM - 8PM)*
                  - generic [ref=e244]:
                    - generic [ref=e245] [cursor=pointer]:
                      - combobox "Time slot is required" [expanded] [active] [ref=e248]
                      - generic [ref=e250]: error
                      - generic [ref=e252]: arrow_drop_down
                    - alert [ref=e255]: Time slot is required
              - button "Add Another Time Slot" [ref=e258] [cursor=pointer]:
                - generic [ref=e259]:
                  - img [ref=e260]: add
                  - generic [ref=e261]: Add Another Time Slot
          - button "Submit Request" [disabled] [ref=e264]:
            - generic [ref=e266]: Submit Request
  - listbox [ref=e267]:
    - generic [ref=e268]:
      - option "Morning (8AM - 12PM)" [ref=e269] [cursor=pointer]:
        - generic [ref=e271]: Morning (8AM - 12PM)
      - option "Afternoon (12PM - 5PM)" [ref=e272] [cursor=pointer]:
        - generic [ref=e274]: Afternoon (12PM - 5PM)
      - option "Evening (5PM - 8PM)" [ref=e275] [cursor=pointer]:
        - generic [ref=e277]: Evening (5PM - 8PM)
```

# Test source

```ts
  1   | // @ts-check
  2   | const { test, expect } = require('@playwright/test');
  3   | 
  4   | test.setTimeout(19000);
  5   | 
  6   | test('Manager → Maintenance → Create Request Flow', async ({ page }) => {
  7   | 
  8   |   // 1. Open application
  9   |   await page.goto('https://rentgeniux.onrender.com');
  10  | 
  11  |   // 2. Login
  12  |   await page.locator('input[name="username"]').fill('victoria');
  13  |   await page.locator('input[name="password"]').fill('Victoria@123');
  14  |   await page.getByRole('button', { name: 'Login' }).click();
  15  | 
  16  |   // 3. Wait for dashboard
  17  |   await page.waitForURL('**/manager');
  18  | 
  19  |   // 4. Click sidebar
  20  |   await page.getByText('Maintenance Requests').click();
  21  | 
  22  |   // 5. Validate navigation
  23  |   await expect(page).toHaveURL(/manager\/requests/);
  24  | 
  25  |   // 6. Wait for button to be visible (IMPORTANT FIX)
  26  |   const createBtn = page.getByRole('button', { name: 'Create Requests' });
  27  |   await expect(createBtn).toBeVisible({ timeout: 10000 });
  28  | 
  29  |   // 7. Click Create Requests
  30  |   await createBtn.click();
  31  | 
  32  |   // 8. Validate next page
  33  |   await expect(page).toHaveURL(/manager\/raiserequest/);
  34  | 
  35  |   // After navigating to raise request page
  36  | // Click the tenant dropdown/input
  37  | // Select Tenant
  38  | const tenantInput = page.locator(
  39  |   'input[placeholder="Search by tenant name or email"]'
  40  | );
  41  | 
  42  | await tenantInput.click();
  43  | 
  44  | // Wait for tenant list
  45  | await page.locator('.q-menu .q-item').first().waitFor({
  46  |   state: 'visible'
  47  | });
  48  | 
  49  | // Click first tenant
  50  | await page.locator('.q-menu .q-item').first().click();
  51  | 
  52  | // Verify tenant selected
  53  | await page.waitForTimeout(1000);
  54  | 
  55  | // Category dropdown
  56  | const categoryDropdown = page.locator('input.q-select__focus-target').nth(1);
  57  | 
  58  | await categoryDropdown.click();
  59  | 
  60  | // Wait for category options
  61  | await page.locator('.q-menu .q-item').first().waitFor();
  62  | 
  63  | // Select first category
  64  | await page.locator('.q-menu .q-item').first().click();
  65  | await page.waitForTimeout(3000);
  66  | // Enter description
  67  | await page.getByPlaceholder('Please provide details about the maintenance issue...')
  68  |   .fill('AC leakage in Hall.');
  69  | 
  70  |   // Click time slot dropdown (next q-select)
  71  | // Click Time Slot dropdown
  72  | const timeSlotDropdown = page.locator('input.q-select__focus-target').last();
  73  | 
  74  | await timeSlotDropdown.click();
  75  | 
  76  | await page.locator('i.material-icons:has-text("event")').click();
  77  | 
  78  | const tomorrow = new Date();
  79  | tomorrow.setDate(tomorrow.getDate() + 1);
  80  | 
  81  | const day = tomorrow.getDate().toString();
  82  | 
  83  | await page.locator('.q-date').getByText(day, { exact: true }).first().click();
  84  |  
  85  | // Click Preferred Slot dropdown
  86  | const preferredSlot = page.locator('input.q-select__focus-target').last();
  87  | 
  88  | await preferredSlot.click();
  89  | 
  90  | // Wait for dropdown options to appear
> 91  | await page.waitForTimeout(1000);
      |            ^ Error: page.waitForTimeout: Test timeout of 19000ms exceeded.
  92  | 
  93  | // Select first slot
  94  | await page.locator('.q-menu .q-item').first().click();
  95  | 
  96  | // Preferred way
  97  | await page.getByRole('button', { name: 'Submit Request' }).click();
  98  | await page.waitForTimeout(7000);
  99  | 
  100 | await page.getByRole('button', { name: 'View More' }).first().click();
  101 | await page.waitForTimeout(3000);
  102 | 
  103 | 
  104 | await page.locator('button:has-text("Approve")').click();
  105 | await page.waitForTimeout(4000);
  106 | 
  107 | // Wait for page to load
  108 | 
  109 | 
  110 | // Click the first maintenance kebab (three-dot) icon
  111 | await page.locator('i:has-text("more_vert")').first().click();
  112 | await page.waitForTimeout(1000);
  113 | // Click Assign Vendor option
  114 | await page.getByText('Assign', { exact: true }).click();
  115 | await page.waitForTimeout(2000);
  116 | // Wait for Assign Vendor popup/page to load
  117 | 
  118 | const selectVendorBtn = page.locator('button:has-text("Select Vendor")').first();
  119 | 
  120 | await selectVendorBtn.scrollIntoViewIfNeeded();
  121 | 
  122 | await selectVendorBtn.click({ force: true });
  123 | 
  124 | await page.waitForTimeout(2000);
  125 | 
  126 | // Click Tenant Available Date dropdown
  127 | await page.locator('.q-select').click();
  128 | 
  129 | // Wait for options to load
  130 | await page.waitForTimeout(1000);
  131 | 
  132 | // Select first available slot
  133 | await page.locator('.q-item').first().click();
  134 | 
  135 | // Enter Estimate Amount
  136 | await page.locator('input[placeholder="Enter an estimate amount"]')
  137 |   .fill('200');
  138 | 
  139 | // Click Assign button
  140 | await page.getByRole('button', { name: 'Assign' }).click();
  141 | 
  142 | // Wait for success
  143 | await page.waitForTimeout(3000);
  144 | // Wait for assignment to complete
  145 | 
  146 |   await page.screenshot({
  147 |     path: 'tests/screenshots/create-request.png',
  148 |     fullPage: true
  149 |   });
  150 | 
  151 | });
```