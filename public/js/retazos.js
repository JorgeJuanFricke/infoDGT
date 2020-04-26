
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



}