import { test, expect } from '@playwright/test';

const register = async (page) => {
  await page.getByLabel('Email address').click();
  await page.getByLabel('Email address').fill(`bltest+${Math.floor(Math.random() * 1000000000+1)}@example.com`);
  await page.getByLabel('I agree to the Boundless Privacy Policy.').check();
  await page.getByLabel('Send me important tips and updates about the visa process.').uncheck();
  await page.getByRole('button', { name: 'Next' }).click();
}

test('Returns MBGC 1 USC', async ({ page }) => {
  await page.goto('https://explore-staging.boundless.com/');
  await page.getByRole('button', { name: 'Continue' }).click();

  await page.getByPlaceholder('First Name').click();
  await page.getByPlaceholder('First Name').fill('Anna');
  await page.getByRole('button', { name: 'Next' }).click();

  await page.getByRole('button', { name: 'Radio Yes Yes' }).click();
  await page.getByRole('button', { name: 'Next' }).click();

  await page.getByTestId('spouse_in_us').click();
  await page.getByRole('button', { name: 'Next' }).click();

  await page.getByPlaceholder('Partner Name').click();
  await page.getByPlaceholder('Partner Name').fill('Paul');
  await page.getByRole('button', { name: 'Next' }).click();

  await expect(page.getByRole('heading', { name: 'What\'s next?' })).toBeVisible();
  await page.getByRole('button', { name: 'Next' }).click();

  await page.getByRole('button', { name: 'Radio Yes Yes' }).click();
  await page.getByRole('button', { name: 'Next' }).click();

  await register(page)

  await expect(page.getByTestId('result-type-heading')).toHaveText('Marriage Green Card', { timeout: 10000 });
});

test('Returns Spousal Visa 3', async ({ page }) => {
  await page.goto('https://explore-staging.boundless.com/');
  await page.getByRole('button', { name: 'Continue' }).click();

  await page.getByPlaceholder('First Name').click();
  await page.getByPlaceholder('First Name').fill('Anna');
  await page.getByRole('button', { name: 'Next' }).click();

  await page.getByRole('button', { name: 'Radio No No' }).click();
  await page.getByRole('button', { name: 'Next' }).click();

  await expect(page.getByRole('heading', { name: 'Are you a U.S. lawful permanent resident (also known as a green card holder)?' })).toBeVisible();
  await page.getByRole('button', { name: 'Radio Yes Yes' }).click();
  await page.getByRole('button', { name: 'Next' }).click();

  await page.getByTestId('spouse_outside_us').click();
  await page.getByRole('button', { name: 'Next' }).click();

  await page.getByPlaceholder('Partner Name').click();
  await page.getByPlaceholder('Partner Name').fill('Paul');
  await page.getByRole('button', { name: 'Next' }).click();

  await expect(page.getByRole('heading', { name: 'What\'s next?' })).toBeVisible();
  await page.getByRole('button', { name: 'Next' }).click();

  await page.getByRole('button', { name: 'Radio No No' }).click();
  await page.getByRole('button', { name: 'Next' }).click();

  await expect(page.getByRole('heading', { name: 'Can you and Paul get married before Paul moves to the U.S.?' })).toBeVisible();
  await page.getByRole('button', { name: 'Radio Yes Yes' }).click();
  await page.getByRole('button', { name: 'Next' }).click();

  await register(page)

  await expect(page.getByTestId('result-type-heading')).toHaveText('Spousal Visa', { timeout: 10000 });
});

test('Returns Mixed Result - Spousal 8/Fiance 4', async ({ page }) => {
  await page.goto('https://explore-staging.boundless.com/');
  await page.getByRole('button', { name: 'Continue' }).click();

  await page.getByPlaceholder('First Name').click();
  await page.getByPlaceholder('First Name').fill('Anna');
  await page.getByRole('button', { name: 'Next' }).click();

  await page.getByRole('button', { name: 'Radio No No' }).click();
  await page.getByRole('button', { name: 'Next' }).click();

  await expect(page.getByRole('heading', { name: 'Are you a U.S. lawful permanent resident (also known as a green card holder)?' })).toBeVisible();
  await page.getByRole('button', { name: 'Radio No No' }).click();
  await page.getByRole('button', { name: 'Next' }).click();

  await page.getByTestId('beneficiary_cr1').click();
  await page.getByRole('button', { name: 'Next' }).click();

  await page.getByPlaceholder('Partner Name').click();
  await page.getByPlaceholder('Partner Name').fill('Paul');
  await page.getByRole('button', { name: 'Next' }).click();

  await expect(page.getByRole('heading', { name: 'What\'s next?' })).toBeVisible();
  await page.getByRole('button', { name: 'Next' }).click();

  await page.getByRole('button', { name: 'Radio Yes Yes' }).click();
  await page.getByRole('button', { name: 'Next' }).click();

  await expect(page.getByRole('heading', { name: 'Are you and Paul already married?' })).toBeVisible();
  await page.getByRole('button', { name: 'Radio No No' }).click();
  await page.getByRole('button', { name: 'Next' }).click();

  await expect(page.getByRole('heading', { name: 'What\'s next?' })).toBeVisible();
  await page.getByRole('button', { name: 'Next' }).click();

  await page.getByTestId('marry_asap').click();
  await page.getByTestId('marry_in_us').click();
  await page.getByTestId('work_throughout').click();
  await page.getByRole('button', { name: 'Next' }).click();
  
  await register(page)

  await expect(page.getByText('Your Results')).toBeVisible();
});

