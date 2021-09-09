// 表单设计画布
let formCanvas;

let itemsData = [];

let editItem;

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
            itemData.type = "password";
            itemData.attr = {};
            itemData.attr.readonly = false;
            itemData.attr.required = true;
            itemData.attr.maxLength = 18;
            break;
        case "form_item_03":
            itemData.id = "LongText_" + Date.now().valueOf();
            itemData.name = "多行文本";
            itemData.type = "textarea";
            itemData.attr = {};
            itemData.attr.default = "";
            itemData.attr.readonly = false;
            itemData.attr.required = false;
            itemData.attr.maxLength = 2000;
            break;
        case "form_item_04":
            itemData.id = "Dropdown_" + Date.now().valueOf();
            itemData.name = "下拉单选框";
            itemData.type = "dropdown";
            itemData.attr = {};
            // itemData.attr.default="";
            itemData.attr.readonly = false;
            itemData.attr.required = false;
            itemData.attr.options = [];
            itemData.attr.options[0] = {};
            itemData.attr.options[0].value = "";
            itemData.attr.options[0].check = false;
            itemData.attr.options[1] = {};
            itemData.attr.options[1].value = "";
            itemData.attr.options[1].check = false;
            itemData.attr.options[2] = {};
            itemData.attr.options[2].value = "";
            itemData.attr.options[2].check = false;
            break;
        case "form_item_05":
            itemData.id = "DropdownMulti_" + Date.now().valueOf();
            itemData.name = "下拉多选框";
            itemData.type = "dropdownmulti";
            itemData.attr = {};
            // itemData.attr.default="";
            itemData.attr.readonly = false;
            itemData.attr.required = false;
            itemData.attr.options = [];
            itemData.attr.options[0] = {};
            itemData.attr.options[0].value = "";
            itemData.attr.options[0].check = false;
            itemData.attr.options[1] = {};
            itemData.attr.options[1].value = "";
            itemData.attr.options[1].check = false;
            itemData.attr.options[2] = {};
            itemData.attr.options[2].value = "";
            itemData.attr.options[2].check = false;
            break;
        case "form_item_06":
            itemData.id = "Radio_" + Date.now().valueOf();
            itemData.name = "单选框";
            itemData.type = "radio";
            itemData.attr = {};
            // itemData.attr.default="";
            itemData.attr.readonly = false;
            itemData.attr.required = false;
            itemData.attr.options = [];
            itemData.attr.options[0] = {};
            itemData.attr.options[0].value = "选项1";
            itemData.attr.options[0].check = false;
            itemData.attr.options[1] = {};
            itemData.attr.options[1].value = "选项2";
            itemData.attr.options[1].check = false;
            itemData.attr.options[2] = {};
            itemData.attr.options[2].value = "选项3";
            itemData.attr.options[2].check = false;
            break;
        case "form_item_07":
            itemData.id = "Checkbox_" + Date.now().valueOf();
            itemData.name = "多选框";
            itemData.type = "checkbox";
            itemData.attr = {};
            // itemData.attr.default="";
            itemData.attr.readonly = false;
            itemData.attr.required = false;
            itemData.attr.options = [];
            itemData.attr.options[0] = {};
            itemData.attr.options[0].value = "选项1";
            itemData.attr.options[0].check = false;
            itemData.attr.options[1] = {};
            itemData.attr.options[1].value = "选项2";
            itemData.attr.options[1].check = false;
            itemData.attr.options[2] = {};
            itemData.attr.options[2].value = "选项3";
            itemData.attr.options[2].check = false;
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

function clearDesign() {
    console.log("clear");
    itemsData = [];
    while (formCanvas.hasChildNodes()) {
        formCanvas.removeChild(formCanvas.firstChild);
    }
}

