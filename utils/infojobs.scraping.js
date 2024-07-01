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
        productData['fuente'] = "infojobs.net";
        //url del anuncio
        productData['url'] = url;
        //Titulo
        productData['title'] = await page.$eval("#prefijoPuesto", titulo=>titulo.innerText)
        //Nombre de la empresa
        productData['empresa'] = await page.$eval(".link", link=>link.innerText)
        //logo
        productData['logo'] = await page.$eval(".border-rounded-l", img=>img.src)
        //salario
        productData['salario'] = await page.$eval("ul > li:nth-child(4) > span", salario=>salario.innerText)
        //localizacion
        productData['localizacion'] = await page.$eval("#prefijoProvincia", localizacion=>localizacion.innerText)

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

        // Esperamos a que el botón de consentimiento esté disponible y luego hacemos clic en él
        await page.waitForSelector('#didomi-notice-agree-button');
        await page.locator('#didomi-notice-agree-button').click();

        // Buscamos la barra del buscador y agregamos el valor "fullStack"
        await page.waitForSelector('#palabra');
        await page.locator('#palabra').fill('fullStack');

        // Hacemos clic en "buscar"
        await page.waitForSelector('#searchOffers');
        await page.locator('#searchOffers').click();

        // Esperamos a que los resultados de la búsqueda estén disponibles
        await page.waitForSelector('.ij-OfferCardContent-description-title > a');

        const tmpurls = await page.$$eval(".ij-OfferCardContent-description-title > a", data => data.map(a=>a.href))
        
        //Quitamos los duplicados
        const urls = await tmpurls.filter((link,index) =>{ return tmpurls.indexOf(link) === index})

        console.log("url capuradas",urls)
        // Me quedo con los 20 primeros productos, porque sino es muy largo
        const urls2 = urls.slice(0, 10);
        console.log(urls2)

        // Iteramos el array de urls con un bucle for/in y ejecutamos la promesa extractProductData por cada link en el array. Luego pusheamos el resultado a scraped data
        for(productLink in urls2){
            const product = await extractProductData(urls2[productLink],browser)
            scrapedData.push(product)
        }
         
       
        // cerramos el browser con el método browser.close
        await browser.close()
       // Llamamos a la funcion del modulo normalizar para estandarizar los datos
       const normalicedOferts = Oferts.normalizeOferts(scrapedData);

       //Llamamos a los datos 
       console.log(normalicedOferts, "Lo que devuelve mi función scraper", normalicedOferts.length) 
       return normalicedOferts

        // Cerramos el navegador
        await browser.close();

    } catch (error) {
        console.error("Error al realizar el scraping:", error);
    }
};

// Llamamos a la función scrap con la URL deseada
scrap('https://www.infojobs.net');  // Reemplaza con la URL real que quieres scrapear
