const normalizeOferts = (dates) => {
    console.log(dates)
    const comunidadesAutonomas = {
        "Andalucía": ["Almería", "Cádiz", "Córdoba", "Granada", "Huelva", "Jaén", "Málaga", "Sevilla"],
        "Aragón": ["Huesca", "Teruel", "Zaragoza"],
        "Asturias": ["Asturias"],
        "Islas Baleares": ["Islas Baleares"],
        "Canarias": ["Las Palmas", "Santa Cruz de Tenerife"],
        "Cantabria": ["Cantabria"],
        "Castilla y León": ["Ávila", "Burgos", "León", "Palencia", "Salamanca", "Segovia", "Soria", "Valladolid", "Zamora"],
        "Castilla-La Mancha": ["Albacete", "Ciudad Real", "Cuenca", "Guadalajara", "Toledo"],
        "Cataluña": ["Barcelona", "Girona", "Lleida", "Tarragona"],
        "Extremadura": ["Badajoz", "Cáceres"],
        "Galicia": ["A Coruña", "Lugo", "Ourense", "Pontevedra"],
        "Madrid": ["Madrid"],
        "Murcia": ["Murcia"],
        "Navarra": ["Navarra"],
        "La Rioja": ["La Rioja"],
        "País Vasco": ["Álava", "Gipuzkoa", "Bizkaia"],
        "Comunidad Valenciana": ["Alicante", "Castellón", "Valencia"]
    };

    dates.forEach(ofert => {
        const { salario, localizacion, fuente } = ofert;
        console.log(salario)
        console.log(localizacion)
        console.log(fuente)

        // Normalizar salario
        if (salario !== 'salario no especificado' && fuente === "indeed.com") {
            console.log('he entrado en modificar salario')
            const separacionSalario = salario.split(" ");
            console.log(separacionSalario)
            ofert.salario = `${separacionSalario[1]} - ${separacionSalario[4]}`;
        }

        // Normalizar localización
        if (localizacion !== "En remoto") {
            console.log('he entrado en modificacion de localizacion')
            let newLocalizacion = "No especificado";
            for (const comunidad in comunidadesAutonomas) {
                if (localizacion.includes(comunidad)) {
                    newLocalizacion = comunidad;
                    break;
                }
                for (const provincia of comunidadesAutonomas[comunidad]) {
                    if (localizacion.includes(provincia)) {
                        newLocalizacion = comunidad;
                        break;
                    }
                }
                if (newLocalizacion !== "No especificado") break;
            }
            ofert.localizacion = newLocalizacion;
        }
        console.log(ofert)
        return ofert
    });

    return dates;
};

let objetTry = {
    fuente: 'indeed.com',
    url: `https://es.indeed.com/rc/clk?jk=3be7e402ace2e1d2&bb=3XqrAsgfyuWg5ltFvNkQlDOQtlxn3Yf28gBOu-2YNDh99eWmJ7-iFqJBOHo7i7ss40l8
    -8AfjR0xB8p2L423qWTnK9UvJIT9dLXv_KbuynXv4sEYftO4758CugxlXq7k&xkcb=SoBj67M3_239Gk_Hix0IbzkdCdPP&fccid=579391dc572d4f22&vjs=3`,
    title: 'Fullstack Developer',
    empresa: 'Excibit Solutions Spain',
    salario: 'De 35.000 € a 40.000 € al año',
    localizacion: '28010 Madrid, Madrid provincia'
}

let objetTry2 = {
    fuente: 'ticjob.es',
    url: 'https://ticjob.es/esp/busqueda/trabajo/desarrollador-fullstack/64422',
    title: 'Desarrollador Fullstack',
    empresa: 'Rawson BPO',
    logo: 'https://ticjob.es/files/logo/Rawson_BPO_1480931873_2538.png.mid.png',
    localizacion: 'Madrid, España',
    salario: '36.000 - 42.000'
}

console.log(normalizeOferts([objetTry]))
console.log(normalizeOferts([objetTry2]))

module.exports = { normalizeOferts }