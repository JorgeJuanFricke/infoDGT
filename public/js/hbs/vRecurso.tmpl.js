(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['vRecurso'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                    <h4 class=\"modal-title\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"tipo") || (depth0 != null ? lookupProperty(depth0,"tipo") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"tipo","hash":{},"data":data,"loc":{"start":{"line":9,"column":44},"end":{"line":9,"column":52}}}) : helper)))
    + "</h4>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "                 <h4 class=\"modal-title\">Recurso</h4>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                     <input type=\"hidden\" class=\"form-control\" name=\"tipo\" value=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"tipo") || (depth0 != null ? lookupProperty(depth0,"tipo") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"tipo","hash":{},"data":data,"loc":{"start":{"line":26,"column":82},"end":{"line":26,"column":90}}}) : helper)))
    + "\">\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "                    <div class=\"form-group row\">\n                        <div class=\"col-3\">\n                            <label>tipo:</label>\n                            <select id=\"tiposRecurso\" class=\"form-control\" autofocus=\"true\" >\n                            \n                            </select>\n                        </div>      \n                        \n                    </div>\n              \n                     \n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"modal\" id=\"modalRecurso\">\n  \n    <div class=\"modal-dialog\">\n        <div class=\"modal-content\">\n            <!-- Modal Header -->\n\n            <div class=\"modal-header\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"tipo") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":8,"column":16},"end":{"line":12,"column":23}}})) != null ? stack1 : "")
    + "                <button type=\"button\" class=\"close\" data-dismiss=\"modal\"></button>\n\n            </div>\n\n            <!-- Modal body -->\n            <div class=\"modal-body\">\n            \n             <form id=\"formRecurso\" class=\"form\" > \n                <input type=\"hidden\" name=\"_csrf\" value=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"csrf") || (depth0 != null ? lookupProperty(depth0,"csrf") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"csrf","hash":{},"data":data,"loc":{"start":{"line":21,"column":57},"end":{"line":21,"column":65}}}) : helper)))
    + "\">\n                <input type=\"hidden\" name=\"_id\" value=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"_id") || (depth0 != null ? lookupProperty(depth0,"_id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data,"loc":{"start":{"line":22,"column":55},"end":{"line":22,"column":62}}}) : helper)))
    + "\">\n\n               \n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"tipo") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(7, data, 0),"data":data,"loc":{"start":{"line":25,"column":16},"end":{"line":39,"column":24}}})) != null ? stack1 : "")
    + "                \n                <div class=\"form-group\">\n                    <label for=\"nombre\" class=\"control-label\">nombre:</label>\n                    <input type=\"text\" class=\"form-control\" name=\"nombre\" value=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"nombre") || (depth0 != null ? lookupProperty(depth0,"nombre") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nombre","hash":{},"data":data,"loc":{"start":{"line":43,"column":81},"end":{"line":43,"column":91}}}) : helper)))
    + "\"></input>\n                </div>\n\n                <div class=\"form-group\">\n                    <label for=\"descripcion\" class=\"control-label\">descripción:</label>\n                    <textarea class=\"form-control\" id =\"Descrip\" name=\"descripcion\"  cols=\"80\" rows=\"4\">\n                            "
    + alias4(((helper = (helper = lookupProperty(helpers,"descripcion") || (depth0 != null ? lookupProperty(depth0,"descripcion") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"descripcion","hash":{},"data":data,"loc":{"start":{"line":49,"column":28},"end":{"line":49,"column":43}}}) : helper)))
    + "\n                      </textarea>\n                </div>\n\n               \n                <div class=\"form-group\">\n                    <label for=\"url\" class=\"control-label\">url:</label>\n                    <input type=\"text\" class=\"form-control\" name=\"url\" value=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"url") || (depth0 != null ? lookupProperty(depth0,"url") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data,"loc":{"start":{"line":56,"column":78},"end":{"line":56,"column":85}}}) : helper)))
    + "\">\n                </div>\n\n                  \n\n                <div class=\"form-group row\">\n                    <div class=\"col-4\"> \n                        <label for=\"procedencia\" class=\"control-label\">procedencia:</label>\n                        <input type=\"text\" class=\"form-control\" name=\"procedencia\" value=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"procedencia") || (depth0 != null ? lookupProperty(depth0,"procedencia") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"procedencia","hash":{},"data":data,"loc":{"start":{"line":64,"column":90},"end":{"line":64,"column":105}}}) : helper)))
    + "\">\n                    </div> \n                    <div class=\"col-2\">\n                        <label for=\"publicacion\" class=\"control-label\">publicación:</label>\n                        <input type=\"date\" class=\"form-control\" name=\"publicacion\"\n                            value=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"publicacion") || (depth0 != null ? lookupProperty(depth0,"publicacion") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"publicacion","hash":{},"data":data,"loc":{"start":{"line":69,"column":35},"end":{"line":69,"column":50}}}) : helper)))
    + "\">\n                    </div>\n                    <div class=\"col-2\">\n                        <label for=\"derogacion\" class=\"control-label\">derogación:</label>\n                        <input type=\"date\" class=\"form-control\" name=\"derogacion\" value=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"derogacion") || (depth0 != null ? lookupProperty(depth0,"derogacion") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"derogacion","hash":{},"data":data,"loc":{"start":{"line":73,"column":89},"end":{"line":73,"column":103}}}) : helper)))
    + "\">\n                    </div>\n                </div>\n\n                    <div class=\"from-group row\">\n                        <!--label for=\"documento\" class=\"control-label\">documento</label-->\n                        <div class=\"col\">\n                            <span class=\"btn btn-default btn-file\">\n                                <input id=\"fileupload\" type=\"file\" name=\"documento\" class=\"form-control\"\n                                    data-url=\"/upload\">\n                            </span>\n                        </div>\n                    </div>\n                </div>\n\n               \n                <div class=\"form-group\">\n                    <button id=\"GrabarRecurso\" type=\"button\" class=\"btn btn-primary\" >Grabar</button>\n                    <button type=\"button\" class=\"btn btn-secondary close btn\" data-dismiss=\"modal\">Salir</button>\n\n                </div>\n              \n                </form>\n            </div>\n        </div>\n    </div>\n  \n\n</div>\n";
},"useData":true});
})();