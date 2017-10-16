var connection={
				url:'http://localhost:8080/ServiceBosque/Reporteador',
        //url: 'http://localhost:8084/ServiceBosque/Reporteador',
				type:'post',
				dataType:'json'

};

var events= function()
		{






	}


var requestFields= function(usr,activity)
	{
		obj=this;
	 var msg = 'Servicio no disponible intente m&aacute;s tarde';
                    var r= {
                            success:function(json,estatus){
                                var valid=false;
                               
                                if ((json)&&(json.response)){
                                        
                                    if (json.response.sucessfull){

                                        valid=true;
                                        var chain='';
                                        var i=0;
                                        var ul = document.getElementById("list");
                                           for( var x in json.data)
                                        	{ 
                                            i+=1;

                                            chain+='<li id='+i+' datatype=' + json.data[x].datatype+' type= '+json.data[x].type + ' name='+json.data[x].name+' list='+json.data[x].listname+'>'+json.data[x].label+'</li>';
                                       		  /* var li = document.createElement("li");
                                        	   console.log(json.data[x]);	
	                                           li.appendChild(document.createTextNode(json.data[x].label));
                                             li.setAttribute("id",json.data[x].label);
                                             li.setAttribute("data-stock-symbol", "#"+json.data[x].label);
                                             ul.appendChild(li); */



                                        	}
                           	              
                                          ul.innerHTML=chain;
                                        
                                    }else{
                                        msg=json.response.message;
                                    }
                                }
                                if (!valid) { 
                                   
                                       alert(msg);
                                }
                            },
                              beforeSend: function(xhr) {
                              
                                 
                              },
                            error: function(solicitudAJAX,errorDescripcion,errorExcepcion) {
                                        
                            },
                            complete: function(solicitudAJAX,estatus) {
                                
                            }
                           };
          r = $.extend(r,connection);
          r.data = {action:'getCampos', user:usr, activity:activity};
          $.ajax(r);		



	}



var buildStructure= function(usr,activity)
   {
     this.requestFields(usr,activity);




   }


var getUsryProgram=function(params)
		{
	params = params.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");	
	var regex = new RegExp("[\\?&]"+params+"=([^&#]*)"),
	results= regex.exec(location.search);
	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g," "));
	}





$( document ).ready(function() {
//   init();

   var usr = getUsryProgram('UR')/5;
   var activity = getUsryProgram('UPR');
   buildStructure(usr,activity);
   
});
