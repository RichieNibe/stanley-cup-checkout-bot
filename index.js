const puppeteer = require("puppeteer-extra");
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())



async function loadPage(url) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  return page;
}
async function addToCart(page) {
  new Promise((resolve) => setTimeout(resolve, 2000));

  const addToCartButton = await page.waitForSelector("#ProductSubmitButton-");
  await addToCartButton.click();

  await new Promise((resolve) => setTimeout(resolve, 2000));

  await page.waitForSelector("button[name='checkout']");
  await page.evaluate(() => {
    document.querySelector("button[name='checkout']").click();
  })


}

async function checkOut(page) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const emailInput = await page.waitForSelector("#email");
  await emailInput.type("tuvcxmaxsuutadmkac@xfavaj.com");
  const firstNameInput = await page.waitForSelector("#TextField0");
  await firstNameInput.type("John");
  const lastNameInput = await page.waitForSelector("#TextField1");
  await lastNameInput.type("Doe");
  const addressInput = await page.waitForSelector("#shipping-address1");
  await addressInput.type("2401 Elliott Ave");
  const cityInput = await page.waitForSelector("#TextField4");
  await cityInput.type("Seattle");
  const phoneInput = await page.waitForSelector("#TextField6");
  await phoneInput.type("2345678901");
  await page.select("select[name='zone']", "WA");
  const zipCodeInput = await page.waitForSelector("#TextField5");
  await zipCodeInput.type("98121");

  await new Promise((resolve) => setTimeout(resolve, 2000));
  const continueToShipping = await page.waitForSelector("button[type='submit']");
  await continueToShipping.click();

  await new Promise((resolve) => setTimeout(resolve, 3000));
  const continueToPayment = await page.waitForSelector("button[type='submit']");
  await continueToPayment.click();

  const continueToPayment2 = await page.waitForSelector("button[type='submit']");
  await continueToPayment2.click();

  await fillPaymentInfo(page);
}

async function fillPaymentInfo(page) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const cardNumberInput = await page.waitForSelector("#number");
  await cardNumberInput.type(" 4807706658353551", { delay: 100 });
  const cardExpiryInput = await page.waitForSelector("#expiry");
  await cardExpiryInput.type("03/2027", { delay: 300 });
  const cardCvcInput = await page.waitForSelector("#verification_value");
  await cardCvcInput.type(" 687", { delay: 1000 });

  const payButton = await page.waitForSelector("button[type='submit']");
  await payButton.click();

}


async function run() {
  const page = await loadPage();
  await page.goto("https://www.stanley1913.com/products/the-club-vintage-quencher-h2-0-flowstate%E2%84%A2-tumbler-30-oz?variant=53972848050536");
  await addToCart(page);
  await checkOut(page);

}

run();
