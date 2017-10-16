requirejs.config({
    paths: {
        mappingConfig:'config/mapping',
        connections:'config/connections',
        version:'config/version',
        webmapservices:'config/webmapservices',
        restrictions:'config/restrictions',
        infomodules:'config/modules',
        dataSelect:'config/dataSelect'
    }
});

define(["version","mappingConfig","connections","webmapservices","restrictions","infomodules","dataSelect"], function(){});
