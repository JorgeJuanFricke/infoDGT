
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
    let tipoId = $('#filtro').children("option:selected").val();

    let query =  `?texto=${texto}`;
    
    if (tipoId) {
        query = query + `&tipo=${tipoId}`
    }
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
            if (resultado.recursos.length == 0) {
                // BUSQUEDA SERVIDOR PYTHON
                alert("ningún resultado")
                
            }
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
    .text(function(d){ return d.tipoNombre });
    

   
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
        return d.procedencia;
    });


    
    newli.append("span")
    .attr("style" ,"margin-left: 20px")
    
    .text(function (d) {
        return moment(d.publicacion).format("MM-YYYY");
    });


    newli.append("span")
    .attr("style" ,"margin-left: 20px")
    .append("a")
    .append("img")
    .attr("width", "32")
    .attr("height", "32")
    .attr("alt", function (d)  {
        return  d.url.substring(d.url.lastIndexOf('.') + 1) 
    })
    .attr("src", function(d) {
          return  "/iconos/svg/" + getExtension(d.url)  +".svg";
    })
    .on("click", function (d) {
        //window.location.href = d.url
        window.open(d.url,"documento" ); 
                
    })


    if (data.url) {
        newli.append("span")
        .attr("class", "badge badge-primary badge-pill")
        .append("a")
        .attr("href", "#")

        
        .text("IR");
    };



    newli.append("span")
    .attr("style" ,"margin-left: 20px")
   
    //.attr("class", "badge badge-primary badge-pill")
    .on("click", function (d) {
       
        getSimsDocs(d._id);
        
    })
    .append("svg")
    .attr("width", "1em")
    .attr("height", "1em")
    .attr("viewBox", "0 0 16 16")
    .attr("class", "bi")
    .attr("fill", "currentColor")
    .append("use")
    .attr("xlink:href", "/iconos/bootstrap-icons.svg#diagram-3");
    

    newli.append("span")
    .attr("style" ,"margin-left: 20px")
    .append("svg")
    .attr("width", "1em")
    .attr("height", "1em")
    .attr("viewBox", "0 0 16 16")
    .attr("class", "bi")
    .attr("type", "button")
    .attr("fill", "currentColor" )
    .append("use")
    .attr("xlink:href", "/iconos/bootstrap-icons.svg#pencil-fill")
    .on("click", function (d) {
       
        editaRecurso(d._id);
        
    });
    
    



    newli.append("span")
    .attr("style" ,"margin-left: 20px")
     
    .append("svg")
    .attr("width", "1em")
    .attr("height", "1em")
    .attr("viewBox", "0 0 16 16")
    .attr("class", "bi")
    .attr("fill", "currentColor")
    .attr("type", "button")
    .attr("data-toggle", "modal")
    .attr("data-target", "#removeRecurso" )
    .append("use")
    .attr("xlink:href", "/iconos/bootstrap-icons.svg#trash-fill")
    .on('click', function(d) {
        d3.select("#recursoAEliminar").text(d.nombre);
        d3.select("#removeRecurso").datum(d);
    });
};


function getExtension(path) {
    var basename = path.split(/[\\/]/).pop(),  // extract file name from full path ...
                                               // (supports `\\` and `/` separators)
        pos = basename.lastIndexOf(".");       // get last position of `.`

    if (basename === "" || pos < 1)            // if file name is empty or ...
        return "";                              //  `.` not found (-1) or comes first (0)
    
    if (basename.indexOf('php?id=BOE') !== -1 )      // maldito boe
        return "html";     

    return basename.slice(pos + 1);            // extract extension ignoring `.`
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

    paginacion.append("p")
    .append("span")
    .text(`recursos:  ${totalRecursos}`);
    
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
                // no mostramos nada
                console.log(json.message);
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