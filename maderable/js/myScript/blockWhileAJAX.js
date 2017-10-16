$( document ).ajaxStart(function() {
       $.blockUI({ 
        message: '<img src="images/6.gif"><h4>Por favor espere...</h4>',
        css: { 
            border: 'none', 
            padding: '15px',
            
            backgroundColor: '#000', 
            '-webkit-border-radius': '10px', 
            '-moz-border-radius': '10px', 
            opacity: .5, 
            color: '#fff'
        },
        baseZ: 4000

 }); 
 
});



$( document ).ajaxStop(function() {
    $.unblockUI();
});



