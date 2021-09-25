// 表单设计画布
let formCanvas;
// 表单数据集
const myFormData = {
    // 表单标题
    title: "具有基本校验和拖拽效果的表单",
    // 表单布局
    tableLayout: [],
    // 表单项数据集
    itemsData: {},
    // 表单项校验规则数据集
    r_check: {},
    s_check: {}
};
// 当前编辑表单数据项
let editItem;
// HTML模板组
let temps;
// 表单项拖拽添加时，占位空节点控件
let nullNode;
// 表单数据项下标
let index = -1;

/**
 * 网页初始化加载基础数据
 */
window.onload = function() {
    formCanvas = document.getElementById("form_canvas");
    temps = document.getElementsByTagName("template");

    // const url = "../json/00_HTML_CSS_JS_task_01.json";
    // const request = new XMLHttpRequest();
    // request.open("get", url);
    // request.send(null);
    // request.onload = function() {
    //     if (request.status === 200) {
    //         itemsData = JSON.parse(request.responseText).itemsData;
    //         
    //         for (const itemData of itemsData) {
    //             console.log(itemData);
    //             formCanvas.appendChild(formdesign(itemData));
    //         }
    //     }
    // }

    const itemName = document.getElementById("item_name");
    itemName.onchange = function() {
        editItem.name = itemName.value;
        const item = document.getElementById(editItem.id + "_title");
        item.innerHTML = itemName.value + ":";
    }

    const itemDefault = document.getElementById("item_default");
    itemDefault.onchange = function() {
        console.log(itemDefault.value);
        editItem.attr.default = itemDefault.value;
    }

    const itemDatatype = document.getElementById("item_datatime");
    itemDatatype.onchange = function() {
        if (editItem.type === "date") {
            let value;
            switch (itemDatatype.value) {
                case "1900/01":
                    value = dateFormatConversion(itemDefault.value, "month");
                    itemDefault.type = "month";
                    editItem.attr.datatype = "1900/01";
                    itemDefault.value = value;
                    editItem.attr.default = itemDefault.value;
                    break;
                case "1900/01/01":
                    value = dateFormatConversion(itemDefault.value, "date");
                    itemDefault.type = "date";
                    editItem.attr.datatype = "1900/01/01";
                    itemDefault.value = value;
                    editItem.attr.default = itemDefault.value;
                    break;
                case "1900/01/01 00:00":
                    value = dateFormatConversion(itemDefault.value, "datetime-local");
                    itemDefault.type = "datetime-local";
                    editItem.attr.datatype = "1900/01/01 00:00";
                    itemDefault.value = value;
                    editItem.attr.default = itemDefault.value;
                    break;
                case "1900年第1周":
                    value = dateFormatConversion(itemDefault.value, "week");
                    itemDefault.type = "week";
                    editItem.attr.datatype = "1900年第1周";
                    itemDefault.value = value;
                    editItem.attr.default = itemDefault.value;
                    break;
            }
        }
    }

    const itemRequired = document.getElementById("item_required");
    itemRequired.onchange = function() {
        editItem.attr.required = !editItem.attr.required;
        if (itemReadonly.checked) {
            itemReadonly.checked = false;
            editItem.attr.readonly = false;
        }
    }

    const itemReadonly = document.getElementById("item_readonly");
    itemReadonly.onchange = function() {
        editItem.attr.readonly = !editItem.attr.readonly;
        if (itemRequired.checked) {
            itemRequired.checked = false;
            editItem.attr.required = false;
        }
    }

    const itemMaxlength = document.getElementById("item_maxlength");
    itemMaxlength.onchange = function() {
        console.log(itemMaxlength.value);
        editItem.attr.maxLength = itemMaxlength.value;
    }

    const itemPlaceholder = document.getElementById("item_placeholder");
    itemPlaceholder.onchange = function() {
        console.log(itemPlaceholder.value);
        editItem.attr.placeholder = itemPlaceholder.value;
    }

    nullNode = document.createElement("div");
    nullNode.className = "add";
    nullNode.ondrop = function(ev) {
        ev.preventDefault();
    };

    document.ondragend = function() {
        if (nullNode.parentElement != null) {
            formCanvas.removeChild(nullNode);
        }
    };
};

/**
 * 表单设计页面——拖拽式表单设计——拖拽过程响应事件
 * @param {object} ev 
 */
function allowDrop(ev) {
    ev.preventDefault();
    if (ev.target != nullNode) {
        if (ev.target.className !== "form-canvas") {
            let y = ev.clientY;
            let top = ev.target.getBoundingClientRect().top;
            let height = ev.target.getBoundingClientRect().height;
            // console.log(y);
            // console.log(top);
            // console.log(height);
            if (y <= (top + height / 2)) {
                switch (ev.target.className) {
                    case "item":
                    case "i-icon":
                        formCanvas.insertBefore(nullNode, ev.target.parentElement.parentElement);
                        // console.log(ev.target.className);
                        index = getItemIndex(ev.target.parentElement.parentElement.firstChild.nextSibling.id);
                        break;
                    case "i-title":
                    case "i-title wm-ht":
                    case "i-body-text":
                    case "i-body-textarea":
                    case "i-body-check":
                    case "i-body-file":
                        formCanvas.insertBefore(nullNode, ev.target.parentElement.parentElement.parentElement);
                        // console.log(ev.target.className);
                        index = getItemIndex(ev.target.parentElement.parentElement.parentElement.firstChild.nextSibling.id);
                        break;
                    case "i-check-item":
                    case "i-file-button":
                    case "i-logic":
                    case "logic-item":
                        formCanvas.insertBefore(nullNode, ev.target.parentElement.parentElement.parentElement.parentElement);
                        // console.log(ev.target.className);
                        index = getItemIndex(ev.target.parentElement.parentElement.parentElement.parentElement.firstChild.nextSibling.id);
                        break;
                    case "i-check-box-c":
                    case "i-check-box-r":
                    case "i-check-text":
                        formCanvas.insertBefore(nullNode, ev.target.parentElement.parentElement.parentElement.parentElement.parentElement);
                        // console.log(ev.target.className);
                        index = getItemIndex(ev.target.parentElement.parentElement.parentElement.parentElement.parentElement.firstChild.nextSibling.id);
                        break;
                }
            } else {
                switch (ev.target.className) {
                    case "item":
                    case "i-icon":
                        formCanvas.insertBefore(nullNode, ev.target.parentElement.parentElement);
                        // console.log(ev.target.className);
                        index = getItemIndex(ev.target.parentElement.parentElement.firstChild.nextSibling.id);
                        break;
                    case "i-title":
                    case "i-title wm-ht":
                    case "i-body-text":
                    case "i-body-textarea":
                    case "i-body-check":
                    case "i-body-file":
                        formCanvas.insertBefore(nullNode, ev.target.parentElement.parentElement.parentElement);
                        // console.log(ev.target.className);
                        index = getItemIndex(ev.target.parentElement.parentElement.parentElement.firstChild.nextSibling.id);
                        break;
                    case "i-check-item":
                    case "i-file-button":
                    case "i-logic":
                    case "logic-item":
                        formCanvas.insertBefore(nullNode, ev.target.parentElement.parentElement.parentElement.parentElement);
                        // console.log(ev.target.className);
                        index = getItemIndex(ev.target.parentElement.parentElement.parentElement.parentElement.firstChild.nextSibling.id);
                        break;
                    case "i-check-box-c":
                    case "i-check-box-r":
                    case "i-check-text":
                        formCanvas.insertBefore(nullNode, ev.target.parentElement.parentElement.parentElement.parentElement.parentElement);
                        // console.log(ev.target.className);
                        index = getItemIndex(ev.target.parentElement.parentElement.parentElement.parentElement.parentElement.firstChild.nextSibling.id);
                        break;
                }
            }
        } else {
            formCanvas.appendChild(nullNode);
            index = -1;
        }
    }

}

/**
 * 表单设计页面——拖拽式表单设计——拖拽选中响应
 * @param {object} ev 
 */
function drag(ev) {
    ev.dataTransfer.setData("Text", ev.target.id);
}

/**
 * 表单设计页面——拖拽式表单设计——拖拽设置表单项布局
 * @param {object} ev 
 */
function dragItem(ev) {
    ev.dataTransfer.setData("Item", ev.target.firstChild.nextSibling.id);
    ev.target.firstChild.nextSibling.checked = true;

}

/**
 * 表单设计页面——拖拽式表单设计——拖入操作,表单设计组件添加
 * @param {object} ev 
 */
