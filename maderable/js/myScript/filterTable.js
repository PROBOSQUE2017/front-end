    document.querySelector("#inputTextFindTermino").onkeyup = function() {
        $TableFilter("#tableTermino", this.value,1);
    }

    document.querySelector("#inputTextFindProceso").onkeyup = function() {
        $TableFilter("#tableProceso", this.value,2);
    }

    document.querySelector("#inputTextFindRetraso").onkeyup = function() {
        $TableFilter("#tableRetraso", this.value,3);
    }

    document.querySelector("#inputTextFindVencido").onkeyup = function() {
        $TableFilter("#tableVencido", this.value,4);
    }

    $TableFilter = function(id, value, option) {

        var rows = document.querySelectorAll(id + ' tbody tr');
        var contadorTmp = 0;

               

        for (var i = 0; i < rows.length; i++) {

            var showRow = false;

            var row = rows[i];
            row.style.display = 'none';

            for (var x = 0; x < row.childElementCount; x++) {
                if (row.children[x].textContent.toLowerCase().indexOf(value.toLowerCase().trim()) > -1) {
                    showRow = true;
                    break;
                }
            }

            if (showRow) {
                contadorTmp++;
                row.style.display = null;
            }
        }

        if (contadorTmp == 0) {
            document.querySelector('#auxTmp'+option).style.display = null;
        } else {
           document.querySelector('#auxTmp'+option).style.display = 'none';
        }
    }
