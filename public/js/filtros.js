

function muestraRecursos() {
    let $recursos = $('article');
    let $template = $('#tptListaRecursos').html();
    let $tipo =  $("#tipo").children("option:selected");
    let $categoria = $('#categoria').children("option:selected");


    $.get('/api', {tipo:$tipo.val(), categoria:$categoria.val()}, function (data, textStatus, jqXHR) {

        if(data.length > 0) {
            $templateRecursos = Handlebars.compile($template);
            $recursos.html($templateRecursos(data));
        }
        else
            $recursos.html('<h3>No existen registros</h3>');

    })
        .fail(function() {alert('error recuperando recursos')})

}




$(document).ready(function() {
    $('#nuevo').on('click', function () {
        let $tipo = $("#tipo").children("option:selected").val();
        let $categoria = $('#categoria').children("option:selected").val();
        let camino = $("#tipo").children("option:selected").data("url");
        this.href = camino + "?tipo=" + $tipo + "&categoria=" + $categoria;
    });
});




$(document).ready(function() {


    /*** on change tipo y categorias ************************/



    $('#tipo').on('change', function () {
        muestraRecursos();

    });

    $('#categoria').on('change', function () {
        muestraRecursos();

    });

});



/*** on submit texto *************************/
$(document).ready(function() {
    $('#texto').on('submit', function(){
        let texto = this.val();
        $("#texto").attr("action", "texto="+ texto);

    });

});
