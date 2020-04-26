
function muestraTipo(tipo) {
    d3.event.preventDefault();

    d3.json('/api/tipos')
    .then(function (data) {
        data = data.filter(function (d) {
            return d.padre !== null
        });

        let tiposNested = d3.nest()
            .key(function (d) {
                return (d.padre);
            }).sortKeys(d3.ascending)
            .entries(data);

        let grupos = tiposNested;
        d3.select("#tipo-codigo").text(tipo.codigo);
        $("#tipo-id").val(tipo._id);
        let permitidos = tipo.tiposPermitidos;
        let select1 = d3.select("#permitidos");
        select1.selectAll("option").remove();
        grupos.forEach(function (grupo) {
            grupo.values.forEach(function (tipo) {
                console.log(tipo);
               select1.append("option")
               .property("selected", function() {
                   return (permitidos.indexOf(tipo.codigo) >= 0)
               })
               .text(tipo.codigo)
            });
        });
        $('#frmTipo').attr("action", `/admin/tipo/${tipo._id}`);
        $('#modalTipo').modal('show');
     });


}
/*
var element = document.getElementById('selectMultiple');

// Set Values
var values = ["Gold", "Bronze"];
for (var i = 0; i < element.options.length; i++) {
    element.options[i].selected = values.indexOf(element.options[i].value) >= 0;
}

// Get Value
var selectedItens = Array.from(element.selectedOptions)
    .map(option => option.value)


spanSelectedItens.innerHTML = selectedItens
    <select name='selectMultiple' id="selectMultiple" multiple>
<option value="Gold">Gold</option>
    <option value="Silver">Silver</option>
    <option value="Bronze">Bronze</option>
    </select>
    <br />
    Selected: <span id="spanSelectedItens"></span>
*/
$(document).ready(function() {
    $("#usuario").click(function() {
        $('#modalUsuario').modal({ show: true})

    });
});

