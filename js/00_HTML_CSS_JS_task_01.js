var item = document.createElement("div");

var item_name = document.createElement("div");

var item_body = document.createElement("input");


window.onload = function() {
    var header = $("#header").height() + 25;
    var article = $("#article").width();
    var form_items = $("#form_items").width();
    var item_body = $(".item_body").width();

    $("#article").css('top', header);
    if (article > 700) {
        $("#form_items").css('width', 200);
        $("#form_body").css('left', 200);
    } else if (article > 600) {
        form_items = article - 500;
        $("#form_items").css('width', form_items);
        $("#form_body").css('left', form_items);
    } else {
        $("#form_items").css('width', 100);
        $("#form_body").css('left', 100);
    }
    $('.item_value').css('width', item_body);

    $(window).resize(function() {
        header = $("#header").height() + 25;
        article = $("#article").width();
        form_items = $("#form_items").width();
        item_body = $(".item_body").width();

        $("#article").css('top', header);
        if (article > 700) {
            $("#form_items").css('width', 200);
            $("#form_body").css('left', 200);
        } else if (article > 600) {
            form_items = article - 500;
            $("#form_items").css('width', form_items);
            $("#form_body").css('left', form_items);
        } else {
            $("#form_items").css('width', 100);
            $("#form_body").css('left', 100);
        }
        $('.item_value').css('width', item_body);
    });
}


function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("Text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("Text");
    switch (data) {
        case form_item_01:

            break;
        case form_item_02:

            break;
        case form_item_03:

            break;
        case form_item_04:

            break;
        case form_item_05:

            break;
        case form_item_06:

            break;
        case form_item_07:

            break;
        case form_item_08:

            break;
        case form_item_09:

            break;
        case form_item_10:

            break;
        case form_item_11:

            break;
        case form_item_12:

            break;
        case form_item_13:

            break;
        case form_item_14:

            break;
        case form_item_15:

            break;
    }

    ev.target.appendChild(data);
}