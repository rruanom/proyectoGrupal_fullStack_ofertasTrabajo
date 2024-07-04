//Lógica de menu hamburguesa
const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const burger = document.querySelector("#divHamburguesa");
const ulNav = document.querySelector("#ulNav");
const usuario = true;
const admin = true;

//Lógica de pintar menu hamburguesa distinto segun rol de usuario


abrir.addEventListener("click", () => {
    ulNav.innerHTML = "";
    nav.classList.toggle("visible");
    burger.classList.toggle("invisible");
    if (usuario === true && admin === true) {
        printMenuAdmin();
    } else if (usuario === true && admin === false) {
        printMenuLoged();
    } else if (usuario === false && admin === false) {
        printMenuUnlogged();
    }
});

document.addEventListener("click", (event) => {
    if (!nav.contains(event.target) && event.target !== abrir) {
        nav.classList.remove("visible");
        burger.classList.remove("invisible");
    }
});

document.addEventListener("submit", (event) => {
    if (event.target.id == "formSubirOferta") {
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
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            body: newOffer
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                document.getElementById("message").innerHTML = `Oferta guardada con titulo: ${data.title}`;
            })
    }
}
)


const printMenuAdmin = () => {
    const home = document.createElement("li");
    const favorites = document.createElement('li');
    const dashboard = document.createElement('li');
    const users = document.createElement('li');
    const logout = document.createElement('li');
    const linkFavorites = document.createElement('a');
    const linkDashboard = document.createElement('a');
    const linkUsers = document.createElement('a');
    const linkHome = document.createElement('a');
    const linkLogout = document.createElement('a');


    linkFavorites.innerText = 'Favorites';
    linkDashboard.innerText = 'Dashboard';
    linkUsers.innerText = 'Users';
    linkHome.innerText = 'Home';
    linkLogout.innerText = 'Logout';


    linkFavorites.setAttribute('href', './favoritos');
    linkDashboard.setAttribute('href', './dashboard');
    linkUsers.setAttribute('href', './users');
    linkHome.setAttribute('href', './');
    linkLogout.setAttribute('href', './');



    favorites.append(linkFavorites);
    dashboard.append(linkDashboard);
    users.append(linkUsers);
    home.append(linkHome);
    logout.append(linkLogout);


    ulNav.append(home);
    ulNav.append(favorites);
    ulNav.append(dashboard);
    ulNav.append(users);
    ulNav.append(logout);

}

const printMenuLoged = () => {
    const home = document.createElement("li");
    const favorites = document.createElement('li');
    const profile = document.createElement('li');
    const logout = document.createElement('li');
    const linkFavorites = document.createElement('a');
    const linkProfile = document.createElement('a');
    const linkLogout = document.createElement('a');
    const linkHome = document.createElement('a');


    linkFavorites.innerText = 'Favorites';
    linkProfile.innerText = 'Profile';
    linkLogout.innerText = 'Logout';
    linkHome.innerText = 'Home';

    linkFavorites.setAttribute('href', './favoritos');
    linkProfile.setAttribute('href', './perfil');
    linkLogout.setAttribute('href', './');
    linkHome.setAttribute('href', './');

    favorites.append(linkFavorites);
    profile.append(linkProfile);
    logout.append(linkLogout);
    home.append(linkHome);

    ulNav.append(home);
    ulNav.append(favorites);
    ulNav.append(profile);
    ulNav.append(logout);
}


const printMenuUnlogged = () => {
    const home = document.createElement("li");
    const login = document.createElement('li');
    const register = document.createElement('li');
    const linkLogin = document.createElement('a');
    const linkRegister = document.createElement('a');
    const linkHome = document.createElement('a');


    linkLogin.innerText = 'Login';
    linkRegister.innerText = 'Register';
    linkHome.innerText = 'Home';

    linkLogin.setAttribute('href', './login');
    linkRegister.setAttribute('href', './registro');
    linkHome.setAttribute('href', './');


    login.append(linkLogin);
    register.append(linkRegister);
    home.append(linkHome);

    ulNav.append(home);
    ulNav.append(login);
    ulNav.append(register);
}



//FUNCIÓN PARA BORRAR FAVORITOS
async function deleteFavorite(id_oferta) {
    const email = 'email@jony.com';

    try {

        const response = await fetch('/api/favoritos', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_oferta, email }),
        });

        const data = await response.json();
        if (response.ok) {
            alert(data.message);
            location.reload();
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error deleting favorite:', error);
    }
};

//FUNCIÓN PARA CREAR FAVORITOS
async function saveFavorite(email, id_oferta) {
    console.log('Inside saveFavorite function');
    console.log('Email:', email);
    console.log('ID Oferta:', id_oferta);
    try {
        console.log('Script Saving favorite with id_oferta:', id_oferta, 'and email:', email);
        const response = await fetch('/api/favoritos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, id_oferta }),
        });

        const data = await response.json();
        if (response.ok) {
            alert(data.message);
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error saving favorite:', error);
    }
};

//FUNCIÓN PARA BORRAR USUARIOS
async function deleteUser(email) {
    console.log('Deleting user with email:', email); // Log for debugging

    try {
        const response = await fetch('/api/usuarios', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();
        console.log(data);
        if (response.ok) {
            location.reload();
        } else {
            // alert(data.message);
        }
    } catch (error) {
        console.error('Error deleting user:', error);
    }
};



