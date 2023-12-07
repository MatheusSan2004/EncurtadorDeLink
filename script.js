function encurtarUrl() {
    // validar se o link existe
    let url = document.getElementById("input-url").value;
    if (!url) {
        alert("É preciso inserir uma URL para encurtar");
        return;
    }

    // Desabilitar o campo de entrada durante a solicitação
    let inputUrl = document.getElementById("input-url");
    inputUrl.disabled = true;

    // api key: 8e9226f607e44d728712956437ecba49

    // encurtar o link

    // headers
    let headers = {
        "Content-Type": "application/json",
        "apiKey": "8e9226f607e44d728712956437ecba49"
    };

    // dados
    let linkRequest = {
        destination: url,
        domain: { fullName: "rebrand.ly" }
    };

    fetch("https://api.rebrandly.com/v1/links", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(linkRequest)
    }).then(response => response.json())
    .then(json => {
        console.log(json);
        if (json.shortUrl) {
            inputUrl.value = json.shortUrl;
            alert("URL encurtada com sucesso!");
        } else {
            alert("Erro ao encurtar a URL. Por favor, tente novamente.");
        }
    }).catch(error => {
        console.error("Erro na requisição:", error);
        alert("Erro ao encurtar a URL. Por favor, tente novamente.");
    }).finally(() => {
        // Reabilitar o campo de entrada, independentemente do resultado
        inputUrl.disabled = false;
    });
}

function copiar() {
    let inputUrl = document.getElementById("input-url");

    inputUrl.select();
    inputUrl.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(inputUrl.value);

    alert(`URL copiada: ${inputUrl.value}`)
}
