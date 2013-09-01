"use strict";

var processDataObject = function (objJson) {

    // JSON OBJECT PROPERTIES 
    // id, service_name, expiration, brief_description, categories[], 
    // url, description, description_html, web_actions[], faqs[]
    var data = objJson[0];

    var service = {
        id: data.id,
        name: data.service_name,
        expires: data.expiration,
        brief: data.brief_description,
        desc: data.description,
        desc_html: data.description_html,
        actions: "",
        categories: "",
        faqs: ""
    };

    service.url = "<a title='" + service.name + "' href='" + data.url + "' target='_blank'>" + "Url" + "</a>";

    // CATEGORIES_NAME PROPERTY
    for (var i = 0; i < data.categories.length; i++) {
        var name = "";
        name += data.categories[i].category_name;

        if (i > 0) {
            name += ", ";
        }
    }

    service.categories = name;

    // WEB_ACTION PROPERTIES
    // type, label, url
    for (var z = 0; z < data.web_actions.length; z++) {
        var act = data.web_actions[z];
        var link = "";

        var web = {
            type: act.type,
            label: act.label,
            url: act.url
        };
        service.actions += "<div name='actions'><a title='" + web.label + "' href='" + web.url + "'>" + web.type + "</a></div>";
    }

    if (data.faqs) {
        // PROCESS ARRAY
    }

    printObjectDisplay(service);
};

// CREATE GENERIC COLLECTION LIST
var processDataArray = function (objArray) {
    var data = objArray;
    var length = data.length;

    var html = "";
    var service = {};
    var links = "";

    // LOOP THROUGH EACH OBJECT PROPERTIES IN ARRAY
    for (var i = 0; i < length; i++) {

        var detail = data[i];

        // JSON OBJECT PROPERTIES
        // id, service_name, expiration, brief_description
        var url = "index2.html?q=" + detail.id;

        links += "<li>" + i + ". <a title='" + detail.service_name + "' href='" + url + "' " + " '>" + detail.service_name + "</a></li>";
    }
    display("divList", links);
};

// UTILITY FUNCTION: GENERIC PRINTOUT
var display = function (divTag, html) {
    document.getElementById(divTag).innerHTML = html;
};

// UTILITY FUNCTION: GENERIC PRINTOUT
var printObjectDisplay = function (obj) {

    var html = "<table><tr>" +
        "<td>Title: </td><td>" + obj.name + "</td></tr><tr>" +
        "<td>Category: </td><td>" + obj.categories + "</td></tr><tr>" +
        "<td>Description: </td><td>" + obj.desc + "</td></tr><tr>" +
        "<td>Actions: </td><td>" + obj.actions + "</td>" +
        "</tr></table>"

    display("divRes", html);
};

// UTILITY FUNCTION: CREATE AND RETURN URLSTRING FROM SELECTED PARAM (ID)
var formatUrl = function (id) {

    // <YOUR CREDENTIALS FROM NYC OPEN DATA ACCOUNT>
    var appID = "<Your Application ID>";
    var appKey = "<Your Application Key>";

    return "https://api.cityofnewyork.us/311/v1/services/" + id +
           ".json?app_id=" + appID + "&app_key=" + appKey;
};

// UTILITY FUNCTION: DETECT OBJECT TYPE AND RETURN
var detectObject = function (object) {

    var stringConstructor = "test".constructor,
        arrayConstructor = [].constructor,
        objectConstructor = {}.constructor;

    if (object === null) {
        return "null";
    }
    else if (object === undefined) {
        return "undefined";
    }
    else if (object.constructor === stringConstructor) {
        return "String";
    }
    else if (object.constructor === arrayConstructor) {
        return "Array";
    }
    else if (object.constructor === objectConstructor) {
        return "Object";
    }
    else {
        return "Unknown Type";
    }
};

// UTILITY FUNCTION: PARSE FROM STRING INTO AN ARRAY
var parseData = function (obj) {
    return JSON.parse(obj);
};