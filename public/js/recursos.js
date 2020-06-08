
  



muestraListaRecursos = () => {
    
    let tipo = $('#tipos').children("option:selected").val();
    let query = `?tipo=${tipo}`;
    let pagina = "";

    // tal vez post para tipo y categoria y query para limits y skips

    // BUSCAR INDICE TEXTO
    d3.json("/recursos" + query).then(function (data) {
        d3.select("article")
            .selectAll("div")
            .remove();
        let filas = d3
            .select("#listaRecursos")
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
                muestraRecurso(d);
            })
            .text(function (d) {
                return d.nombre;
            });

        fila
            .append("span")
            .append("a")
            .attr("href", "#")

            .on("click", function (d) {
                console.log(d);
                enlazaRecurso(d);
            })
            .text("ENL");

        fila
            .append("span")
            .append("a")
            .attr("href", "#")

            .on("click", function (d) {
                console.log(d);
                borraRecurso(d);
            })
            .text("DEL");
    });
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
        $('#modalRecurso').modal({
            show: true
        });
       
    } catch (err) {
        console.log(err);
    }
};





const putRecurso = () => {
    fetch("http://localhost:3000/recurso", {
            method: "PUT",
            headers: {
                "csrf-token": "csrf23454345"
            }
    })
    .then(result => {
        return result.json();
    })
    .then(data => {
        muestraRecurso(data);
    })
    .catch(err => { console.log(err)})
} ;
         



const editaRecurso = (btn) => {
    recurso = $(btn).val();
    fetch('http://localhost:3000/recurso/' + recurso, {
            method: 'GET',
            headers: {
                'csrf-token': "csrf23454345"
            }
        })
        .then(result => {
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
            return result.json();
        })
        .then(data => {
            muestraRecurso(data);
           
        })
        .catch(err => {
            console.log(err);
        });
};






const borraRecurso = (btn) => {
    // para input
    // delete solo admin
    // csrf-token en main?
    let recurso = $(btn).val();

    //const prodId = btn.parentNode.querySelector('[name=productId]').value;
    //const csrf = btn.parentNode.querySelector('[name=_csrf]').value;

    //const productElement = btn.closest('article');

    fetch("https://localhost:3000/recurso/" + recurso, {
            method: "DELETE",
            headers: {
                "csrf-token": csrf
            }
        })
        .then(result => {
            return result.json();
        })
        .then(data => {
            console.log(data);
            muestraListaRecursos;
        })
        .catch(err => {
            console.log(err);
        });
};