function edit(id) {
    console.log(id.valueOf());
    const editPanel = document.getElementById("editPanel");
    editPanel.parentNode.style.backgroundColor = "rgba(0, 0, 0, .5)";
    editPanel.parentNode.style.left = "0";
    editPanel.parentNode.style.animation = "none";
    editPanel.style.animation = "attrfadeIn .5s";
    editPanel.style.left = "0";

    for (const item of itemsData) {
        if (id !== item.id) {
            continue;
        } else {
            editItem = item;
        }
    }

    const itemId = document.getElementById("item_id");
    itemId.value = editItem.id;
    const itemName = document.getElementById("item_name");
    itemName.value = editItem.name;

    if (editItem.attr.default != undefined) {
        const Default = document.getElementById("default");
        Default.style.display = "block";
        const itemDefault = document.getElementById("item_default");
        itemDefault.value = editItem.attr.default;
    }

    if (editItem.attr.required != undefined) {
        const Required = document.getElementById("required");
        Required.style.display = "block";
        const itemRequired = document.getElementById("item_required");
        itemRequired.value = editItem.attr.required;
    }

    if (editItem.attr.readonly != undefined) {
        const Readonly = document.getElementById("readonly");
        Readonly.style.display = "block";
        const itemReadonly = document.getElementById("item_readonly");
        itemReadonly.value = editItem.attr.readonly;
    }

    if (editItem.attr.options != undefined) {
        const Options = document.getElementById("options");
        Options.style.display = "block";
        const itemOptionGroup = document.getElementById("item_options_group");
        for (const Option of editItem.attr.options) {
            // <div class="ma5">
            //     <input type="radio" name="option_tag">
            //     <input type="text" name="option_value" class="attr-item-value" value="选项1" placeholder="请输入选项值">
            //     <button class="attr-option-del" name="option_tag"></button>
            // </div>
            const option = document.createElement("div");
            option.className = "ma5";

            const optionTag = document.createElement("input");
            switch (editItem.type) {
                case "dropdown":
                case "radio":
                    optionTag.type = "radio";
                    optionTag.name = "option_tag";
                    if (Option.check) {
                        optionTag.setAttribute("checked", true);
                    }
                    break;
                case "dropdownmulti":
                case "checkbox":
                    optionTag.type = "checkbox";
                    optionTag.name = "option_tag";
                    if (Option.check) {
                        optionTag.setAttribute("checked", true);
                    }
                    break;
            }
            option.appendChild(optionTag);

            const optionValue = document.createElement("input");
            optionValue.type = "text";
            optionValue.name = "option_value";
            optionValue.className = "attr-item-value";
            optionValue.placeholder = "请输入选项值";
            optionValue.value = Option.value;
            option.appendChild(optionValue);

            const optionDel = document.createElement("button");
            optionDel.className = "attr-option-del";
            optionDel.name = "option_tag";
            option.appendChild(optionDel);

            itemOptionGroup.appendChild(option);
        }
    }

}




function formdesign(obj) {

    const itemBox = document.createElement("div");
    itemBox.className = "i";

    const itemTag = document.createElement("input");
    itemTag.type = "radio";
    itemTag.name = "item";
    itemTag.id = obj.id;
    itemTag.hidden = "true";
    itemTag.checked = "true";
    itemBox.appendChild(itemTag);

    const itemLabel = document.createElement("label");
    itemLabel.htmlFor = obj.id;
    itemLabel.className = "db pr";

    const item = document.createElement("div");
    item.className = "item";

    const itemName = document.createElement("div");
    itemName.className = "i-title wm-ht";
    itemName.id = obj.id + "_title";
    itemName.innerHTML = obj.name + ": ";
    item.appendChild(itemName);

    const itemBody = document.createElement("div");
    switch (obj.type) {
        case "shorttext":
        case "password":
        case "dropdown":
        case "dropdownmulti":
        case "date":
        case "number":
        case "email":
        case "tel":
        case "url":
            itemBody.className = "i-body-text";
            break;
        case "textarea":
            itemBody.className = "i-body-textarea";
            break;
        case "radio":
        case "checkbox":
            itemBody.className = "i-body-check";
            itemBody.id = obj.id + "_options";
            for (let i = 0; i < obj.attr.options.length; ++i) {
                const checkItem = document.createElement("div");
                checkItem.className = "i-check-item";
                const checkItemBox = document.createElement("div");
                if (obj.type == "radio") {
                    checkItemBox.className = "i-check-box-r";
                } else if (obj.type == "checkbox") {
                    checkItemBox.className = "i-check-box-c";
                }
                const checkItemTag = document.createElement("div");
                checkItemTag.id = obj.id + "_option_" + i;
                checkItemTag.className = "i-check-text";
                checkItemTag.innerHTML = obj.attr.options[i].value;
                checkItem.appendChild(checkItemBox);
                checkItem.appendChild(checkItemTag);
                itemBody.appendChild(checkItem);
            }
            break;
        case "file":
            itemBody.className = "i-body-file";
            const fileBtn = document.createElement("div");
            fileBtn.className = "i-file-button";
            itemBody.appendChild(fileBtn);
            break;
    }
    item.appendChild(itemBody);

    itemLabel.appendChild(item);

    const editBtn = document.createElement("Button");
    editBtn.type = "button";
    editBtn.className = "i-icon";
    editBtn.setAttribute("onclick", "edit(\'" + obj.id + "\')");
    itemLabel.appendChild(editBtn);

    itemBox.appendChild(itemLabel);

    formCanvas.appendChild(itemBox);
}

function addOption() {
    let attrOptionGroup = document.getElementById("item_options_group");
}

function exitEdit() {
    const editPanel = document.getElementById("editPanel");
    editPanel.parentNode.style.backgroundColor = "transparent";
    editPanel.style.animation = "attrfadeOut .25s";
    editPanel.style.left = "100%";
    editPanel.parentNode.style.animation = "attrfadeOut .5s";
    editPanel.parentNode.style.left = "100%";

    const Default = document.getElementById("default");
    Default.style.display = "none";
    const Required = document.getElementById("required");
    Required.style.display = "none";
    const Readonly = document.getElementById("readonly");
    Readonly.style.display = "none";
    const Options = document.getElementById("options");
    Options.style.display = "none";

    const itemOptionGroup = document.getElementById("item_options_group");
    while (itemOptionGroup.hasChildNodes()) {
        itemOptionGroup.removeChild(itemOptionGroup.firstChild);
    }

    editItem = null;
}


/*
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
*/