function drop(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("Text");
    let Item = ev.dataTransfer.getData("Item");
    // console.log(data);
    // console.log(Item);
    // console.log(data.length);
    // console.log(Item.length);
    formCanvas = document.getElementById("form_canvas");
    // console.log(ev);
    if (data.length !== 0) {
        const itemData = addItem(data);
        // console.log(itemData);
        const newItem = formdesign(itemData);

        formCanvas.insertBefore(newItem, nullNode);

        formCanvas.removeChild(nullNode);

        if (index !== -1) {
            myFormData.tableLayout.splice(index, 0, itemData.id);
            myFormData.itemsData[itemData.id] = itemData;
            console.log(myFormData);
        } else {
            myFormData.tableLayout.push(itemData.id);
            myFormData.itemsData[itemData.id] = itemData;
            console.log(myFormData);
        }
    }
    if (Item.length !== 0) {
        const itemIndex = getItemIndex(Item);
        const itemData = myFormData.itemsData[myFormData.tableLayout[itemIndex]];

        const dragItem = document.getElementById(Item).parentElement;

        formCanvas.removeChild(dragItem);

        formCanvas.insertBefore(dragItem, nullNode);
        formCanvas.removeChild(nullNode);

        if (index !== -1) {
            // console.log("index: " + index);
            // console.log("itemIndex: " + itemIndex);
            myFormData.tableLayout.splice(index, 0, itemData.id);
            if (index >= itemIndex) {
                myFormData.tableLayout.splice(itemIndex, 1);
            } else {
                myFormData.tableLayout.splice(itemIndex + 1, 1);
            }
            console.log(myFormData);
        } else {
            myFormData.tableLayout.push(itemData.id);
            myFormData.tableLayout.splice(itemIndex, 1);
            console.log(myFormData);
        }
    }
}

/**
 * 获取数据项下标
 * @param {string} id 
 * @returns 
 */
function getItemIndex(id) {
    for (let i = 0; i < myFormData.tableLayout.length; ++i) {
        if (myFormData.tableLayout[i] === id) {
            return i;
        }
    }
    return myFormData.tableLayout.length - 1;
}

/**
 * 表单设计页面——拖拽式表单设计——生成表单数据项数据对象
 * @param {object} data 
 * @returns 
 */
function addItem(data) {
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
            itemData.attr.placeholder = "请输入";
            itemData.attr.maxLength = 200;
            itemData.attr.regularCheck = false;
            myFormData.r_check[itemData.id] = createCheckRules(1);
            break;
        case "form_item_02":
            itemData.id = "Password_" + Date.now().valueOf();
            itemData.name = "密码";
            itemData.type = "password";
            itemData.attr = {};
            itemData.attr.required = true;
            itemData.attr.placeholder = "请输入";
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
            itemData.attr.placeholder = "请输入";
            itemData.attr.maxLength = 2000;
            itemData.attr.regularCheck = false;
            myFormData.r_check[itemData.id] = createCheckRules(1);
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
            itemData.attr.datatype = "1900/01/01";
            itemData.attr.submitVeri = false;
            myFormData.s_check[itemData.id] = createCheckRules(2);
            break;
        case "form_item_09":
            itemData.id = "Number_" + Date.now().valueOf();
            itemData.name = "数值";
            itemData.type = "number";
            itemData.attr = {};
            itemData.attr.default = "";
            itemData.attr.readonly = false;
            itemData.attr.required = false;
            itemData.attr.placeholder = "请输入";
            // itemData.attr.datatype = "1000";
            itemData.attr.submitVeri = false;
            myFormData.s_check[itemData.id] = createCheckRules(2);
            break;
        case "form_item_10":
            itemData.id = "Email_" + Date.now().valueOf();
            itemData.name = "邮箱";
            itemData.type = "email";
            itemData.attr = {};
            itemData.attr.default = "";
            itemData.attr.readonly = false;
            itemData.attr.required = false;
            itemData.attr.placeholder = "请输入";
            break;
        case "form_item_11":
            itemData.id = "Telphone_" + Date.now().valueOf();
            itemData.name = "电话";
            itemData.type = "tel";
            itemData.attr = {};
            itemData.attr.default = "";
            itemData.attr.readonly = false;
            itemData.attr.required = false;
            itemData.attr.placeholder = "请输入";
            break;
        case "form_item_12":
            itemData.id = "URL_" + Date.now().valueOf();
            itemData.name = "URL";
            itemData.type = "url";
            itemData.attr = {};
            itemData.attr.default = "";
            itemData.attr.readonly = false;
            itemData.attr.required = false;
            itemData.attr.placeholder = "请输入";
            break;
        case "form_item_13":
            itemData.id = "File_" + Date.now().valueOf();
            itemData.name = "附件";
            itemData.type = "file";
            itemData.attr = {};
            itemData.attr.required = false;
            break;
        case "form_item_14":
            itemData.id = "Logic_" + Date.now().valueOf();
            itemData.name = "逻辑";
            itemData.type = "logic";
            itemData.attr = {};
            itemData.attr.default = true;
            itemData.attr.readonly = false;
            itemData.attr.required = false;
            break;
        case "form_item_15":
            itemData.id = "Address_" + Date.now().valueOf();
            itemData.name = "地址";
            itemData.type = "address";
            itemData.attr = {};
            itemData.attr.default = "";
            itemData.attr.readonly = false;
            itemData.attr.required = false;
            itemData.attr.datatype = "Location";
            break;
    }
    // console.log(itemData);
    return itemData;
}

/**
 * 表单设计页面——拖拽式表单设计——生成可视化表单项布局
 * @param {object} obj 
 * @returns 
 */
function formdesign(obj) {
    let item, aItem, input, label, title, body, button;

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
        case "textarea":
            item = temps[0].content.querySelector("div");
            aItem = document.importNode(item, true);
            body = aItem.getElementsByClassName("i-body-text")[0];
            if (obj.type === "textarea") {
                body.className = "i-body-textarea";
            } else if (obj.type === "dropdown" || obj.type === "dropdownmulti") {
                body.className = "i-body-select";
            }
            break;
        case "radio":
        case "checkbox":
            item = temps[1].content.querySelector("div");
            aItem = document.importNode(item, true);
            body = aItem.getElementsByClassName("i-body-check")[0];
            body.id = obj.id + "_options";
            for (let i = 0; i < obj.attr.options.length; ++i) {
                body.appendChild(createFormOptionsItem(obj.type, obj.attr.options[i].value))
            }
            break;
        case "file":
            item = temps[3].content.querySelector("div");
            aItem = document.importNode(item, true);
            break;
        case "logic":
            item = temps[10].content.querySelector("div");
            aItem = document.importNode(item, true);
            body = aItem.getElementsByClassName("i-body-check")[0];
            body.getElementsByTagName("input")[0].name = obj.id + "_logic";
            body.getElementsByTagName("input")[0].id = obj.id + "_logic";
            body.getElementsByTagName("label")[0].htmlFor = obj.id + "_logic";
            break;
        case "address":
            switch (obj.attr.datatype) {
                case "Location":
                    item = temps[0].content.querySelector("div");
                    aItem = document.importNode(item, true);
                    body = aItem.getElementsByClassName("i-body-text")[0];
                    body.className = "i-body-location";
                    const addressIcon = document.createElement("div");
                    addressIcon.className = "addressIcon";
                    addressIcon.innerHTML = "<svg t=\"1631868132304\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http: //www.w3.org/2000/svg\" p-id=\"3284\" width=\"16\" height=\"16\"><path d=\"M808.6 403.2c0-178.8-129.8-308.5-308.5-308.5-170.1 0-308.5 138.4-308.5 308.5 0 125.6 170.6 338.3 262.3 452.6l6.8 8.4c9.6 12 24 18.9 39.5 18.9 15.4 0 29.8-6.9 39.5-18.9l6.8-8.4c91.5-114.3 262.1-327 262.1-452.6z m-310.1 89.4c-62.9 0-114-51.1-114-114s51.1-114 114-114 114 51.1 114 114-51.1 114-114 114z\" fill=\"#FFFFFF\" p-id=\"3285\"></path><path d=\"M500.1 67.8c-184.9 0-335.4 150.4-335.4 335.4 0 135 174.5 352.5 268.2 469.4l6.7 8.4c14.8 18.4 36.8 29 60.4 29s45.6-10.6 60.4-29l6.8-8.4C661 755.7 835.4 538.2 835.4 403.2c0-194.3-141-335.4-335.3-335.4z m0 815.3c-15.4 0-29.8-6.9-39.5-18.9l-6.8-8.4c-91.7-114.3-262.3-327-262.3-452.6 0-170.1 138.4-308.5 308.5-308.5 178.8 0 308.5 129.8 308.5 308.5 0 125.6-170.6 338.3-262.3 452.6l-6.8 8.4c-9.5 12-23.9 18.9-39.3 18.9z\" fill=\"\" p-id=\"3286\"></path><path d=\"M498.5 378.6m-87.2 0a87.2 87.2 0 1 0 174.4 0 87.2 87.2 0 1 0-174.4 0Z\" fill=\"#FFFFFF\" p-id=\"3287\"></path><path d=\"M612.5 378.6c0-62.9-51.1-114-114-114s-114 51.1-114 114 51.1 114 114 114 114-51.1 114-114z m-201.2 0c0-48.1 39.1-87.2 87.2-87.2s87.2 39.1 87.2 87.2-39.1 87.2-87.2 87.2-87.2-39.1-87.2-87.2z\" fill=\"\" p-id=\"3288\"></path></svg>"
                    addressIcon.style = "top:4px;bottom:4px;right:5px;";
                    body.appendChild(addressIcon);
                    break;
                case "Address":
                    break;
            }
            break;
    }

    input = aItem.getElementsByTagName("input")[0];
    input.id = obj.id;
    input.checked = "true";
    label = aItem.getElementsByTagName("label")[0];
    label.htmlFor = obj.id;
    title = aItem.getElementsByClassName("i-title")[0];
    title.id = obj.id + "_title";
    title.innerHTML = obj.name + ": ";
    button = aItem.getElementsByTagName("button")[0];
    button.setAttribute("onclick", "edit(\'" + obj.id + "\')");
    return aItem;
}

