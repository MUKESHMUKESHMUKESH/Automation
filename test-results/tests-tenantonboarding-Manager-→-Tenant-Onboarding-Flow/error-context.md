# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\tenantonboarding.spec.js >> Manager → Tenant Onboarding Flow
- Location: tests\tenantonboarding.spec.js:7:1

# Error details

```
Error: page.waitForSelector: Target page, context or browser has been closed
Call log:
  - waiting for locator('input[name="username"]') to be visible

```

# Test source

```ts
  22  | 
  23  |   await page.getByRole('button', { name: 'Manage Tenant' }).click();
  24  | 
  25  |   await page.waitForTimeout(2000);
  26  | 
  27  |   await page.getByText('Onboard Tenant').click();
  28  | 
  29  |   await page.locator('.property-card-content').first().click();
  30  |    await page.waitForTimeout(2000);
  31  | 
  32  |    await page.getByRole('button', { name: 'Assign Property' }).nth(0).click();
  33  |    await page.waitForTimeout(2000);
  34  | 
  35  | // Fill First Name
  36  | await page.locator('input[placeholder="First Name"]').first().fill(tenant.firstName);
  37  | 
  38  | // Fill Last Name
  39  | await page.locator('input[placeholder="Last Name"]').first().fill(tenant.lastName);
  40  | 
  41  | // Fill Email
  42  | await page.locator('input[placeholder="Email"]').first().fill(tenant.email);
  43  | 
  44  | // Fill Phone Number
  45  | await page.locator('input[placeholder="+1 555 111 6985"]').first().fill(tenant.phone);
  46  | 
  47  | await page.waitForTimeout(1000);
  48  | 
  49  | // Click Submit button
  50  | await page.locator('button.submit-btn').first().click();
  51  | 
  52  | // One-time setup: login manually, then save storage state
  53  | // node script:
  54  | const { getOnboardingLink } = require('../utils/gmail');
  55  | 
  56  | // ... after Submit button click ...
  57  | await page.waitForTimeout(10000);
  58  | 
  59  | const onboardingLink = await getOnboardingLink();
  60  | console.log('Registration Link:', onboardingLink);
  61  | 
  62  | if (!onboardingLink) {
  63  |   throw new Error('Registration link not found');
  64  | }
  65  | 
  66  | const formPage = await page.context().newPage();
  67  | await formPage.goto(onboardingLink);
  68  | await formPage.waitForTimeout(2000);
  69  | 
  70  | // Fill emergency contact number
  71  | await formPage.locator('input[placeholder="e.g., +1 555 111 6985"]').fill(tenant.emergencyContact);
  72  | 
  73  | // Fill address
  74  | // Fill address with "ad" and select first suggestion
  75  | await formPage.locator('input[placeholder="e.g., 128, Sunshine Tower, Bokes Street"]').fill(tenant.address);
  76  | 
  77  | await formPage.waitForTimeout(1000);
  78  | 
  79  | // Click first option from dropdown
  80  | await formPage.locator('.q-menu .q-item, [role="listbox"] >> nth=0').first().click();
  81  | 
  82  | 
  83  | await formPage.waitForSelector('button.add-btn:not([disabled])', { timeout: 10000 });
  84  | await formPage.locator('button.add-btn').click();
  85  | 
  86  | // Upload first file
  87  | await formPage.locator('input[type="file"]').nth(0).setInputFiles(tenant.document1);
  88  | 
  89  | // Upload second file
  90  | // Upload ID Proof - find the "Choose file" link near ID Proof label
  91  | await formPage.locator('div').filter({ hasText: /^ID Proof/ }).locator('input[type="file"]').setInputFiles(tenant.document2);
  92  | 
  93  | await formPage.locator('button.add-btn').click();
  94  | // Fill username
  95  | await formPage.locator('input[name="username"]').fill(tenant.username);
  96  | 
  97  | // Fill password
  98  | await formPage.locator('input[name="password"]').fill(tenant.password);
  99  | 
  100 | // Fill confirm password
  101 | // Fill confirm password (second password field)
  102 | await formPage.locator('input[type="password"]').nth(1).fill(tenant.confirmPassword);
  103 | await formPage.getByRole('button', { name: 'Create' }).click();
  104 | await formPage.waitForTimeout(10000);
  105 | 
  106 | // ─── Re-login as Manager ───────────────────────────────────────────────────
  107 | // ─── Re-login as Manager ───────────────────────────────────────────────────
  108 | // Open in a new page
  109 | // ─── Re-login as Manager ───────────────────────────────────────────────────
  110 | const managerPage = await page.context().newPage();
  111 | 
  112 | // ✅ Wait for network idle so Vue app fully boots before checking DOM
  113 | await managerPage.goto('https://rentgeniux.onrender.com/#/login', { 
  114 |   waitUntil: 'networkidle',
  115 |   timeout: 60000 
  116 | });
  117 | 
  118 | // ✅ Wait for Vue to render — check body is not empty first
  119 | await managerPage.waitForFunction(() => document.body.children.length > 0, { timeout: 30000 });
  120 | 
  121 | // ✅ Now wait for the input
> 122 | await managerPage.waitForSelector('input[name="username"]', { 
      |                   ^ Error: page.waitForSelector: Target page, context or browser has been closed
  123 |   state: 'visible', 
  124 |   timeout: 30000 
  125 | });
  126 | 
  127 | await managerPage.locator('input[name="username"]').fill('manager');
  128 | await managerPage.locator('input[name="password"]').fill('Manager@123');
  129 | await managerPage.getByRole('button', { name: 'Login' }).click();
  130 | 
  131 | // ✅ Wait for dashboard on managerPage
  132 | await managerPage.waitForURL('**/manager', { timeout: 60000 });
  133 | await managerPage.waitForTimeout(1000);
  134 | 
  135 | // ✅ All subsequent actions on managerPage
  136 | await managerPage.locator('.lucide-chevron-down').nth(2).click();
  137 | 
  138 | const manageLeaseBtn = managerPage.getByRole('button', { name: 'Manage Lease' });
  139 | await manageLeaseBtn.waitFor({ state: 'visible', timeout: 10000 });
  140 | await managerPage.waitForTimeout(400);
  141 | await manageLeaseBtn.click();
  142 | 
  143 | await managerPage.waitForTimeout(2000);
  144 | 
  145 | await managerPage.locator('i.q-icon.material-icons:has-text("chevron_right")').first().click();
  146 | 
  147 | 
  148 | 
  149 | // ✅ Wait for button to exist first
  150 | await managerPage.waitForSelector('button', { timeout: 15000 });
  151 | 
  152 | // ✅ Scroll into view and click in one go
  153 | const setupBtn = managerPage.getByRole('button', { name: 'Set Up Lease Document' });
  154 | await setupBtn.scrollIntoViewIfNeeded();
  155 | await setupBtn.waitFor({ state: 'visible', timeout: 10000 });
  156 | await setupBtn.click();
  157 | await managerPage.waitForTimeout(2000);
  158 | 
  159 | // ✅ Declare ALL dates ONCE at the top
  160 | const tomorrow = new Date();
  161 | tomorrow.setDate(tomorrow.getDate() + 1);
  162 | const tomorrowDay = tomorrow.getDate().toString();
  163 | 
  164 | 
  165 | // ✅ 1. Click Agreement Date field
  166 | await managerPage.locator('[data-field-name="agreement_date"]').click();
  167 | await managerPage.waitForTimeout(500);
  168 | 
  169 | // ✅ Click calendar icon
  170 | await managerPage.locator('i.q-icon.material-icons:has-text("event")').first().click();
  171 | await managerPage.waitForTimeout(1000);
  172 | 
  173 | // ✅ Click tomorrow in calendar
  174 | await managerPage.evaluate((day) => {
  175 |   const cells = document.querySelectorAll('td, .q-date__calendar-item button');
  176 |   for (const cell of cells) {
  177 |     if (cell.textContent.trim() === day) { cell.click(); break; }
  178 |   }
  179 | }, tomorrowDay);
  180 | await managerPage.waitForTimeout(1000);
  181 | 
  182 | // ✅ 2. Click Property Manager Name
  183 | await managerPage.locator('div[style*="cursor: pointer"]')
  184 |   .filter({ hasText: '[Property Manager Name]' })
  185 |   .click();
  186 | await managerPage.waitForTimeout(800);
  187 | await managerPage.waitForSelector('input[aria-label="Enter Value"]', { timeout: 10000 });
  188 | const inputs = managerPage.locator('input[aria-label="Enter Value"]');
  189 | const count = await inputs.count();
  190 | await inputs.nth(count - 1).fill('Jaya Sudharsan');
  191 | await managerPage.waitForTimeout(500);
  192 | 
  193 | // ✅ 3. Click Company Type
  194 | await managerPage.locator('div[style*="cursor: pointer"]')
  195 |   .filter({ hasText: '[Company Type]' })
  196 |   .click();
  197 | await managerPage.waitForTimeout(500);
  198 | const inputs2 = managerPage.locator('input[aria-label="Enter Value"]');
  199 | const count2 = await inputs2.count();
  200 | await inputs2.nth(count2 - 1).fill('Property Management');
  201 | await managerPage.waitForTimeout(500);
  202 | 
  203 | // ✅ 4. Click Property Manager Address
  204 | await managerPage.locator('div[style*="cursor: pointer"]')
  205 |   .filter({ hasText: '[Property Manager Address]' })
  206 |   .click();
  207 | await managerPage.waitForTimeout(500);
  208 | const inputs3 = managerPage.locator('input[aria-label="Enter Value"]');
  209 | const count3 = await inputs3.count();
  210 | await inputs3.nth(count3 - 1).fill('205 Sunset Street, Denver, 80201');
  211 | await managerPage.waitForTimeout(500);
  212 | 
  213 | // ✅ Scroll down to find date fields
  214 | await managerPage.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  215 | await managerPage.waitForTimeout(1000);
  216 | 
  217 | // ✅ 5. Click Start Date field
  218 | await managerPage.locator('[data-field-name="start_date"]').click();
  219 | await managerPage.waitForTimeout(500);
  220 | 
  221 | // ✅ Click calendar icon for Start Date
  222 | await managerPage.locator('i.material-icons:has-text("event")').first().click();
```