window.addEventListener("load", showUserInfo)

function showUserInfo() {
    let session = JSON.parse(localStorage.getItem("epolitica-session"))

    let url = `https://a84f-2804-7f0-bec1-90e0-7d86-656-c293-9dd9.sa.ngrok.io/v1/user/public/${session.user_id}`
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
            // troca esse daqui pelo "account-name"
            // o innerHTML vai ser data.name
            // bia aqui aee
            // é isso dai que comentei ata kkkk eu achei que fosse algo que ja tinha comentado

            let nome = document.getElementById("account-name")
            nome.innerHTML = data.name

            // e troca esse por "account-picture"
            // o src vai ser data.picture
            let foto = document.getElementById("account-picture")
            foto.src = data.picture

            // ta rapida heim kk kkkk aprendendo 
            // vamos testar ja entao boa pera que algo nao foi belezii
            //
        })
        .catch(function(error) {
            console.log(error)
        })
}

function sendUpdateUser() {
    let updateName = document.getElementById("update-name").value
    let updatePicture = document.getElementById("update-picture").value

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

    // location.reload()
}