var btnSignin = document.querySelector("#signin");
var btnSignup = document.querySelector("#signup");

var body = document.querySelector("body");


btnSignin.addEventListener("click", function() {
    body.className = "sign-in-js";
});

btnSignup.addEventListener("click", function() {
    body.className = "sign-up-js";
})

function sendRegister() {
    let name = document.getElementById("register-name").value
    let email = document.getElementById("register-email").value
    let password = document.getElementById("register-password").value

    let url = `https://cdbf-2804-7f0-bec1-90e0-6810-298d-a4a-4735.sa.ngrok.io/v1/user/register`
    let headers = {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }),
        body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            picture: "avatar aqui" // vamos arrumar depois
        })
    }

    fetch(url, headers)
        .then((response) => {
            if (response.status != 200) {
                throw new Error('something went wrong while registering')
            }
            return response
        })
        .then((data) => {
            localStorage.setItem("epolitica-session", response)
            window.location.href = "home" // vamos arrumar depois
        })
        .catch(function(error) {
            console.log(error)
        })
}

function sendLogin() {
    let email = document.getElementById("login-email").value
    let password = document.getElementById("login-password").value

    let url = `https://cdbf-2804-7f0-bec1-90e0-6810-298d-a4a-4735.sa.ngrok.io/v1/user/login`
    let headers = {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }),
        body: JSON.stringify({
            email: email,
            password: password
        })
    }

    fetch(url, headers)
        .then((response) => {
            if (response.status != 200) {
                throw new Error('something went wrong while logging in')
            }
            return response
        })
        .then((data) => {
            localStorage.setItem("epolitica-session", response)
            window.location.href = "home" // vamos arrumar depois
        })
        .catch(function(error) {
            console.log(error)
        })
}


// esses que eu coloquei "vamos arrumar depoiis" é pq vai ser diferente o valor quando estiver online
// ahh simm

// agora so tem que fazer o mesmo pro login normal
// o login com google eu faço jaja
// bia
// agora é so fazer o mesmo
// mas para os ids login-email  e  login-password
// foi isso kkk
// vamo testa
// testa clicando no botao de register e login
// mas so muda o email pq vai retornar um erro, por ja ter conta criada, se vc testar o register