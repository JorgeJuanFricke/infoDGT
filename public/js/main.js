$(document).ready(function () {

    let categoria = $('#categoria').children("option:selected").val();
    //let tipo = $('ul#tipos > li.selected a').val();
    //let path = $("#tipos").children("option:selected").data("url");
    //this.href = path + "?tipo=" + tipo + "categoria=" + categoria;

    // fetch lista de recursos con cat DGT y tipo procedimientos administrativos


});


$(document).ready(function () {
    $('#categoria').on('change', function () {
        let categoria = $('#categoria').children("option:selected").val();
        let tipo = $('ul#tipos > li.selected a').val();
        let path = $("#tipos").children("option:selected").data("url");
        this.href = path + "?tipo=" + tipo + "categoria=" + categoria;
        $.get(url);

    });
});






$(document).ready(function () {
    $('#modalTipo').on("submit", function () {
        let tiposPermitidos = [];
        tiposPermitidos = $('#permitidos').val();
    });
});



login = () => {
    var template = Handlebars.templates.vLogin;
    console.log(template({}));
    $('body').append(template({}));
    $('#modalLogin').modal('show');
}


logout = () => {
    $('#modalLogout').modal('show');
}



goRegistro = () => {
  $('#modalLogin').modal('show');
}


logea = () => {
    url = 'http://localhost:3000/' + this.action
    d3.json(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            method: 'GET',
            dataType: 'json',

        }).then(res => {
            if (res.status !== 200) {
                throw new Error('Fallo login/signup');
            }
            return res.json();
        })
        .then(resData => {
            this.setState({
                title: resData.post.title,
                author: resData.post.creator.name,
                image: 'http://localhost:8080/' + resData.post.imageUrl,
                date: new Date(resData.post.createdAt).toLocaleDateString('en-US'),
                content: resData.post.content
            });
        })
        .catch(err => {
            console.log(err);
        });

};





/*** on submit tex to *************************/
$(document).ready(function () {
    $('#texto').on('submit', function () {
        let texto = this.val();
        $("#texto").attr("action", "texto=" + texto);
    });
});