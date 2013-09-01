//INTERNET EXPLORER SUPPORT FOR JQUERY
// http://stackoverflow.com/a/8456786/940377
// JQTICKET: http://bugs.jquery.com/ticket/8283
jQuery.support.cors = true;


// UTITLITY FUNCTION: GET PARAMENTER FROM URL
$.urlParam = function (name) {
    var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
};

// CREATE REQUEST FOR JSON DATA - PARSE - DISPLAY
var getData = function(url) {

    $.ajax({
        method: "GET",
        url: url,
        success: function (res) {

            var parsed;
            var t = detectObject(res);
            
            if (t == "String") {
                parsed = parseData(res);
            } else if(t == "Array" || t == "Object") {
                parsed = res
            }

            if (parsed.length > 1) {
                processDataArray(parsed);
            } else {
                processDataObject(parsed);
            }
        }
    });
};