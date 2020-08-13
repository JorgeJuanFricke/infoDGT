

const leeListaRecursos = (pagina) => {
    //let tipo = $('#tipos').children("option:selected").text();
    let texto =$('#buscaRecursos').val();
    let query = `?texto=${texto}`;
    if (pagina) {
        let query = query +  `&pagina=${pagina}`;
    }
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
    .attr("class","list-group-item d-flex justify-content-between align-items-center");

    newli.append('span')
    .text(function(d){ return d.tipo.codigo });

   
     newli.append("span")
   
     .append("a")
     .attr("href", "#")
     .on("click", function (d) {
        verRecurso(d._id);
       
     })
         .text(function (d) {
        return d.nombre;
    });





    newli.append("span")
   
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
    .attr("class", "badge badge-primary badge-pill")
    .append("a")
    .attr("href", "#")
    .append("svg")

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

};





const muestraPaginacion= (pagina, recursosPagina, totalRecursos) => {

    let paginaActual = pagina;
    let existePaginaSiguiente =  recursosPagina * paginaActual < totalRecursos;
    let existePaginaAnterior =  paginaActual > 1;
    let paginaSiguiente = paginaActual + 1;
    let paginaAnterior = paginaActual - 1;
    let ultimaPagina = Math.ceil(totalRecursos / recursosPagina);

    let paginacion =  d3.select('#paginacion');
    paginacion.selectAll("*").remove();
   
    
    if (paginaActual !== 1 && paginaAnterior !== 1) {
        paginacion.append("a")
        .attr(href="#")
        .on("click", leeListaRecursos(1))
        .text("1");

       
    }
    if (existePaginaAnterior) { 
        paginacion.append("a")
        .attr(href="#")
        .on("click", leeListaRecursos(paginaAnterior))
        .append("span")
        .text("página Anterior");
           
    }
    paginacion.append("a")
        .attr(href="#")
        .attr("class", "active")
        .on("click", leeListaRecursos(paginaActual))
        .text(paginaActual);

    
           
    if (existePaginaSiguiente) {
        paginacion.append("a")
        .attr(href="#")
        .attr("class", "active")
        .on("click", leeListaRecursos(paginaSiguiente))
        .text(paginaSiguiente);

    
       
    }
           
    if (UltimaPagina !== paginaActual && paginaSiguiente !== ultimaPagina) { 
        paginacion.append("a")
        .attr(href="#")
        .attr("class", "active")
        .on("click", leeListaRecursos(ultimaPagina))
        .text("Ultima página");

      
    }
};


const muestraRecurso = (recurso) => {

    var recursosSeccion = d3.select('#Recursos');
    recursosSeccion.selectAll("*").remove();

        

    var panel = recursosSeccion.append("div")
         .attr("class", "panel panel-default");

    var cabecera = panel.append("div")
        .attr("class", "panel-heading");
       

    var titulo = cabecera.append("div")
        .append("h3");

      titulo.append("span")
        .text(recurso.tipo.codigo);

      titulo.append("span")  
      .text(recurso.nombre)
      
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
      .text( moment(recurso.publicacion).format("MM-YYYY"));
    


    

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






/*** on submit texto *************************/
$(document).ready(function () {
    $('#texto').on('submit', function () {
        let texto = this.val();
        $("#texto").attr("action", "texto=" + texto);
    });

    
});