var Mustache = require('./mustache.min')

var PawServiceNowCodeGen = function() {

    this.generate = function(context, requests, options) {

        // import the mustache template
        var template = readFile("restmsgv2_template.mustache");

        var generated = "";

        for (var i in requests) {
            var request = requests[i];

            // iterate on request headers
            var headers = request.headers;
            console.log(headers);
            var headerList = [];
            for (var header_name in headers) {
                var h = {};
                h.name = header_name;
                h.value = headers[header_name];
                headerList.push(h);
            }

            // iterate on query parms
            var parms = request.getUrlParameters();
            console.log(parms);
            var parmList = [];
            for (var parm_name in parms) {
                console.log("Parm: ", parm_name, parms[parm_name]);
                var p = {};
                p.name = parm_name;
                p.value = parms[parm_name];
                parmList.push(p);
            }

            var body = request.getBody();
            if (body) {
                body = body.replace(/'/g, "\\'");
                body = body.replace(/(?:\r\n|\r|\n)/g, "");
            }

            // define mustache view
            var view = {
                "request": request,
                "content_type": request.getHeaderByName('Content-Type'),
                "header_list": headerList,
                "parm_list": parmList,
                "body": body
            };

            // render the template
            generated += Mustache.render(template, view) + "\n\n";
        }

        return generated;
    }
}



PawServiceNowCodeGen.fileExtension = "js"
PawServiceNowCodeGen.languageHighlighter = "javascript"

PawServiceNowCodeGen.identifier = "com.cavucode.PawServiceNowCodeGen";
PawServiceNowCodeGen.title = "ServiceNow RESTMessageV2";

registerCodeGenerator(PawServiceNowCodeGen);
