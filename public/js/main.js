
const renderUsuario = (usuario) => {
    if (usuario) {
      $('#nologeado').addClass('d-none');
      $('#logeado').removeClass('d-none');
      if (usuario.admin) {
        $('#adminMenu').removeClass('d-none');
      }
      else {
        $('#adminMenu').addClass('d-none');
       }
    }  
    else {  
        $('#logeado').addClass('d-none');
        $('#nologeado').removeClass('d-none');

    }    

    
};


const leeListaRecursos = (pagina) => {
    //let tipo = $('#tipos').children("option:selected").text();
    let texto =$('#buscaRecursos').val();
    let query = `?texto=${texto}`;
    if (pagina) {
        query = query +  `&pagina=${pagina}`;
    }
    var base_url = window.location.origin;

   

    fetch(base_url + '/recursos' + query , {
            method: 'GET',
            headers: {
                //Authorization: 'Bearer ' + token,
              
            }
        })
        .then(res => {
            return res.json();
        })
        .then(resultado => {
         
            muestraListaRecursos(resultado.recursos);
            muestraPaginacion(resultado.pagina, resultado.recursosPagina, resultado.totalRecursos)
                        
            
        }).catch(err => console.log(err));

};








muestraListaRecursos = (data) => {
   
    let seccion =  d3.select('#Recursos');
    seccion.selectAll("*").remove();
   
    var ul = seccion.append("ul");

    ul.attr("class", "list-group w-100");
    
    var li = ul.selectAll('li.list-group-item')
    .data(data, function(d) { return d._id });

    li.exit().remove();

    var newli = li.enter().append('li')
    .attr("class","list-group-item d-flex ");

    newli.append('span')
    .attr("style" ,"margin-left: 20px")
    .text(function(d){ return d.tipo.codigo });

   
     newli.append("span")
     .attr("style" ,"margin-left: 20px")
     
     .append("a")
     .attr("href", "#")
     .on("click", function (d) {
        verRecurso(d._id);
       
     })
         .text(function (d) {
        return d.nombre;
    });





    newli.append("span")
    .attr("style" ,"margin-left: 20px")
    
    .text(function (d) {
        return moment(d.publicacion).format("MM-YYYY");
    });


    if (data.url) {
        newli.append("span")
        .attr("class", "badge badge-primary badge-pill")
        .append("a")
        .attr("href", "#")

        .on("click", function (d) {
            window.open(data.url); 
                    
        })
        .text("IR");
    };





    newli.append("span")
    .attr("style" ,"margin-left: 20px")
   
    //.attr("class", "badge badge-primary badge-pill")
    .on("click", function (d) {
       
        editaRecurso(d._id);
        
    })
    .append("svg")
    .attr("width", "1em")
    .attr("height", "1em")
    .attr("viewBox", "0 0 16 16")
    .attr("class", "bi bi-pencil")
    .attr("fill", "currentColor")
    .attr("xmlns", "http://www.w3.org/2000/svg")
    .append("path")
    .attr("fill-rule", "evenodd")
    .attr("d", "M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z")
    .append("path")
    .attr("fill-rule", "evenodd")
    .attr("d", "M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z");
    
    



    newli.append("span")
    .attr("style" ,"margin-left: 20px")
    .append("button")
    .attr("type", "button")
    .attr("data-toggle", "modal")
    .attr("data-target", "#removeUser" )
    
    .on('click', function(d) {
        d3.select("#recursoAEliminar").text(d.nombre);
        d3.select("#removeUser").datum(d);
    })
   
   
    .append("svg")
    .attr("width", "1em")
    .attr("height", "1em")
    .attr("viewBox", "0 0 16 16")
    .attr("class", "bi bi-trash")
    .attr("fill", "currentColor")
    .attr("xmlns", "http://www.w3.org/2000/svg")
    .append("path")
    .attr("d", "M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z")
    .append("path")
    .attr("fill-rule", "evenodd")
    .attr("d", "M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z");
    
};




