

const leeListaRecursos = () => {
    let tipo = $('#tipos').children("option:selected").text();
    let texto =$('#buscaRecursos').val();
    let query = `?tipo=${tipo}&texto=${texto}`;
    let pagina = "";
    
    fetch('http://localhost:3000/recursos' + query , {
            method: 'GET',
            headers: {
                //'csrf-token': "csrf23454345"
            }
        })
        .then(res => {
            return res.json();
        })
        .then(resultado => {
            muestraListaRecursos(resultado.recursos);
                        
            
        }).catch(err => console.log(err));

};


/*
<ul class="list-group">
  <li class="list-group-item d-flex justify-content-between align-items-center">
    Cras justo odio
    <span class="badge badge-primary badge-pill">14</span>
  </li>
  <li class="list-group-item d-flex justify-content-between align-items-center">
    Dapibus ac facilisis in
    <span class="badge badge-primary badge-pill">2</span>
  </li>
  <li class="list-group-item d-flex justify-content-between align-items-center">
    Morbi leo risus
    <span class="badge badge-primary badge-pill">1</span>
  </li>
</ul>
*/


muestraListaRecursos = (data) => {
    var ul = d3.select('#listaRecursos');
    ul.attr("class", "list-group w-100");
    
    var li = ul.selectAll('li.list-group-item')
    .data(data, function(d) { return d._id });

    li.exit().remove();

    var newli = li.enter().append('li')
    .attr("class","list-group-item d-flex justify-content-between align-items-center");

    newli.append('span')
    .text(function(d){ return d.tipo.codigo });

    newli.append("span")
   
     .append("a")
     .attr("href", "#")
    .on("click", function (d) {
        window.open(d.url); 
       
    })
    .text(function (d) {
        return d.nombre;
    });

    newli.append("span")
   
    .text(function (d) {
        return moment(d.publicacion).format("MM-YYYY");
    });

    newli.append("span")
    .attr("class", "badge badge-primary badge-pill")
    .append("a")
    .attr("href", "#")

    .on("click", function (d) {
       
        editaRecurso(d._id);
        
    })
    .text("EDIT");




    newli.append("span")
    .attr("class", "badge badge-primary badge-pill")
    .append("a")
    .attr("href", "#")

    .on("click", function (d) {
        console.log(d);
        deleteRecurso(d._id);
    })
    .text("DEL");

}
    





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



/*** on submit texto *************************/
$(document).ready(function () {
    $('#texto').on('submit', function () {
        let texto = this.val();
        $("#texto").attr("action", "texto=" + texto);
    });
});