$(document).ready(function(){

    $('#fileupload').fileupload({
        dataType: 'json',
        done: function(e, data){
            $.each(data.result.files, function(index, file){
                $('#Uploads').append($('<div class="upload">' +
                    '<span class="glyphicon glyphicon-ok"></span>&nbsp;' +
                    file.name + '</div>'));
                $('input[name=nombre]').val(file.name);
                $('input[name=url]').val(file.url);
            });

        }
    });

});