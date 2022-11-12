// vc nao vou nada - "capitao"
// kakakkakakaksmksk mto bom
// roda ela la okayy

window.addEventListener("load", showProjects)

function showProjects() {
    let cardsWrap = document.getElementById("cards_wrap")

    let url = 'https://dadosabertos.camara.leg.br/api/v2/proposicoes'
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
                div.className = "card_item"

                let div2 = document.createElement("div")
                div2.className = "card_inner"

                let img = document.createElement("img")
                img.src = "img/infocard"

                let div3 = document.createElement("div")
                div3.className = "role_name"
                div3.innerHTML = element.siglaTipo

                // faltava aspas aqui kk
                let div4 = document.createElement("div")
                div4.className = "film"
                div4.innerHTML = element.ementa

                div2.appendChild(img)
                div2.appendChild(div3)
                div2.appendChild(div4)
                div.appendChild(div2)
                cardsWrap.appendChild(div)
            });
        })
        .catch(function(error) {
            console.log(error)
        })
}