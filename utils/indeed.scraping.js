const puppeteer = require('puppeteer');

// Creamos una función para extraer la información de cada producto
const extractProductData = async (url,browser) => {

    try{
        // Creamos un objeto vacío donde almacenaremos la información de cada producto
        const productData = {}
        // Abrimos una nueva pestaña
        const page = await browser.newPage()
        // Accedemos al link de cada producto que nos llega por parámetros
        await page.goto(url)

        // Utilizamos el método newPage.$eval(selector, function) y almacenamos en productData:
/********** A RELLENAR todos los page.$eval(selector, function)  *********/
        //fuente del anuncio
        productData['fuente'] = "ideed.com";
        //url del anuncio
        productData['url'] = url;
        //Titulo
        productData['title'] = await page.$eval("h1.jobsearch-JobInfoHeader-title > span", titulo=>titulo.innerText)
        //Nombre de la empresa
        productData['empresa'] = await page.$eval("span > a", link=>link.innerText)
        
        //salario
        if(await page.locator('div.js-match-insights-provider-h05mm8.e37uo190 > div:nth-child(1) > div > div > ul > li > div > div > div:nth-child(1)'!== null)){
            productData['salario'] = await page.$eval("div.js-match-insights-provider-h05mm8.e37uo190 > div:nth-child(1) > div > div > ul > li > div > div > div:nth-child(1)", salario=>salario.innerText)
        } else {
            productData['salario'] = "salario no especificado"
        }
        //localizacion        
        productData['localizacion'] = await page.$eval("#jobLocationText > div > span", localizacion=>localizacion.innerText)
         //logo
        await page.locator('span > a').click();
        productData['logo'] = await page.$eval("img", image=>image.src) 
        
        return productData // Devuelve los datos de un producto
    }
    catch(err){
        // Devolvemos el error 
       return {error:err}
    }
    
}

const scrap = async (url) => {
    try {
        // Creamos un array vacío scrapedData donde almacenaremos la información obtenida del scraping
        const scrapedData = [];
        // Inicializamos una instancia del navegador (browser) con puppeteer.launch() y añadimos en el objeto de configuración la opción headless:false para que el navegador sea visible
        console.log("Abriendo el navegador...");
        const browser = await puppeteer.launch({ headless: false });

        // Abrimos una nueva pestaña en el navegador creando una instancia con el método newPage() a la que llamaremos page
        const page = await browser.newPage();
        // Indicamos la URL que debe cargarse en la pestaña con page.goto(url)
        await page.goto(url);
        console.log(`Navegando a ${url}...`);

        // Buscamos la barra del buscador y agregamos el valor "fullStack"
        await page.waitForSelector('#text-input-what');
        await page.locator('#text-input-what').fill('fullStack');

        // Hacemos clic en "buscar"
        await page.waitForSelector('button.yosegi-InlineWhatWhere-primaryButton');
        await page.locator('button.yosegi-InlineWhatWhere-primaryButton').click();

        // Esperamos a que los resultados de la búsqueda estén disponibles
        await page.waitForSelector('h2.jobTitle > a');

        //Especificamos un ancho de pantalla que nos deje trabajar, ya que mas ancho no reacciona igual.
        await page.setViewport({
            width: 1080,
            height: 1920
          });

        //cogemos cada url de las ofertas  
        const tmpurls = await page.$$eval("h2.jobTitle > a", data => data.map(a=>a.href))
        
        //Quitamos los duplicados
        const urls = tmpurls.filter((link,index) =>{ return tmpurls.indexOf(link) === index})

        console.log("url capuradas",urls)
        // Me quedo con los 20 primeros productos, porque sino es muy largo
        const urls2 = urls.slice(0, 10);
        console.log(urls2)

        // Iteramos el array de urls con un bucle for/in y ejecutamos la promesa extractProductData por cada link en el array. Luego pusheamos el resultado a scraped data
        for(productLink in urls2){
            const product = await extractProductData(urls2[productLink],browser)
            scrapedData.push(product)
        }
        
        console.log(scrapedData, "Lo que devuelve mi función scraper", scrapedData.length) 
       
        // cerramos el browser con el método browser.close
        await browser.close()
        // Devolvemos el array con los productos
        return scrapedData;

        // Cerramos el navegador
        await browser.close();

    } catch (error) {
        console.error("Error al realizar el scraping:", error);
    }
};

// Llamamos a la función scrap con la URL deseada
scrap('https://es.indeed.com/');  // Reemplaza con la URL real que quieres scrapear
