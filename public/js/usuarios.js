


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






const postUsuario = () => {

 
    const formData = new FormData();
    formData.append('email',$('input:text[name=email]').val());
    formData.append('nombre',$('input:text[name=nombre]').val());
    formData.append('admin', $('#admin').is(':checked')); 
    formData.append('oat', $('#oat').is(':checked')); 
    formData.append('oi', $('#oi').is(':checked')); 
    
    var object = {};
    formData.forEach((value, key) => {object[key] = value});
    var json = JSON.stringify(object);

    
    let url = 'http://localhost:3000/usuario/';
    let method = 'POST';
    token = localStorage.getItem("token");


    fetch(url, {
    method: method,
    body: json,
    headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
    }
    }).then(response => {
        response.json()
        .then(json => {
            
            // usuario actualizado
            if (response.status === 200) {
                alert(json.message);
               
                
            }  
            else if (response.status === 299) {
                console.log(json);
                alert(json.data[0].msg)
            } 
            else {
                alert("Se ha producido el error: "+response.status);
            }
        })
         
      
    
    }).catch(err =>  {
        console.log(err)
        alert (err);
    })
 
} ;





const logout = () => {
    localStorage.removeItem("token");
}





const login = () => {

    let email = $("#emailLogin").val();
    let Password = $("#passwordLogin").val();
    

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', Password);
  
    
    var object = {};
    formData.forEach((value, key) => {object[key] = value});
    var json = JSON.stringify(object);
   
    
    let url = 'http://localhost:3000/usuario/login';
    let method = 'POST';
    let token = "";
   
   
    fetch(url, {
      method: method,
      body: json,
      headers: {
       
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
        response.json()
        .then(json => {
       
            
            // usuario logeado
            if (response.status === 200) {
                
                localStorage.setItem("token", json.token);
                // recargar
                $('#usuarioLogeado').val(json.usuario.email);
                if (json.usuario.admin) {
                    $('#adminMenu').removeClass('d.none');
                };       
               
                
            
                
            }  
            else if (response.status === 299) {
                console.log(json);
                alert(json.data[0].msg)
            } 
            else if (response.status === 401) {
               
                alert("email y/o password incorrecto");
            }
        })   
     

    }).catch(err =>  {
       console.log(err)
        alert (err);
     })
    
   } ;


const resetPasswordUsuario = () => {
    let email = $('input:text[name=emailReset]').val();
    let Password = $('input:text[name=passwordResetUsuario]').val();
    let Password2 = $('input:text[name=passwordResetUsuario2]').val();
    resetPassword(email, Password, Password2);
}


const resetPasswordAdmin = () => {
    let email = $('input:text[name=emailReset]').val();
    let Password = $('input:text[name=passwordResetAdmin]').val();
    let Password2 = $('input:text[name=passwordResetAdmin]').val();
    resetPassword(email, Password, Password2);
}


const resetPassword = (email, password, password2) => {

    if(password !== password2) {
        alert("contraseña no coincide");
        return;
    }

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', Password);
  
    
    var object = {};
    formData.forEach((value, key) => {object[key] = value});
    var json = JSON.stringify(object);
   
    
    let url = 'http://localhost:3000/usuario/reset';
    let method = 'POST';
    token = localStorage.getItem("token");
   
    fetch(url, {
      method: method,
      body: json,
      headers: {
   
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
   
      }
    }).then(response => {
        response.json()
            .then(json => {
             if (response.status === 200) {
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