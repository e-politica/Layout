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
    // bia, viu aqueles ids que eu criei la nos inputs? sim
    // a gente vai pegar cada um daqueles inputs com o getElementById
    // pra poder pegar os valores deles la no form. humm com o 'let' tbm?
    // vou fazer um exemplo pq nao sei ao certo tb
    // aqui não ta na parte de comentarios?
    // tamo fazendo no arquivo errado kk. kkkkkmkkk

    let name = document.getElementById("register-name").value
    console.log(name)

    let email = document.getElementById("register-email").value
    console.log(email)

    let password = document.getElementById("register-password").value
    console.log(password)
}