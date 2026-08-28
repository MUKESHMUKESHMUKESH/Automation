# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\tenantonboarding.spec.js >> Manager → Tenant Onboarding Flow
- Location: tests\tenantonboarding.spec.js:9:1

# Error details

```
Error: locator.scrollIntoViewIfNeeded: Target page, context or browser has been closed
Call log:
  - waiting for getByRole('button', { name: 'Set Up Lease Document' })

```

# Test source

```ts
  111 | await formPage.locator('input[placeholder="e.g., 128, Sunshine Tower, Bokes Street"]').fill(tenant.address);
  112 | 
  113 | await formPage.waitForTimeout(1000);
  114 | 
  115 | // Click first option from dropdown
  116 | await formPage.locator('.q-menu .q-item, [role="listbox"] >> nth=0').first().click();
  117 | 
  118 | 
  119 | await formPage.waitForSelector('button.add-btn:not([disabled])', { timeout: 10000 });
  120 | await formPage.locator('button.add-btn').click();
  121 | 
  122 | // Upload first file
  123 | // Document 1 - Address Proof
  124 | await formPage.locator('input.q-field__native[placeholder="XXX-XX-XXXX"]').click();
  125 | await formPage.waitForTimeout(500);
  126 | await formPage.locator('input.q-field__native[placeholder="XXX-XX-XXXX"]').pressSequentially(tenant.ssn, { delay: 150 });
  127 | await formPage.waitForTimeout(500);
  128 | console.log('.SSN filled!');
  129 | 
  130 | // .Document 1 - Address Proof
  131 | await formPage.locator('div').filter({ hasText: /^Address Proof/ })
  132 |   .locator('input[type="file"]').setInputFiles(tenant.document1);
  133 | await formPage.waitForTimeout(1000);
  134 | console.log('.Address Proof uploaded!');
  135 | 
  136 | // .Document 2 - ID Proof
  137 | await formPage.locator('div').filter({ hasText: /^ID Proof/ })
  138 |   .locator('input[type="file"]').setInputFiles(tenant.document1);
  139 | await formPage.waitForTimeout(1000);
  140 | console.log('.ID Proof uploaded!');
  141 | 
  142 | // .Document 3 - Tax Report
  143 | await formPage.locator('div').filter({ hasText: /^Proof Of Tax ID\/SSN/ })
  144 |   .locator('input[type="file"]').setInputFiles(tenant.document1);
  145 | await formPage.waitForTimeout(1000);
  146 | console.log('.Tax Report uploaded!');
  147 | 
  148 | // .Document 4 - Credit Report
  149 | await formPage.locator('div').filter({ hasText: /^Credit Report/ })
  150 |   .locator('input[type="file"]').setInputFiles(tenant.document1);
  151 | await formPage.waitForTimeout(1000);
  152 | console.log('.Credit Report uploaded!');
  153 | 
  154 | await formPage.getByRole('button', { name: 'Next' }).click();
  155 | console.log('.Add button clicked!');
  156 | await formPage.waitForTimeout(3000);
  157 | // Fill username
  158 | await formPage.locator('input[name="username"]').fill(tenant.username);
  159 | 
  160 | // Fill password
  161 | await formPage.locator('input[name="password"]').fill(tenant.password);
  162 | 
  163 | // Fill confirm password
  164 | // Fill confirm password (second password field)
  165 | await formPage.locator('input[type="password"]').nth(1).fill(tenant.confirmPassword);
  166 | await formPage.getByRole('button', { name: 'Create' }).click();
  167 | await formPage.waitForTimeout(50000);
  168 | 
  169 | await formPage.close();
  170 | 
  171 | // ─── Re-login as Manager ───────────────────────────────────────────────────
  172 | // ─── Re-login as Manager ───────────────────────────────────────────────────
  173 | // Open in a new page
  174 | // ─── Re-login as Manager ───────────────────────────────────────────────────
  175 | const managerPage = await page.context().newPage();
  176 | 
  177 | // .Wait for network idle so Vue app fully boots before checking DOM
  178 |    const loginPage1 = new LoginPage(page);
  179 |     await loginPage.login();
  180 | 
  181 | // .Wait for Vue to render — check body is not empty first
  182 | await managerPage.waitForFunction(() => document.body.children.length > 0, { timeout: 30000 });
  183 | 
  184 | // .Now wait for the input
  185 | 
  186 | 
  187 | // .Wait for dashboard on managerPage
  188 | await managerPage.waitForURL('**/manager', { timeout: 60000 });
  189 | await managerPage.waitForTimeout(1000);
  190 | 
  191 | // .All subsequent actions on managerPage
  192 | await managerPage.locator('.lucide-chevron-down').nth(2).click();
  193 | 
  194 | const manageLeaseBtn = managerPage.getByRole('button', { name: 'Manage Lease' });
  195 | await manageLeaseBtn.waitFor({ state: 'visible', timeout: 10000 });
  196 | await managerPage.waitForTimeout(400);
  197 | await manageLeaseBtn.click();
  198 | 
  199 | await managerPage.waitForTimeout(2000);
  200 | 
  201 | await managerPage.locator('input[placeholder="Search"]').fill(tenant.firstName);
  202 | await managerPage.waitForTimeout(500);
  203 | 
  204 | await managerPage.locator('i.q-icon.material-icons:has-text("chevron_right")').first().click();
  205 | 
  206 | // .Wait for button to exist first
  207 | await managerPage.waitForSelector('button', { timeout: 15000 });
  208 | 
  209 | // .Scroll into view and click in one go
  210 | const setupBtn = managerPage.getByRole('button', { name: 'Set Up Lease Document' });
> 211 | await setupBtn.scrollIntoViewIfNeeded();
      |                ^ Error: locator.scrollIntoViewIfNeeded: Target page, context or browser has been closed
  212 | await setupBtn.waitFor({ state: 'visible', timeout: 10000 });
  213 | await setupBtn.click();
  214 | await managerPage.waitForTimeout(2000);
  215 | 
  216 | // .Declare ALL dates ONCE at the top
  217 | const tomorrow = new Date();
  218 | tomorrow.setDate(tomorrow.getDate() + 1);
  219 | const tomorrowDay = tomorrow.getDate().toString();
  220 | 
  221 | 
  222 | await managerPage.locator('[data-field-name="agreement_date"]').click();
  223 | await managerPage.waitForTimeout(500);
  224 | 
  225 | // .Click calendar icon
  226 | await managerPage.locator('i.q-icon.material-icons:has-text("event")').first().click();
  227 | await managerPage.waitForTimeout(1000);
  228 | 
  229 | // .Click today in calendar
  230 | const todayDay = new Date().getDate().toString();
  231 | 
  232 | await managerPage.evaluate((day) => {
  233 |   const cells = document.querySelectorAll('td, .q-date__calendar-item button');
  234 |   for (const cell of cells) {
  235 |     if (cell.textContent.trim() === day) { cell.click(); break; }
  236 |   }
  237 | }, todayDay);
  238 | await managerPage.waitForTimeout(1000);
  239 | 
  240 | 
  241 | 
  242 | // .1. Click Agreement Date field
  243 | /*await managerPage.locator('[data-field-name="agreement_date"]').click();
  244 | await managerPage.waitForTimeout(500);
  245 | 
  246 | // .Click calendar icon
  247 | await managerPage.locator('i.q-icon.material-icons:has-text("event")').first().click();
  248 | await managerPage.waitForTimeout(1000);
  249 | 
  250 | // .Click tomorrow in calendar
  251 | await managerPage.evaluate((day) => {
  252 |   const cells = document.querySelectorAll('td, .q-date__calendar-item button');
  253 |   for (const cell of cells) {
  254 |     if (cell.textContent.trim() === day) { cell.click(); break; }
  255 |   }
  256 | }, tomorrowDay);
  257 | await managerPage.waitForTimeout(1000);
  258 | 
  259 | */
  260 | // .1. Click Property Manager Name
  261 | /*await managerPage.locator('div[style*="cursor: pointer"]')
  262 |   .filter({ hasText: '[Property Manager Name]' })
  263 |   .click();
  264 | await managerPage.waitForTimeout(500);
  265 | let inputs = managerPage.locator('input[aria-label="Enter Value"]');
  266 | let count = await inputs.count();
  267 | await inputs.nth(count - 1).fill('Jaya Sudharsan');
  268 | // .Double click to confirm and remove validation error
  269 | await inputs.nth(count - 1).dblclick();
  270 | await managerPage.waitForTimeout(500);
  271 | 
  272 | // .Click outside
  273 | await managerPage.mouse.click(700, 400);
  274 | await managerPage.waitForTimeout(300);
  275 | 
  276 | 
  277 | // .2. Click Company Type
  278 | await managerPage.locator('div[style*="cursor: pointer"]')
  279 |   .filter({ hasText: '[Company Type]' })
  280 |   .click();
  281 | await managerPage.waitForTimeout(500);
  282 | inputs = managerPage.locator('input[aria-label="Enter Value"]');
  283 | count = await inputs.count();
  284 | await inputs.nth(count - 1).fill('Property Management');
  285 | // .Double click to confirm
  286 | await inputs.nth(count - 1).dblclick();
  287 | await managerPage.waitForTimeout(500);
  288 | 
  289 | // .Click outside
  290 | await managerPage.mouse.click(700, 400);
  291 | await managerPage.waitForTimeout(300);
  292 | 
  293 | // .3. Click Property Manager Address
  294 | await managerPage.locator('div[style*="cursor: pointer"]')
  295 |   .filter({ hasText: '[Property Manager Address]' })
  296 |   .click();
  297 | await managerPage.waitForTimeout(500);
  298 | inputs = managerPage.locator('input[aria-label="Enter Value"]');
  299 | count = await inputs.count();
  300 | await inputs.nth(count - 1).fill('205 Sunset Street, Denver, 80201');
  301 | // .Double click to confirm
  302 | await inputs.nth(count - 1).dblclick();
  303 | await managerPage.waitForTimeout(500);
  304 | 
  305 | // .Click outside
  306 | await managerPage.mouse.click(700, 400);
  307 | await managerPage.waitForTimeout(300);
  308 | 
  309 | */
  310 | 
  311 | // .Scroll down to find date fields
```