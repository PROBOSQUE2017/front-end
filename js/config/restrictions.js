define([], function(){
        return {

            roles:{
                r1:{
                        label:'Administrador',
                        admonUsers:{
                                exclude :[1]
                        }
                        
                },
                r2:{
                        label:'Coordinador de Gabinete SIAP',
                        admonUsers:{
                                exclude:[1,6]
                        },
                        createTeamWorks:true
                },
                r3:{
                        label:'Coordinador Estatal',
                        
                },
                r4:{
                        label:'Supervisor',
                       
                },
                r5:{
                        label:'Brigadista',
                       
                },
                r6:{
                        label:'Ejecutivo',
                       
                }
                
            }
        }
});