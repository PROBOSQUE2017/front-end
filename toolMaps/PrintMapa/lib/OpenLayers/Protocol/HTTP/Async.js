/* Copyright (c) 2006-2008 MetaCarta, Inc., published under the Clear BSD
 * license.  See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/**
 * @requires OpenLayers/Protocol/HTTP.js
 */

/**
 * Class: OpenLayers.Protocol.HTTP.Async
 * This class executes the HTTP request in a web worker. The benefit
 * is, that the parsing of the features is also done in the web worker,
 * so that during the parsing process the script is not blocking.
 * 
 * The class only supports "read", for other operations the methods
 * of the parent class will be used (without web workers).
 *
 * Inherits from:
 *  - <OpenLayers.Protocol.HTTP>
 */
OpenLayers.Protocol.HTTP.Async = OpenLayers.Class(OpenLayers.Protocol.HTTP, {
    
    /**
     * APIProperty: webworkerScript
     * {String} The path to the web worker script which is called, when
     *          the filter should be executed asynchronously (seen from 
     *          the website).
     */     
    webworkerScript: null,
    
    /**
     * APIProperty: basepath
     * {String} Optional, path to the OpenLayers library root folder (lib/), seen from 
     *          the web worker script. Default is "../../..".
     */     
    basepath: null,
    
    /**
     * APIProperty: scriptImports
     * {Array} Optional, list of all scripts that should be imported in the web worker. The
     *         default (OpenLayers.Protocol.HTTP.AsyncWorker.SCRIPTS) contains all scripts for 
     *         the GeoJSON format, for other formats you have to adapt the list. For production you
     *         may want to minify those files into one file.
     */     
    scriptImports: [],

    /**
     * Constructor: OpenLayers.Protocol.HTTP.Async
     * A class for giving layers generic HTTP protocol.
     *
     * Parameters:
     * options - {Object} Object whose properties will be set on the
     *     instance.
     *
     * Valid options include:
     * webworkerScript - {String} Required
     * basepath - {String} Optional
     * scriptImports - {Array} Optional
     */    
    initialize: function(options) {
        OpenLayers.Protocol.HTTP.prototype.initialize.apply(this, arguments);
        
        if (!this.webworkerScript || this.webworkerScript === null) {
            OpenLayers.Console.error("Property 'webworkerScript' is required for OpenLayers.Protocol.HTTP.Async");    
        }
    },
   
    /**
     * APIMethod: read
     * Construct a request for reading new features.
     *
     * Parameters:
     * options - {Object} Optional object for configuring the request.
     *     This object is modified and should not be reused.
     *
     * Valid options:
     * url - {String} Url for the request.
     * params - {Object} Parameters to get serialized as a query string.
     * headers - {Object} Headers to be set on the request.
     * filter - {<OpenLayers.Filter>} Filter to get serialized as a
     *     query string.
     * readWithPOST - {Boolean} If the request should be done with POST.
     *
     * Returns:
     * {<OpenLayers.Protocol.Response>} A response object, whose "worker" property
     *     references the web worker. This object is also passed to the
     *     callback function when the request completes. Its "features" property
     *     is then populated with the the features received from the server.
     */
    read: function(options) {
        var response = new OpenLayers.Protocol.Response({requestType: "read"});
        var scope = options.scope;
        var callback = options.callback;
        
        // start web worker 
        var worker = new Worker(this.webworkerScript);
        
        worker.onmessage = function(event) {
            if (event.data.status === "done" && !response.aborted) {
                var data = OpenLayers.Util.WorkerTools.importData(
                                event.data, 
                                [
                                    OpenLayers.Util.WorkerTools.geometryImportFilter,
                                    OpenLayers.Util.WorkerTools.idImportFilter
                                ]);
                
                // assign the attributes from the response object received from the
                // web worker to the response object that we returned at the beginning
                OpenLayers.Util.extend(response, data.response);
                callback.call(scope, response);
            }
        };
        worker.onerror = function(error) {
            // in case of an error also trigger the callback
            response.code = OpenLayers.Protocol.Response.FAILURE;
            callback.call(scope, response);
            OpenLayers.Console.error(error);
        };
        
        /* Don't send the scope to the web worker, because
         * we don't need it there - the callback is executed from
         * the main script. Besides it is very likely that the scope
         * contains cycle references (e.g. layer <-> map).
         */
        options.scope = null;
        
        worker.postMessage(OpenLayers.Util.WorkerTools.exportData({
            status: "start",
            options: options,
            protocol: this
        }));
        
        // now reassign the scope
        options.scope = scope;
        
        // set the worker on the response object, so that we can
        // cancel the request, see method 'abort()'
        response.worker = worker;
        
        return response;
    },

    /**
     * APIMethod: abort
     * Abort an ongoing request, the response object passed to
     * this method must come from this HTTP protocol (as a result
     * of a create, read, update, delete or commit operation). This method
     * simply terminates the web worker.
     *
     * Parameters:
     * response - {<OpenLayers.Protocol.Response>}
     */
    abort: function(response) {
        if (response && response.worker) {
            response.aborted = true;
            response.worker.terminate();
        }
    },

    CLASS_NAME: "OpenLayers.Protocol.HTTP.Async" 
});