/**
 * 表单设计页面——拖拽式表单设计——单选框、复选框模拟选项样式
 * @param {string} type 
 * @param {string} value 
 * @returns 
 */
function createFormOptionsItem(type, value) {
    const item = temps[2].content.querySelector("div");
    const aItem = document.importNode(item, true);
    const box = aItem.getElementsByTagName("div")[0];
    if (type === "radio") {
        box.className = "i-check-box-r";
    } else if (type === "checkbox") {
        box.className = "i-check-box-c";
    }
    const text = aItem.getElementsByTagName("div")[1];
    text.innerHTML = value;
    return aItem;
}

/**
 * 表单设计页面——抽屉式表单项属性值设置面板——打开面板
 * @param {string} id 
 */
function edit(id) {
    // console.log(id.valueOf());
    // 
    const editPanel = document.getElementById("editPanel");
    // editPanel.parentNode.style.backgroundColor = "rgba(0, 0, 0, .5)";
    // editPanel.parentNode.style.left = "0";
    // editPanel.parentNode.style.animation = "none";
    editPanel.parentNode.style.display = "block";
    editPanel.style.animation = "attrfadeIn .25s";
    editPanel.style.left = "0";

    for (const item in myFormData.itemsData) {
        if (id !== item) {
            continue;
        } else {
            editItem = myFormData.itemsData[item];
        }
    }
    console.log(editItem);
    const itemId = document.getElementById("item_id");
    itemId.value = editItem.id;
    const itemName = document.getElementById("item_name");
    itemName.value = editItem.name;

    if (editItem.attr.default != undefined) {
        const Default = document.getElementById("default");
        Default.style.display = "block";
        const itemDefault = document.getElementById("item_default");
        if (editItem.type !== "address") {
            itemDefault.type = editItem.type;
            if (editItem.type === "date") {
                switch (editItem.attr.datatype) {
                    case "1900/01":
                        itemDefault.type = "month";
                        break;
                    case "1900/01/01":
                        itemDefault.type = "date";
                        break;
                    case "1900/01/01 00:00":
                        itemDefault.type = "datetime-local";
                        break;
                    case "1900年第1周":
                        itemDefault.type = "week";
                        break;
                }
            } else {
                itemDefault.type = editItem.type;
            }
        } else {
            const addressIcon = document.createElement("div");
            addressIcon.className = "addressIcon";
            addressIcon.id = "addressIcon";
            addressIcon.innerHTML = "<svg t=\"1631868132304\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http: //www.w3.org/2000/svg\" p-id=\"3284\" width=\"16\" height=\"16\"><path d=\"M808.6 403.2c0-178.8-129.8-308.5-308.5-308.5-170.1 0-308.5 138.4-308.5 308.5 0 125.6 170.6 338.3 262.3 452.6l6.8 8.4c9.6 12 24 18.9 39.5 18.9 15.4 0 29.8-6.9 39.5-18.9l6.8-8.4c91.5-114.3 262.1-327 262.1-452.6z m-310.1 89.4c-62.9 0-114-51.1-114-114s51.1-114 114-114 114 51.1 114 114-51.1 114-114 114z\" fill=\"#FFFFFF\" p-id=\"3285\"></path><path d=\"M500.1 67.8c-184.9 0-335.4 150.4-335.4 335.4 0 135 174.5 352.5 268.2 469.4l6.7 8.4c14.8 18.4 36.8 29 60.4 29s45.6-10.6 60.4-29l6.8-8.4C661 755.7 835.4 538.2 835.4 403.2c0-194.3-141-335.4-335.3-335.4z m0 815.3c-15.4 0-29.8-6.9-39.5-18.9l-6.8-8.4c-91.7-114.3-262.3-327-262.3-452.6 0-170.1 138.4-308.5 308.5-308.5 178.8 0 308.5 129.8 308.5 308.5 0 125.6-170.6 338.3-262.3 452.6l-6.8 8.4c-9.5 12-23.9 18.9-39.3 18.9z\" fill=\"\" p-id=\"3286\"></path><path d=\"M498.5 378.6m-87.2 0a87.2 87.2 0 1 0 174.4 0 87.2 87.2 0 1 0-174.4 0Z\" fill=\"#FFFFFF\" p-id=\"3287\"></path><path d=\"M612.5 378.6c0-62.9-51.1-114-114-114s-114 51.1-114 114 51.1 114 114 114 114-51.1 114-114z m-201.2 0c0-48.1 39.1-87.2 87.2-87.2s87.2 39.1 87.2 87.2-39.1 87.2-87.2 87.2-87.2-39.1-87.2-87.2z\" fill=\"\" p-id=\"3288\"></path></svg>"
            addressIcon.style = "top:0px;bottom:0px;right:20px;";
            Default.appendChild(addressIcon);
            const clearIcon = document.createElement("button");
            clearIcon.type = "button";
            clearIcon.className = "clearIcon";
            clearIcon.id = "clearIcon";
            clearIcon.innerHTML = "<svg t=\"1631871378260\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"4257\" width=\"16\" height=\"16\"><path d=\"M828.910767 195.079c-175.017082-175.039595-458.779891-175.061085-633.866558 0-174.96694 174.9915-175.039595 458.827987 0 633.866558s458.925201 174.9915 633.866558 0C1003.997434 653.882428 1003.950362 370.096083 828.910767 195.079zM768.577656 679.393451l-89.222067 89.293699L514.530636 603.863221 349.753779 768.68715l-89.296769-89.293699 164.826999-164.80244L260.45701 349.814154l89.296769-89.222067L514.530636 425.319825l164.824953-164.727739 89.222067 89.222067-164.752298 164.776857L768.577656 679.393451z\" p-id=\"4258\"></path></svg>"
            clearIcon.style = "top:0px;bottom:0px;right:20px;";
            Default.appendChild(clearIcon);
            Default.style = "display:block; position:relative;";
            if (editItem.attr.default.length !== 0) {
                itemDefault.className += " notNull";
            }
            itemDefault.onclick = function() {
                getLocation(itemDefault);
            };
            clearIcon.onclick = function() {
                itemDefault.value = "";
                itemDefault.className = "attr-item-value";
            };
        }
        itemDefault.value = editItem.attr.default;
    }

    if (editItem.attr.datatype != undefined) {
        const Datatype = document.getElementById("datatype");
        Datatype.style.display = "block";
        const Options = document.getElementById(editItem.type);
        Options.style.display = "block";
        const Option = document.getElementById(editItem.attr.datatype);
        Option.selected = true;
    }

    if (editItem.attr.required != undefined) {
        const Required = document.getElementById("required");
        Required.style.display = "block";
        const itemRequired = document.getElementById("item_required");
        itemRequired.checked = editItem.attr.required;
    }

    if (editItem.attr.readonly != undefined) {
        const Readonly = document.getElementById("readonly");
        Readonly.style.display = "block";
        const itemReadonly = document.getElementById("item_readonly");
        itemReadonly.checked = editItem.attr.readonly;
    }

    if (editItem.attr.placeholder != undefined) {
        const Placeholder = document.getElementById("placeholder");
        Placeholder.style.display = "block";
        const itemPlaceholder = document.getElementById("item_placeholder");
        itemPlaceholder.value = editItem.attr.placeholder;
    }

    if (editItem.attr.options != undefined) {
        const Options = document.getElementById("options");
        Options.style.display = "block";
        const itemOptionGroup = document.getElementById("item_options_group");
        for (const Option of editItem.attr.options) {
            itemOptionGroup.appendChild(createEditOptionsItem(editItem.type, Option.value, Option.check));
        }
    }

    if (editItem.attr.maxLength != undefined) {
        const maxLength = document.getElementById("maxlength");
        maxLength.style.display = "block";
        const itemMaxlength = document.getElementById("item_maxlength");
        itemMaxlength.value = editItem.attr.maxLength;
    }

    if (editItem.attr.regularCheck != undefined) {
        const regularCheck = document.getElementById("regularCheck");
        regularCheck.style.display = "block";
        const itemRegularCheck = document.getElementById("item_regularCheck");
        if (editItem.attr.regularCheck) {
            itemRegularCheck.value = "已设置";
        } else {
            itemRegularCheck.value = "未设置";
        }
    }

    if (editItem.attr.submitVeri != undefined) {
        const submitVeri = document.getElementById("submitVeri");
        submitVeri.style.display = "block";
        const itemSubmitVeri = document.getElementById("item_submitVeri");
        if (editItem.attr.submitVeri) {
            itemSubmitVeri.value = "已设置";
        } else {
            itemSubmitVeri.value = "未设置";
        }
    }

    optionsOpe();

}

