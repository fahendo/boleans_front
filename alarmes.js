var templateCabecalho = `
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">Descrição</th>
                                <th scope="col">Quantidade</th>
                            </tr>
                        </thead> `
                            ;

var templateLinha = ` 
                    <tr class="destaque">
                        <th scope="row">**DESCRICAO**</th>
                        <td>**QUANTIDADE**</td>
                    </tr>`
                         ;  
                                           

function gerarRelatorio(){
    var txtInicio = document.getElementById("txtDataInicio").value;
    var txtFim    = document.getElementById("txtDataFim").value;
    console.log("Inicio = "+txtInicio+" / Fim = "+txtFim);

    if (txtInicio == "" || txtFim == "") {
        alert("Selecione um período");
    }

    else {
        var msgBody = {
            inicio : txtInicio,
            fim    : txtFim
        };
        var cabecalho = {
            method  : 'POST',
            body    : JSON.stringify(msgBody),
            headers : {
                'Content-type': 'application/json'
            }
        }
        
        fetch("http://localhost:8088/alarmes/eventos",cabecalho)
       .then(res => res.json())
       .then(res => preencheTabela(res));
    }
}

function preencheTabela(res){
    var tabela = "";

    for (i=0; i<res.length; i++){
        var alarme = res[i];
        var estiloLinha;
        if (i % 2 == 0){
            estiloLinha = "linhaPar";
        }
        else{
            estiloLinha = "linhaImpar";
        }

        var strLinha = templateLinha.replace("**DESCRICAO**", alarme.nomeAlarme)
                                    .replace("**QUANTIDADE**", alarme.qtde);
                                    
        tabela = tabela + strLinha;
    }
    document.getElementById("relatorio").innerHTML = templateCabecalho + '<body>' + tabela + '</body>';
    
}

function logout(){
    localStorage.removeItem("EvtUser");
    window.location = "index.html";
}

function preencheInfo(){
    // qual a lógica da página?
    /* ao ser carregada, ela vai chamar esta função (a gente vê isso no evento onLoad)
       Uma vez carregada, eu vou verificar se o usuário está com informações armazenadas no 
       localStorage
       Se estiver, sinal que ele está conectado e vou preencher as informações da página
          com o perfil dele
       Se não estiver, redireciona para a página de login para evitar quaisquer violações
       */
    var user = localStorage.getItem("EvtUser");
    if (!user){
        window.location = "index.html";
    }
    
}