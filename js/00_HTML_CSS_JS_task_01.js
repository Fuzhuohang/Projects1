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

    ev.target.appendChild(div1);
}