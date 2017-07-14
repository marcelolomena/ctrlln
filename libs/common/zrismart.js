//zrismart.js
var zLibrary = {
    jsonOptions: {
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    },
    createJSON: function(postdata) {
        if (postdata.id === '_empty')
            postdata.id = null;
        return JSON.stringify(postdata)
    }
}
