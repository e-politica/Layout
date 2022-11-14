const button = document.querySelector('#like');
const number = document.querySelector('#number');

button.addEventListener('click', () => {
    let likeValue = document.querySelector('#number').textContent;
    let newValue = Number(likeValue) + 1;
    button.classList.add('like');
    number.innerHTML = newValue;
});

var urlParams = function() {
    var query = location.search.slice(1)
    var partes = query.split('&')
    var data = {}
    partes.forEach(function(parte) {
        var chaveValor = parte.split('=')
        var chave = chaveValor[0]
        var valor = chaveValor[1]
        data[chave] = valor
    })

    return data
}()

window.addEventListener("load", showProjectInfo)

function showProjectInfo() {
    let url = `https://dadosabertos.camara.leg.br/api/v2/proposicoes/${urlParams.id}`
    let headers = {
        method: 'GET',
        headers: new Headers({
            'Accept': 'application/json'
        })
    }

    fetch(url, headers)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            let tipo = document.getElementById("project-type")
            tipo.innerHTML = data.dados.siglaTipo

            let ementa = document.getElementById("project-ementa")
            ementa.innerHTML = data.dados.ementa
        })
        .catch(function(error) {
            console.log(error)
        })
}

function sendComment() {
    let commentContent = document.getElementById("comment-content").value

    let session = JSON.parse(localStorage.getItem("epolitica-session"))

    let url = `https://cdbf-2804-7f0-bec1-90e0-6810-298d-a4a-4735.sa.ngrok.io/v1/proposition/${urlParams.id}/comment`
    let headers = {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': session.access_token
        }),
        body: JSON.stringify(commentContent)
    }

    fetch(url, headers)
        .then((response) => {
            if (response.status != 200) {
                throw new Error('something went wrong while commenting')
            }
            return response.json()
        })
        .then((data) => {
            console.log(data)
        })
        .catch(function(error) {
            console.log(error)
        })
}

var commentsPage = 1

function loadMoreComments() {
    commentsPage++
    showComments()
}

function showComments() {
    let url = `https://cdbf-2804-7f0-bec1-90e0-6810-298d-a4a-4735.sa.ngrok.io/v1/proposition/${urlParams.id}/comments?page=${commentsPage}&limit=2`
    let headers = {
        method: 'GET',
        headers: new Headers({
            'Accept': 'application/json'
        })
    }

    fetch(url, headers)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            console.log(data)
                // let tipo = document.getElementById("project-type")
                // tipo.innerHTML = data.dados.siglaTipo

            // let ementa = document.getElementById("project-ementa")
            // ementa.innerHTML = data.dados.ementa
        })
        .catch(function(error) {
            console.log(error)
        })
}