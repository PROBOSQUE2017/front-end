define([], function(){
    return {
            users:{
                    login:{
                        url:'http://localhost:8080/ServiceBosque/Login',
                        //url:'data/loging.json',
                        type:'POST',
                        dataType:'json'//,
                        //contentType:'application/json'
                    },
                    logout:{
                        url:'http://localhost:8080/siap/logout',
                        type:'GET',
                        dataType:'json',
                        contentType:'application/json'
                    },
                    add:{
                        url:'http://localhost:8080/ServiceBosque/User?action=set',
                        type:'POST',
                        dataType:'json'
                    },
                    edit:{
                        url:'http://localhost:8080/ServiceBosque/User?action=set',
                        type:'POST',
                        dataType:'json'
                    },
                    del:{
                        url:'http://localhost:8080/ServiceBosque/User?action=delete',
                        type:'GET',
                        dataType:'json'
                    },
                    search:{
                        url:'http://localhost:8080/ServiceBosque/User?',
                        type:'POST',
                        dataType:'json'
                    }
            },
            tabular:{
                    add:{
                        url:'http://localhost:8080/ServiceBosque/Table?',
                        type:'POST',
                        dataType:'json'
                    },
                    edit:{
                        url:'http://localhost:8080/ServiceBosque/Table?',
                        type:'POST',
                        dataType:'json'
                    },
                    del:{
                        url:'http://localhost:8080/ServiceBosque/Table?action=delete',
                        type:'GET',
                        dataType:'json'
                    },
                    search:{
                        url:'http://localhost:8080/ServiceBosque/Table?',
                        type:'POST',
                        dataType:'json'
                    },
                    get:{
                        url:'http://localhost:8080/ServiceBosque/Table?',
                        type:'GET',
                        dataType:'json'
                    },
                    getFields:{
                        url:'http://localhost:8080/ServiceBosque/Table?',
                                type:'POST',
                                dataType:'json'
                    },
                    getFolio:{
                        url:'http://localhost:8080/ServiceBosque/Folio?',
                                type:'POST',
                                dataType:'json'
                    }
            },
	    
            multirecords:{
                    getInputs:{
                        url:'http://localhost:8080/ServiceBosque/Subtable?',
                        type:'GET',
                        dataType:'json'
                    },
                    getList:{
                         url:'http://localhost:8080/ServiceBosque/Subtable?',
                        type:'GET',
                        dataType:'json'
                    },
                    deleteTemporal:{
                        url:'http://localhost:8080/ServiceBosque/Table?',
                        type:'GET',
                        dataType:'json'
                    },
                    add:{
                        url:'http://localhost:8080/ServiceBosque/Subtable?',
                        type:'POST',
                        dataType:'json'
                    },
                    edit:{
                        url:'http://localhost:8080/ServiceBosque/Subtable?',
                        type:'POST',
                        dataType:'json'
                    },
                    del:{
                        url:'http://localhost:8080/ServiceBosque/Subtable?action=delete',
                        type:'GET',
                        dataType:'json'
                    },
                    get:{
                        url:'http://localhost:8080/ServiceBosque/Subtable?action=delete',
                        type:'GET',
                        dataType:'json'
                    }
            },
            reports:{
                    getFields:{
                        url:'http://localhost:8080/ServiceBosque/Table?',
                        type:'POST',
                        dataType:'json'
                    },
                    getReport:{
                        url:'http://localhost:8080/ServiceBosque/Report?',
                        type:'POST',
                        dataType:'json'
                    },
                    getGraph:{
                        url:'http://localhost:8080/ServiceBosque/Graph?',
                        type:'POST',
                        dataType:'json'
                    }
            },
            workTeams:{
                    
                    getNodes:{
                        url:'http://localhost:8080/siap/users/dependants',
                        type:'GET',
                        dataType:'json',
                        contentType:'application/json'
                        
                    },
                    actions:{
                        url:'http://localhost:8080/Service/Users?',
                        type:'GET',
                        dataType:'json',
                        contentType:'application/json'
                    }
            },
            actions:{
                set:{
                        url:'http://localhost:8080/Service/Actions?',
                        type:'GET',
                        dataType:'json',
                        contentType:'application/json'
                    },
                get:{
                        url:'http://localhost:8080/Service/Actions?',
                        type:'GET',
                        dataType:'json',
                        contentType:'application/json'
                    }
                
            },
            assignCharge:{
                getList:{
                        url:'http://localhost:8080/Service/AssignCharge?',
                        type:'GET',
                        dataType:'json',
                        contentType:'application/json'
                },
                setList:{
                        
                        url:'http://localhost:8080/Service/AssignCharge?',
                        type:'POST',
                        dataType:'json',
                        contentType:'application/json'
                }
            },
            deliveredCharge:{
                getByDelivering:{
                        url:'http://localhost:8080/Service/AssignCharge?',
                        type:'GET',
                        dataType:'json',
                        contentType:'application/json'
                },
                getDelivered:{
                        url:'http://localhost:8080/Service/AssignCharge?',
                        type:'GET',
                        dataType:'json',
                        contentType:'application/json'
                }
            },
            validateCharge:{
                get:{
                        url:'http://localhost:8080/Service/ValidateCharge?',
                        type:'GET',
                        dataType:'json',
                        contentType:'application/json'
                },
                set:{
                        url:'http://localhost:8080/Service/ValidateCharge?',
                        type:'POST',
                        dataType:'json',
                        contentType:'application/json'
                }
            },
            requestField:{
                    data:{
                            url:'http://localhost:8080/ServiceBosque/',
                            type:'POST',
                            dataType:'json'
                    }
            },
            image:{
                    upload:{
                            url:'http://localhost:8080/ServiceBosque/QR?',
                            type:'POST',
                            dataType:'json',
                            contentType:'application/json'
                    },
                    get:{
                            url:'http://localhost:8080/ServiceBosque/QR?',
                            type:'GET',
                            dataType:'json',
                            contentType:'application/json'
                    }
            },
            charge:{
                    upload:{
                            url:'http://localhost:8080/ServiceBosque/UploadShape?',
                            type:'GET',
                            dataType:'json',
                            contentType:'application/json'
                    },
                    download:{
                            url:'http://localhost:8080/ServiceBosque/DownloadCSV?',
                            type:'GET',
                            dataType:'json',
                            contentType:'application/json'
                    },
                    getSeed:{
                            url:'http://localhost:8080/ServiceBosque/CSV?',
                            type:'POST',
                            dataType:'json',
                            contentType:'application/x-www-form-urlencoded'
                    }
            },
            features:{
                    getPredios:{
                            url:'http://localhost:8080/ServiceBosque/Predios?',
                            type:'GET',
                            dataType:'json',
                            contentType:'application/json'
                    },
                    getLayers:{
                            url:'http://localhost:8080/ServiceBosque/Layers?',
                            type:'GET',
                            dataType:'json',
                            contentType:'application/json'
                    },
                    getRegions:{
                            url:'data/regiones.json',
                            type:'GET',
                            dataType:'json',
                            contentType:'application/json'
                    },
                    getInfoTheme:{
                            url:'http://localhost:8080/ServiceBosque/Totals?',
                            type:'GET',
                            dataType:'json',
                            contentType:'application/json'
                    },
                    getLayer:{
                            url:'http://localhost:8080/ServiceBosque/Predios?',
                            type:'GET',
                            dataType:'json',
                            contentType:'application/json'
                    },
                    deleteLayer:{
                            url:'http://localhost:8080/ServiceBosque/Layers?',
                            type:'POST',
                            dataType:'json',
                            contentType:'application/x-www-form-urlencoded'
                    }
            },
            identify:{
                    event:{
                            url:'http://localhost:8080/ServiceBosque/Predios?',
                            type:'GET',
                            dataType:'json',
                            contentType:'application/json'
                    }
            },
            search:{
                    event:{
                            //url:'http://localhost:8080/Service/Predios?',
                            url:'http://localhost:8080/ServiceBosque/Predios?',
                            type:'GET',
                            dataType:'json',
                            contentType:'application/json'
                    }
            },
            notification:{
                    event:{
                            url:'http://localhost:8080/Service/Actions?',
                            type:'GET',
                            dataType:'json',
                            contentType:'application/json'
                    }
            },
            graph:{
                    bottom:{
                            url:'http://localhost:8080/Service/Report?',
                            type:'GET',
                            dataType:'json',
                            contentType:'application/json'
                    }
            },
            progress:{
                 data:{
                        url:'data/progress.json',
                        type:'GET',
                        dataType:'json',
                        contentType:'application/json'
                }
                
            },
            tabulate:{
                    getFields:{
                            url:'http://localhost:8080/ServiceBosque/DataTable?',
                            type:'POST',
                            dataType:'json',
                            contentType: 'application/x-www-form-urlencoded'
                    },
                    getReport:{
                            url:'http://localhost:8080/ServiceBosque/DataTable?',
                            type:'POST',
                            dataType:'json',
                        contentType: 'application/x-www-form-urlencoded'
                    },
                    getGraph:{
                            url:'http://localhost:8080/ServiceBosque/Graph?',
                            type:'POST',
                            dataType:'json'
                    },
                    getSeed:{
                            url:'http://localhost:8080/ServiceBosque/CSV?',
                            type:'POST',
                            dataType:'json'
                    },
                    downloadCvs:{
                            url:'http://localhost:8080/ServiceBosque/DownloadCSV?',
                            type:'POST',
                            dataType:'json'
                    },
                    getSeedPdf:{
                            url:'http://localhost:8080/ServiceBosque/CSV?',
                            type:'POST',
                            dataType:'json'
                    },
                    downloadPdf:{
                            url:'http://localhost:8080/ServiceBosque/DownloadPDF?',
                            type:'POST',
                            dataType:'json'
                    }
            },
            executive:{
                    getFields:{
                            url:'http://localhost:8080/ServiceBosque/TablePredios?',
                            type:'POST',
                            dataType:'json'//,
                            //contentType: 'application/x-www-form-urlencoded'
                    },
                    getAniosAndPrograms:{
                            url:'http://localhost:8080/ServiceBosque/TablePrediosAnios?',
                            type:'POST',
                            dataType:'json'//,
                    },
                    getReport:{
                            url:'http://localhost:8080/ServiceBosque/ReportPredios?',
                            //url:'data/executive.txt',
			    type:'POST',
                            dataType:'json'//,
			    //contentType: 'application/x-www-form-urlencoded'
                    },
                    getGraph:{
                            url:'http://localhost:8080/ServiceBosque/Graph?',
                            type:'POST',
                            dataType:'json'
                    },
                    getSeed:{
                            url:'http://localhost:8080/ServiceBosque/CSV?',
                            type:'POST',
                            dataType:'json'
                    },
                    downloadCvs:{
                            url:'http://localhost:8080/ServiceBosque/DownloadCSV?',
                            type:'POST',
                            dataType:'json'
                    },
                    getSeedPdf:{
                            url:'http://localhost:8080/ServiceBosque/CSV?',
                            type:'POST',
                            dataType:'json'
                    },
                    downloadPdf:{
                            url:'http://localhost:8080/ServiceBosque/DownloadPDFReport?',
                            type:'POST',
                            dataType:'json'
                    }
            }
            
    }
    
});