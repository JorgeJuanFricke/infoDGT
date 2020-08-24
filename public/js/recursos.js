



creaFormRecurso = (recurso, tipos) => {

    $("#modalRecurso").remove();
 
    

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
    .attr("id","formRecurso")
    .attr("action", "/documento")
    .attr("method", "post")
    .attr("enctype","multipart/form-data")
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
         
        $('#tiposRecurso').select2({data: tipos, width:'100%'});
        
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
    .attr("value", recurso.url)   
    .on("change()", $('input:text[name=documento]').empty()); 
             
          
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
    .attr("value", function() {
        var d = moment.utc(recurso.publicacion);
        return recurso.publicacion && d.isValid() ? d.format('DD/MM/YYYY') : '';
      });

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
    .attr("value", function() {
        var d = moment.utc(recurso.derogacion);
        return recurso.derogacion && d.isValid() ? d.format('DD/MM/YYYY') : '';
      });
   
 
            
    let linea5 = formulario.append("div")
    .attr("class","form-group row");

    archivo = linea5.append("div")
    .attr("class","col")
    .append("span")
    .attr("class","btn btn-default btn-file")
    .append("input")
    .attr("id", "documento")
    .attr("type","file")
    .attr("name", "documento")
    .attr("class", "form-control")

    
    .on("change", function () {
        
      
        let documento = $('#documento')[0].files[0]; 
        $('input[name=url').val("");

       
    });

    
   
    

    let linea6 = formulario.append("div")
    .attr("class","form-group");

   
    Aceptar = linea6.append("div")
    .append("button")
    .attr("id", "GrabarRecurso")
    .attr("type","button")
    .attr("class","btn btn-primary")
    .text("Aceptar");

    if (!isEmpty(recurso)) {
        // si modificado 
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
};



/*
const nuevaCategoria = () => {
    let categoria = $("#nuevaCategoria").val()
    if (categoria) {

    }
} 
*/




const getTipos = () => {

    var base_url = window.location.origin;

    let url = base_url + '/tipos';
    let method = 'GET';
    token = localStorage.getItem("token");

    fetch(url, {
      method: method,
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
   
    
    .then(response => {
        response.json()
        .then(json => {
            
            // tipos 
            if (response.status === 200) {
                return json;
               
            }  
            else {
                alert(json.message);
                return 
            }
         })
      
       
    })  
   .catch(error =>  {
       alert (error);
     })
    
 } ;




 const verRecurso = (recursoId) => {
    var base_url = window.location.origin;
    let url = base_url + '/recurso/' + recursoId;
    let method = 'GET';
   
    fetch(url, {
      method: method,
      headers: {

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
            muestraRecurso(recurso);
       
             
            
        }).catch(error => alert(error));

};






const nuevoRecurso = (btn) => {
    let recurso = {};
    let logeado = $('#emailLogeado').text().trim();
    if (!logeado)  {
        alert("Debe estar autenticado para añadir recursos");
        return;
    }
    var base_url = window.location.origin;
    let url = base_url + '/tipos';
    let method = 'GET';
    token = localStorage.getItem("token");

    fetch(url, {
        method: method,
        headers: {
        Authorization: 'Bearer ' + token
        }
    })

    .then(response => {
        response.json()
        .then(json => {
            if (response.status === 200) {
                creaFormRecurso(recurso, json);
                $('#modalRecurso').modal({
                    show: true
                });
     
            }  
            else {
                alert(json.message);
                return 
            }
        })
    }) 
    .catch (error => { 
        alert(error)
    })        
    

};


const putRecurso = async () => {
    
    let documento = $('#documento')[0].files[0]; 
     if (documento)  {
         postDcmtoRecurso(documento).then(urlDocumento => {
           putDatosRecurso(urlDocumento);
         });
    }     
    else {
        urlDocumento = $('input:text[name=url]').val();
        putDatosRecurso(urlDocumento);
    }    
};





 //    "csrf-token": "csrf23454345"
const putDatosRecurso = (urlDocumento) => {

  
    const formData = new FormData();
    let pub =  moment.utc($('#publicacion').val(),'DD/MM/YYYY');
  
    let der =  moment.utc($('#derogacion').val(), 'DD/MM/YYYY');
  
    let tip = $('#tiposRecurso').children("option:selected").val();
    let tipo =  tip ? tip: "";
    formData.append('tipo', tipo);
    formData.append('nombre', $('input:text[name=nombre]').val());
    formData.append('procedencia',$('input:text[name=procedencia]').val() );
    formData.append('url', urlDocumento);
    formData.append('publicacion', pub.isValid()? pub: "");
    formData.append('derogacion', der.isValid()? der: "");
   
    var descripcion = $('#Descrip').summernote('code');
    $('#Descrip').summernote('destroy');
     
    formData.append('descripcion', descripcion);

    
    var object = {};
    formData.forEach((value, key) => {object[key] = value});
    var json = JSON.stringify(object);

    var base_url = window.location.origin;

    let url = base_url + '/recurso/';
    let method = 'PUT';
    token = localStorage.getItem("token");

    fetch(url, {
      method: method,
      body: json,
      headers: {
        Authorization: 'Bearer ' + token,
       'Content-Type': 'application/json'
       
      }
    })
   
    
    .then(response => {
        response.json()
        .then(json => {
            
            // recurso creado
            if (response.status === 201) {
                alert(json.message);
                $('#modalRecurso').modal('hide');
                leeListaRecursos();
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
    
 } ;
 




const editaRecurso = (recursoId) => {
    
    var base_url = window.location.origin;
    let url = base_url + '/recurso/' + recursoId;
    let method = 'GET';
    token = localStorage.getItem("token");

    fetch(url, {
      method: method,
      headers: {

        Authorization: 'Bearer ' + token
       
      }
    })  
    .then(response => {
        response.json()
        .then(json => {
            if (response.status === 200) {
                creaFormRecurso(json.recurso);
                $('#modalRecurso').modal({
                    show: true
                });
     
            }  
            else {
                alert(json.message);
                return 
            }
        })
    }) 
    .catch (error => { 
        alert(error)
    })        
    

};   
     

const postRecurso = async (recursoId) => {
    
    let documento = $('#documento')[0].files[0]; 
   
          
    if (documento)  {
         postDcmtoRecurso(documento).then(urlDocumento => {
           postDatosRecurso(recursoId, urlDocumento)
         })
    }     
    else {
        urlDocumento = $('input:text[name=url]').val();
        postDatosRecurso(recursoId, urlDocumento)
    }    
};




 
 const postDatosRecurso = async (recursoId, urlDocumento) => {

        let pub =  moment.utc($('#publicacion').val(),'DD/MM/YYYY');
        let der =  moment.utc($('#derogacion').val(), 'DD/MM/YYYY');
        
        const formData = new FormData();
        
        //formData.append('tipo', tipo.codigo);
        formData.append('nombre', $('input:text[name=nombre]').val());
        formData.append('descripcion',$('#Descrip').val());
        formData.append('procedencia',$('input:text[name=procedencia]').val() );
        formData.append('url',urlDocumento );
        formData.append('publicacion', pub.isValid()? pub: "");
        formData.append('derogacion', der.isValid()? der: "");
        
        var object = {};
        formData.forEach((value, key) => {object[key] = value});
        var json = JSON.stringify(object);

        var base_url = window.location.origin;
        let url = base_url + '/recurso/' + recursoId;
        let method = 'POST';
    
        token = localStorage.getItem("token");

        fetch(url, {
        method: method,
        body: json,
        headers: {

            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
        })

        .then(response => {
            response.json()
            .then(json => {
                
                // recurso modificado
                if (response.status === 201) {
                    alert(json.message);
                    $('#modalRecurso').modal('hide');
                    leeListaRecursos();
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
 





  function postDcmtoRecurso(documento) {

    var promise = new Promise(function (resolve,reject) {

        if (!documento){
            reject("no existe documento a subir");
        }
        let formData = new FormData();
        formData.append('documento',  documento);
        var base_url = window.location.origin;
        let method = 'POST';
        token = localStorage.getItem("token");
    
        fetch(base_url +'/recurso/documento', {
          method: method,
          body: formData,
         
          headers: {
            //no poner nada,
            Authorization: 'Bearer ' + token,
            
          }
        })
        .then(response => {
            response.json()
            .then(json => {
                
                // documento subido
                if (response.status === 200) {
                     url  = '/uploads/' + json.filename;
                     resolve(url);
                }  
                else {
                    alert(json.message);
                    reject("error subiendo documento");
                }
             })
          
        }).catch(error =>  {
           console.log(error)
           reject("error subiendo documento")
         })
      
    });
    return promise;
  
};






/*
    $.ajax({
        url: base_url + '/documento',
        data: formData,
        type: 'POST',
        contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
        processData: false, // NEEDED, DON'T OMIT THIS
        
    })
    .then(result => {
        console.log(result);
        url  = base_url + '/' + result.path.replace(/\\/g,"/");
        $('input[name=url').val(url);
        

    })
    .catch(alert('error subiendo documento'))
    };
*/



const deleteRecurso = () => {
    // para input
    // delete solo admin
    // csrf-token en main?

    //const prodId = btn.parentNode.querySelector('[name=productId]').value;
    //const csrf = btn.parentNode.querySelector('[name=_csrf]').value;

    //const productElement = btn.closest('article');
    let recursoId = d3.select("#removeUser").datum()._id;
    var base_url = window.location.origin;
    let url = base_url + '/recurso/'+ recursoId;
    let method = 'DELETE';

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
            
            // recurso borrado
            if (response.status === 200) {
                alert(json.message);
                $('#modalRecurso').modal('hide');
                leeListaRecursos();
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
    
 } ;
 

   
  
  