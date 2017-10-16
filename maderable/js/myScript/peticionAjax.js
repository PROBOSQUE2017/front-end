var modalError = function(mensaje,btnText) {
    var modal =
        '<div class="modal fade" id="myModalRespError" role="dialog" data-backdrop="static" data-keyboard="false">' +
        '<div class="modal-dialog modal-sm">' +
        '<div class="modal-content">' +
        '<div class="modal-body">' +
        '<center>' +
        '<h4 style="color: red"><b>' + mensaje + '</b></h4>' +
        '<br>' +
        '<button type="button" class="btn btn-danger" data-dismiss="modal" hidden>'+btnText+'</button>' +
        '</center>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
    return modal;
}

var showErrorCalif = function(msj,texto) {
    $('#divmodalerror').html('');
    $('#divmodalerror').html(modalError(msj,texto));
    $('#myModalRespError').modal('show');
}


function loadDataTable(TableName) {
    var r = {
        success: function(resp) {
            $("#tableData").remove();

            if (TableName == "tabla1") {
                builderTable1(resp.data);

            } else if (TableName == "tabla2") {
                builderTable2(resp.data);
            } else if (TableName == "tabla3") {
                builderTable3(resp.data);
            }

        },
        beforeSend: function(data) {
            var contenedor = document.getElementById("spaceTable");
            contenedor.innerHTML = '';
        },
        error: function(solicitudAJAX, errorDescripcion, errorExcepcion) {
            showErrorCalif("Servicio no disponible", "Aceptar");
        },
        complete: function(solicitudAJAX, estatus) {}
    };
    r = $.extend(r, urlServiceReforestacion);
    r.data = { action: TableName};
    $.ajax(r);
}

