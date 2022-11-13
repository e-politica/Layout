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

window.addEventListener("load", showDeputyInfo)

function showDeputyInfo() {
    let url = `https://dadosabertos.camara.leg.br/api/v2/deputados/${urlParams.id}`
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

            let foto = document.getElementById("foto-politico")
            foto.src = data.dados.ultimoStatus.urlFoto

            let email = document.getElementById("email-politico")
            email.innerHTML = data.dados.ultimoStatus.email

            let nascimento = document.getElementById("nascimento-politico")
            nascimento.innerHTML = data.dados.dataNascimento

            let deputyName = document.getElementById("nome-politico")
            let partyName = document.getElementById("partido-politico")

            deputyName.innerHTML = data.dados.ultimoStatus.nome
            partyName.innerHTML = data.dados.ultimoStatus.siglaPartido
        })
        .catch(function(error) {
            console.log(error)
        })
}

var projectsPage = 1

function loadMoreProjects() {
    projectsPage++
    showProjects()
}

window.addEventListener("load", showProjects)

function showProjects() {
    let containerCard = document.getElementById("container-card")

    let url = `https://dadosabertos.camara.leg.br/api/v2/proposicoes?idDeputadoAutor=${urlParams.id}&pagina=${projectsPage}&itens=10`
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

                let p = document.createElement("p")
                p.innerHTML = element.ementa

                let div2 = document.createElement("div")
                div2.className = "role_name"
                div2.innerHTML = element.siglaTipo

                div.appendChild(div2)
                div.appendChild(p)
                containerCard.appendChild(div)
            });
        })
        .catch(function(error) {
            console.log(error)
        })
}