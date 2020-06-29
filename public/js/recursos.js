creaFormRecurso = (recurso) => {

    $("#modalRecurso").remove();
    //var dateFmt = d3.time.format('%d-%m-%Y');

let formulario = d3.select("body").append("div")
    .attr("class", "modal")
    .attr("id", "modalRecurso")
    .append("div")
    .attr("class","modal-dialog modal-xl modal-dialog-centered")
    .append("div")
    .attr("class", "modal-content")
    .append("div")
    .attr("class", "modal-body")
    .append("form")
    .attr("class","form");

    let linea1 = formulario.append("div")
    .attr("class","form-group row");

    tipo = linea1.append("div")
    .attr("id", "tipo")
    .attr("class","col-4");

    
    if (!isEmpty(recurso)) {

        tipo.append("label")
        .attr("class","control-label h5")
        .text(recurso.tipo.codigo);
     
    
    } else {
       
        tipo.append("select")
         .attr("id", "tiposRecurso")
         .attr("class","form-control");
         
        $('#tiposRecurso').select2({
            width: '150px',
            ajax: {
                url: "http://localhost:3000/tipos",
                dataType: 'json'
            }
        });
    }

     nombre = linea1.append("div")
    .attr("class", "col-8");

    nombre.append("input")
    .attr("type", "text")
    .attr("class", "form-control")
    .attr("name", "nombre")
    .attr("value", recurso.nombre) ;    

    let linea2 = formulario.append("div")
    .attr("class","form-group")
    .append("textarea")
    .attr("id", "Descrip")
    .attr("class", "form-control");
   
    $('#Descrip').summernote({
        placeholder: '',
        tabsize: 2,
        height: 100
     });
     
     $('#Descrip').summernote('code', recurso.descripcion);

    let url = formulario.append("div")
    .attr("class","form-group");

    url.append("label")
    .attr("for", "url")
    .attr("class","control-label")
    .text("url");

    url.append("div")
      .append("input")
    .attr("type", "text")
    .attr("class", "form-control")
    .attr("name", "url")
    .attr("value", recurso.url) ;    
             
          
    let linea4 = formulario.append("div")
    .attr("class","form-group row");

    let procedencia = linea4.append("div")
    .attr("class","col-4");

    procedencia.append("label")
    .attr("for", "procedencia")
    .attr("class","control-label")
    .text("procedencia");     
    
    procedencia.append("input")
    .attr("type","text")
    .attr("class","form-control")
    .attr("name","procedencia")
    .attr("value", recurso.procedencia) ;    
             

    
    let publicacion = linea4.append("div")
    .attr("class","col-4");         
   
    publicacion.append("label")
    .attr("for", "publicacion")
    .attr("class","control-label")
    .text("publicación");     
    
    publicacion.append("input")
    .attr("type","text")
    .attr("class","form-control")
    .attr("name","publicacion")    
    .attr("id","publicacion")
    .attr("value", function() {return moment(recurso.publicacion).format("DD/MM/YYYY")}) ;       
 
   

    derogacion = linea4.append("div")
    .attr("class","col-4");         
   
    derogacion.append("label")
    .attr("for", "derogacion")
    .attr("class","control-label")
    .text("derogación");     
    
    derogacion.append("input")
    .attr("type","text")
    .attr("class","form-control")
    .attr("name","derogacion")    
    .attr("id","derogacion")
    .attr("value", function() {return moment(recurso.derogacion).format("DD/MM/YYYY")}) ;
  
 
            
    let linea5 = formulario.append("div")
    .attr("class","form-group row");

    archivo = linea5.append("div")
    .attr("class","col")
    .append("span")
    .attr("class","btn btn-default btn-file")
    .append("input")
    .attr("id", "fileupload")
    .attr("type","file")
    .attr("name", "files[]")
    .attr("class", "form-control")
    .attr("data-url","/upload");

  
    
    $('#fileupload').fileupload({
       
        dataType: 'json',
        done: function (e, data) {
            $.each(data.result.files, function (index, file) {
               
                 $('input[name=url]').val(file.url);
            });
        }
    });
    
    

    let linea6 = formulario.append("div")
    .attr("class","form-group");

   
    Aceptar = linea6.append("div")
    .append("button")
    .attr("id", "GrabarRecurso")
    .attr("type","button")
    .attr("class","btn btn-primary")
    .text("Aceptar");

    if (recurso) {
  
        Aceptar.on("click", function() {
        postRecurso(recurso._id)})
     }
      else {
          
        Aceptar.on("click", function() {
            putRecurso()})  
        
     };
    
    
    linea6.append("button")
    .attr("id", "Salir")
    .attr("type","button")
    .attr("class","btn btn-secondary close btn")
    .attr("data-dismiss", "modal")
    .text("Salir");
  

}  



           
function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}  

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
                  
        creaFormRecurso(recurso);
      
      
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
    let publicacion =  $('#publicacion').val();
    let derogacion =  $('#derogacion').val();
    
    formData.append('tipo', $('#tiposRecurso').children("option:selected").val());
    formData.append('nombre', $('input:text[name=nombre]').val());
    formData.append('procedencia',$('input:text[name=procedencia]').val() );
    formData.append('url', $('input:text[name=url]').val());
    formData.append('publicacion', publicacion);
    formData.append('derogacion', derogacion);
    
    var descripcion = $('#Descrip').summernote('code');
    $('#Descrip').summernote('destroy');
     
    formData.append('descripcion', descripcion);

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
        $('#modalRecurso').modal('hide');
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
        .then(res => {
             
        if ( res.status !== 200) {
          
            throw new Error(res.message);
          }
          return res.json();
           
        })
        .then(resultado => {
           
           
            let recurso = resultado.recurso;  
           
            creaFormRecurso(recurso);
          
            
           
                $('#modalRecurso').modal({
                    show: true
                });
            
        }).catch(err => console.log(err));

};





const postRecurso = (recursoId) => {
   
    const formData = new FormData();
    let publicacion =  moment($('#publicacion').val(),'DDMMYYYY').format();
    let derogacion  = moment($('#derogacion').val(),'DDMMYYYY').format();
    //formData.append('tipo', tipo.codigo);
    formData.append('nombre', $('input:text[name=nombre]').val());
    formData.append('descripcion',$('#Descrip').val());
    formData.append('procedencia',$('input:text[name=procedencia]').val() );
    formData.append('url', $('input:text[name=url]').val());
    formData.append('publicacion', publicacion);
    formData.append('derogacion', derogacion);
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
             
        if ( result.status !== 200 ) {
            console.log(result);
            throw new Error(result.message);
          }
          return result.json();
         
        })
        .then(data => {
            alert("recurso modificado");
            $('#modalRecurso').modal('hide');
            leeListaRecursos();
           
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