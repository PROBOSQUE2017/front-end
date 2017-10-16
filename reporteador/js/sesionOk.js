 	var Toluca = amplify.store();
       	
       	if(isEmpty(Toluca)){
         	
         	window.location.assign("/SIFEM/index.html");
       	
       	}

       	
       	function isEmpty(obj) {
          	
          	for(var i in obj) { return false; }
          	
          	return true;
       	
       	}