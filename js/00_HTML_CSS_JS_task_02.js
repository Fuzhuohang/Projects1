var form_canvas;

var item = document.createElement("div");

var item_name = document.createElement("div");

var item_body = document.createElement("input");


window.onload = function() {
    form_canvas = document.getElementById("form_canvas");
    // var article = $("#form_design").width();
    // var form_items = $(".itg-group").width();

    // if (article > 820) {
    //     $(".itg-group").css('width', 200);
    //     $(".form-design").css('left', 201);
    // } else if (article > 720) {
    //     form_items = article - 620;
    //     $(".itg-group").css('width', form_items);
    //     $(".form-design").css('left', form_items + 1);
    // } else {
    //     $(".itg-group").css('width', 100);
    //     $(".form-design").css('left', 101);
    // }

    $(window).resize(function() {
        // article = $("#form_design").width();
        // form_items = $(".itg-group").width();

        // if (article > 820) {
        //     $(".itg-group").css('width', 200);
        //     $(".form-design").css('left', 201);
        // } else if (article > 720) {
        //     form_items = article - 620;
        //     $(".itg-group").css('width', form_items);
        //     $(".form-design").css('left', form_items + 1);
        // } else {
        //     $(".itg-group").css('width', 100);
        //     $(".form-design").css('left', 101);
        // }
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

    form_canvas.appendChild(div1);
}