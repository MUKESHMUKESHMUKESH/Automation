# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\tenantonboarding.spec.js >> Manager → Tenant Onboarding Flow
- Location: tests\tenantonboarding.spec.js:9:1

# Error details

```
Error: Registration link not found
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
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
          - textbox [ref=e36]
        - generic [ref=e38]:
          - text: Password
          - generic [ref=e41]:
            - textbox [ref=e43]
            - img [ref=e45] [cursor=pointer]
        - button "Forgot Password?" [ref=e51] [cursor=pointer]:
          - generic [ref=e52]: Forgot Password?
        - button "Login" [ref=e53] [cursor=pointer]:
          - generic [ref=e54]: Login
        - paragraph [ref=e55]: Contact us to get started with RentGeniux Contact Us
  - alert [ref=e56]:
    - generic [ref=e58]:
      - img [ref=e59]: check_circle
      - generic [ref=e60]: You have been logged out successfully
```

# Test source

```ts
  1   | class TenantOnboardingPage {
  2   |   constructor(page) {
  3   |     this.page = page;
  4   |   }
  5   | 
  6   |   async addTenant(tenant) {  
  7   |   const page = this.page;   // .ADD THIS LINE
  8   |    // 1. Open application
  9   |   await page.goto('https://rentgeniux.onrender.com');
  10  | 
  11  |   // 2. Login 
  12  |   await page.locator('input[name="username"]').fill('manager');
  13  |   await page.locator('input[name="password"]').fill('Manager@123');
  14  |   await page.getByRole('button', { name: 'Login' }).click();
  15  | 
  16  |   // 3. Wait for dashboard
  17  |   await page.waitForURL('**/manager');
  18  | 
  19  |   // 4. Click Tenants sidebar
  20  | await page.locator('.lucide-chevron-down').nth(2).click();
  21  | 
  22  |   await page.getByRole('button', { name: 'Manage Tenant' }).click();
  23  | 
  24  |   await page.waitForTimeout(2000);
  25  | 
  26  |   await page.getByText('Onboard Tenant').click();
  27  | 
  28  |   await page.locator('.property-card-content').first().click();
  29  |    await page.waitForTimeout(2000);
  30  | 
  31  |    await page.getByRole('button', { name: 'Assign Property' }).nth(0).click();
  32  |    await page.waitForTimeout(2000);
  33  | 
  34  | // Fill First Name
  35  | await page.locator('input[placeholder="First Name"]').first().fill(tenant.firstName);
  36  | 
  37  | // Fill Last Name
  38  | await page.locator('input[placeholder="Last Name"]').first().fill(tenant.lastName);
  39  | 
  40  | // Fill Email
  41  | await page.locator('input[placeholder="Email"]').first().fill(tenant.email);
  42  | 
  43  | // Fill Phone Number
  44  | await page.locator('input[placeholder="+1 555 111 6985"]').first().fill(tenant.phone);
  45  | 
  46  | await page.waitForTimeout(1000);
  47  | 
  48  | // Click Submit button
  49  | await page.locator('button.submit-btn').first().click();
  50  | await page.waitForTimeout(30000);
  51  | 
  52  | 
  53  | // Open the profile menu/dropdown first
  54  | 
  55  |   // Step 8: Click "Logout" menu item to open confirmation dialog
  56  |    await page.locator('.q-avatar__content').click();
  57  |     await page.waitForTimeout(500);
  58  | 
  59  |     // Click the profile item (first item in dropdown, name-agnostic)
  60  |    
  61  |     // Step 8: Click "Logout" menu item to open confirmation dialog
  62  |     await page.locator('.q-item', { hasText: 'Logout' }).click();
  63  | 
  64  |     // Step 9: Wait for confirmation dialog and click the actual Logout button
  65  |     await page.waitForSelector('.logout-card');
  66  |     await Promise.all([
  67  |       page.waitForURL('**/#/login**', { timeout: 60000 }),
  68  |       page.locator('.logout-card .btn-logout').click(),
  69  |     ]);
  70  | 
  71  |   
  72  | 
  73  | // One-time setup: login manually, then save storage state
  74  | // node script:
  75  | const { getOnboardingLink } = require('../utils/gmail');
  76  | 
  77  | // ... after Submit button click ...
  78  | await page.waitForTimeout(3000);
  79  | 
  80  | const onboardingLink = await getOnboardingLink();
  81  | console.log('Registration Link:', onboardingLink);
  82  | 
  83  | if (!onboardingLink) {
> 84  |   throw new Error('Registration link not found');
      |         ^ Error: Registration link not found
  85  | }
  86  | 
  87  | const formPage = await page.context().newPage();
  88  | await formPage.goto(onboardingLink);
  89  | await formPage.waitForTimeout(2000);
  90  | 
  91  | // Fill emergency contact number
  92  | await formPage.locator('input[placeholder="e.g., +1 555 111 6985"]').fill(tenant.emergencyContact);
  93  | 
  94  | // Fill address
  95  | // Fill address with "ad" and select first suggestion
  96  | await formPage.locator('input[placeholder="e.g., 128, Sunshine Tower, Bokes Street"]').fill(tenant.address);
  97  | 
  98  | await formPage.waitForTimeout(1000);
  99  | 
  100 | // Click first option from dropdown
  101 | await formPage.locator('.q-menu .q-item, [role="listbox"] >> nth=0').first().click();
  102 | 
  103 | 
  104 | await formPage.waitForSelector('button.add-btn:not([disabled])', { timeout: 10000 });
  105 | await formPage.locator('button.add-btn').click();
  106 | 
  107 | // Upload first file
  108 | // Document 1 - Address Proof
  109 | await formPage.locator('input.q-field__native[placeholder="XXX-XX-XXXX"]').click();
  110 | await formPage.waitForTimeout(500);
  111 | await formPage.locator('input.q-field__native[placeholder="XXX-XX-XXXX"]').pressSequentially(tenant.ssn, { delay: 150 });
  112 | await formPage.waitForTimeout(500);
  113 | console.log('.SSN filled!');
  114 | 
  115 | // .Document 1 - Address Proof
  116 | await formPage.locator('div').filter({ hasText: /^Address Proof/ })
  117 |   .locator('input[type="file"]').setInputFiles(tenant.document1);
  118 | await formPage.waitForTimeout(1000);
  119 | console.log('.Address Proof uploaded!');
  120 | 
  121 | // .Document 2 - ID Proof
  122 | await formPage.locator('div').filter({ hasText: /^ID Proof/ })
  123 |   .locator('input[type="file"]').setInputFiles(tenant.document1);
  124 | await formPage.waitForTimeout(1000);
  125 | console.log('.ID Proof uploaded!');
  126 | 
  127 | // .Document 3 - Tax Report
  128 | await formPage.locator('div').filter({ hasText: /^Proof Of Tax ID\/SSN/ })
  129 |   .locator('input[type="file"]').setInputFiles(tenant.document1);
  130 | await formPage.waitForTimeout(1000);
  131 | console.log('.Tax Report uploaded!');
  132 | 
  133 | // .Document 4 - Credit Report
  134 | await formPage.locator('div').filter({ hasText: /^Credit Report/ })
  135 |   .locator('input[type="file"]').setInputFiles(tenant.document1);
  136 | await formPage.waitForTimeout(1000);
  137 | console.log('.Credit Report uploaded!');
  138 | 
  139 | await formPage.getByRole('button', { name: 'Next' }).click();
  140 | console.log('.Add button clicked!');
  141 | await formPage.waitForTimeout(3000);
  142 | // Fill username
  143 | await formPage.locator('input[name="username"]').fill(tenant.username);
  144 | 
  145 | // Fill password
  146 | await formPage.locator('input[name="password"]').fill(tenant.password);
  147 | 
  148 | // Fill confirm password
  149 | // Fill confirm password (second password field)
  150 | await formPage.locator('input[type="password"]').nth(1).fill(tenant.confirmPassword);
  151 | await formPage.getByRole('button', { name: 'Create' }).click();
  152 | await formPage.waitForTimeout(10000);
  153 | 
  154 | await formPage.close();
  155 | 
  156 | // ─── Re-login as Manager ───────────────────────────────────────────────────
  157 | // ─── Re-login as Manager ───────────────────────────────────────────────────
  158 | // Open in a new page
  159 | // ─── Re-login as Manager ───────────────────────────────────────────────────
  160 | const managerPage = await page.context().newPage();
  161 | 
  162 | // .Wait for network idle so Vue app fully boots before checking DOM
  163 | await managerPage.goto('https://rentgeniux.onrender.com', { 
  164 |   waitUntil: 'networkidle',
  165 |   timeout: 60000 
  166 | });
  167 | 
  168 | // .Wait for Vue to render — check body is not empty first
  169 | await managerPage.waitForFunction(() => document.body.children.length > 0, { timeout: 30000 });
  170 | 
  171 | // .Now wait for the input
  172 | await managerPage.waitForSelector('input[name="username"]', { 
  173 |   state: 'visible', 
  174 |   timeout: 30000 
  175 | });
  176 | 
  177 | await managerPage.locator('input[name="username"]').fill('manager');
  178 | await managerPage.locator('input[name="password"]').fill('Manager@123');
  179 | await managerPage.getByRole('button', { name: 'Login' }).click();
  180 | 
  181 | // .Wait for dashboard on managerPage
  182 | await managerPage.waitForURL('**/manager', { timeout: 60000 });
  183 | await managerPage.waitForTimeout(1000);
  184 | 
```