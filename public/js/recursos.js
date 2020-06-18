
  


const leeListaRecursos = () => {
    let tipo = $('#tipos').children("option:selected").text();
    let query = `?tipo=${tipo}`;
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




muestraListaRecursos = (data) => {
  
        d3.select("section.recursos")
            .selectAll("div.data")
            .remove();

        let filas = d3.select("section.recursos")
            .selectAll("div.data")
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
                return 40 + i * 40 + "px";
            });

        fila
            .append("span")
            .append("a")
            .attr("href", "#")
            .on("click", function (d) {
                $.get(d.url)
                    .done(function() { 
                        window.location.href = d.url;
                   
                }).fail(function() { 
                   alert("La página no se encuentra");
                })
   
            })
            .text(function (d) {
                console.log(d.nombre);
                return d.nombre;
            });

        fila
            .append("span")
            .append("a")
            .attr("href", "#")

            .on("click", function (d) {
                console.log(d);
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
        $('#Aceptar').off().on('click', putRecurso);
        //"csrf23454345"
        $('#modalRecurso').modal({
            show: true
        });
       
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
        console.log(data);
        alert("recurso creado!");
        leeListaRecursos();
    })
    .catch(err => { 
        console.log("err:"+err);
        alert ("se ha producido el error:"+err);
    })
 } ;
         



const editaRecurso = (recursoId) => {

       fetch('http://localhost:3000/recurso/' + recursoId, {
            method: 'GET',
            headers: {
               // 'csrf-token': "csrf23454345"
            }
        })
        .then(result => {
             
        if ( result.status !== 200) {
            console.log(result);
            throw new Error(result.message);
          }
          return result.json();
           
        })
        .then(recurso => {
            var template = Handlebars.templates.vRecurso;
            $("body").append(template(recurso));
            $('#Aceptar').off().on('click', function(){postRecurso()});
            $('#modalRecurso').modal({
                show: true
            });
            
        }).catch(err => console.log(err));

};





const postRecurso = (recurso) => {

    fetch("http://localhost:3000/recurso/" + recurso, {
            method: "POST",
            headers: {
                "csrf-token": "csrf23454345"
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
            muestraRecurso(data);
           
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