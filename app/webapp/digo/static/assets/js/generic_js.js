// ------------------------------------------------
// --- Variables
// ------------------------------------------------
var colors_nodes = {
  "hash": "#FFD86E",
  "ipv4":"#FF756E",
  "ipv6":"#DE9BF9",
  "email": "#6DCE9E",
  "domain": "#FB95AF",
  "country": "#A5ABB6",
  "entity": "#68BDF6",
  "threat_actor": "#A5ABB6"
};

var colors_edges = "#A5ABB6";

var colors_node_array = [
          "#A5ABB6",
          "#FF756E",
          "#DE9BF9",
          "#68BDF6",
          "#6DCE9E",
          "#FFD86E",
          "#FF756E",
          "#FB95AF",
          "#A5ABB6"
        ]


// ------------------------------------------------
// --- Ajax function
// ------------------------------------------------
//ajax_function = function(uri, method, data, async_value) {
// if(async_value == undefined)
// {
//   async_value = true;
// }
// var request = {
//     url: uri,
//     type: method,
//     cache: false,
//     async: async_value,
//     data: data,
//     success: function(d){
//       ajax_return = d
//     }
// };
// return $.ajax(request);
//}


function ajaxMaskUI(settings, loop=false) {

    function maskPageOn(color) { // color can be ie. 'rgba(176,176,176,0.7)' or 'transparent'
        var div = $('#maskPageDiv');
        if (div.length === 0) {
            $(document.body).append('<div id="maskPageDiv" style="position:fixed;width:100%;height:100%;left:0;top:0;display:none"></div>'); // create it
            div = $('#maskPageDiv');
        }
        if (div.length !== 0) {
            div[0].style.zIndex = 2147483647;
            div[0].style.backgroundColor=color;
            div[0].style.display = 'inline';
        }
    }

    function maskPageOff() {
        var div = $('#maskPageDiv');
        if (div.length !== 0) {
            div[0].style.display = 'none';
            div[0].style.zIndex = 'auto';
        }
    }

    function hourglassOn() {
        if ($('style:contains("html.hourGlass")').length < 1) $('<style>').text('html.hourGlass, html.hourGlass * { cursor: wait !important; }').appendTo('head');
        $('html').addClass('hourGlass');
    }

    function hourglassOff() {
        $('html').removeClass('hourGlass');
    }

    if (settings.maskUI===true) settings.maskUI='transparent';

    if (!!settings.maskUI) {
        maskPageOn(settings.maskUI);
        hourglassOn();
    }

    var dfd = new $.Deferred();
    $.ajax(settings)
        .fail(function(jqXHR, textStatus, errorThrown) {
            if (!!settings.maskUI) {
                maskPageOff();
                hourglassOff();
            }
            dfd.reject(jqXHR, textStatus, errorThrown);
        }).done(function(data, textStatus, jqXHR) {
            if (!!settings.maskUI) {
                maskPageOff();
                hourglassOff();
            }
            dfd.resolve(data, textStatus, jqXHR);
        });

    return dfd.promise();
}



// ------------------------------------------------
// --- Remove dupplicate from array
// ------------------------------------------------
function uniq(a) {
    return a.sort().filter(function(item, pos, ary) {
        return !pos || item != ary[pos - 1];
    })
}