/**
 * 表单设计页面——抽屉式表单项属性值设置面板——创建单选框、复选框、下拉框“选项组”属性数据项
 * @param {string} type 
 * @param {string} value 
 * @param {boolean} check 
 * @returns 
 */
function createEditOptionsItem(type, value, check) {
    const item = temps[4].content.querySelector("div");
    const aItem = document.importNode(item, true);
    const optionTag = aItem.getElementsByTagName("input")[0];
    switch (type) {
        case "dropdown":
        case "radio":
            optionTag.type = "radio";
            optionTag.name = "option_tag";
            if (check) {
                optionTag.setAttribute("checked", true);
            }
            break;
        case "dropdownmulti":
        case "checkbox":
            optionTag.type = "checkbox";
            optionTag.name = "option_tag";
            if (check) {
                optionTag.setAttribute("checked", true);
            }
            break;
    }
    const optionValue = aItem.getElementsByTagName("input")[1];
    optionValue.value = value;

    return aItem;
}

/**
 * 表单设计页面——抽屉式表单项属性值设置面板——单选框、复选框、下拉框“选项组”属性添加数据项
 */
function addOption() {
    let itemOptionGroup = document.getElementById("item_options_group");

    itemOptionGroup.appendChild(createEditOptionsItem(editItem.type, "", false));

    const item = {};
    item.value = "";
    item.check = false;
    editItem.attr.options.push(item);

    optionsOpe();
}

/**
 * 表单设计页面——抽屉式表单项属性值设置面板——单选框、复选框、下拉框“选项组”属性数据项新增监听事件
 */
function optionsOpe() {
    const optionTags = document.getElementsByName("option_tag");
    const optionValues = document.getElementsByName("option_value");
    const optionDels = document.getElementsByName("option_del");

    for (let i = 0; i < optionTags.length; ++i) {
        optionTags[i].onchange = function() {
            console.log(optionTags);
            switch (editItem.type) {
                case "dropdown":
                case "radio":
                    for (let j = 0; j < optionTags.length; ++j) {
                        editItem.attr.options[j].check = false;
                    }
                    editItem.attr.options[i].check = !editItem.attr.options[i].check;
                    break;
                case "dropdownmulti":
                case "checkbox":
                    editItem.attr.options[i].check = !editItem.attr.options[i].check;
                    break;
            }
        }

        optionValues[i].onchange = function() {
            editItem.attr.options[i].value = optionValues[i].value;
            console.log(editItem);
        }

        optionDels[i].onclick = function() {
            editItem.attr.options.splice(i, 1);
            optionDels[i].parentNode.parentNode.removeChild(optionDels[i].parentNode);
            console.log(editItem);
            optionsOpe();
        }
    }
}

/**
 * 表单设计页面——抽屉式表单项属性值设置面板——关闭面板
 */
function exitEdit() {
    const editPanel = document.getElementById("editPanel");
    // editPanel.parentNode.style.backgroundColor = "transparent";
    editPanel.style.animation = "attrfadeOut .25s";
    editPanel.style.left = "100%";
    // editPanel.parentNode.style.animation = "attrfadeOut .5s";
    // editPanel.parentNode.style.left = "100%";
    let timer = null;
    clearTimeout(timer);
    timer = setTimeout(function() {
        editPanel.parentNode.style.display = "none";
    }, 200);


    const Default = document.getElementById("default");
    Default.style.display = "none";
    if (editItem.type === "address") {
        Default.removeChild(document.getElementById("addressIcon"));
        Default.removeChild(document.getElementById("clearIcon"));
        const itemDefault = document.getElementById("item_default");
        editItem.attr.default = itemDefault.value;
        itemDefault.className = "attr-item-value";
        itemDefault.onclick = function() {};
    }
    const Datatype = document.getElementById("datatype");
    Datatype.style.display = "none";
    const options = document.getElementById(editItem.type);
    if (options) {
        options.style.display = "none";
    }
    const Required = document.getElementById("required");
    Required.style.display = "none";
    const Readonly = document.getElementById("readonly");
    Readonly.style.display = "none";
    const Placeholder = document.getElementById("placeholder");
    Placeholder.style.display = "none";
    const Options = document.getElementById("options");
    if (Options.style.display !== "none") {
        const formOptions = document.getElementById(editItem.id + "_options");
        // console.log(formOptions);
        while (formOptions != null && formOptions.hasChildNodes()) {
            formOptions.removeChild(formOptions.firstChild);
        }
        const optionValues = document.getElementsByName("option_value");
        for (let i = 0; formOptions != null && i < optionValues.length; ++i) {
            if (optionValues[i].value.length === 0) {
                editItem.attr.options.splice(i, 1);
                optionValues[i].parentNode.parentNode.removeChild(optionValues[i].parentNode);
                i--;
            } else {
                formOptions.appendChild(createFormOptionsItem(editItem.type, optionValues[i].value));
            }
        }
    }
    Options.style.display = "none";

    const itemOptionGroup = document.getElementById("item_options_group");
    while (itemOptionGroup.hasChildNodes()) {
        itemOptionGroup.removeChild(itemOptionGroup.firstChild);
    }

    const maxLength = document.getElementById("maxlength");
    maxLength.style.display = "none";
    const regularCheck = document.getElementById("regularCheck");
    regularCheck.style.display = "none";
    const submitVeri = document.getElementById("submitVeri");
    submitVeri.style.display = "none";

    editItem = null;
}

/**
 * 表单设计页面——拖拽式表单设计——删除表单项
 * @returns 
 */
function delItem() {
    if (confirm("确定要删除数据项 “" + editItem.name + "” 吗？")) {
        const item = document.getElementById(editItem.id);
        const i = getItemIndex(editItem.id);
        if (editItem.attr.regularCheck != undefined) {
            delete myFormData.r_check[editItem.id];
        }
        if (editItem.attr.submitVeri != undefined) {
            for (const submitVeri in myFormData.s_check) {
                if (myFormData.s_check[submitVeri].beginValue === (editItem.id + "_fBody") || myFormData.s_check[submitVeri].endValue === (editItem.id + "_fBody")) {
                    // alert("当前数据项在其他数据项的校验规则中被使用，不可删除");
                    delayPrompt("当前数据项在其他数据项的校验规则中被使用，不可删除。");
                    return;
                }
            }
            delete myFormData.s_check[editItem.id];
        }
        // console.log(i);
        formCanvas.removeChild(item.parentNode);
        myFormData.tableLayout.splice(i, 1);
        delete myFormData.itemsData[editItem.id];

        console.log(myFormData);

        exitEdit();
    }
}

/**
 * 表单设计页面——"填写表单"按钮——跳转表单填写页面
 */
function fillForm() {
    const formDesign = document.getElementById("form_design");
    const formFill = document.getElementById("form-fill");
    const formBody = document.getElementById("form-body");
    while (formBody.hasChildNodes()) {
        formBody.removeChild(formBody.firstChild);
    }
    for (const itemId of myFormData.tableLayout) {
        formCreate(myFormData.itemsData[itemId]);
    }
    addSubmitVeri();
    formDesign.style.display = "none";
    formFill.style.display = "block";
}

/**
 * "填写表单"按钮——跳转表单填写页面——根据表单项数据集创建可以填写提交的表单
 * @param {object} obj 
 */
