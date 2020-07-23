
let Enlaza = d3.select("popup")
    .append("div")
    .attr("class", "title")

    .append("h3").attr("text", recurso.tipo.padre +recurso.tipo.codigo)
    .append("h4").attr("text", recurso.nombre)

Enlaza.append("br");

let Form = Enlaza.append("form")
    .attr("action", "/api/enlaza/" + recurso._id)
    .attr("method", "POST");


Form.append("div")
    .attr("class", "form-group")
    .append("select")
    .attr("id", "relaciones")
    .attr("name", "relacion")
    .attr("class", "form-control col-lg-6")
    .selectAll("option.relaciones")
    .data(relaciones)
    .enter()
    .append("option").attr("class","relaciones")
    .attr("text", function(d) {return d.relacion});


Form.append("div")
    .attr("class", "form-group")
    .append("select")
    .attr("id", "categorias")
    .attr("name", "categoria")
    .attr("class", "form-control col-lg-6")
    .selectAll("option.categorias")
    .data(categorias)
    .enter()
    .append("option").attr("class","categorias")
    .attr("text", function(d) {return d.nombre});


Form.append("div")
    .attr("class", "form-group")
    .append("select")
    .attr("id", "recursos")
    .attr("name", "Recurso")
    .attr("class", "form-control col-lg-6")
    .attr("data", "multiple")
    .selectAll("option.recursos")
    .data(categorias)
    .enter()
    .append("option").attr("class","categorias")
    .attr("text", function(d) {return d.nombre});

let Botones = Form.append("div")
    .attr("class", "form-group")

Botones.append("button")
    .attr("type", "submit")
    .attr("id","aceptar")
    .attr("class", "btn btn-primary")
    .attr("text", "Grabar");

Botones.append("button")
    .attr("type", "button")
    .attr("id","cancelar")
    .attr("class", "btn btn-secondary")
    .attr("text", "Cancelar");



}$('#fileupload').fileupload({
    dataType: 'json',
    done: function(e, data){
        $.each(data.result.files, function(index, file){
            $('#Uploads').append($('<div class="upload">' +
                '<span class="glyphicon glyphicon-ok"></span>&nbsp;' +
                file.name + '</div>'));
            $('input[name=nombre]').val(file.name);
            $('input[name=url]').val(file.url);
        });

    }
});



exports.postReset = (req, res, next) => {
    // TODAVIA NO JWT NO ....
    crypto.randomBytes(32, (err, buffer) => {
      if (err) {
        console.log(err);
        return res.redirect('/reset');
      }
      const token = buffer.toString('hex');
      User.findOne({ email: req.body.email })
        .then(user => {
          if (!user) {
            req.flash('error', 'No account with that email found.');
            return res.redirect('/reset');
          }
          user.resetToken = token;
          user.resetTokenExpiration = Date.now() + 3600000;
          return user.save();
        })
        .then(result => {
          res.redirect('/');
          transporter.sendMail({
            to: req.body.email,
            from: 'shop@node-complete.com',
            subject: 'Password reset',
            html: `
              <p>You requested a password reset</p>
              <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to set a new password.</p>
            `
          });
        })
        .catch(err => {
          const error = new Error(err);
          error.httpStatusCode = 500;
          return next(error);
        });
    });
  };
  
  
  
  
  
  exports.postNewPassword = (req, res, next) => {
    // NO HACE USO JWT
    const newPassword = req.body.password;
    const userId = req.body.userId;
    const passwordToken = req.body.passwordToken;
    let resetUser;
  
    User.findOne({
      resetToken: passwordToken,
      resetTokenExpiration: { $gt: Date.now() },
      _id: userId
    })
      .then(user => {
        resetUser = user;
        return bcrypt.hash(newPassword, 12);
      })
      .then(hashedPassword => {
        resetUser.password = hashedPassword;
        resetUser.resetToken = undefined;
        resetUser.resetTokenExpiration = undefined;
        return resetUser.save();
      })
      .then(result => {
        res.redirect('/login');
      })
      .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      });
  };
  
  
  
  