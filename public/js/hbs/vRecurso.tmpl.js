(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['vRecurso'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                        <input type=\"text\" class=\"form-control\" name=\"tipo\" value=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"tipo") : depth0)) != null ? lookupProperty(stack1,"codigo") : stack1), depth0))
    + "\" disabled>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "                        <select id=\"tiposRecurso\" class=\"form-control\" autofocus=\"true\">\n                        </select>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"modal\" id=\"modalRecurso\">\n  \n    <div class=\"modal-dialog modal-xl modal-dialog-centered\">\n        <div class=\"modal-content\">\n            <!-- Modal Header -->\n\n            <div class=\"modal-header\">\n                <div class=\"form-group row\">\n                 \n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\"></button>\n            </div>\n            </div>\n\n            <!-- Modal body -->\n            <div class=\"modal-body\">\n            \n             <form id=\"formRecurso\" class=\"form\" > \n                <input type=\"hidden\" name=\"_csrf\" value=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"csrf") || (depth0 != null ? lookupProperty(depth0,"csrf") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"csrf","hash":{},"data":data,"loc":{"start":{"line":18,"column":57},"end":{"line":18,"column":65}}}) : helper)))
    + "\">\n                <input type=\"hidden\" name=\"_id\" value=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"_id") || (depth0 != null ? lookupProperty(depth0,"_id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data,"loc":{"start":{"line":19,"column":55},"end":{"line":19,"column":62}}}) : helper)))
    + "\">\n\n             \n                \n                <div class=\"form-group row\">\n                    <div class=\"col-4\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"tipo") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":25,"column":21},"end":{"line":30,"column":28}}})) != null ? stack1 : "")
    + "                   </div>\n                    <div class=\"col-8\">\n                        <input type=\"text\" class=\"form-control\" name=\"nombre\" value=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"nombre") || (depth0 != null ? lookupProperty(depth0,"nombre") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nombre","hash":{},"data":data,"loc":{"start":{"line":33,"column":85},"end":{"line":33,"column":95}}}) : helper)))
    + "\">  \n                    </div>\n                   \n\n                </div>\n\n                <div class=\"form-group\">\n                  \n                    <textarea id=\"Descrip\" class=\"form-control\">\n                        \n                    </textarea>\n                </div>\n\n               \n                <div class=\"form-group\">\n                    <label for=\"url\" class=\"control-label\">url:</label>\n                    <input type=\"text\" class=\"form-control\" name=\"url\" value=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"url") || (depth0 != null ? lookupProperty(depth0,"url") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data,"loc":{"start":{"line":49,"column":78},"end":{"line":49,"column":85}}}) : helper)))
    + "\">\n                </div>\n\n                  \n\n                <div class=\"form-group row\">\n                    <div class=\"col-4\"> \n                        <label for=\"procedencia\" class=\"control-label\">procedencia:</label>\n                        <input type=\"text\" class=\"form-control\" name=\"procedencia\" value=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"procedencia") || (depth0 != null ? lookupProperty(depth0,"procedencia") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"procedencia","hash":{},"data":data,"loc":{"start":{"line":57,"column":90},"end":{"line":57,"column":105}}}) : helper)))
    + "\">\n                    </div> \n                    <div class=\"col-4\">\n                        <label for=\"publicacion\" class=\"control-label\">publicación:</label>\n                        <input type=\"date\" id=\"publicacion\" class=\"form-control\" name=\"publicacion\"\n                            value=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"publicacion") || (depth0 != null ? lookupProperty(depth0,"publicacion") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"publicacion","hash":{},"data":data,"loc":{"start":{"line":62,"column":35},"end":{"line":62,"column":50}}}) : helper)))
    + "\">\n                    </div>\n                    <div class=\"col-4\">\n                        <label for=\"derogacion\" class=\"control-label\">derogación:</label>\n                        <input type=\"date\" id=\"derogacion\" class=\"form-control\" name=\"derogacion\" value=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"derogacion") || (depth0 != null ? lookupProperty(depth0,"derogacion") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"derogacion","hash":{},"data":data,"loc":{"start":{"line":66,"column":105},"end":{"line":66,"column":119}}}) : helper)))
    + "\">\n                    </div>\n                </div>\n\n                    <div class=\"from-group row\">\n                        <!--label for=\"documento\" class=\"control-label\">documento</label-->\n                        <div class=\"col\">\n                            <span class=\"btn btn-default btn-file\">\n                                <input id=\"fileupload\" type=\"file\" name=\"documento\" class=\"form-control\"\n                                    data-url=\"/upload\">\n                            </span>\n                        </div>\n                    </div>\n                </div>\n\n               \n                <div class=\"form-group\">\n                    <button id=\"GrabarRecurso\" type=\"button\" class=\"btn btn-primary\">Grabar</button>\n                    <button type=\"button\" class=\"btn btn-secondary close btn\" data-dismiss=\"modal\">Salir</button>\n\n                </div>\n              \n                </form>\n            </div>\n        </div>\n    </div>\n  \n\n</div>\n\n    \n";
},"useData":true});
})();