function formCreate(obj) {
    const formBody = document.getElementById("form-body");

    let item, aItem, fBody;

    switch (obj.type) {
        case "shorttext":
        case "password":
        case "date":
        case "number":
        case "email":
        case "tel":
        case "url":
        case "file":
        case "textarea":
            if (obj.type === "textarea") {
                item = temps[6].content.querySelector("div");
                aItem = document.importNode(item, true);
                fBody = aItem.getElementsByTagName("textarea")[0];
            } else {
                item = temps[5].content.querySelector("div");
                aItem = document.importNode(item, true);
                fBody = aItem.getElementsByTagName("input")[0];
            }
            fBody.id = obj.id + "_fBody";
            if (obj.type === "date") {
                switch (obj.attr.datatype) {
                    case "1900/01":
                        fBody.type = "month";
                        break;
                    case "1900/01/01":
                        fBody.type = "date";
                        break;
                    case "1900/01/01 00:00":
                        fBody.type = "datetime-local";
                        break;
                    case "1900年第1周":
                        fBody.type = "week";
                        break;
                }
            } else {
                fBody.type = obj.type;
            }
            fBody.name = obj.name + "(" + obj.id + ")";
            if (obj.attr.default != undefined) {
                fBody.value = obj.attr.default;
            }
            if (obj.type === "file") {
                fBody.className = "f-body-file";
            } else if (obj.type === "textarea") {
                fBody.className = "f-body-textarea";
            }
            if (obj.attr.readonly) {
                fBody.disabled = true;
            }
            if (obj.attr.required) {
                fBody.required = true;
            }
            if (obj.attr.placeholder != undefined) {
                fBody.placeholder = obj.attr.placeholder;
            }
            if (obj.attr.maxLength != undefined) {
                fBody.maxLength = obj.attr.maxLength;
            }
            formBody.appendChild(aItem);
            break;
        case "radio":
        case "checkbox":
            item = temps[7].content.querySelector("div");
            aItem = document.importNode(item, true);
            fBody = aItem.getElementsByTagName("div")[1];
            fBody.id = obj.id + "_fBody";
            for (let i = 0; i < obj.attr.options.length; ++i) {
                const fCheckItem = temps[8].content.querySelector("div");
                const afCheckItem = document.importNode(fCheckItem, true);

                const fCheckItemTag = afCheckItem.getElementsByTagName("input")[0];
                fCheckItemTag.type = obj.type;
                fCheckItemTag.name = obj.name + "(" + obj.id + ")";
                fCheckItemTag.id = obj.id + "_option_" + i;
                fCheckItemTag.value = obj.attr.options[i].value;
                if (obj.attr.options[i].check) {
                    fCheckItemTag.checked = true;
                }
                if (obj.attr.readonly) {
                    fCheckItemTag.disabled = true;
                }

                const fCheckItemValue = afCheckItem.getElementsByTagName("label")[0];
                fCheckItemValue.htmlFor = obj.id + "_option_" + i;
                fCheckItemValue.innerHTML = obj.attr.options[i].value;

                fBody.appendChild(afCheckItem);
            }
            formBody.appendChild(aItem);
            break;
        case "dropdown":
        case "dropdownmulti":
            item = temps[9].content.querySelector("div");
            aItem = document.importNode(item, true);
            fBody = aItem.getElementsByTagName("select")[0];
            fBody.name = obj.name + "(" + obj.id + ")";
            fBody.id = obj.id + "_fBody";

            if (obj.type === "dropdownmulti") {
                var optionHide = document.createElement("option");
                var values = [];
                optionHide.hidden = true;
                fBody.appendChild(optionHide);
            }
            for (let i = 0; i < obj.attr.options.length; ++i) {
                const fDropdownmulti = document.createElement("option");
                fDropdownmulti.value = obj.attr.options[i].value;
                fDropdownmulti.innerHTML = obj.attr.options[i].value;
                if (obj.attr.options[i].check) {
                    if (obj.type === "dropdownmulti") {
                        fDropdownmulti.style = "background: skyblue";
                        values.push(obj.attr.options[i].value);
                        optionHide.text = values.toString();
                        optionHide.selected = true;
                    } else {
                        fDropdownmulti.selected = true;
                    }
                }

                fBody.appendChild(fDropdownmulti);
            }

            if (obj.attr.readonly) {
                fBody.disabled = true;
            }
            if (obj.attr.required) {
                fBody.required = true;
            }

            formBody.appendChild(aItem);

            if (obj.type === "dropdownmulti") {
                dropDownMulti(fBody.id, values);
            }
            break;
        case "logic":
            item = temps[11].content.querySelector("div");
            aItem = document.importNode(item, true);
            fBody = aItem.getElementsByTagName("div")[1];
            fBody.id = obj.id + "_fBody";
            const logic = fBody.getElementsByTagName("input")[0];
            logic.name = obj.name + "(" + obj.id + ")";
            logic.id = obj.id + "_l";
            logic.checked = obj.attr.default;
            logic.value = obj.attr.default;
            fBody.getElementsByTagName("label")[0].htmlFor = obj.id + "_l";
            formBody.appendChild(aItem);
            if (obj.attr.readonly) {
                logic.disabled = true;
            }
            if (obj.attr.required) {
                logic.required = true;
            }
            logic.onclick = function() {
                if (logic.value === "true") {
                    logic.value = "false";
                    logic.checked = true;
                    fBody.getElementsByTagName("label")[0].className = "logic-item";
                } else {
                    logic.value = "true";
                    logic.checked = true;
                    fBody.getElementsByTagName("label")[0].className = "logic-item l";
                }
            }

            break;
        case "address":
            switch (obj.attr.datatype) {
                case "Location":
                    item = temps[5].content.querySelector("div");
                    aItem = document.importNode(item, true);
                    fBody = aItem.getElementsByTagName("input")[0];
                    fBody.id = obj.id + "_fBody";
                    fBody.name = obj.name + "(" + obj.id + ")";
                    fBody.className = "f-body-location";
                    if (obj.attr.default != undefined) {
                        fBody.value = obj.attr.default;
                    }
                    if (obj.attr.readonly) {
                        fBody.disabled = true;
                    }
                    if (obj.attr.required) {
                        fBody.required = true;
                    }
                    const addressIcon = document.createElement("div");
                    addressIcon.className = "addressIcon";
                    addressIcon.innerHTML = "<svg t=\"1631868132304\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http: //www.w3.org/2000/svg\" p-id=\"3284\" width=\"16\" height=\"16\"><path d=\"M808.6 403.2c0-178.8-129.8-308.5-308.5-308.5-170.1 0-308.5 138.4-308.5 308.5 0 125.6 170.6 338.3 262.3 452.6l6.8 8.4c9.6 12 24 18.9 39.5 18.9 15.4 0 29.8-6.9 39.5-18.9l6.8-8.4c91.5-114.3 262.1-327 262.1-452.6z m-310.1 89.4c-62.9 0-114-51.1-114-114s51.1-114 114-114 114 51.1 114 114-51.1 114-114 114z\" fill=\"#FFFFFF\" p-id=\"3285\"></path><path d=\"M500.1 67.8c-184.9 0-335.4 150.4-335.4 335.4 0 135 174.5 352.5 268.2 469.4l6.7 8.4c14.8 18.4 36.8 29 60.4 29s45.6-10.6 60.4-29l6.8-8.4C661 755.7 835.4 538.2 835.4 403.2c0-194.3-141-335.4-335.3-335.4z m0 815.3c-15.4 0-29.8-6.9-39.5-18.9l-6.8-8.4c-91.7-114.3-262.3-327-262.3-452.6 0-170.1 138.4-308.5 308.5-308.5 178.8 0 308.5 129.8 308.5 308.5 0 125.6-170.6 338.3-262.3 452.6l-6.8 8.4c-9.5 12-23.9 18.9-39.3 18.9z\" fill=\"\" p-id=\"3286\"></path><path d=\"M498.5 378.6m-87.2 0a87.2 87.2 0 1 0 174.4 0 87.2 87.2 0 1 0-174.4 0Z\" fill=\"#FFFFFF\" p-id=\"3287\"></path><path d=\"M612.5 378.6c0-62.9-51.1-114-114-114s-114 51.1-114 114 51.1 114 114 114 114-51.1 114-114z m-201.2 0c0-48.1 39.1-87.2 87.2-87.2s87.2 39.1 87.2 87.2-39.1 87.2-87.2 87.2-87.2-39.1-87.2-87.2z\" fill=\"\" p-id=\"3288\"></path></svg>"
                    addressIcon.style = "top:9px;bottom:9px;right:6px;";
                    aItem.appendChild(addressIcon);
                    const clearIcon = document.createElement("button");
                    clearIcon.type = "button";
                    clearIcon.className = "clearIcon";
                    clearIcon.innerHTML = "<svg t=\"1631871378260\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"4257\" width=\"16\" height=\"16\"><path d=\"M828.910767 195.079c-175.017082-175.039595-458.779891-175.061085-633.866558 0-174.96694 174.9915-175.039595 458.827987 0 633.866558s458.925201 174.9915 633.866558 0C1003.997434 653.882428 1003.950362 370.096083 828.910767 195.079zM768.577656 679.393451l-89.222067 89.293699L514.530636 603.863221 349.753779 768.68715l-89.296769-89.293699 164.826999-164.80244L260.45701 349.814154l89.296769-89.222067L514.530636 425.319825l164.824953-164.727739 89.222067 89.222067-164.752298 164.776857L768.577656 679.393451z\" p-id=\"4258\"></path></svg>"
                    clearIcon.style = "top:9px;bottom:9px;right:6px;";
                    aItem.appendChild(clearIcon);
                    aItem.style = "position:relative;";
                    if (fBody.value.length !== 0) {
                        fBody.className += " notNull";
                    }
                    fBody.onclick = function() {
                        getLocation(fBody);
                    }
                    clearIcon.onclick = function() {
                        fBody.value = "";
                        fBody.className = "f-body-location";
                    }
                    formBody.appendChild(aItem);
                    break;
                case "Address":
                    break;
            }
            break;
    }

    aItem.id = obj.id + "_form";
    const fTitle = aItem.getElementsByClassName("f-title")[0];
    fTitle.id = obj.id + "_fTitle";
    fTitle.innerHTML = obj.name + ": ";
    if (obj.attr.required) {
        fTitle.className += " required";
    }
}

