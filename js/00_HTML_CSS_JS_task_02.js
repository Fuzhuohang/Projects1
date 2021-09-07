// 表单设计画布
let formCanvas;

let itemsData = [];

window.onload = function() {
    formCanvas = document.getElementById("form_canvas");
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
    const itemData = {};
    switch (data) {
        case "form_item_01":
            itemData.id = "ShortText_" + Date.now().valueOf();
            itemData.name = "单行文本";
            itemData.type = "shorttext";
            itemData.attr = {};
            itemData.attr.default = "";
            itemData.attr.readonly = false;
            itemData.attr.required = false;
            itemData.attr.maxLength = 200;
            break;
        case "form_item_02":
            itemData.id = "Password_" + Date.now().valueOf();
            itemData.name = "密码";
            itemData.type = "shorttext";
            itemData.attr = {};
            itemData.attr.readonly = false;
            itemData.attr.required = true;
            itemData.attr.maxLength = 18;
            break;
        case "form_item_03":
            itemData.id = "LongText_" + Date.now().valueOf();
            itemData.name = "多行文本";
            itemData.type = "shorttext";
            itemData.attr = {};
            itemData.attr.default = "";
            itemData.attr.readonly = false;
            itemData.attr.required = false;
            itemData.attr.maxLength = 2000;
            break;
        case "form_item_04":
            itemData.id = "Dropdown_" + Date.now().valueOf();
            itemData.name = "下拉单选框";
            itemData.type = "Drop";
            itemData.attr = {};
            // itemData.attr.default="";
            itemData.attr.readonly = false;
            itemData.attr.required = false;
            itemData.attr.options = {};
            itemData.attr.options.options_01 = "";
            itemData.attr.options.options_02 = "";
            itemData.attr.options.options_03 = "";
            break;
        case "form_item_05":
            itemData.id = "DropdownMulti_" + Date.now().valueOf();
            itemData.name = "下拉多选框";
            itemData.type = "Drop";
            itemData.attr = {};
            // itemData.attr.default="";
            itemData.attr.readonly = false;
            itemData.attr.required = false;
            itemData.attr.options = {};
            itemData.attr.options.options_01 = "";
            itemData.attr.options.options_02 = "";
            itemData.attr.options.options_03 = "";
            break;
        case "form_item_06":
            itemData.id = "Radio_" + Date.now().valueOf();
            itemData.name = "单选框";
            itemData.type = "select";
            itemData.attr = {};
            // itemData.attr.default="";
            itemData.attr.readonly = false;
            itemData.attr.required = false;
            itemData.attr.options = {};
            itemData.attr.options.options_01 = "选项1";
            itemData.attr.options.options_02 = "选项2";
            itemData.attr.options.options_03 = "选项3";
            break;
        case "form_item_07":
            itemData.id = "Checkbox_" + Date.now().valueOf();
            itemData.name = "多选框";
            itemData.type = "select";
            itemData.attr = {};
            // itemData.attr.default="";
            itemData.attr.readonly = false;
            itemData.attr.required = false;
            itemData.attr.options = {};
            itemData.attr.options.options_01 = "选项1";
            itemData.attr.options.options_02 = "选项2";
            itemData.attr.options.options_03 = "选项3";
            break;
        case "form_item_08":
            itemData.id = "Date_" + Date.now().valueOf();
            itemData.name = "日期";
            itemData.type = "date";
            itemData.attr = {};
            itemData.attr.default = "";
            itemData.attr.readonly = false;
            itemData.attr.required = false;
            itemData.attr.datetype = "1900/01/01";
            break;
        case "form_item_09":
            itemData.id = "Number_" + Date.now().valueOf();
            itemData.name = "数值";
            itemData.type = "number";
            itemData.attr = {};
            itemData.attr.default = "";
            itemData.attr.readonly = false;
            itemData.attr.required = false;
            itemData.attr.datetype = "1000";
            break;
        case "form_item_10":
            itemData.id = "Email_" + Date.now().valueOf();
            itemData.name = "邮箱";
            itemData.type = "email";
            itemData.attr = {};
            itemData.attr.default = "";
            itemData.attr.readonly = false;
            itemData.attr.required = false;
            break;
        case "form_item_11":
            itemData.id = "Telphone_" + Date.now().valueOf();
            itemData.name = "电话";
            itemData.type = "tel";
            itemData.attr = {};
            itemData.attr.default = "";
            itemData.attr.readonly = false;
            itemData.attr.required = false;
            break;
        case "form_item_12":
            itemData.id = "URL_" + Date.now().valueOf();
            itemData.name = "URL";
            itemData.type = "url";
            itemData.attr = {};
            itemData.attr.default = "";
            itemData.attr.readonly = false;
            itemData.attr.required = false;
            break;
        case "form_item_13":
            itemData.id = "File_" + Date.now().valueOf();
            itemData.name = "附件";
            itemData.type = "file";
            itemData.attr = {};
            itemData.attr.readonly = false;
            itemData.attr.required = false;
            break;
            // case "form_item_14":

            //     break;
            // case "form_item_15":

            //     break;
    }
    formdesign(itemData);
    itemsData.push(itemData);

    console.log(itemsData);
}


function formdesign(obj) {
    // 表单设计组件
    // 表单项主体
    const itemBox = document.createElement("div");
    itemBox.className = "i";
    // 表单项选中效果
    const itemTag = document.createElement("input");
    itemTag.type = "radio";
    itemTag.name = "item";
    itemTag.id = obj.id;
    itemTag.hidden = "true";
    const itemLabel = document.createElement("label");
    itemLabel.for = obj.id;
    itemLabel.className = "db pr";
    // 表单项内容
    const item = document.createElement("div");
    item.className = "item";
    // 表单项名称
    const itemName = document.createElement("div");
    itemName.className = "i-title wm-ht";
    itemName.id = obj.id + "_title";
    // 表单项设计展示主体
    // 单行文本 密码 下拉单选 下拉多选 日期 数值 邮箱 电话 URL
    const itemBodyText = document.createElement("div");
    itemBodyText.className = "i-body-text";
    // 多行文本
    const itemBodyTextarea = document.createElement("div");
    itemBodyTextarea.className = "i-body-textarea";
    // 单选框 复选框
    const itemBodyCheck = document.createElement("div");
    itemBodyCheck.className = "i-body-check";
    // 附件
    const itemBodyFile = document.createElement("div");
    itemBodyFile.className = "i-body-file";
    // 单/复选框选项
    const checkItem = document.createElement("div");
    checkItem.className = "i-check-item";
    // 单/复选框选项图标
    // 复选框
    const checkItemBoxC = document.createElement("div");
    checkItemBoxC.className = "i-check-box-c";
    // 单选框
    const checkItemBoxR = document.createElement("div");
    checkItemBoxR.className = "i-check-box-r";
    // 单/复选框选项名称
    const checkItemTag = document.createElement("div");
    checkItemTag.className = "i-check-text";
    // 编辑按钮
    const editBtn = document.createElement("Button");
    editBtn.type = "button";
    editBtn.className = "i-icon";
}