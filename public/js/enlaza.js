(() => {

    let modoEnlaza = false;

    return getEnlaza = (recurso) => {
        if (!modoEnlaza) {
            sujeto = recurso;
            modoEnlaza = true;
            // blink Enlazadgt en css
        } else {
            objeto = recurso;
            if (sujeto.tipo.permitidos === objeto.tipo) {
                modoEnlaza = false;
                // quitar blink
                $('#modalEnlace').modal('show');


            } else {
                alert(`enlace no permitido. los enlaces permitidos son:${sujeto.tipo.permitidos}`)
            }
        }

    }
})();