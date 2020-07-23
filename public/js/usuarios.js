



const creaFormUsuario = () => {

    $("#modalUsuario").remove();
 
    
let formulario = d3.select("body").append("div")
    .attr("class", "modal")
    .attr("id", "modalUsuario")
    .append("div")
    .attr("class","modal-dialog modal-dialog-centered")
    .append("div")
    .attr("class", "modal-content")
    .append("div")
    .attr("class", "modal-body")
    .append("form")
    .attr("id","formUsuario")
    .attr("action", "/usuario")
    .attr("method", "post")
    .attr("class","form");

  
    let email = formulario.append("div")
    .attr("class","form-group");

    email.append("label")
    .attr("for", "email")
    .attr("class","control-label")
    .text("email:");

    email.append("div")
    .append("input")
    .attr("type", "text")
    .attr("class", "form-control")
    .attr("id", "email")
    .attr("name", "email");
   
    
        
   
    let nombre = formulario.append("div")
    .attr("class", "form-group");

    nombre.append("label")
    .attr("for", "nombre")
    .attr("class","control-label")
    .text("nombre:");

    nombre.append("input")
    .attr("type", "text")
    .attr("class", "form-control")
    .attr("name", "nombre");
  

    let permisos = formulario.append("div")
    .attr("class","form-group")

    permisos.append("input")
    .attr("type", "checkbox")
    .attr("name", "admin")
    .attr("value", true)
    .text("administrador");
    permisos.append("label")
    .attr("for", "admin")
    .text("Admin");
    permisos.append("br");
   

    permisos.append("input")
    .attr("type", "checkbox" )
    .attr("name", "OI")
    .attr("value", true)
    .text("OI");
    permisos.append("label")
    .attr("for", "OI")
    .text("OI");
    permisos.append("br");
    
    
    
    
    permisos.append("input")
    .attr("type", "checkbox")
    .attr("name", "OAT")
    .attr("value", true)
    .text("OAT");
    permisos.append("label")
    .attr("for", "OAT")
    .text("OAT");
   
    permisos.append("br");
    
  

    let reset = formulario.append("div").append("a")
    .attr("href", "#")
    .text("resetear contraseña")
    .on("click", function() {
        creaFormResetPassword();
    });  
    
    

    let botones= formulario.append("div")
    .attr("class","form-group");

   
    Aceptar = botones.append("div")
    .append("button")
    .attr("id", "GrabarUsuario")
    .attr("type","button")
    .attr("class","btn btn-primary")
    .text("Aceptar")
    .on("click", function() {
        postUsuario($("#email").val())});
    
  
    
    botones.append("button")
    .attr("id", "Salir")
    .attr("type","button")
    .attr("class","btn btn-secondary close btn")
    .attr("data-dismiss", "modal")
    .text("Salir");
  

    $('#modalUsuario').modal({
        show: true
    });
}  





/*
muestraFormUsuario = () => {
    let template = Handlebars.templates.vActualizaUsuario;
    $('body').append(template({}));
    
    $('#modalActualizaUsuario').modal('show');
   

};



muestraFormResetPassword = () => {
    let template = Handlebars.templates.vResetPassword;
    $('body').append(template({}));
    
    $('#modalResetPassword').modal('show');
   

};
*/



const creaFormResetPassword = () => {

    $("#modalResetPassword").remove();
 
    
let formulario = d3.select("body").append("div")
    .attr("class", "modal")
    .attr("id", "modalResetPassword")
    .append("div")
    .attr("class","modal-dialog modal-dialog-centered")
    .append("div")
    .attr("class", "modal-content")
    .append("div")
    .attr("class", "modal-body")
    .append("form")
    .attr("id","formReset")
    .attr("action", "/reset")
    .attr("method", "post")
    .attr("class","form");

  
    let email = formulario.append("div")
    .attr("class","form-group");

    email.append("label")
    .attr("for", "email")
    .attr("class","control-label")
    .text("email:");

    email.append("input")
    .attr("type", "text")
    .attr("id", "email")
    .attr("class", "form-control")
    .attr("name", "email");
   
    
        
   
    let password = formulario.append("div")
    .attr("class", "form-group");

    password.append("label")
    .attr("for", "password")
    .attr("class","control-label")
    .text("password:");

    password.append("input")
    .attr("type", "text")
    .attr("class", "form-control")
    .attr("name", "password");



    let password2 = formulario.append("div")
    .attr("class", "form-group");

    password2.append("label")
    .attr("for", "password2")
    .attr("class","control-label")
    .text("repite password:");

    password2.append("input")
    .attr("type", "text")
    .attr("class", "form-control")
    .attr("name", "password2");

  

    
    

    let botones= formulario.append("div")
    .attr("class","form-group");

   
    Aceptar = botones.append("div")
    .append("button")
    .attr("id", "reset")
    .attr("type","button")
    .attr("class","btn btn-primary")
    .text("Reset")
    .on("click", function() {
        resetPassword($("#email").val())});
    
  
    
    botones.append("button")
    .attr("id", "Salir")
    .attr("type","button")
    .attr("class","btn btn-secondary close btn")
    .attr("data-dismiss", "modal")
    .text("Salir");
  

    $('#modalResetPassword').modal({
        show: true
    });
}  





