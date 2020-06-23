


(function(Handlebars) {

    Handlebars.registerHelper("if_eq", 
    function(a, b, opts) {if (a == b) 
        {return opts.fn(this)}
     else
      {return opts.inverse(this);}
    });

    Handlebars.registerHelper("formatDate", function (datetime, format) {
        return moment(datetime).format(format);
    });
}(window.Handlebars));



     