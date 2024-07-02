const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const burger = document.querySelector("#divHamburguesa");

abrir.addEventListener("click", () => {
    nav.classList.toggle("visible");
    burger.classList.toggle("invisible");
});

document.addEventListener("click", (event) => {
    if (!nav.contains(event.target) && event.target !== abrir) {
        nav.classList.remove("visible");
        burger.classList.remove("invisible");
    }
});

document.getElementById("formSubirOferta").addEventListener("submit", (event) => {
    event.preventDefault();

    const title = event.target.inputTituloOferta.value;
    const empresa = event.target.inputEmpresa.value;
    const salario = event.target.inputSalario.value;
    const localizacion = event.target.inputLocalizacion.value;

    console.warn(title, empresa, salario, localizacion);
    const newOffer = JSON.stringify(
        {
            title,
            empresa,
            salario,
            localizacion,
            logo: './public/imgs/logoEnConstruccion.png',
            url: 'https://localhost:3000/',
            fuente: "administrador"
        }
    );
    fetch('http://localhost:3000/api/ads', {
        headers: {'Content-Type':'application/json'},
        method: "POST",
        body: newOffer
    })
        .then(res => res.json())
        .then(data => {
            document.getElementById("message").innerHTML = "Oferta guardada con titulo: " + data.title;
        })


})