


const getUsuario = (email) => {

  
    var base_url = window.location.origin;

    var host = window.location.host;
    
    fetch(base_url + '/usuario/' + email , {
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
    formData.append('nombre',$('input:text[name=nombreUsuario]').val());
    formData.append('admin', $('#admin').is(':checked')); 
    formData.append('oat', $('#oat').is(':checked')); 
    formData.append('oi', $('#oi').is(':checked')); 
    
    var object = {};
    formData.forEach((value, key) => {object[key] = value});
    var json = JSON.stringify(object);

    var base_url = window.location.origin;

    var host = window.location.host;

    let url = base_url + '/usuario/';
    let method = 'POST';
    let token = localStorage.getItem("token");


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
            else {
                alert(json.message);
            }
         })
  
    }).catch(error =>  {
       alert (error);
    })
 
} ;





const logout = () => {
    localStorage.removeItem("token");
     // recargar
     $('#nologeado').removeClass('d-none');
     $('#logeado').addClass('d-none');
     
     $('#noLogeado').html("Login");
     if ($("adminMenu:visible")) {
         $('#adminMenu').addClass('d-none');
     }
    
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

    localStorage.removeItem("token");

    var base_url = window.location.origin;

    var host = window.location.host;
    
    let url = base_url + '/usuario/login';
    let method = 'POST';
    
   
   
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
            if (response.status === 200) {
                localStorage.setItem("token", json.token);
                renderUsuario(json.usuario);
                // recargar
               
               
     
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








const resetUsuario = () => {
    let email = $('#emailLogeado').html();
    let Password = $('input:text[name=resetPasswordUsuario1]').val();
    let Password2 = $('input:text[name=resetPasswordUsuario2]').val();
    resetPassword(email, Password, Password2);
}


const resetAdmin = () => {
    let email = $('input:text[name=emailResetAdmin]').val();
    let Password = $('input:text[name=resetPasswordAdmin1]').val();
    let Password2 = $('input:text[name=resetPasswordAdmin2]').val();
    resetPassword(email, Password, Password2);
}






const resetPassword = (email, password, password2) => {

    if(password !== password2) {
        alert("contraseña no coincide");
        return;
    }

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
  
    
    var object = {};
    formData.forEach((value, key) => {object[key] = value});
    var json = JSON.stringify(object);

    var base_url = window.location.origin;

    var host = window.location.host;
    
    let url = base_url + '/usuario/reset';
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



   

/******     E S   L O G E A D O      ****************************** */

  const esLogeado = ()  => {

    var promise = new Promise(function (resolve,reject) {

       
        var base_url = window.location.origin;
        let method = 'GET';

        token = localStorage.getItem("token");
    
        fetch(base_url +'/logeado', {
          method: method,
        
          headers: {
            
            Authorization: 'Bearer ' + token,
            
          }
        })
        .then(response => {
            response.json()
            .then(usuario=> {
                
              
                if (response.status === 200) {
                     renderUsuario(usuario)
                     resolve();
                }  
                else {
                  
                    reject();
                }
             })
          
        }).catch(error =>  {
           console.log(error)
           reject();
         })
      
    });
    return promise;
  
};