const muestraPaginacion= (pagina, recursosPagina, totalRecursos) => {

    

    let paginacion =  d3.select('#paginacion');
    paginacion.selectAll("*").remove();
   
    if (totalRecursos <= 0) {
        return;
    }
    
    let paginaActual = pagina || 1;
    let existePaginaSiguiente =  recursosPagina * paginaActual < totalRecursos;
    let existePaginaAnterior =  paginaActual > 1;
    let paginaSiguiente = paginaActual + 1;
    let paginaAnterior = paginaActual - 1;
    let ultimaPagina = Math.ceil(totalRecursos / recursosPagina);
    
    if (paginaActual !== 1 && paginaAnterior !== 1) {
        paginacion.append("a")
        .attr("href","#")
        .on("click", function() {
            leeListaRecursos("1");
        })
        .text("1");

       
    }
    if (existePaginaAnterior) { 
        paginacion.append("a")
        .attr("href", "#")
        .on("click", function() {
            leeListaRecursos(paginaAnterior);
           })
        .append("span")
        .text("página Anterior");
           
    }
    if(ultimaPagina > 1) {
        paginacion.append("a")
            .attr("href" ,"#")
            .attr("class", "active")
            .on("click", function() {
                leeListaRecursos(paginaActual)
            })
            .text(paginaActual);
    }
    
           
    if (existePaginaSiguiente) {
        paginacion.append("a")
        .attr("href","#")
        .attr("class", "active")
        .on("click", function() {
            leeListaRecursos(paginaSiguiente)
        })
        .text(paginaSiguiente);

    
       
    }
           
    if (ultimaPagina !== paginaActual && paginaSiguiente !== ultimaPagina) { 
        paginacion.append("a")
        .attr("href","#")
        .attr("class", "active")
        .on("click", function() {
            leeListaRecursos(ultimaPagina);
        })
        .text("Ultima página");

      
    }
};


const muestraRecurso = (recurso) => {

    var recursosSeccion = d3.select('#Recursos');
    recursosSeccion.selectAll("*").remove();

        

    var panel = recursosSeccion.append("div")
         .attr("class", "container")
         .append("div")
         .attr("class", "panel panel-default")

         .append("hr")
         .attr("height", "100px" )
         

         .append("hr")
         .attr("height", "100px" );
         
    

    var cabecera = panel.append("div")
        .attr("class", "panel-heading");
       

    var titulo = cabecera.append("div")
        .append("h3");

      titulo.append("span")
        .text(recurso.tipo.codigo);

      titulo.append("span")  
      .text(recurso.nombre)
      .attr("class", "float-right");
      
      if(recurso.derogacion) {
        titulo.append("span")
        .attr("class", "glyphicon glyphicon-remove-sign")
        .attr("aria-hidden", "true");
     };

      var subtitulo = cabecera.append("div")
      .append("h5");

      subtitulo.append("span")
      .text(recurso.procedencia);

      subtitulo.append("span")
      .text( moment(recurso.publicacion).format("MM-YYYY"))
      .attr("class", "float-right");
    


    

    var cuerpo = panel.append("div")
    .attr("class", "panel-body")

        
    
     cuerpo.append("div")
    .html(recurso.descripcion);

    var pie = panel.append("div");

       
    if(recurso.url) {
        pie.append("a")
        .attr("href", recurso.url)
        .text(recurso.url);
    }
    

};
    


muestralogin = () => {
    let template = Handlebars.templates.vLogin;
    $('body').append(template({}));
    $('#modalLogin').modal('show');
}

/*
logea = () => {

    var base_url = window.location.origin;

    var host = window.location.host;
    
    url = base_url + '/usuario/login'
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
*/




logout = () => {
    $('#modalLogout').modal('show');
}




const updateUsuario = () => {

   
    var base_url = window.location.origin;
    let url = base_url + '/autenticado';
    let method = 'GET';

    token = localStorage.getItem("token");

    fetch(url, {
      method: method,
      headers: {

        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    })
     
    .then(response => {
        response.json()
        .then(json => {
            
          
            if (response.status === 200) {
              
                renderUsuario(json.usuario);
               
            }  
            else {
                alert(json.message);
            }
         })
      
       
    })  
   .catch(error =>  {
       console.log(error)
        alert (error);
     })
    
};
 





/*** on submit texto *************************/
$(document).ready(function () {
    $('#texto').on('submit', function () {
        let texto = this.val();
        $("#texto").attr("action", "texto=" + texto);
    });

    
});