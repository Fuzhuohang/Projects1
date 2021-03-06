// 表单设计画布
let formCanvas;
// 表单项数据集
let itemsData = [];
// 当前编辑表单数据项
let editItem;
// 表单数据项属性设置面板"选项组"相关组件(选项标签,选项值,选项删除按钮)
let optionTags;
let optionValues;
let optionDels;

window.onload = function() {
    formCanvas = document.getElementById("form_canvas");

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
}

// 允许拖拽操作
function allowDrop(ev) {
    ev.preventDefault();
}
// 拖拽选中响应
function drag(ev) {
    ev.dataTransfer.setData("Text", ev.target.id);
}
// 拖入操作,表单设计组件添加
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
            itemData.attr.required = false;
            break;
            // case "form_item_14":

            //     break;
            // case "form_item_15":

            //     break;
    }
    formdesign(itemData);
    itemsData.push(itemData);

    // console.log(itemsData);
}
// 表单设计拖入数据项,设计展示操作
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
                itemBody.appendChild(createFormOptionsItem(obj.type, obj.attr.options[i].value))
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
// 表单设计页面创建表单项的选项组选项
function createFormOptionsItem(type, value) {
    const checkItem = document.createElement("div");
    checkItem.className = "i-check-item";
    const checkItemBox = document.createElement("div");
    if (type == "radio") {
        checkItemBox.className = "i-check-box-r";
    } else if (type == "checkbox") {
        checkItemBox.className = "i-check-box-c";
    }
    const checkItemTag = document.createElement("div");
    checkItemTag.className = "i-check-text";
    checkItemTag.innerHTML = value;
    checkItem.appendChild(checkItemBox);
    checkItem.appendChild(checkItemTag);
    return checkItem;
}
// 打开表单项属性值设置面板
function edit(id) {
    // console.log(id.valueOf());
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
        itemDefault.type = editItem.type;
        itemDefault.value = editItem.attr.default;
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

    if (editItem.attr.options != undefined) {
        const Options = document.getElementById("options");
        Options.style.display = "block";
        const itemOptionGroup = document.getElementById("item_options_group");
        for (const Option of editItem.attr.options) {
            itemOptionGroup.appendChild(createEditOptionsItem(editItem.type, Option.value, Option.check));
        }
    }

    optionTags = document.getElementsByName("option_tag");
    optionValues = document.getElementsByName("option_value");
    optionDels = document.getElementsByName("option_del");

    optionsOpe();

}
// 表单项属性值设置面板创建表单项"选项组"属性数据项
function createEditOptionsItem(type, value, check) {
    const option = document.createElement("div");
    option.className = "ma5";

    const optionTag = document.createElement("input");
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
    option.appendChild(optionTag);

    const optionValue = document.createElement("input");
    optionValue.type = "text";
    optionValue.name = "option_value";
    optionValue.className = "attr-item-value";
    optionValue.placeholder = "请输入选项值";
    optionValue.value = value;
    option.appendChild(optionValue);

    const optionDel = document.createElement("button");
    optionDel.className = "attr-option-del";
    optionDel.name = "option_del";
    option.appendChild(optionDel);
    return option;
}
// 表单项"选项组"属性数据项添加操作
function addOption() {
    let itemOptionGroup = document.getElementById("item_options_group");

    itemOptionGroup.appendChild(createEditOptionsItem(editItem.type, "", false));

    optionTags = document.getElementsByName("option_tag");
    optionValues = document.getElementsByName("option_value");
    optionDels = document.getElementsByName("option_del");

    const item = {};
    item.value = "";
    item.check = false;
    editItem.attr.options.push(item);
    console.log(editItem);
    console.log(itemsData);

    console.log(optionTags);
    console.log(optionValues);
    console.log(optionDels);

    optionsOpe();
}
// 表单项"选项组"属性数据项响应操作
function optionsOpe() {
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
            optionTags = document.getElementsByName("option_tag");
            optionValues = document.getElementsByName("option_value");
            optionDels = document.getElementsByName("option_del");
            console.log(editItem);
            optionsOpe();
        }
    }
}
// 关闭表单项属性值设置面板
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
    if (Options.style.display != "none") {
        const formOptions = document.getElementById(editItem.id + "_options");
        // console.log(formOptions);
        while (formOptions != null && formOptions.hasChildNodes()) {
            formOptions.removeChild(formOptions.firstChild);
        }
        for (let i = 0; formOptions != null && i < optionValues.length; ++i) {
            if (optionValues[i].value.length == 0) {
                editItem.attr.options.splice(i, 1);
                optionDels[i].parentNode.parentNode.removeChild(optionDels[i].parentNode);
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

    editItem = null;
    optionTags = null;
    optionValues = null;
    optionDels = null;
}
// 删除表单项
function delItem() {
    const item = document.getElementById(editItem.id);
    formCanvas.removeChild(item.parentNode);
    let i = 0;
    for (; i < itemsData.length; ++i) {
        console.log(itemsData[i] == editItem);
        if (itemsData[i] == editItem) {
            // console.log(i);
            break;
        }
    }
    // console.log(i);
    itemsData.splice(i, 1);
    // console.log(itemsData);

    exitEdit();
}
// 表单设计界面,"填写表单"按钮
function fillForm() {
    const formDesign = document.getElementById("form_design");
    const formFill = document.getElementById("form-fill");
    const formBody = document.getElementById("form-body");
    while (formBody.hasChildNodes()) {
        formBody.removeChild(formBody.firstChild);
    }
    for (const itemData of itemsData) {
        formCreate(itemData);
    }
    formDesign.style.display = "none";
    formFill.style.display = "block";
}
// 根据表单项数据集创建可以填写提交的表单
function formCreate(obj) {
    const formBody = document.getElementById("form-body");

    const fItem = document.createElement("div");
    fItem.id = obj.id;
    fItem.className = "f-item";

    const fTitle = document.createElement("div");
    fTitle.id = obj.id + "_title";
    fTitle.className = "f-title";
    fTitle.innerHTML = obj.name + ": ";
    fItem.appendChild(fTitle);

    let fBody = null;

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
            if (obj.type == "textarea") {
                fBody = document.createElement("textarea");
            } else {
                fBody = document.createElement("input");
            }
            fBody.id = obj.id + "_body";
            fBody.type = obj.type;
            fBody.name = obj.name + "(" + obj.id + ")";
            if (obj.attr.default != undefined) {
                fBody.value = obj.attr.default;
            }
            if (obj.type == "file") {
                fBody.className = "f-body-file";
            } else if (obj.type == "textarea") {
                fBody.className = "f-body-textarea";
            } else {
                fBody.className = "f-body-text";
            }
            if (obj.attr.readonly) {
                fBody.disabled = true;
            }
            if (obj.attr.required) {
                fBody.required = true;
                fTitle.className += " required";
            }

            fItem.appendChild(fBody);

            formBody.appendChild(fItem);
            break;
        case "radio":
        case "checkbox":
            fBody = document.createElement("div");
            fBody.id = obj.id + "_body";
            fBody.className = "f-body-check";

            for (let i = 0; i < obj.attr.options.length; ++i) {
                const fCheckItem = document.createElement("div");
                fCheckItem.className = "i-check-item";

                const fCheckItemTag = document.createElement("input");
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
                if (obj.attr.required) {
                    fCheckItemTag.required = true;
                    fTitle.className += " required";
                }
                fCheckItem.appendChild(fCheckItemTag);

                const fCheckItemValue = document.createElement("label");
                fCheckItemValue.htmlFor = obj.id + "_option_" + i;
                fCheckItemValue.innerHTML = obj.attr.options[i].value;
                fCheckItem.appendChild(fCheckItemValue);

                fBody.appendChild(fCheckItem);

                fItem.appendChild(fBody);

            }

            formBody.appendChild(fItem);
            break;
        case "dropdown":
        case "dropdownmulti":
            fBody = document.createElement("select");
            fBody.name = obj.name + "(" + obj.id + ")";
            fBody.id = obj.id + "_body";
            fBody.className = "f-body-text";

            const fDropdownmultiNull = document.createElement("option");
            fDropdownmultiNull.value = "";
            fDropdownmultiNull.selected = true;
            fDropdownmultiNull.disabled = true;
            fDropdownmultiNull.className = "dn";
            fBody.appendChild(fDropdownmultiNull);

            for (let i = 0; i < obj.attr.options.length; ++i) {
                const fDropdownmulti = document.createElement("option");
                fDropdownmulti.value = obj.attr.options[i].value;
                fDropdownmulti.innerHTML = obj.attr.options[i].value;
                fBody.appendChild(fDropdownmulti);
            }

            if (obj.attr.readonly) {
                fBody.disabled = true;
            }
            if (obj.attr.required) {
                fBody.required = true;
                fTitle.className += " required";
            }

            fItem.appendChild(fBody);

            formBody.appendChild(fItem);

            if (obj.type == "dropdownmulti") {
                dropDownMulti(fBody.id);
            }
            break;
    }
}

// 表单设计界面,"清空设计"按钮
function clearDesign() {
    // console.log("clear");
    itemsData = [];
    while (formCanvas.hasChildNodes()) {
        formCanvas.removeChild(formCanvas.firstChild);
    }
}
// 表单填写界面,"修改设计"按钮
function designForm() {
    const formDesign = document.getElementById("form_design");
    const formFill = document.getElementById("form-fill");
    formFill.style.display = "none";
    formDesign.style.display = "block";
}
// 下拉多选框控件功能设计
function dropDownMulti(objId) {
    let values = [];
    let opts = [];
    let select = document.getElementById(objId);
    // console.log(select)
    // console.log(select.length);
    for (let i = 0; i < select.length; i++) {
        opts.push(select.item(i));
    }

    let optionHide = document.createElement("option");
    optionHide.hidden = true;
    select.appendChild(optionHide);
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
        this.options[this.length - 1].text = values.toString();

        if (values.length > 0) {
            this.options[this.length - 1].selected = true;
        } else {
            this.options[0].selected = true;
        }
        // console.log(select.value);
    });
}
/* 表单设计组件
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