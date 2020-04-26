
const xml2js = require('xml2js');
const fs = require('fs');
const mongoose = require('mongoose');
const parser = new xml2js.Parser({attrkey: "ATTR"});
const http = require('http');
const request = require('request');
const Tipo = require('../models/mTipo.js');
const Categoria = require('../models/mCategoria.js');
const fetch = require('node-fetch');
const rp = require('request-promise');
const $ = require('cheerio');
const xml2js = require('xml2js');
const parseString = require('xml2js').parseString;
const d3 = require('d3');

//let RecursoSchema = MetadataSchema.add({subDocumento:TareaSchema});
let Recurso = mongoose.model('Recurso', MetadataSchema);


exports.actualizaLey = function(req, res, next) {
    getLeyXml(req.params.numBoe)
        .then((result) => {
            Ley.updateOne({codBoe: req.params.numBoe},
                { $set:
                        {

                            codBoe: req.params.numBoe,
                            titulo: result.documento.metadatos[0].titulo[0],
                            fechaActualizacion: result.documento.ATTR.fecha_actualizacion,
                            departamento: result.documento.metadatos[0].departamento[0]._,
                            rango: result.documento.metadatos[0].rango[0]._,
                            numeroOficial: result.documento.metadatos[0].numero_oficial[0],
                            fechaDisposicion: result.documento.metadatos[0].fecha_disposicion[0],
                            fechaPublicacion: result.documento.metadatos[0].fecha_publicacion[0],
                            fechaVigencia: result.documento.metadatos[0].fecha_vigencia[0],
                            fechaDerogacion: result.documento.metadatos[0].fecha_derogacion[0],
                            origenLegislativo: result.documento.metadatos[0].origen_legislativo[0]._,
                            judicialmenteAnulada: result.documento.metadatos[0].judicialmente_anulada[0] === 'S' ? true : false,
                            vigenciaAgotada: result.documento.metadatos[0].vigencia_agotada[0] === "S" ? true : false,
                            estatusDerogacion: result.documento.metadatos[0].estatus_derogacion[0] === "S" ? true : false,

                        }
                }
                , {upsert: true})
                .then((ley) => {
                    return res.json(200, ley.titulo)}
                )
                .catch((error) => {
                    console.log(error);
                    return res.json(error);
                });
        })

        .catch((error) => {
            console.log(error);
            return res.json({error: 'error accediendo al BOE'});
        });

};


exports.getLeyXml = function() {
    return new Promise((resolve,reject) => {
        let url = "https://www.boe.es/diario_boe/xml.php?id=" + codBoe;
        request(url, function (error, response, body) {
            console.log('error:', error); // Print the error if one occurred and handle it
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            parser.parseString(body, function (error, result) {
                 if (error) {
                     reject(error);

                 } else {
                     resolve(result);
                 }

             })

         });
     })
};


exports.buildNav = function (node, parent_ul){
    if (deJefa.debug) { console.log(node) }
    let current_ul, current_li;
    if(parent_ul == null)
        parent_ul = d3.select("#Aside").append("ul");
    current_li = parent_ul.append("li").append("a")
        .text(node.data.EtiquetaConcepto.value)
        .attr("href", node.id)
        .classed("rdf", true);

    if (node.children) {
        current_ul = current_li.append("ul");
        for (var i=0; i<node.children.length; i++) {
            buildNav(node.children[i], current_ul);
        }
    }
};



exports.getTreeCategorias = function(req, res, next) {
    Categoria
    .find({}, {_id:1, codigo:1, padre:1, ancestros:1})
    .sort('padre')
    .exec()
    .then((categorias)  => {
        return d3.stratify()
            .id(function (d) {
                return d.codigo
            })
            .parentId(function (d) {
                return d.padre
            })(categorias);
    })
    .catch (err => {
        return next(err)
    });
};


exports.getTreeTipos = async function (req, res, next) {
    Tipo
    .find({})
    .sort('padre codigo')
    .exec()
    .then((tipos) => {
        let tree =  d3.stratify()
            .id(function (d) {
                return d.codigo
            })
            .parentId(function (d) {
                return d.padre
            })(tipos);
        return tree;

    })
    .catch (err => {
        return next(err)
    });
};







