let url_api;

function changeAmbient(ambient) {
    switch (ambient) {
        case 1:
            //Produção
            url_api = "https://scrum-cademint-api.herokuapp.com";
            break;
        case 0:
            //Teste
            url_api = "http://localhost:3000";
            break;
    }
}


// MUDAR AMBIENTE DO SITE
//
// 0 - Teste
// 1 - Produção
// 
changeAmbient(1);
//
//

// Função muda o ano do footer da aplicação
let date = new Date();
$(".footer span").html(date.getFullYear());

// Início da aplicação
if ($(document).length) {
    $(".main-header a").on("click", e => {
        if (e.currentTarget.id == "button-enter") {
            return;
        }

        e.preventDefault();

        let target = $(e.currentTarget.attributes.href.nodeValue);

        $("html, body").animate({
            scrollTop: target.offset().top - 150
        }, "slow");
    });

    $(".join-beta-form").on("submit", e => {
        e.preventDefault();

        let data = $(".join-beta-form").serializeArray().reduce(function (obj, item) { // Pega todos os dados do formulário e coloca em um objeto.
            obj[item.name] = item.value;
            return obj;
        }, {});

        $(".join-beta-form").find('.response').html("");
        $(".join-beta-form").find('.response').removeClass("success");
        $(".join-beta-form").find('.response').removeClass("error").hide();

        $(".join-beta-form").find('.response').hide();
        $(".join-beta-form input").attr("disabled", "disabled");
        $(".join-beta-form button").html("<div class='loading'></div>");
        $(".loading").show();
        
        $.ajax({ 
            url: url_api + "/site/enter_closed_beta",
            type: "POST",
            async: false,
            data: data,
            success: (res) => {
                $(".join-beta-form").find('.response').html(res.response.message);
                $(".join-beta-form").find('.response').removeClass("error");
                $(".join-beta-form").find('.response').addClass("success").show();
            },
            error: (xhr) => {
                let error;
                if (xhr.responseJSON) {
                    error = xhr.responseJSON.mensagem;
                } else {
                    error = "Houve um erro ao entrar na fila do beta fechado"
                }

                $(".join-beta-form").find('.response').html(error);
                $(".join-beta-form").find('.response').removeClass("success");
                $(".join-beta-form").find('.response').addClass("error").show();
            },
            complete: () => {
                $(".join-beta-form button").html("ENVIAR");
                $(".join-beta-form input").attr("disabled", false);
            }
        });
    });
}


function playVideo(parentId) {
    $("#" + parentId + " img").hide();
    $("#" + parentId + " i").hide();
    $("#" + parentId + " video").show();
    setTimeout(() => {
        document.querySelector("#" + parentId + " video").classList.remove("stoped");
        document.querySelector("#" + parentId + " video").classList.add("playing");
        document.querySelector("#" + parentId + " video").currentTime = 0;
        document.querySelector("#" + parentId + " video").play();
    }, 100);
}

function pauseVideo() {
    $(".playing").each(function(){
        $(this).removeClass('playing').addClass('stoped');
        $(this).get(0).pause();
    });
    $(".presentation-image video").hide();
    $(".presentation-image img").show();
    $(".presentation-image i").show();
}

$(".play-button").on("click", e => {
    pauseVideo() // Pausa todos os videos ao clicar em um.
    
    let parentId = e.target.parentElement.attributes.id.value;
    
    playVideo(parentId);
    
    $("#" + parentId + " video").on("ended", () => {
        $("#" + parentId + " video").hide();
        $("#" + parentId + " img").show();
        $("#" + parentId + " i").show();
    });
});

$(".responsive-menu i").on("click", () => {
    if ($(".responsive-menu-container").is(":visible")) {
        $(".responsive-menu-container").css("opacity", 0);
        setTimeout(() => {
            $(".responsive-menu-container").hide();
        }, 400);
        return;
    }

    $(".responsive-menu-container").show();
    setTimeout(() => {
        $(".responsive-menu-container").css("opacity", 1);
    }, 10);
});