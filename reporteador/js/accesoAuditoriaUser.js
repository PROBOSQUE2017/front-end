let usuario = amplify.store('dataLoggingProbosque');



if (isEmpty(usuario)) {

    window.location.assign("/SIFEM/index.html");

} else if (usuario.program == 1 && usuario.roleId == 5) {

} else {
    window.location.assign("/SIFEM/index.html");

}


function isEmpty(obj) {

    for (var i in obj) { return false; }

    return true;

}

$(document).ready(function() {
    $(".option_logout").click(function() {
        CerrarSession();

    });

    function CerrarSession() {
        amplify.store('dataLoggingProbosque', null);
        window.location.assign("/SIFEM/index.html");
    }

});