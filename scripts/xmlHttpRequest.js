var ajax = function(method, url) {
    var xmlhttp;

    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var parsed = parseData(xmlhttp.responseText);

            if (parsed.length > 1) {
                processDataArray(parsed);
            } else {
                processDataObject(parsed);
            }
        }
    }
    xmlhttp.open(method, url, true);
    xmlhttp.send();
};

var getParameterByName = function (param) {
    param = param.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + param + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};

function OnChange(dropdown)
{
    var myindex  = dropdown.selectedIndex
    var selected = dropdown.options[myindex].value

    var urlString = formatUrl(selected);

    ajax("GET", urlString, "divRes");
    // var baseURL  = <Some value based on SelValue>
    // top.location.href = baseURL;
    
    return true;
}