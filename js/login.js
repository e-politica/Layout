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
            return response.json()
        })
        .then((data) => {
            console.log(data)
        })
        .catch(function(error) {
            console.log(error)
        })
}

// vamos testar