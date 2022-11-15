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

    let url = `https://a84f-2804-7f0-bec1-90e0-7d86-656-c293-9dd9.sa.ngrok.io/v1/proposition/${urlParams.id}/comment`
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

window.addEventListener("load", showComments)

function showComments() {
    let commentSection = document.getElementById("comment-section")

    let url = `https://a84f-2804-7f0-bec1-90e0-7d86-656-c293-9dd9.sa.ngrok.io/v1/proposition/${urlParams.id}/comments?page=${commentsPage}&limit=15`
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
            data.forEach(element => {
                // bia
                // opa
                // troca ai os innerHTML do nome, comment, e src da imagem para aqueles campos
                // que mandei no zap. belezas


                let div = document.createElement("div")
                div.className = "card"

                let nome = document.createElement("h2")
                nome.className = "profile-name"
                nome.innerHTML = element.user_public_info.name

                let imagem = document.createElement("img")
                imagem.className = "profile-img"
                    // esse campo picture, ta dentro de quem, la naquele print que mandei? e o name tbn do public user info
                    // isso, ai tem que fazer daquele jeito. como ta dentro, vc faz element.public_user_info.bibibibi isso
                imagem.src = element.user_public_info.picture

                let comment = document.createElement("p")
                comment.className = "profile-info"
                comment.innerHTML = element.comment // esse aqui é assim? isso ai, ele nao ta dentro de ninguem, entao sim

                // faz aqui essa parte de append child da div pfv belezii
                // faz antes desse dai
                // ta certo, sem "" mesmo. é os nomes das variaveis que fez o let la em cima
                // isso sao as classes
                // vc tem que passar o nome das variaveis, nome, imagem, comment :) kkkk boa

                div.appendChild(nome)
                div.appendChild(comment)
                div.appendChild(imagem)
                commentSection.appendChild(div)

            })
        })
        .catch(function(error) {
            console.log(error)
        })
}

// da pull, control+c naquele server, roda dnv, e da f5 na pagina do comentario direto
// é pra vc continuar logada ja. belezis
// faltou salvar o codigo kk akkkk faltou uma coisa aqui