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



muestralogin = () => {
    let template = Handlebars.templates.vLogin;
    $('body').append(template({}));
    $('#modalLogin').modal('show');
}


// 'Authorization': 'Bearer ' + token

logea = () => {
    url = 'http://localhost:3000/usuario/login'
    d3.json(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              
            },
            method: 'GET',
            dataType: 'json',

        }).then(res => {
            if (res.status !== 200) {
                throw new Error('Fallo login');
            }
            return res.json();
        })
        .then(resData => {
            //poner el nombre del logueado
           
            })
       
        .catch(err => {
            console.log(err);
        });

};

logout = () => {
    $('#modalLogout').modal('show');
}




muestraRegistraUsuario = (nuevo) => {
    let template = Handlebars.templates.vRegistraUsuario;
    $('body').append(template({}));
    $('#modalRegistraUsuario').modal('show');
   
}

registraUsuario = (email) => {
    url = 'http://localhost:3000/usuario/';
    //cargar datos
    d3.json(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              
            },
            method: 'GET',
            dataType: 'json',

        }).then(res => {
            if (res.status !== 200) {
                throw new Error('Error creando usuario');
            }
            return res.json();
        })
       .then(usuario => {
           // llenar los inputs
       })
        .catch(err => {
            console.log(err);
        });

}



muestraActualizaUsuario = (nuevo) => {
    let template = Handlebars.templates.vActualizaUsuario;
    $('body').append(template({}));
    $('#modalActualizaUsuario').modal('show');
   
}

actualizaUsuario = (email) => {
    url = 'http://localhost:3000/usuario/' +email;
    // cargar datos
    d3.json(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              
            },
            method: 'GET',
            dataType: 'json',

        }).then(res => {
            if (res.status !== 200) {
                throw new Error('Error actualizando usuario');
            }
            return res.json();
        })
       .then(usuario => {
           // llenar los inputs
       })
        .catch(err => {
            console.log(err);
        });

}



/*** on submit tex to *************************/
$(document).ready(function () {
    $('#texto').on('submit', function () {
        let texto = this.val();
        $("#texto").attr("action", "texto=" + texto);
    });
});