/**
 * 表单设计页面——"清空设计"按钮——清空当前的表单设计
 */
function clearDesign() {
    // console.log("clear");
    if (confirm("确定要清除当前表单的全部设计吗？")) {
        // const json = {
        //     itemsData,
        //     checkRules
        // }
        // let jsonText = JSON.stringify(json);
        // console.log(jsonText);
        // let blob = new Blob([jsonText], { type: "text/plain;charset=utf-8" });
        // saveAs(blob, "00_HTML_CSS_JS_task_01.json");
        myFormData.tableLayout.length = 0;
        for (const id in myFormData.itemsData) {
            delete myFormData.itemsData[id];
        }
        for (const key in myFormData.r_check) {
            delete myFormData.r_check[key];
        }
        for (const key in myFormData.s_check) {
            delete myFormData.s_check[key];
        }

        console.log(myFormData);
        while (formCanvas.hasChildNodes()) {
            formCanvas.removeChild(formCanvas.firstChild);
        }
    }
}

/**
 * 表单填写页面——"修改设计"按钮——跳转表单设计页面
 */
function designForm() {
    const formDesign = document.getElementById("form_design");
    const formFill = document.getElementById("form-fill");
    formFill.style.display = "none";
    formDesign.style.display = "block";
}

/**
 * 表单填写界面——下拉多选框控件功能设计
 * @param {string} objId 
 * @param {Array} v 
 */
function dropDownMulti(objId, v) {
    let values = v;
    let opts = [];
    // console.log(objId);
    let select = document.getElementById(objId);
    // console.log(select)
    // console.log(select.length);
    for (let i = 0; i < select.length; i++) {
        opts.push(select.item(i));
    }

    select.addEventListener('input', function() {
        let value = this.options[this.selectedIndex].value;
        this.options[this.selectedIndex].style = "background: skyblue";
        let index = values.indexOf(value);
        if (index > -1) {
            values.splice(index, 1);
            opts.filter(function(opt) {
                if (opt.value === value) {
                    opt.style = "";
                }
            });
        } else {
            values.push(value);
        };
        this.options[1].text = values.toString();

        if (values.length > 0) {
            this.options[1].selected = true;
        } else {
            this.options[0].selected = true;
        }
        // console.log(select.value);
    });
}

/**
 * 日期格式转换
 * @param {string} date 
 * @param {string} toFormat 
 * @returns 
 */
function dateFormatConversion(date, toFormat) {
    const datevalue = new Date(date);
    console.log(datevalue);
    switch (toFormat) {
        case "month":
            return dataToString(datevalue.getFullYear(), 4) + "-" + dataToString(datevalue.getMonth() + 1, 2);
        case "date":
            return dataToString(datevalue.getFullYear(), 4) + "-" + dataToString(datevalue.getMonth() + 1, 2) + "-" + dataToString(datevalue.getDate(), 2);
        case "datetime-local":
            return dataToString(datevalue.getFullYear(), 4) + "-" + dataToString(datevalue.getMonth() + 1, 2) + "-" + dataToString(datevalue.getDate(), 2) + "T" + dataToString(datevalue.getUTCHours(), 2) + ":" + dataToString(datevalue.getMinutes(), 2);
        case "week":
            return dataToString(datevalue.getFullYear(), 4) + "-W" + dataToString(getYearWeek(datevalue, datevalue.getFullYear()), 2);
    }
}

/**
 * 日期格式数值转换为字符串
 * @param {number} num 
 * @param {number} len 
 * @returns 
 */
function dataToString(num, len) {
    return (Array(len).join('0') + num.toString()).slice(-len);
}

/**
 * 获取当前周
 * @param {Date} date 
 * @param {number} yyyy 
 * @returns 
 */
function getYearWeek(date, yyyy) {
    const year = new Date(yyyy, 0, 1);
    const d = Math.round((date.valueOf() - year.valueOf()) / 86400000);
    return Math.ceil((d + year.getDay()) / 7);
}

/**
 * 计算一定偏移量后的日期
 * @param {string} date 
 * @param {number} offset 
 * @returns 
 */
function dateOptions(date, offset) {
    const datevalue = new Date(date);
    console.log(datevalue);
    datevalue.setDate(datevalue.getDate() + offset);
    console.log(datevalue);
    return datevalue;
}

/**
 * 表单设计页面——抽屉式表单项属性值设置面板——校验规则设置项点击响应事件——打开校验规则弹窗
 * @param {number} type 
 */
function rulesContainer(type) {
    const checkAttr = document.getElementById("checkAttr");
    checkAttr.style.display = "block";
    const checkTitle = checkAttr.getElementsByTagName("h2")[0];
    const checkType = document.getElementById("check_type");
    const checkItem = document.getElementById("check_item");
    checkItem.value = editItem.name + "(" + editItem.id + ")";
    const regularCheck = document.getElementById("regular_check");
    const submitVeri = document.getElementById("submit_veri");
    switch (type) {
        case 1:
            checkTitle.innerHTML = "正则校验规则"
            checkType.value = "正则校验"
            regularCheck.style.display = "block";
            const regularTemplate = document.getElementById("regular_template");
            const regularExpression = document.getElementById("regular_expression");
            const regularTips = document.getElementById("regular_tips");
            regularTemplate.options[myFormData.r_check[editItem.id].template].selected = true;
            if (myFormData.r_check[editItem.id].template > 0 && myFormData.r_check[editItem.id].template < regularTemplate.options.length - 1) {
                regularExpression.disabled = true;
            }
            regularExpression.value = myFormData.r_check[editItem.id].expression;
            regularTips.value = myFormData.r_check[editItem.id].tips;
            regularTemplate.onchange = function() {
                const index = regularTemplate.selectedIndex;
                regularExpression.value = regularTemplate.value;
                if (index > 0 && index < regularTemplate.options.length - 1) {
                    regularExpression.disabled = true;
                    regularTips.value = regularTemplate.options[index].text;
                } else {
                    regularExpression.disabled = false;
                    regularTips.value = "";
                }
            }
            break;
        case 2:
            checkTitle.innerHTML = "提交校验规则"
            checkType.value = "提交校验"
            submitVeri.style.display = "block";
            const veriTemplate = document.getElementById("veri_template");
            const veriRelationship = document.getElementById("veri_relationship");
            const veriRule = document.getElementById("veri_rule");
            const veriBetween = document.getElementById("veri_between");
            const veriBegin = document.getElementById("veri_begin");
            const veriEnd = document.getElementById("veri_end");
            const itemRule = document.getElementById("item_rule");
            itemRule.innerHTML = "<option value=\"\" selected disabled class=\"dn\"></option>";
            const itemBetween = document.getElementById("item_between");
            const itemBegin = document.getElementById("item_begin");
            itemBegin.innerHTML = "<option value=\"\" selected disabled class=\"dn\"></option>";
            const itemEnd = document.getElementById("item_end");
            itemEnd.innerHTML = "<option value=\"\" selected disabled class=\"dn\"></option>";
            const itemOffset = document.getElementById("item_offset");
            const veriTips = document.getElementById("veri_tips");

            veriTemplate.value = myFormData.s_check[editItem.id].template;
            veriRelationship.value = myFormData.s_check[editItem.id].relationship;
            veriTips.value = myFormData.s_check[editItem.id].tips;
            switch (veriTemplate.value) {
                case "1":
                    if (veriRelationship.value !== "6") {
                        veriRule.style.display = "inline-block";
                        veriBetween.style.display = "none";
                        itemRule.style.display = "none";
                        itemBetween.style.display = "none";
                        veriRule.value = myFormData.s_check[editItem.id].beginValue;
                        veriRule.type = editItem.type;
                    } else {
                        veriRule.style.display = "none";
                        veriBetween.style.display = "inline-block";
                        itemRule.style.display = "none";
                        itemBetween.style.display = "none";
                        veriBegin.value = myFormData.s_check[editItem.id].beginValue;
                        veriEnd.value = myFormData.s_check[editItem.id].endValue;
                        veriBegin.type = editItem.type;
                        veriEnd.type = editItem.type;
                    }
                    break;
                case "2":
                    if (veriRelationship.value !== "6") {
                        veriRule.style.display = "none";
                        veriBetween.style.display = "none";
                        itemRule.style.display = "inline-block";
                        itemBetween.style.display = "none";
                        itemRule.value = myFormData.s_check[editItem.id].beginValue;
                        if (itemRule.options.length === 0) {
                            itemRule.innerHTML = "<option value=\"\" selected disabled class=\"dn\"></option>";
                            getItemObjects(itemRule);
                        } else if (itemRule.options.length === 1) {
                            getItemObjects(itemRule);
                        }
                    } else {
                        veriRule.style.display = "none";
                        veriBetween.style.display = "none";
                        itemRule.style.display = "none";
                        itemBetween.style.display = "inline-block";
                        itemBegin.value = myFormData.s_check[editItem.id].beginValue;
                        if (itemBegin.options.length === 0) {
                            itemBegin.innerHTML = "<option value=\"\" selected disabled class=\"dn\"></option>";
                            getItemObjects(itemBegin);
                        } else if (itemBegin.options.length === 1) {
                            getItemObjects(itemBegin);
                        }
                        itemEnd.value = myFormData.s_check[editItem.id].endValue;
                        if (itemEnd.options.length === 0) {
                            itemEnd.innerHTML = "<option value=\"\" selected disabled class=\"dn\"></option>";
                            getItemObjects(itemEnd);
                        } else if (itemEnd.options.length === 1) {
                            getItemObjects(itemEnd);
                        }
                    }
                    break;
            }
            veriTemplate.onchange = function() {
                veriTemplateChange(veriTemplate.value);
            }
            veriRelationship.onchange = function() {
                veriRelationshipChange(veriRelationship.value);
            }
            break;
    }
    const deterBtn = document.getElementById("deter_btn");
    deterBtn.setAttribute("onclick", "checkDeter(" + type + ")");
}