exports.postEnlaza =  async function(req, res, next) {
    /*
    TODO: validar relacion permitida ( no absolutamente necesario)
    */
    try {
        let relacion = await Relacion.findById(req.body.relacion).exec();
        let sujeto = req.params.sujeto;
        let recursos = req.body.recursos;
        recursos = typeof recursos == 'string' ? [recursos] : recursos;
        let enlaces = recursos.map(function(recurso, i) {
            return {sujetoId: sujeto,
                relacionId: relacion._id,
                relacionNombre: relacion.nombre,
                objetoId: recurso,
                autor:req.user.email}
        });
        console.log(enlaces);
        let resultado = await Enlace.insertMany(enlaces);
        return res.redirect(`/api/recurso/${sujeto}`);
    }
    catch(err) {
        return next(err);
    }
};


/***
 *
 *  {"$match": {"categoria": mongoose.Types.ObjectId(categoria)}},
 {
                "$lookup": {
                    "from": "categorias",
                    "localField": "categoria",
                    "foreignField": "_id",
                    "as": "recursocategorias"
                }
            },
 {"$match": { "recursocategorias.categoria": mongoose.Types.ObjectId(req.params.categoria) }}
**/

/**


{{#section 'jquery'}}

<script>
$(document).ready(function() {
    $("#cancelar").on("click", function() {
        $("#popup").hide();
    });
});



$(document).ready(function() {
    $('.recurso').on('click', function () {
        let $recursos = $('article');
        let $template = $('#tptRecurso').html();
        let url = '/recursos/' + Id;

        $.ajax({

            url: url,
            type: 'GET',
            success: function(data){
                if(data.result.length > 0) {
                    $templateRecursos = Handlebars.compile($template);
                    $recursos.html($templateRecursos(data.result));
                }
                else
                    $recursos.html('<h3>No existen registros</h3>');

            },
            error: function(err) {
                $recursos.text("Error!");
            }
        });
    });



$(document).ready(function() {



    /**** Inicializar **************************
    /*** crear el popper de enlaces ***********
    let $popup = $('#popup');
    $popup.hide();
    let ref = $("<article>");
    let content = $("#tptEnlaza").html();
    //let content = "<p>ñasldkjfñaslkdjfñladsjkf</p>";
    $popup.html(content);
    new Popper(ref, $popup, {placement: "top"});

    /**** mostrar recursos ************************


    muestraRecursos();



    /********** select reflexivas *****************
    $("#reflexivas").on("select", function () {
        $("input[name=relacion]").val(this.selected());

    });



    /********** click enlace ******************
    // empieza en document para que funcione el evento
    $(document).on('click',"a.enlace", function (evt) {

        evt.preventDefault(evt);

        let recursoId = $(this.closest("tr")).find("td.Id").text();
        let recursoNombre = $(this.closest("tr")).find("td.recurso").text();
        let tipo = $(this.closest("tr")).find("td.tipo").text();


        if (!($("#popup").is(':visible')))
            $("#popup").show();

        // sujeto vacío: poner recurso como sujeto

        if ($("input[name=sujetoId]").val() === "") {
            $("input[name=sujetoId]").val(recursoId);
            $("input[name=sujetoNombre]").val(recursoNombre);
            $("input[name=sujetoTipo]").val(tipo);
        }
        // existe sujeto -> poner recurso como objeto
        else {

            $("input[name=objetoId]").val(recursoId);
            $("input[name=objetoNombre]").val(recursoNombre);
            $("input[name=objetoTipo]").val(tipo);
            let tipoSujeto = $("input[name=sujetoTipo]").val();
            let tipoObjeto = $("input[name=objetoTipo]").val();

            // sujeto y objeto del mismo tipo: mostrar reflexivas
            if (tipoSujeto === tipoObjeto)
            {
                $.ajax({
                    url: '/recursos/relaciones/reflexivas',
                    type: 'GET',
                    success: function (result) {
                        $.each(result, function(i, value) {
                            $('#relaciones')
                                .append($("<option></option>")
                                    .attr("value", value)
                                    .text(value));
                        });
                        //$('#relaciones').show()
                        // activar botones grabar

                    },
                    error: function (error) {
                        alert(error);

                    },
                });

            }
            // diferente tipo: ver si existe relacion
            else {
                let query = '?sujeto='+tipoSujeto+'&objeto='+tipoObjeto;
                $.ajax({

                    url: '/recursos/relaciones' + query,
                    type: 'GET',
                    result: function (result) {
                        // activar botones grabar

                    },
                    error: function (error) {
                        alert(error);

                    },
                });


            }


        }


    });

    /**** post enlace **************************
    $(document).on('submit',"#enlaza", function (evt) {

        evt.preventDefault();

        $.ajax({

            url: this.action,
            type: 'POST',
            success: function (data) {
                // get /recursos/sujeto

            },
            error: function (err) {
                alert(err);

            },
        });

    });


    /********** click recurso ******************
    // empieza en document para que funcione el evento
    $(document).on('click',"td.recurso a", function (evt) {

        evt.preventDefault();

        let $template = $('#tptRecurso').html();
        let $recurso = $('article');

        $.ajax({

            url: this.href,
            type: 'GET',
            success: function (data) {
                $templateRecurso = Handlebars.compile($template);
                $recurso.html($templateRecurso(data));

            },
            error: function (err) {
                $("recurso").text("Error!");

            },
        });

    });
});

/*
function muestraRecursos(tipo, categoria) {
    let $recursos = $('article');
    let $template = $('#tptListaRecursos').html();
    let $tipo =  $("#tipo").children("option:selected");
    let $categoria = $('#categoria').children("option:selected");
    //let path = $.data($tipo, "path");
    let url = '/recursos' + '?tipo=' + $tipo.val() + '&categoria='+ $categoria.val();
    $.ajax({
        url: url,
        type: 'GET',
        success: function(data){
            if(data.result.length > 0) {
                $templateRecursos = Handlebars.compile($template);
                $recursos.html($templateRecursos(data.result));
            }
            else
                $recursos.html('<h3>No existen registros</h3>');

        },
        error: function(err) {
            $recursos.text("Error recuperando recursos");
        }
    });
}

 */





