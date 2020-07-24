var templateCabecalho = `
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">Data</th>
                                <th scope="col">Alarme</th>
                                <th scope="col">Hostname</th>
                                <th scope="col">End. IP</th>
                                </tr>
                            </thead> `
                            ;

var templateLinha = ` <tr class="destaque">
                        <th scope="row">**DATA**</th>
                        <td>**ALARME**</td>
                        <td>**HOST**</td>
                        <td>**IP**</td>
                    </tr>`
                         ;

        



/*

                    <table class="table">
                      <thead class="thead-dark">
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Primeiro</th>
                          <th scope="col">Último</th>
                          <th scope="col">Nickname</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">1</th>
                          <td>Mark</td>
                          <td>Otto</td>
                          <td>@mdo</td>
                        </tr>
                        <tr>
                          <th scope="row">2</th>
                          <td>Jacob</td>
                          <td>Thornton</td>
                          <td>@fat</td>
                        </tr>
                        <tr>
                          <th scope="row">3</th>
                          <td>Larry</td>
                          <td>the Bird</td>
                          <td>@twitter</td>
                        </tr>
                      </tbody>
                    </table>


                    */


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
        
        fetch("http://localhost:8088/eventos/periodo",cabecalho)
       .then(res => res.json())
       .then(res => preencheTabela(res));
    }

}

function preencheTabela(res){
    var tabela = "";

    for (i=0; i<res.length; i++){
        var evento = res[i];
        
        var strLinha = templateLinha.replace("**DATA**",evento.data)
                                    .replace("**ALARME**", evento.alarme.nome)
                                    .replace("**HOST**", evento.equipamento.hostname)
                                    .replace("**IP**", evento.equipamento.endIp);
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