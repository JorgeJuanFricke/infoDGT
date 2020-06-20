
  


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
    var ul = d3.select('#listaRecursos')
    
    var li = ul.selectAll('li.list-group')
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
    




muestraListaRecursos2 = (data) => {
  
        let filas = d3.select("#listaRecursos")
            .selectAll("div.data")
            .remove()
            .data(data, function (d) {
                return d._id;
            });


        let seleccionExit = filas.exit();
        seleccionExit.remove();

        let seleccionEnter = filas.enter();

        let fila = seleccionEnter
            .append("div")
            .attr("class", "data")
            
            .style("top", function (d, i) {
                return 70 + i * 40 + "px";
            });
            
        fila
            .append("span")
            .append("a")
            .attr("href", "#")
            .on("click", function (d) {
                window.open(d.url); 
               
            })
            .text(function (d) {
                return d.tipo.codigo + " " + d.nombre;
            });

        fila
            .append("span")
            .append("a")
            .attr("href", "#")

            .on("click", function (d) {
               
                editaRecurso(d._id);
                
            })
            .text("EDIT");

        fila
            .append("span")
            .append("a")
            .attr("href", "#")

            .on("click", function (d) {
                console.log(d);
                deleteRecurso(d._id);
            })
            .text("DEL");
    
};

muestraPaginas = () => {
    /*
    $("#pagination").remove
    if (currentPage !== 1 && previousPage !== 1) {
        <a href="#" onclick="getRecursos(1)">1</a>
    }
    if (hasPreviousPage) { 
        <a href = "#" onclick="getRecursos(previousPage)">previousPage</a>
    }
    <a href="?page=<%= currentPage %>" class="active"><%= currentPage %></a>
           
    if (hasNextPage) {
        <a href="#" onclick="getRecursos(nextPage)">nextPage</a>
    }
           
    if (lastPage !== currentPage && nextPage !== lastPage) { 
        <a href="#" onclick="getRecursos(lastPage)">lastPage</a>
    }
*/
}


/*
const nuevaCategoria = () => {
    let categoria = $("#nuevaCategoria").val()
    if (categoria) {

    }
} 
*/


const nuevoRecurso = (btn) => {
    let recurso = {};
    try {
        
        let template = Handlebars.templates.vRecurso;
        // cargar tipos de recursos
                
      
        $("body").append(template(recurso));
        $('#tiposRecurso').select2({
            width: '150px',
            ajax: {
                url: "http://localhost:3000/tipos",
                dataType: 'json'
            }
        });
     
        //"csrf23454345"
        $('#modalRecurso').modal({
            show: true
        });
        $('#GrabarRecurso').off().on('click',function() {
            putRecurso()});
       
    } catch (err) {
        console.log(err);
    }
};




 //    "csrf-token": "csrf23454345"
const putRecurso = () => {
    const formData = new FormData();
    let publicacion =  $('input:text[name=publicacion]').val();
    let derogacion =  $('input:text[name=derogacion]').val();
    publicacion = publicacion ? publicacion : "";
    derogacion =  derogacion ? derogacion : "";

    formData.append('tipo', $('#tiposRecurso').children("option:selected").text());
    formData.append('nombre', $('input:text[name=nombre]').val());
    formData.append('descripcion',$('#Descrip').val());
    formData.append('procedencia',$('input:text[name=procedencia]').val() );
    formData.append('publicacion', new Date("2020/06/20"));
    formData.append('derogacion', "");
    formData.append('url', $('input:text[name=url]').val());
    let url = 'http://localhost:3000/recurso/';
    let method = 'PUT';
    
    var object = {};
    formData.forEach((value, key) => {object[key] = value});
    var json = JSON.stringify(object);

    fetch(url, {
      method: method,
      body: json,
      headers: {

        Authorization: 'Bearer ' + "el token", //this.props.token,
        'Content-Type': 'application/json'

      }
    })
    .then(result => {
        
        if ( result.status !== 201) {
            console.log(result);
            throw new Error(result.message);
          }
          return result.json();
  
    })
    .then(data => {
      
        alert("recurso creado!");
        leeListaRecursos();
    })
    .catch(err => { 
        console.log("err:"+err);
        alert ("se ha producido el error:"+err);
    })
 } ;
         



const editaRecurso = (recursoId) => {
        console.log(recursoId);
       fetch('http://localhost:3000/recurso/' + recursoId, {
            method: 'GET',
            headers: {
               // 'csrf-token': "csrf23454345"
            }
        })
        .then(res => {
             
        if ( res.status !== 200) {
          
            throw new Error(res.message);
          }
          return res.json();
           
        })
        .then(resultado => {
            let template = Handlebars.templates.vRecurso;
            let recurso = resultado.recurso;  
            $("#modalRecurso").remove();  
            $("body").append(template(recurso));
           
            $('#modalRecurso').modal({
                show: true
            });
            $('#GrabarRecurso').off().on('click',function() {
                postRecurso(recurso)});
            
        }).catch(err => console.log(err));

};





const postRecurso = (recurso) => {
    $('#ModalRecurso').modal('hide');
    let recursoId = recurso._id;
    let tipo = recurso.tipo;
    const formData = new FormData();
    let publicacion =  $('input:text[name=publicacion]').val();
    let derogacion =  $('input:text[name=derogacion]').val();
    publicacion = publicacion ? publicacion : "";
    derogacion =  derogacion ? derogacion : "";

    formData.append('tipo', tipo);
    formData.append('nombre', $('input:text[name=nombre]').val());
    formData.append('descripcion',$('#Descrip').val());
    formData.append('procedencia',$('input:text[name=procedencia]').val() );
    formData.append('publicacion', new Date("2020/06/20"));
    formData.append('derogacion', "");
    formData.append('url', $('input:text[name=url]').val());
    let url = 'http://localhost:3000/recurso/'+ recursoId ;
    let method = 'POST';
    
    var object = {};
    formData.forEach((value, key) => {object[key] = value});
    var json = JSON.stringify(object);

    fetch(url, {
      method: method,
      body: json,
      headers: {

        Authorization: 'Bearer ' + "el token", //this.props.token,
        'Content-Type': 'application/json'

      }
    })
        .then(result => {
             
        if ( result.status !== 200) {
            console.log(result);
            throw new Error(result.message);
          }
          return result.json();
         
        })
        .then(data => {
            alert("recurso modificado");
            leeListaRecursos(tipo);
           
        })
        .catch(err => {
            console.log(err);
        });
};






const deleteRecurso = (recursoId) => {
    // para input
    // delete solo admin
    // csrf-token en main?

    //const prodId = btn.parentNode.querySelector('[name=productId]').value;
    //const csrf = btn.parentNode.querySelector('[name=_csrf]').value;

    //const productElement = btn.closest('article');

    fetch("http://localhost:3000/recurso/" + recursoId, {
            method: "DELETE",
            headers: {
               // "csrf-token": csrf
            }
        })
        .then(result => {
             
        if ( result.status !== 200) {
            console.log(result);
            throw new Error(result.message);
          }
          return result.json();
           
        })
        .then(data => {
            
            alert("recurso borrado");
            leeListaRecursos();
        })
        .catch(err => {
            console.log(err);
        });
};