/**
 * 表单设计页面——抽屉式表单项属性值设置面板——校验规则弹窗——“保存”按钮点击响应事件
 * @param {number} type 
 */
function checkDeter(type) {
    const veriRule = document.getElementById("veri_rule");
    const veriBetween = document.getElementById("veri_between");
    const itemRule = document.getElementById("item_rule");
    const itemBetween = document.getElementById("item_between");
    const itemBegin = document.getElementById("item_begin");
    const itemEnd = document.getElementById("item_end");
    switch (type) {
        case 1:
            const regularTemplate = document.getElementById("regular_template");
            const index = regularTemplate.selectedIndex;
            const regularExpression = document.getElementById("regular_expression");
            const regularTips = document.getElementById("regular_tips");
            if (regularExpression.value.length === 0) {
                myFormData.r_check[editItem.id].template = "0";
                myFormData.r_check[editItem.id].expression = "";
                myFormData.r_check[editItem.id].tips = "";
                editItem.attr.regularCheck = false;
                document.getElementById("item_regularCheck").value = "未设置";
            } else {
                myFormData.r_check[editItem.id].template = index;
                myFormData.r_check[editItem.id].expression = regularExpression.value;
                myFormData.r_check[editItem.id].tips = regularTips.value;
                editItem.attr.regularCheck = true;
                document.getElementById("item_regularCheck").value = "已设置";
            }
            regularExpression.disabled = false;
            break;
        case 2:
            const veriTemplate = document.getElementById("veri_template");
            const veriRelationship = document.getElementById("veri_relationship");
            const veriBegin = document.getElementById("veri_begin");
            const veriEnd = document.getElementById("veri_end");
            const veriTips = document.getElementById("veri_tips");

            if (veriRule.value.length === 0 &&
                veriBegin.value.length === 0 &&
                veriEnd.value.length === 0 &&
                itemRule.value.length === 0 &&
                itemBegin.value.length === 0 &&
                itemEnd.value.length === 0) {
                myFormData.s_check[editItem.id].template = "1";
                myFormData.s_check[editItem.id].relationship = "1";
                myFormData.s_check[editItem.id].beginValue = "";
                myFormData.s_check[editItem.id].endValue = "";
                myFormData.s_check[editItem.id].tips = "";
                editItem.attr.submitVeri = false;
                document.getElementById("item_submitVeri").value = "未设置";
            } else {
                switch (veriTemplate.value) {
                    case "1":
                        if (veriRelationship.value !== "6") {
                            myFormData.s_check[editItem.id].template = veriTemplate.value;
                            myFormData.s_check[editItem.id].relationship = veriRelationship.value;
                            myFormData.s_check[editItem.id].beginValue = veriRule.value;
                            myFormData.s_check[editItem.id].endValue = veriRule.value;
                            myFormData.s_check[editItem.id].tips = veriTips.value;
                        } else {
                            myFormData.s_check[editItem.id].template = veriTemplate.value;
                            myFormData.s_check[editItem.id].relationship = veriRelationship.value;
                            myFormData.s_check[editItem.id].beginValue = veriBegin.value;
                            myFormData.s_check[editItem.id].endValue = veriEnd.value;
                            myFormData.s_check[editItem.id].tips = veriTips.value;
                        }
                        break;
                    case "2":
                        if (veriRelationship.value !== "6") {
                            myFormData.s_check[editItem.id].template = veriTemplate.value;
                            myFormData.s_check[editItem.id].relationship = veriRelationship.value;
                            myFormData.s_check[editItem.id].beginValue = itemRule.value;
                            myFormData.s_check[editItem.id].endValue = itemRule.value;
                            myFormData.s_check[editItem.id].tips = veriTips.value;
                        } else {
                            myFormData.s_check[editItem.id].template = veriTemplate.value;
                            myFormData.s_check[editItem.id].relationship = veriRelationship.value;
                            myFormData.s_check[editItem.id].beginValue = itemBegin.value;
                            myFormData.s_check[editItem.id].endValue = itemEnd.value;
                            myFormData.s_check[editItem.id].tips = veriTips.value;
                        }
                        break;
                }
                editItem.attr.submitVeri = true;
                document.getElementById("item_submitVeri").value = "已设置";
            }
            break;
    }
    const checkAttr = document.getElementById("checkAttr");
    checkAttr.style.display = "none";
    const regularCheck = document.getElementById("regular_check");
    regularCheck.style.display = "none";
    const submitVeri = document.getElementById("submit_veri");
    submitVeri.style.display = "none";
    veriRule.style.display = "none";
    veriBetween.style.display = "none";
    itemRule.style.display = "none";
    itemBetween.style.display = "none";
    while (itemRule.hasChildNodes()) {
        itemRule.removeChild(itemRule.firstChild);
    }
    while (itemBegin.hasChildNodes()) {
        itemBegin.removeChild(itemBegin.firstChild);
    }
    while (itemEnd.hasChildNodes()) {
        itemEnd.removeChild(itemEnd.firstChild);
    }
}

/**
 * 表单设计页面——抽屉式表单项属性值设置面板——校验规则弹窗——“取消”按钮点击响应事件
 */
function checkCancel() {
    const checkAttr = document.getElementById("checkAttr");
    checkAttr.style.display = "none";
    const regularCheck = document.getElementById("regular_check");
    regularCheck.style.display = "none";
    const submitVeri = document.getElementById("submit_veri");
    submitVeri.style.display = "none";
    const veriRule = document.getElementById("veri_rule");
    veriRule.style.display = "none";
    const veriBetween = document.getElementById("veri_between");
    veriBetween.style.display = "none";
    const itemRule = document.getElementById("item_rule");
    itemRule.style.display = "none";
    const itemBetween = document.getElementById("item_between");
    itemBetween.style.display = "none";

    const regularExpression = document.getElementById("regular_expression");
    regularExpression.disabled = false;

    while (itemRule.hasChildNodes()) {
        itemRule.removeChild(itemRule.firstChild);
    }
    const itemBegin = document.getElementById("item_begin");
    while (itemBegin.hasChildNodes()) {
        itemBegin.removeChild(itemBegin.firstChild);
    }
    const itemEnd = document.getElementById("item_end");
    while (itemEnd.hasChildNodes()) {
        itemEnd.removeChild(itemEnd.firstChild);
    }
}

/**
 * 表单设计页面——抽屉式表单项属性值设置面板——校验规则弹窗——“删除”按钮点击响应事件
 */
function checkDelete() {
    if (editItem.attr.regularCheck != undefined) {
        myFormData.r_check[editItem.id].template = 0;
        myFormData.r_check[editItem.id].expression = "";
        myFormData.r_check[editItem.id].tips = "";
        editItem.attr.regularCheck = false;
        const itemRegularCheck = document.getElementById("item_regularCheck");
        itemRegularCheck.value = "未设置";
    }

    if (editItem.attr.submitVeri != undefined) {
        myFormData.s_check[editItem.id].template = 1;
        myFormData.s_check[editItem.id].relationship = 1;
        myFormData.s_check[editItem.id].beginValue = "";
        myFormData.s_check[editItem.id].endValue = "";
        myFormData.s_check[editItem.id].tips = "";
        editItem.attr.submitVeri = false;
        const itemSubmitVeri = document.getElementById("item_submitVeri");
        itemSubmitVeri.value = "未设置";
    }

    checkCancel();
}

/**
 * 表单设计页面——抽屉式表单项属性值设置面板——校验规则弹窗——提交校验规则细节切换——模板/关系
 * @param {string} value 
 */