let validaLeyBOE = function(codBOE) {
    if (codBOE) {

        let url = 'http://www.boe.es/diario_boe/xml.php?id=' + codBOE.trim();
        const options = {
            proxy: `http://${usuario}:${password}@proxynet.trafico.es:8080`,
            method: 'GET',

            uri: url,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        };

        rp(options)
            .then(function (data) {
                let ley = {};
                parseString(data, function (err, result) {
                    ley._doc.fechaActualizacion = result.documento.$;
                    ley._doc.titulo = result.documento.metadatos["0"].titulo["0"];
                    ley._doc.departamento = result.documento.metadatos["0"].departamento["0"];
                    ley._doc.rango = result.documento.metadatos["0"].rango["0"];
                    ley._doc.numeroOficial = result.documento.metadatos["0"].numero_oficial["0"];
                    ley._doc.fechaDisposicion = result.documento.metadatos["0"].fecha_disposicion["0"];
                    ley._doc.fechaPublicacion = result.documento.metadatos["0"].fecha_publicacion["0"];
                    ley._doc.fechaVigencia = result.documento.metadatos["0"].fecha_vigencia["0"];
                    ley._doc.origenLegislativo = result.documento.metadatos["0"].origen_legislativo["0"];
                    ley._doc.judicialmenteAnulada = result.documento.metadatos["0"].judicialmente_anulada["0"];
                    ley._doc.vigenciaAgotada = result.documento.metadatos["0"].vigencia_agotada["0"];
                    ley._doc.estatusDerogacion = result.documento.metadatos["0"].estatus_derogacion["0"];

                    return ley;
                });
            });

    }
};



let getLeyes = async function () {
    // obtener todas las leyes de las normas existentes
    // hacer con aggregate
    // return await Recurso.find({tipo: 'norma'}, {codley:1, tituloLey:1});

};