const getUsuario = (email) => {

  
    //let tipo = $('#tipos').children("option:selected").text();
    //let texto =$('#buscaRecursos').val();
    
    
    fetch('http://localhost:3000/usuario/' + email , {
            method: 'GET',
            headers: {
                //'csrf-token': "csrf23454345"
            }
        })
        .then(res => {
            return res.json();
        })
        .then(usuario => {
            
            $('input:text[name=email]').val(usuario.email);
            $('input:text[name=nombre]').val(usuario.nombre);
            $('input:text[name=admin]').val(usuario.admin);
            $('input:text[name=OAT]').val(usuario.OAT);
            $('input:text[name=OI]').val(usuario.OI);
            
                        
            
        }).catch(err => console.log(err));
    
    };






const postUsuario = (email) => {

 
    const formData = new FormData();
    
    formData.append('nombre',$('input:text[name=nombre]').val());
    formData.append('admin', $('input:text[name=admin]').val());;
    formData.append('OAT', $('input:text[name=OAT]').val());
    formData.append('OI', $('input:text[name=OI]').val());
    
    var object = {};
    formData.forEach((value, key) => {object[key] = value});
    var json = JSON.stringify(object);

    
    let url = 'http://localhost:3000/usuario/'+ email;
    let method = 'POST';


    fetch(url, {
    method: method,
    body: json,
    headers: {
        Authorization: 'Bearer ' + "el token", //this.props.token,
        'Content-Type': 'application/json'
    }
    }).then(response => {
        response.json()
            .then(json => {
                // validacion fallida
                if (response.status === 299) {
                    console.log(json);
                    alert(json.data[0].msg)
                } 
                // usuario actualizado
                else if (response.status === 200) {
                    alert(json.message);
                    $('#modalUsuario').modal('hide');
                    
                }  
                else {
                    alert("Se ha producido el error: "+response.status);
                }
            })
         
         .catch(err => { 
         alert("respuesta ok sin json")
         })
    
    }).catch(err =>  {
        console.log(err)
        alert (err);
    })
 
} ;





const resetPassword = (email) => {

 
    const formData = new FormData();
    
   
    formData.append('email', $('input:text[name=email]').val());
    formData.append('password',$('input:text[name=password]').val());
  
    
    
    var object = {};
    formData.forEach((value, key) => {object[key] = value});
    var json = JSON.stringify(object);
   
    
    let url = 'http://localhost:3000/usuario/reset/'+email;
    let method = 'POST';
   
   
    fetch(url, {
      method: method,
      body: json,
      headers: {
   
        Authorization: 'Bearer ' + "el token", //this.props.token,
        'Content-Type': 'application/json'
   
      }
    }).then(response => {
        response.json()
            .then(json => {
                // validacion fallida
                if (response.status === 299) {
                    console.log(json);
                    alert(json.data[0].msg)
                } 
                // usuario actualizado
                else if (response.status === 200) {
                    alert(json.message);
                    $('#modalResetPassword').modal('hide');
                    
                }  
                else {
                    alert("Se ha producido el error: "+response.status);
                }
            })
            
            .catch(err => { 
            alert("respuesta ok sin json")
            })
       
    })  
   .catch(err =>  {
       console.log(err)
        alert (err);
     })
    
   } ;