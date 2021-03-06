(function() {

    $(document).on  ("precisaSincronizar",function(){
        
            var cartoes = [];
        
            $("#sync").removeClass("botaoSync--sincronizado");
            $("#sync").addClass("botaoSync--esperando");
        
            $(".cartao").each(function(){
                var cartao={};
                cartao.conteudo = $(this).find(".cartao-conteudo").html();
                cartao.cor = $(this).css("background-color");
                cartoes.push(cartao);
            });
        
            var mural = {
                usuario: usuario
                ,cartoes: cartoes
            }
        
            $.ajax({
                url: "https://ceep.herokuapp.com/cartoes/salvar"
                ,method: "POST"
                ,data: mural
                ,success: function(res){
                    $("#sync").addClass("botaoSync--sincronizado");
                    console.log(res.quantidade + " cartões salvos em "
                + res.usuario);

                var quantidadeRemovidos= controladorDeCartao.idUltimoCartao() - res.quantidade
                console.log(quantidadeRemovidos + " cartoes removidos ")
                }
                ,error: function(){
                    $("#sync").addClass("botaoSync--deuRuim");
                    console.log("Não foi possivel salvar o mural");
                }
                ,complete: function(){
                    $("#sync").removeClass("botaoSync--esperando");
                    
                }
            });
        });
        
    var usuario = "pedro@exemplo.com.br";
    
    
    $.getJSON(
        "https://ceep.herokuapp.com/cartoes/carregar?callback=?",
        {usuario: usuario},
        function(res){
            var cartoes = res.cartoes;
            console.log(cartoes.length + " carregados em " + res.usuario);
            cartoes.forEach(function(cartao){
                controladorDeCartao.adicionaCartao(cartao.conteudo,cartao.cor);
            });
        }
    );
       
    
    $("#sync").click(function(){
        $(document).trigger("precisaSincronizar");
    });


})()



    // https://tableless.com.br/o-basico-sobre-expressoes-regulares/