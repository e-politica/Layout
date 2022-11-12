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