const puppeteer = require("puppeteer-extra");
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const ac = require("@antiadmin/anticaptchaofficial");
ac.setAPIKey('6629c482f7f1cd0f308664b4ec65bfcb');
puppeteer.use(StealthPlugin())

async function loadPage(url) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  return page;
}

async function solveRecaptcha(url, page) {
    ac.setSoftId(0);

    ac.solveRecaptchaV2EnterpriseProxyless(
        url,
        '6Le-wvkSAAAAAPBMRTvw0Q4Muexq9bi0DJwx_mJ-',
        {
            "s" : "SOME_TOKEN",
            "any_custom_parameter" : "string_number_or_boolean"
        })
        .then(gresponse => {
            console.log('g-response: '+gresponse);
            page.evaluate((gresponse) => {
                document.getElementById('g-recaptcha-response').innerHTML = gresponse;
                document.querySelector("#recaptcha-demo-submit").click();
            }, gresponse);
            
        })
        .catch(error => console.log('test received error '+error));
    
    
}

async function run() {
  const page = await loadPage();
  await page.goto("https://google.com/recaptcha/api2/demo?invisible=false");
  await solveRecaptcha("https://google.com/recaptcha/api2/demo?invisible=false", page);
  


}

run();