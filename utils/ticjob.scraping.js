const puppeteer = require('puppeteer');
const Oferts = require('./normalization');

// Creamos una función para extraer la información de cada producto
const extractProductData = async (url,browser) => {

    try{
        // Creamos un objeto vacío donde almacenaremos la información de cada producto
        const productData = {}
        // Abrimos una nueva pestaña
        const page = await browser.newPage()
        // Accedemos al link de cada producto que nos llega por parámetros
        await page.goto(url)

        //Le damos a la página un ancho
        await page.setViewport({
            width: 1080,
            height: 1920
          });

        // Utilizamos el método newPage.$eval(selector, function) y almacenamos en productData:
/********** A RELLENAR todos los page.$eval(selector, function)  *********/
        //fuente del anuncio
        productData['fuente'] = "ticjob.es";
        //url del anuncio
        productData['url'] = url;
        //Titulo
        productData['title'] = await page.$eval("#job-title", titulo=>titulo.innerText)
        //Nombre de la empresa
        productData['empresa'] = await page.$eval("img.job-offer-logo-image", link=>link.title)
        //logo
        productData['logo'] = await page.$eval("img.job-offer-logo-image", img=>img.src)
        //localizacion
        productData['localizacion'] = await page.$eval("#job-location0", localizacion=>localizacion.innerText)
        //salario
        if(await page.$eval("#summarySalary > span", salario=>salario.innerText) != '0'){
            productData['salario'] = await page.$eval("#summarySalary > span", salario=>salario.innerText)
        } else {
            productData['salario'] = "salario no especificado"
        }
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
        await page.waitForSelector('#keywords-input');
        await page.locator('#keywords-input').fill('fullStack');

        // Hacemos clic en "buscar"
        await page.waitForSelector('#main-search-button');
        await page.locator('#main-search-button').click();

        // Esperamos a que los resultados de la búsqueda estén disponibles
        await page.waitForSelector('.job-card-header > a');

        const tmpurls = await page.$$eval(".job-card-header > a", data => data.map(a=>a.href))
        
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
         const normalicedOferts = Oferts.normalizeOferts(scrapedData)

         //Llamamos a los datos  
         console.log(normalicedOferts, "Lo que devuelve mi función scraper", normalicedOferts.length) 
         return normalicedOferts

    } catch (error) {
        console.error("Error al realizar el scraping:", error);
    }
};

// Llamamos a la función scrap con la URL deseada
scrap('https://ticjob.es/');  // Reemplaza con la URL real que quieres scrapear
