
$(document).ready(function() {
    $('#codBoe').on('change', function() {
        $.ajax({
            url: '/texto/legal/boe/' + $(this).val(),
            type: 'GET',
            success: function (data) {
                $("input[name=tituloLey]").val(data.titulo);

            },
            error: function (err) {
                alert(err);

            },
        });

    });
});

/**** select titulo ley *************/
$(document).ready(function() {
    $(document.body).on('change', '#tituloLey', function() {
        let Boe = $("#tituloLey option:selected").val();
        $("input[name=codBoe]").val(Boe);
        // cambiar codBOE
    });
});
