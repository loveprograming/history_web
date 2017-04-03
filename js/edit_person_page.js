function createDiv(id, val)
{
    var tempDiv = document.createElement("div");
    tempDiv.id = id;
    tempDiv.innerHTML = val;
    return tempDiv;
}

function createSelect(name)
{
    var sel = document.createElement("select");
    sel.name = name;
    return sel;
}

function appendNewOption(val, txt, sel)
{
    $("<option value='"+val+"'>"+txt+"</option>").appendTo(sel);
}

function createGender()
{
    var selectGender = createSelect("gender");
    appendNewOption("male", "男", selectGender);
    appendNewOption("female", "女", selectGender);
    var divGender = createDiv("", "性别：");
    divGender.appendChild(selectGender);
    return divGender;
}

function createTextInput(name, s, val)
{
    var txtInput = document.createElement("input");
    txtInput.name = name;
    txtInput.type = "text";
    txtInput.size = s;
    txtInput.value = val;
    return txtInput;
}

function appendNewTextInput(name, txt, s, d)
{
    var divTemp = createDiv("", txt);
    $("<input name="+name+" type=\"text\" size=\""+s+"\" />").appendTo(divTemp);
    d.appendChild(divTemp);
}

function createName()
{
    var divName = createDiv("", "");;
    appendNewTextInput("family_name", "姓：", 10, divName);
    appendNewTextInput("given_name", "名：", 10, divName);
    appendNewTextInput("style_name", "字：", 10, divName);
    appendNewTextInput("pseudonym_name", "号：", 10, divName);
    return divName;
}

function createTitle()
{
    var selectTitle = createSelect("title");
    appendNewOption("normal", "平民", selectTitle);
    appendNewOption("noble", "士族", selectTitle);
    appendNewOption("royalty", "皇族", selectTitle);
    var divTitle = createDiv("", "身份：");
    divTitle.appendChild(selectTitle);
    return divTitle;
}

function createNumberInput(name, min, max, val)
{
    var numInput = document.createElement("input");
    numInput.name = name;
    numInput.type = "number";
    numInput.min = min;
    numInput.max = max;
    numInput.value = val;
    return numInput;
}

function createDateInputYear(name, val)
{
    return createNumberInput(name+"_year", 1, 2017, val);
}

function createDateInputMonth(name, val)
{
    return createNumberInput(name+"_month", 1, 12, val);
}

function createDateInputDay(name, val)
{
    return createNumberInput(name+"_day", 1, 31, val);
}

function createBCorADSel(name)
{
    var sel = createSelect(name);
    appendNewOption("bc", "公元前", sel);
    appendNewOption("ad", "公元", sel);
    return sel;
}

function appendDate(name, p)
{
    p.appendChild(createBCorADSel(name+"_bc_ad"));
    p.appendChild(createDateInputYear(name, 1));
    p.append("年");
    p.appendChild(createDateInputMonth(name, 1));
    p.append("月");
    p.appendChild(createDateInputDay(name, 1));
    p.append("日");
}

function createBirthDate()
{
    var divTemp = createDiv("", "出生日期：");
    appendDate("birth", divTemp);
    return divTemp;
}

function appendPlace(name, p)
{
    p.appendChild(createTextInput(name+"_place", 20, ""));
    p.append("现在地点：");
    p.appendChild(createTextInput(name+"_modern_place", 20, ""));
}

function createBirthPlace()
{
    var divTemp = createDiv("", "出生地点：");
    appendPlace("birth", divTemp);
    return divTemp;
}

function createDeathDate()
{
    var divTemp = createDiv("", "逝世日期：");
    appendDate("death", divTemp);
    return divTemp;
}

function createDeathPlace()
{
    var divTemp = createDiv("", "逝世地点：");
    appendPlace("death", divTemp);
    return divTemp;
}

function createBirthAndDeath()
{
    var divB = createDiv("", "");
    // 出生日期
    divB.appendChild(createBirthDate());
    // 出生地点
    divB.appendChild(createBirthPlace());

    var divD = createDiv("", "");
    // 逝世日期
    divD.appendChild(createDeathDate());
    // 逝世地点
    divD.appendChild(createDeathPlace());
    
    var divBirthAndDeath = createDiv("", "");
    divBirthAndDeath.appendChild(divB);
    divBirthAndDeath.appendChild(divD);
    return divBirthAndDeath;
}

function createParents()
{
    var divBioParents = createDiv("", "");
    divBioParents.append("父亲：");
    divBioParents.appendChild(createTextInput("bio_father", 20, ""));
    divBioParents.append("母亲：");
    divBioParents.appendChild(createTextInput("bio_mother", 20, ""));


    var divAdParents = createDiv("", "");
    divAdParents.append("养父：");
    divAdParents.appendChild(createTextInput("ad_father", 20, ""));
    divAdParents.append("养母：");
    divAdParents.appendChild(createTextInput("ad_mother", 20, ""));

    var divParents = createDiv("", "");
    divParents.appendChild(divBioParents);
    divParents.appendChild(divAdParents);
    return divParents;
}

function createCV()
{
    var divCV = createDiv("", "人生经历：");

    // 只创建一个空白经历
    var div0 = createDiv("cv0", "");
    var sel = createSelect("cv0_sel");
    appendNewOption("yes", "准确日期", sel);
    appendNewOption("no", "不准确日期", sel);
    div0.appendChild(sel);
    appendDate("cv0", div0);

    var divPlace0 = createDiv("", "");
    divPlace0.append("地点：");
    appendPlace("cv0", divPlace0);
    div0.appendChild(divPlace0);

    // 经历输入框
    var textArea = document.createElement("textarea");
    textArea.name = "cv0_description";
    textArea.rows = 10;
    textArea.cols = 50;
    div0.appendChild(textArea);

    divCV.appendChild(div0);
    return divCV;
}

function initPage()
{
    // 创建要提交的表单
    var theForm = document.createElement("form");
    theForm.id = "the_form";
//    theForm.action = post_url;
    theForm.method = "post";

    // 将生成的表单加入到页面的body中
    document.body.appendChild(theForm);

    // 性别
    theForm.appendChild(createGender());

    // 人名
    theForm.appendChild(createName());

    // 身份
    theForm.appendChild(createTitle());

    // 生死日期及地点
    theForm.appendChild(createBirthAndDeath());

    // 父母
    theForm.appendChild(createParents());

    // 经历
    theForm.appendChild(createCV());

    var submitInput = document.createElement("input");
    submitInput.type = "submit";
    submitInput.value = "编辑完成";
    theForm.appendChild(submitInput);
}
