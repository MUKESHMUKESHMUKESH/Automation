# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\Manual_Owner_onboarding.spec.js >> Manager → Add Owner
- Location: tests\Manual_Owner_onboarding.spec.js:9:1

# Error details

```
Error: locator.click: Target page, context or browser has been closed
Call log:
  - waiting for locator('.q-field__native').filter({ has: locator('input[role="combobox"]') }).first()

```

# Test source

```ts
  79  | console.log('✅ Zip Code filled!');
  80  | await page.waitForTimeout(5000);
  81  | 
  82  | 
  83  | await page.getByRole('button', { name: 'Next' }).click();
  84  | console.log('✅ Next button clicked!');
  85  | await page.waitForTimeout(5000);
  86  | 
  87  | // ✅ SSN (9 digits - XXX-XX-XXXX format)
  88  | await page.locator('input.q-field__native[placeholder="XXX-XX-XXXX"]').click();
  89  | await page.locator('input.q-field__native[placeholder="XXX-XX-XXXX"]').fill(owner.ssn);
  90  | console.log('✅ SSN filled!');
  91  | 
  92  | 
  93  | await page.locator('input[type="file"]').nth(0).setInputFiles(owner.document1);
  94  | await page.locator('input[type="file"]').nth(1).setInputFiles(owner.document2);
  95  | await page.locator('input[type="file"]').nth(2).setInputFiles(owner.document3);
  96  | await page.locator('input[type="file"]').nth(3).setInputFiles(owner.document4);
  97  | 
  98  | 
  99  | // ✅ Click enabled Next button (data-v-b16f8748)
  100 | await expect(page.locator('button[data-v-b16f8748]:has(span.block:text("Next"))')).toBeEnabled({ timeout: 10000 });
  101 | await page.locator('button[data-v-b16f8748]:has(span.block:text("Next"))').click();
  102 | console.log('✅ Next button clicked!');
  103 | await page.waitForTimeout(5000);
  104 | 
  105 | 
  106 | // ✅ Username
  107 | await page.locator('input.q-field__native[type="text"]').last().click();
  108 | await page.locator('input.q-field__native[type="text"]').last().fill(owner.username);
  109 | console.log('✅ Username filled!');
  110 | 
  111 | // ✅ Password
  112 | await page.locator('input.q-field__native[type="password"]').nth(0).click();
  113 | await page.locator('input.q-field__native[type="password"]').nth(0).fill(owner.password);
  114 | console.log('✅ Password filled!');
  115 | 
  116 | // ✅ Confirm Password
  117 | await page.locator('input.q-field__native[type="password"]').nth(1).click();
  118 | await page.locator('input.q-field__native[type="password"]').nth(1).fill(owner.confirmPassword);
  119 | console.log('✅ Confirm Password filled!');
  120 | 
  121 | 
  122 | // ✅ Wait for Create Account button to be enabled then click
  123 | // ✅ Wait for Create Account button to be enabled then click
  124 | // ✅ Click Create Account and wait for 2 minutes
  125 | await page.locator('button.create-btn').click();
  126 | console.log('✅ Create Account clicked!');
  127 | 
  128 | await page.waitForTimeout(12000); // 2 minutes
  129 | console.log('✅ Wait complete!');
  130 | 
  131 | // ✅ Click the profile tab in sidebar
  132 | 
  133 | // ✅ Click the profile tab in sidebar
  134 | await page.locator('.q-item:has(.q-avatar__content img)').click();
  135 | console.log('✅ Profile tab clicked!');
  136 | 
  137 | // ✅ Wait for dropdown card to appear
  138 | 
  139 | 
  140 | await page.locator('.q-item.text-negative').click({ force: true });
  141 | 
  142 | await page.waitForSelector('.logout-card', { state: 'visible' });
  143 | await page.waitForTimeout(1000);
  144 | 
  145 | // ✅ Step 5: Confirm Logout
  146 | await page.locator('.logout-card .btn-logout').click();
  147 | 
  148 | await page.waitForTimeout(5000);
  149 | console.log('✅ Logout confirmed!');
  150 | 
  151 |   await page.locator('input[name="username"]').fill(owner.username);
  152 |   await page.locator('input[name="password"]').fill(owner.password);
  153 |   await page.getByRole('button', { name: 'Login' }).click();
  154 |  await page.waitForTimeout(1000);
  155 |  // Click the Upload Image button and handle file upload
  156 | const [fileChooser] = await Promise.all([
  157 |   page.waitForEvent('filechooser'),
  158 |   page.locator('button.upload-btn span.block:has-text("Upload Image")').click()
  159 | ]);
  160 | 
  161 | await fileChooser.setFiles('./tests/files/profile.png'); 
  162 | await page.getByRole('button', { name: 'Add Properties' }).click();
  163 |  await page.waitForTimeout(2000); 
  164 | 
  165 | // ✅ Property Name
  166 |     await page.locator('input[type="text"]').first().fill(owner.propertyName);
  167 |     console.log('✅ Property Name filled!');
  168 |     
  169 |     await page.locator('input[role="combobox"]').nth(0).click();
  170 |    await page.waitForSelector('[role="option"]');
  171 |     await page.getByText('House', { exact: true }).click();
  172 |     console.log('✅ Property Type selected!');
  173 | 
  174 |     // ✅ Year Built
  175 |     await page.locator('input[type="number"]').nth(0).fill(owner.yearBuilt);
  176 |     console.log('✅ Year Built filled!');
  177 | 
  178 |     // ✅ Furnishing Status Dropdown
> 179 | await page.locator('.q-field__native').filter({ has: page.locator('input[role="combobox"]') }).first().click();
      |                                                                                                        ^ Error: locator.click: Target page, context or browser has been closed
  180 | await page.waitForSelector('[role="option"]', { state: 'visible' });
  181 | await page.locator('[role="option"]').first().click({ force: true });
  182 | console.log('✅ Dropdown selected!');
  183 | 
  184 |     // ✅ Address
  185 |     await page.locator('input[type="search"][role="combobox"]').fill(owner.address);
  186 |     await page.waitForTimeout(1000);
  187 |     console.log('✅ Address filled!');
  188 | 
  189 |     // ✅ City
  190 |     await page.locator('input[type="text"]').nth(1).fill(owner.city);
  191 |     console.log('✅ City filled!');
  192 | 
  193 |     // ✅ Country
  194 |     await page.locator('input[placeholder="Enter country"]').fill(owner.country);
  195 |     console.log('✅ Country filled!');
  196 | 
  197 |     // ✅ State Dropdown
  198 |     await page.locator('input[role="combobox"]').last().click();
  199 |     await page.waitForSelector('[role="option"]');
  200 |     await page.waitForTimeout(1000);
  201 |     await page.locator('[role="option"]').first().click();
  202 |     await page.waitForTimeout(1000);
  203 |     console.log('✅ State selected!');
  204 | 
  205 |     // ✅ City Name
  206 |     await page.getByPlaceholder('Enter city name').fill(owner.city);
  207 |     console.log('✅ City Name filled!');
  208 | 
  209 |     // ✅ State
  210 |     await page.locator('input[placeholder="Enter state"]').fill(owner.state);
  211 |     console.log('✅ State filled!');
  212 | 
  213 |     // ✅ Zip Code
  214 |     await page.locator('input[placeholder="Enter zipcode"]').fill(owner.zipCode);
  215 |     console.log('✅ Zip Code filled!');
  216 | 
  217 |     // ✅ Description
  218 |     await page.locator('textarea[placeholder="Enter property description"]').fill(owner.comments);
  219 |     console.log('✅ Description filled!');
  220 | 
  221 |     // ✅ Amenities
  222 |     await page.getByRole('button', { name: 'Select amenities' }).click();
  223 |     await page.getByText('Swimming Pool', { exact: true }).click();
  224 |     console.log('✅ Amenities selected!');
  225 | 
  226 |     // ✅ Parking Type
  227 |     await page.getByText('Parking Type').click();
  228 |     console.log('✅ Parking Type clicked!');
  229 | 
  230 |     // ✅ Upload Property Files
  231 |     await page.locator('input[type="file"]').nth(0).setInputFiles('./tests/files/property-image32.avif');
  232 |     await page.locator('input[type="file"]').nth(1).setInputFiles('./tests/files/owner-document.pdf');
  233 |     console.log('✅ Property files uploaded!');
  234 | 
  235 |     // ✅ Continue to Unit
  236 |     await page.getByRole('button', { name: 'Continue' }).click();
  237 |     console.log('✅ Continue clicked!');
  238 | 
  239 | 
  240 | 
  241 | 
  242 |   // ✅ Screenshot
  243 |   /*console.log('Taking screenshot...');
  244 |   await page.screenshot({
  245 |     path: 'screenshots/owner-added.png',
  246 |     fullPage: true
  247 |   });
  248 |   console.log('✅ Screenshot saved!');*/
  249 | 
  250 | });
```