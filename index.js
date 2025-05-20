const puppeteer = require("puppeteer-extra");
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())



async function loadPage(url) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  return  page;
}
async function addToCart(page) {
  new Promise((resolve) => setTimeout(resolve, 2000));

  const addToCartButton = await page.waitForSelector("#ProductSubmitButton-");
  await addToCartButton.click();

  new Promise((resolve) => setTimeout(resolve, 2000));

  await page.waitForSelector("button[name='checkout']");
  await page.evaluate(() => {
     document.querySelector("button[name='checkout']").click();
  })

  new Promise((resolve) => setTimeout(resolve, 2000));

  await page.waitForSelector("#cart-icon-bubble");
  await page.evaluate(() => {
     document.querySelector("#cart-icon-bubble").click();
  })
  
   
}

async function checkOut(page) {
    const checkoutButton = await page.waitForSelector(".checkout-button");
    await checkoutButton.click();
    const emailInput = await page.waitForSelector("#email");
    await emailInput.type("");
    const continueButton = await page.waitForSelector(".continue-button");    
}

async function fillShippingInfo(page) { 
    const firstNameInput = await page.waitForSelector("#first-name");
    await firstNameInput.type("John");
    const lastNameInput = await page.waitForSelector("#last-name");
    await lastNameInput.type("Doe");
    const addressInput = await page.waitForSelector("#address");
    await addressInput.type("123 Main St");
    const cityInput = await page.waitForSelector("#city");
    await cityInput.type("Anytown");
    const stateInput = await page.waitForSelector("#state");
    await stateInput.type("CA");
    const zipCodeInput = await page.waitForSelector("#zip-code");
    await zipCodeInput.type("12345");
}


async function run() {
  const page = await loadPage();
  await page.goto("https://www.stanley1913.com/products/the-club-vintage-quencher-h2-0-flowstate%E2%84%A2-tumbler-30-oz?variant=53972848050536");
  await addToCart(page);
 

}

run();
