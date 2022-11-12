var ul = document.querySelector('nav ul')
var menuBtn = document.querySelector('.menu-btn i')

function menuShow() {
    if (ul.classList.contains('open')) {
        ul.classList.remove('open')
    } else {
        ul.classList.add('open')
    }
}

window.addEventListener("load", showDeputies)
window.addEventListener("load", showParties)

var deputiesPage = 1

function showDeputies() {
    let containerCard = document.getElementById("container-card")

    let url = `https://dadosabertos.camara.leg.br/api/v2/deputados?pagina=${deputiesPage}&itens=10`
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

            data.dados.forEach(element => {
                let div = document.createElement("div")
                div.className = "card"

                let img = document.createElement("img")
                img.src = element.urlFoto
                img.alt = "Avatar"
                img.style.width = "100%"

                let spam = document.createElement("spam")
                spam.innerHTML = element.nome

                div.appendChild(img)
                div.appendChild(spam)
                containerCard.appendChild(div)
            })
        })
        .catch(function(error) {
            console.log(error)
        })
}

function loadMoreDeputies() {
    deputiesPage++
    showDeputies()
}

function showParties() {
    let partyList = document.getElementById("party-list")

    let url = "https://dadosabertos.camara.leg.br/api/v2/partidos"
    let headers = {
        method: 'GET',
        headers: new Headers({
            'Accept': 'application/json'
        })
    }

    fetch(url, headers)
        .then((response) => {
            // console.log(response)
            return response.json()
        })
        .then((data) => {
            console.log(data)
            data.dados.forEach(element => {

                let li = document.createElement("li")
                let a = document.createElement("a")
                a.href = element.uri
                a.innerHTML = element.sigla

                // gg easy aeee
                // voy salvar
                li.appendChild(a)
                partyList.appendChild(li)
            })
        })
        .catch(function(error) {
            console.log(error)
        })
}