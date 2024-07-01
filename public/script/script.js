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