function veriTemplateChange(value) {
    const veriRelationship = document.getElementById("veri_relationship");
    const veriRule = document.getElementById("veri_rule");
    const veriBetween = document.getElementById("veri_between");
    const veriBegin = document.getElementById("veri_begin");
    const veriEnd = document.getElementById("veri_end");
    const itemRule = document.getElementById("item_rule");
    const itemBetween = document.getElementById("item_between");
    const itemBegin = document.getElementById("item_begin");
    const itemEnd = document.getElementById("item_end");

    switch (value) {
        case "1":
            if (veriRelationship.value !== "6") {
                veriRule.style.display = "inline-block";
                veriBetween.style.display = "none";
                itemRule.style.display = "none";
                itemBetween.style.display = "none";
                veriRule.type = editItem.type;
            } else {
                veriRule.style.display = "none";
                veriBetween.style.display = "inline-block";
                itemRule.style.display = "none";
                itemBetween.style.display = "none";
                veriBegin.type = editItem.type;
                veriEnd.type = editItem.type;
            }
            break;
        case "2":
            if (veriRelationship.value !== "6") {
                veriRule.style.display = "none";
                veriBetween.style.display = "none";
                itemRule.style.display = "inline-block";
                itemBetween.style.display = "none";
                if (itemRule.options.length === 0) {
                    itemRule.innerHTML = "<option value=\"\" selected disabled class=\"dn\"></option>";
                    getItemObjects(itemRule);
                } else if (itemRule.options.length === 1) {
                    getItemObjects(itemRule);
                }
            } else {
                veriRule.style.display = "none";
                veriBetween.style.display = "none";
                itemRule.style.display = "none";
                itemBetween.style.display = "inline-block";
                if (itemBegin.options.length === 0) {
                    itemBegin.innerHTML = "<option value=\"\" selected disabled class=\"dn\"></option>";
                    getItemObjects(itemBegin);
                } else if (itemBegin.options.length === 1) {
                    getItemObjects(itemBegin);
                }
                if (itemEnd.options.length === 0) {
                    itemEnd.innerHTML = "<option value=\"\" selected disabled class=\"dn\"></option>";
                    getItemObjects(itemEnd);
                } else if (itemEnd.options.length === 1) {
                    getItemObjects(itemEnd);
                }
            }
            break;
    }
}

/**
 * 表单设计页面——抽屉式表单项属性值设置面板——校验规则弹窗——提交校验规则细节切换——关系/模板
 * @param {string} value 
 */
function veriRelationshipChange(value) {
    const veriTemplate = document.getElementById("veri_template");
    const veriRule = document.getElementById("veri_rule");
    const veriBetween = document.getElementById("veri_between");
    const veriBegin = document.getElementById("veri_begin");
    const veriEnd = document.getElementById("veri_end");
    const itemRule = document.getElementById("item_rule");
    const itemBetween = document.getElementById("item_between");
    const itemBegin = document.getElementById("item_begin");
    const itemEnd = document.getElementById("item_end");
    switch (value) {
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
            if (veriTemplate.value === "1") {
                veriRule.style.display = "inline-block";
                veriBetween.style.display = "none";
                itemRule.style.display = "none";
                itemBetween.style.display = "none";
                veriRule.type = editItem.type;
            } else if (veriTemplate.value === "2") {
                veriRule.style.display = "none";
                veriBetween.style.display = "none";
                itemRule.style.display = "inline-block";
                itemBetween.style.display = "none";
                if (itemRule.options.length === 0) {
                    itemRule.innerHTML = "<option value=\"\" selected disabled class=\"dn\"></option>";
                    getItemObjects(itemRule);
                } else if (itemRule.options.length === 1) {
                    getItemObjects(itemRule);
                }
            }
            break;
        case "6":
            if (veriTemplate.value === "1") {
                veriRule.style.display = "none";
                veriBetween.style.display = "inline-block";
                itemRule.style.display = "none";
                itemBetween.style.display = "none";
                veriBegin.type = editItem.type;
                veriEnd.type = editItem.type;
            } else if (veriTemplate.value === "2") {
                veriRule.style.display = "none";
                veriBetween.style.display = "none";
                itemRule.style.display = "none";
                itemBetween.style.display = "inline-block";
                if (itemBegin.options.length === 0) {
                    itemBegin.innerHTML = "<option value=\"\" selected disabled class=\"dn\"></option>";
                    getItemObjects(itemBegin);
                } else if (itemBegin.options.length === 1) {
                    getItemObjects(itemBegin);
                }
                if (itemEnd.options.length === 0) {
                    itemEnd.innerHTML = "<option value=\"\" selected disabled class=\"dn\"></option>";
                    getItemObjects(itemEnd);
                } else if (itemEnd.options.length === 1) {
                    getItemObjects(itemEnd);
                }
            }
            break;
    }
}

/**
 * 表单设计页面——抽屉式表单项属性值设置面板——校验规则弹窗——提交校验规则获取关系数据项列表
 * @param {object} obj 
 */
function getItemObjects(obj) {
    console.log(obj);
    for (const id in myFormData.itemsData) {
        if (myFormData.itemsData[id].type !== editItem.type || id === editItem.id) {
            continue;
        }
        const opt = document.createElement("option");
        opt.innerHTML = myFormData.itemsData[id].name + "(" + id + ")";
        opt.value = id + "_fBody";
        console.log(opt);
        obj.appendChild(opt);
    }
}

/**
 * 创建校验规则对象
 * @param {number} type 
 * @returns 
 */
function createCheckRules(type) {
    const checkRule = new Object();
    switch (type) {
        case 1:
            checkRule.template = "0";
            checkRule.expression = "";
            checkRule.tips = "";
            break;
        case 2:
            checkRule.template = "1";
            checkRule.relationship = "1";
            checkRule.beginValue = "";
            checkRule.endValue = "";
            checkRule.tips = "";
            break;
    }
    return checkRule;
}

/**
 * "填写表单"按钮——跳转表单填写页面——根据表单项数据集创建可以填写提交的表单——给表单项添加提交校验属性
 */
function addSubmitVeri() {
    for (const submitVeri in myFormData.s_check) {
        console.log(submitVeri);
        const item = document.getElementById(submitVeri + "_fBody");
        if (myFormData.s_check[submitVeri].template === "1") {
            switch (myFormData.s_check[submitVeri].relationship) {
                case "1":
                    item.setAttribute("min", dateFormatConversion(myFormData.s_check[submitVeri].beginValue, item.type));
                    item.setAttribute("max", dateFormatConversion(myFormData.s_check[submitVeri].endValue, item.type));
                    break;
                case "2":
                    item.setAttribute("min", dateFormatConversion(dateOptions(myFormData.s_check[submitVeri].beginValue, 1), item.type));
                    break;
                case "3":
                    item.setAttribute("max", dateFormatConversion(dateOptions(myFormData.s_check[submitVeri].beginValue, -1), item.type));
                    break;
                case "4":
                    item.setAttribute("min", dateFormatConversion(myFormData.s_check[submitVeri].beginValue, item.type));
                    break;
                case "5":
                    item.setAttribute("max", dateFormatConversion(myFormData.s_check[submitVeri].endValue, item.type));
                    break;
                case "6":
                    item.setAttribute("min", dateFormatConversion(myFormData.s_check[submitVeri].beginValue, item.type));
                    item.setAttribute("max", dateFormatConversion(myFormData.s_check[submitVeri].endValue, item.type));
                    break;
            }
        } else {
            const beginItem = document.getElementById(myFormData.s_check[submitVeri].beginValue);
            const endItem = document.getElementById(myFormData.s_check[submitVeri].endValue);

            endItem.onchange = function() {
                switch (myFormData.s_check[submitVeri].relationship) {
                    case "1":
                    case "2":
                    case "3":
                    case "4":
                    case "5":
                        break;
                    case "6":
                        item.setAttribute("max", dateFormatConversion(endItem.value, item.type));
                        break;
                }
            }

            beginItem.onchange = function() {
                switch (myFormData.s_check[submitVeri].relationship) {
                    case "1":
                        item.setAttribute("min", dateFormatConversion(beginItem.value, item.type));
                        item.setAttribute("max", dateFormatConversion(beginItem.value, item.type));
                        break;
                    case "2":
                        item.setAttribute("min", dateFormatConversion(dateOptions(beginItem.value, 1), item.type));
                        break;
                    case "3":
                        item.setAttribute("max", dateFormatConversion(dateOptions(beginItem.value, -1), item.type));
                        break;
                    case "4":
                        item.setAttribute("min", dateFormatConversion(beginItem.value, item.type));
                        break;
                    case "5":
                        item.setAttribute("max", dateFormatConversion(beginItem.value, item.type));
                        break;
                    case "6":
                        item.setAttribute("min", dateFormatConversion(beginItem.value, item.type));
                        break;
                }
            }
        }
    }
}