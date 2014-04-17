/******
# Custom Reusable Functions
# Created By: Pratik / Sagar
# Modified Date:
********/
/////////////////////////// LOAD JAVASCRIPT INSIDE JAVASCRIPT //////////////////////////////
/*
 * jQuery jFontSize Plugin
 * Examples and documentation: http://jfontsize.com
 * Author: Frederico Soares Vanelli
 *         fredsvanelli@gmail.com
 *         http://twitter.com/fredvanelli
 *         http://facebook.com/fred.vanelli
 *
 * Copyright (c) 2011
 * Version: 1.0 (2011-07-13)
 * Dual licensed under the MIT and GPL licenses.
 * http://jfontsize.com/license
 * Requires: jQuery v1.2.6 or later
 */

(function(e){e.fn.jfontsize=function(t){var n=e(this);var r={btnMinusClasseId:"#jfontsize-minus",btnDefaultClasseId:"#jfontsize-default",btnPlusClasseId:"#jfontsize-plus",btnMinusMaxHits:10,btnPlusMaxHits:10,sizeChange:1};if(t){t=e.extend(r,t)}var i=new Array;var s=new Array;e(this).each(function(e){i[e]=0;s[e]});e(t.btnMinusClasseId+", "+t.btnDefaultClasseId+", "+t.btnPlusClasseId).removeAttr("href");e(t.btnMinusClasseId+", "+t.btnDefaultClasseId+", "+t.btnPlusClasseId).css("cursor","pointer");e(t.btnMinusClasseId).click(function(){e(t.btnPlusClasseId).removeClass("jfontsize-disabled");n.each(function(n){if(i[n]>-t.btnMinusMaxHits){s[n]=e(this).css("font-size");s[n]=s[n].replace("px","");fontsize=e(this).css("font-size");fontsize=parseInt(fontsize.replace("px",""));fontsize=fontsize-t.sizeChange;s[n]=s[n]-i[n]*t.sizeChange;i[n]--;e(this).css("font-size",fontsize+"px");if(i[n]==-t.btnMinusMaxHits){e(t.btnMinusClasseId).addClass("jfontsize-disabled")}}});calculateNumberOfPage(currentPage);noteIconReposition();});e(t.btnDefaultClasseId).click(function(){e(t.btnMinusClasseId).removeClass("jfontsize-disabled");e(t.btnPlusClasseId).removeClass("jfontsize-disabled");n.each(function(t){i[t]=0;e(this).css("font-size",s[t]+"px")});calculateNumberOfPage(currentPage);noteIconReposition();});e(t.btnPlusClasseId).click(function(){e(t.btnMinusClasseId).removeClass("jfontsize-disabled");n.each(function(n){if(i[n]<t.btnPlusMaxHits){s[n]=e(this).css("font-size");s[n]=s[n].replace("px","");fontsize=e(this).css("font-size");fontsize=parseInt(fontsize.replace("px",""));fontsize=fontsize+t.sizeChange;s[n]=s[n]-i[n]*t.sizeChange;i[n]++;e(this).css("font-size",fontsize+"px");if(i[n]==t.btnPlusMaxHits){e(t.btnPlusClasseId).addClass("jfontsize-disabled")}}});calculateNumberOfPage(currentPage);noteIconReposition();})}})(jQuery);
// Fontresizer

var intPosCnt = 0;
var objTempClass = "";
var tempTimeStamp = 0;
var uniq_timstamp_new = 0;
var APP_MODE = 1; // For Offline/Online mode
jQuery.fn.highlight = function(pat, toIndex, notetext_all, appendNoteIcon) {

    function innerHighlight(node, pat, index) {

        var skip = 0;
        if (node.nodeType == 3) {

            var pos = node.data.toUpperCase().indexOf(pat);

            if (pos >= 0 && _stopfurther == 0) {
                intPosCnt++;

                var spannode = document.createElement('font');
                objTempClass = (typeof GLOB_HIGHLITE_CLAS == 'undefined' || GLOB_HIGHLITE_CLAS == '') ? 'highlight' : GLOB_HIGHLITE_CLAS;
                if (intPosCnt == toIndex) {
                    objTempClass = "ithas_note";
                    _stopfurther = 1;
                }

                spannode.className = objTempClass;

                if (objTempClass == "ithas_note") {

                    if (tempTimeStamp == 0)
                        uniq_timstamp = parseInt(Math.round(+new Date() / 1000)) + parseInt(Math.random() * 100);
                    else
                        uniq_timstamp = tempTimeStamp;

                    uniq_timstamp_new = uniq_timstamp;

                    spannode.setAttribute("id", uniq_timstamp);
                    spannode.setAttribute("class", "ithas_note " + uniq_timstamp);
                    spannode.setAttribute("myIndex", toIndex);
                    spannode.setAttribute("dyn_title", notetext_all['noteTXT']);
                    spannode.setAttribute("note_dbid", notetext_all['noteID']);

                    intPosCnt = 0;
                }

                var middlebit = node.splitText(pos);
                var endbit = middlebit.splitText(pat.length);
                var middleclone = middlebit.cloneNode(true);
                spannode.appendChild(middleclone);
                middlebit.parentNode.replaceChild(spannode, middlebit);

                appendNoteIcon = (typeof appendNoteIcon == 'undefined') ? 1 : appendNoteIcon;

                if (objTempClass == "ithas_note" && appendNoteIcon == 1) {

                    _appendnote_icon(notetext_all['noteTXT'], uniq_timstamp, 0);
                }
                objTempClass = '';
                skip = 1;
            }
        } else if (node.nodeType == 1 && node.childNodes && !/(script|style)/i.test(node.tagName)) {
            for (var i = 0; i < node.childNodes.length; ++i) {
                i += innerHighlight(node.childNodes[i], pat, i);
            }
        }
        return skip;
    }
    return this.each(function(index, element) {

        innerHighlight(this, pat.toUpperCase(), index);
    });
};

jQuery.fn.removeHighlight = function() {
    function newNormalize(node) {
        for (var i = 0, children = node.childNodes, nodeCount = children.length; i < nodeCount; i++) {
            var child = children[i];
            if (child.nodeType == 1) {
                newNormalize(child);
                continue;
            }
            if (child.nodeType != 3) {
                continue;
            }
            var next = child.nextSibling;
            if (next == null || next.nodeType != 3) {
                continue;
            }
            var combined_text = child.nodeValue + next.nodeValue;
            new_node = node.ownerDocument.createTextNode(combined_text);
            node.insertBefore(new_node, child);
            node.removeChild(child);
            node.removeChild(next);
            i--;
            nodeCount--;
        }
    }

    return this.find("font.searchedResult").each(function() {
        var thisParent = this.parentNode;
        thisParent.replaceChild(this.firstChild, this);
        newNormalize(thisParent);
    }).end();
};



/////////////////////////// END OF LOAD JAVASCRIPT INSIDE JAVASCRIPT //////////////////////////////
/****** Custom functions for set, get and remove [COOKIE] values********/

function saveData(fieldName, fieldValue) {
    try {
        localStorage.setItem(fieldName, fieldValue);
    } catch (e) {
        try {
            document.cookie = fieldName + "=" + fieldValue;
        } catch (e) {
            alert("Sorry! your application not support to local storage" + e);
            if (e == QUOTA_EXCEEDED_ERR) {
                alert('Quota exceeded!');
            }
        }
    }
}

function fncleanArray(actual) {
    var newArray = new Array();
    for (var i = 0; i < actual.length; i++) {
        if (actual[i]) {
            newArray.push(actual[i]);
        }
    }
    return newArray;
}

function getData(fieldName) {
    var fieldValue = "";
    try {
        fieldValue = localStorage.getItem(fieldName);
    } catch (e) {
        try {
            fieldValue = getCookieData(fieldName);
        } catch (e) {
            alert("Sorry! your application not support to local storage" + e);
        }
    }
    return fieldValue;
}

function removeData(fieldName) {
    try {
        var val = localStorage.removeItem(fieldName);
    } catch (e) {
        try {
            deleteCookieData(fieldName);
        } catch (e) {
            alert("Sorry! Remove record error====>" + e);
        }
    }
    return;
}

function getCookieData(fieldName) {
    if (document.cookie.length > 0) {
        var fieldName_start = document.cookie.indexOf(fieldName + "=");
        if (fieldName_start != -1) {
            fieldName_start = fieldName_start + fieldName.length + 1;
            var fieldName_end = document.cookie.indexOf(";", fieldName_start);
            if (fieldName_end == -1) {
                fieldName_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(fieldName_start, fieldName_end));
        }
    }
    return "";
}

function deleteCookieData(fieldName) {
    document.cookie = fieldName + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
/****** End Custom functions for set, get and remove [COOKIE] values ********/

function FnHidePopup() {
    $('.popup_wrapper').fadeOut("slow");
}

function choose_level(intLevel_) {
    // window.location = 'inapp://fnGetAppMode';

    $('.popup_wrapper').fadeOut("slow");
    strUserLevel = intLevel_;
    $(".level_chooser").removeClass("selected_lvl");
    $("#" + intLevel_).addClass("selected_lvl");
    $(".level_no").html(intLevel_);
    saveData("epub_myuserlevel", intLevel_);

    if (appDevice == 'iPad') {
        boolLoadAssignLevel = 1;
    }

    if( window.APP_MODE == 1 ) {
        fnUpdateBookReading();
    } else {
        // In offline mode change level html
        switch(intLevel_) {
            case 1: strLevel = 'One'; break;
            case 2: strLevel = 'Two'; break;
            case 3: strLevel = 'Three'; break;
        }

        $('#div_level' + strLevel+ '_' + intDefultBookId + '_1').show().siblings('div').hide();
        $('.inner_level_chooser').show();

        // Update the level selection dropdown
        $('#your_level_dd').val(intLevel_);
        calculateNumberOfPage(currentPage);
    }


    fnGotoPage("story1");
    if (appDevice == 'Android') {
        fnLoadAssignedLevel();
    }

}

function fnGotoPage(topage) {
    // window.location = 'inapp://fnGetAppMode';

    if (0) { //appDevice == 'iPad'
        window.location = 'inapp://updateurlindex?newindex=' + topage;
    } else if (0) { //appDevice == 'Android'
        JsHandler.refreshWebView(topage);
    } else {
        if ( topage.indexOf('chapter_') > -1 ) {
            // Get selected level
            intSelectedLevel = $.trim( $('.selected_lvl').attr('id') );
            intSelectedLevel = intSelectedLevel ? intSelectedLevel : strUserLevel;
            intSelectedLevel = parseInt( intSelectedLevel );

            strLevel = 'Two';
            switch( intSelectedLevel ) {
                case 1: strLevel = 'One'; break;
                case 2: strLevel = 'Two'; break;
                case 3: strLevel = 'Three'; break;
                case 4: strLevel = 'Four'; break;
            }

            // Get current page
            currentPage = parseInt( Math.round($('#div_level' + strLevel + '_' + intDefultBookId + '_1 .' + topage).position().left / BOOK_WIDTH ));
        } else {
            //_reInitiateContent();
            currentPage = parseInt(Math.round($("#" + topage).position().left / BOOK_WIDTH));
            //alert("In gotopage: currentPage is"+currentPage);
        }

        turnPage();
    }

    // After turning page reposition paperclip icons
    noteIconReposition();
    fnNoteiconVisibility(true);
}

function _reInitiateContent() {
    fnChangeLevelContent();
    calculateNumberOfPage(currentPage);
    fnHideNoteDisplayData();
    set_level_selected();
    fnLoadBookNotesBookmarks();
    noteIconReposition();
}

function set_level_selected() {
    var epub_return_UL = getData("epub_myuserlevel");
    $("#2").addClass("selected_lvl");
    strUserLevel = getData("epub_" + intDefultBookId + "_intUserLevel");

    if (epub_return_UL != null) {
        $("#your_level_dd:visible").val(epub_return_UL);
        $(".level_chooser").removeClass("selected_lvl");
        $("#" + epub_return_UL).addClass("selected_lvl");
        $(".level_no").html(epub_return_UL);
        strUserLevel = epub_return_UL;
    } else if (strUserLevel != null) {
        $("#your_level_dd").val(strUserLevel);
        $(".level_chooser").removeClass("selected_lvl");
        $("#" + strUserLevel).addClass("selected_lvl");
        $(".level_no").html(strUserLevel);
    }
}

/*********Using Cookies***********/

function fnLoadLoader() {
    $(strLoaderId).html("<div class='loaderDiv'><img alt='Loading...' id='loaderimage' src='images/ajax-loader.gif?timestamp=" + new Date().getTime() + "' /></div>");
    fnOpenPopUp(strQuePopupId);
    return;
}

function fnLoadLoaderQ() {
    $(strLoaderId + ":visible").html("<div class='loaderDiv'><img alt='Loading...' id='loaderimage' src='images/ajax-loader.gif?timestamp=" + new Date().getTime() + "' /></div>");
    return;
}

function fnOpenPopUp(strPopupId) {
    $(strPopupId).show();
}

function fnClosePopUp(strPopupId) {
    $(strPopupId).hide();
    return;
}

function throw_error(e_msg) {
    console.log(e_msg);
}
/************************* Response Handler START *************************/
/************************* Response Handler START *************************/

function fngetquestion_action() {
    var objJson = JSON_OPT;
    var arrResponse = objJson.response_data;
    var intbookId = intDefultBookId; //objJson.intBookId;
    var chapterid = objJson.chapterid;
    var sectionid = objJson.sectionid;
    var strType = objJson.strType;
    var strUserAns = arrResponse.useranswer;
    var questionType = arrResponse.questiontype;
    var strSubmitButton = "";
    var strCanclButton = "";

    if (strUserAns != "") {
        strCanclButton = "<span style=\"margin-left:60px\" class=\"BtnObject quiz_btn quiz_cancl_btn close\" onclick='fnBackToQuestionBox()'>Back</span>  ";
    } else {
        strCanclButton = "<span class=\"BtnObject quiz_btn quiz_cancl_btn close\" onclick='fnBackToQuestionBox()'>Back  </span> ";
        strSubmitButton = "<span id=\"log_in\" class=\"BtnObject quiz_btn quiz_submitbtn submit_" + arrResponse.questionid + "\" href=\"javascript:void(0);\" data-questionid='" + arrResponse.questionid + "'  data-questiontype='" + questionType + "' >Submit</span> <input type=\"hidden\" name=\"question_answer_" + arrResponse.questionid + "\" id=\"question_answer_" + arrResponse.questionid + "\" value=\"" + arrResponse.ans + "\" />";
    } //End Submit button
    if (questionType == "open") {
        var strOptions = "<textarea class='input-popup openanswer_'  id='opneans_" + arrResponse.questionid + "'>" + strUserAns + "</textarea>";
        $(strLoaderId).html("<div class='quiz_box'><p class='pop_question'>" + arrResponse.question + "</p>" + strOptions + " <div class=\"quiz_buttons_container\">" + strSubmitButton + strCanclButton + "</div></div>");
    } else {
        var intOptionLength = arrResponse.arroptions.length;
        var arroptionVal = arrResponse.arroptions;
        var strOptions = "";
        var strOptions_tmp = "";
        if (intOptionLength > 0) {
            strOptions = strOptions + "<table width=\"99%\">";
            $.each(arroptionVal, function(i, optionVal) {
                if (strUserAns == optionVal.optionid) {
                    strOptions = strOptions + "<tr><td height=\"31px\" width=\"95%\" class='_theans'><label for='radio_" + optionVal.optionid + "'>" + optionVal.option + "</label></td><td><input type='radio' name='question_" + arrResponse.questionid + "' id='radio_" + optionVal.optionid + "' value='" + optionVal.optionid + "' checked='checked' /></td></tr>";
                } else {
                    strOptions = strOptions + "<tr><td height=\"31px\" width=\"95%\" class='_theans'><label for='radio_" + optionVal.optionid + "'>" + optionVal.option + "</label></td><td><input type='radio' name='question_" + arrResponse.questionid + "' id='radio_" + optionVal.optionid + "' value='" + optionVal.optionid + "' /> </td></tr>";
                }
            });
            strOptions = strOptions + "</table>";
        }

        $(strLoaderId + ":visible").html("<div class='quiz_box'><p class='pop_question'>" + arrResponse.question + "</p>" + strOptions + "</div> <div class=\"quiz_buttons_container\">" + strCanclButton + strSubmitButton + "</div>");

        if (appDevice == 'Android') {
            /*$(".quizcontainer:visible .quiz").show();
            	$(".quizcontainer:visible .al_quiz").hide();	*/
            $("#of_" + strUserLevel + "_" + belongto_global + " .quiz").show();
            $("#of_" + strUserLevel + "_" + belongto_global + " .al_quiz").hide();
        }
        $(".quizcontainer:visible #radio_" + strUserAns).attr('checked', true);


    }
}

function fnsubmitanswer_action() {
    var objJson = JSON_OPT;
    strpart = belongto_global;
    var old_strUserLevel = strUserLevel;
    var arrResponse = objJson.response_data;
    var strResponse = arrResponse.msg;
    fnOpenPopUp(al_strQuePopupId);
    if (arrResponse.result == "error") {} else {
        var intUserLevel = arrResponse.userLevel;
        if (intUserLevel != "") {
            saveData("epub_" + intDefultBookId + "_intUserLevel", intUserLevel);
            strUserLevel = intUserLevel;
            saveData("epub_return_UL", strUserLevel);
        } else {}

        $(".submit_" + arrResponse.questionid).hide();
        fnClosePopUp(strQuePopupId);

        if (strResponse == 'Congratulation!')
            fnAppNotify(1, "answer", "Congratulations, your answer is correct!");
        else
            fnAppNotify(0, "answer", strResponse);

        /*		change level content only if flag is set		*/
        var flag_cg = arrResponse.flag_change_grade;
        //alert("flag_cg"+flag_cg);
        if (flag_cg == '0') {
            fnOpenPopUp(al_strQuePopupId); // open popup which has all ques
        } else {
            // change level content only if u r at first half of the story


            if (strpart == 1 || (strpart == 2 && (strUserLevel < old_strUserLevel))) {
                saveData("epub_myuserlevel", intUserLevel);
                set_level_selected();
                fnChangeLevelContent();

                if (appDevice == 'iPad') {
                    boolLoadAssignLevel = 1;
                }
                fnUpdateBookReading(); // change level for reading stats
                //calculateNumberOfPage(currentPage);
                //fnLoadAssignedLevel();
                //alert(1);
            }

            if (strUserLevel == 'true') {
                ///alert("true");
                strUserLevel = 1;
            }

            if (strUserLevel < old_strUserLevel) {
                jump2page(strpart);
                //alert(2);
            }

            if (strUserLevel > old_strUserLevel) {
                //alert(3+" "+strUserLevel+" > "+old_strUserLevel);
                if ((old_strUserLevel == 1 || old_strUserLevel == 2) && strpart == 1)
                    jump2page(2);
            }
            if (strUserLevel == old_strUserLevel && strUserLevel == 1) {
                //alert(4);
                jump2page(strpart);
            }
        }
    }

    return false;
}

function fngetuseractivities_action() {
    var objJson = JSON_OPT;
    $("#loginLoader").hide();
    $("#flushData").show();
    $("#userActivity").show();

    var arrResponse = objJson.response_data;
    var strResponse = arrResponse.msg;
    if (arrResponse.return_code == 0) {
        fnAppNotify(0, "userActivity", strResponse)
    } else {
        var strPtag = "";
        try {
            var intLength = arrResponse.activity.length;
            var arrActivity = arrResponse.activity;
            if (intLength > 0) {
                $.each(arrActivity, function(i, optionVal) {
                    strPtag = strPtag + "<div class='activitylist'><p>" + optionVal.message + "</p><span class='datesec'>" + optionVal.dateadded + "</span><div class='clr'></div></div>";
                });
            }
        } catch (e) {}
        if (strPtag != "") {
            $(".activitylist_scroll").html(strPtag);
            $("#divUserActivity").show();
        }
    }
    return;
}

function fnflushuserdata_action() {
    var objJson = JSON_OPT;
    removeData("epub_" + intDefultBookId + "_intUserId");
    removeData("epub_" + intDefultBookId + "_strUserEmail");
    removeData("epub_" + intDefultBookId + "_strPassword");
    removeData("epub_" + intDefultBookId + "_strFirstName");
    removeData("epub_" + intDefultBookId + "_strLastName");
    removeData("epub_" + intDefultBookId + "_intUserLevel");
    removeData("epub_" + intDefultBookId + "_reloadpage");
    removeData("epub_" + intDefultBookId + "_reloadprevpage");
    location.reload();
}


/************************* Response Handler ENDS ***************************/


/************************* Build Request JSON START ************************/

function fnSendQuestionRequest(belongto, intQuestionId) {
    belongto_global = belongto;
    strWSMETHOD = "getquestion";
    $("#of_" + strUserLevel + "_" + belongto_global + " " + al_strQuePopupId).hide();

    $(".quize_load").html("");
    $(".quiz .quiz_header").html(the_book_name + " Quiz");
    //fnLoadLoaderQ();
    $("#of_" + strUserLevel + "_" + belongto_global + " " + strQuePopupId).show();

    var intBookId = intDefultBookId;
    var intChapterId = strChapterId;
    var intQuestionId = intQuestionId;
    current_ques = intQuestionId;

    var jsonData = {
        "userid": intUserId,
        "tokenID": inttokenID,
        "book_unique_id": strBookUID,
        "questionid": intQuestionId,
        "userlevel": strUserLevel,
        "device_id": strDeviceId
    };

    var jsonText = JSON.stringify(jsonData);
    if (!jsonText) {
        throw_error("Input can not be empty");
        return;
    }

    try {
        send_request_2_server(jsonText);
    } catch (ex) {
        throw_error("in sendUserRequest catch" + ex);
    }

    return false;
}

function fnBackToQuestionBox() {
    $(".quiz").hide();
    fnOpenPopUp(al_strQuePopupId);
}

function fnSubmitAns(intQId, strQType) {
    strWSMETHOD = "submitanswer";
    var strType = "answer";
    var strUserAns = "";
    var strCorrectAns = $("#question_answer_" + intQId).val();
    var isError = false;
    if (strQType == 'mcq' || strQType == 'bool') {
        if ($('input:radio[name=question_"+intQId+"]').is(':checked')) {
            strUserAns = $("input:radio[name=question_" + intQId + "]:checked").val();
            if (strCorrectAns == strUserAns) {} else {
                intUserWrongCount = intUserWrongCount + 1;
                isError = false;
            }
        } else {
            fnAppNotify(0, "answer_validate", "Please select answer");
            isError = true;
        }
    } else {
        strUserAns = $(".openanswer_:visible").val(); //$("#opneans_39").val();
        if (strUserAns != "") {} else {
            isError = true;
            fnAppNotify(0, "answer_validate", "Please insert answer");
        }
    }

    if (isError == false) {
        var jsonData = {
            "userid": intUserId,
            "tokenID": inttokenID,
            "book_unique_id": strBookUID,
            "questionid": intQId,
            "userlevel": strUserLevel,
            "section": belongto_global,
            "useranswer": strUserAns,
            "questionType": strQType,
            "device_id": strDeviceId
        };
        fnSendUserRequest(jsonData);
    }
    return false;
}

function fnGetUserActivity() {
    $("#loginLoader").show();
    $("#flushData").hide();
    $("#userActivity").hide();

    strWSMETHOD = "getuseractivities";
    var jsonData = {
        "userid": intUserId,
        "tokenID": inttokenID,
        "book_unique_id": strBookUID,
        "device_id": strDeviceId
    };
    fnSendUserRequest(jsonData);
    return;
}

function fnFlushUserData() {
    $("#loginLoader").show();
    $("#flushData").hide();
    $("#userActivity").hide();
    $("#divUserActivity").hide();

    removeData("epub_myuserlevel");
    removeData("epub_return_UL");
    removeData("epub_reload_al");

    strWSMETHOD = "flushuserdata";
    var jsonData = {
        "userid": intUserId,
        "tokenID": inttokenID,
        "book_unique_id": strBookUID,
        "device_id": strDeviceId
    };
    fnSendUserRequest(jsonData);
    return;
}
/************************* Build Request JSON ENDS *************************/

function fnChangeLevelContent() {
    var steLevelOne = $("#div_levelOne_" + intDefultBookId + "_" + strChapterId);
    var steLevelTwo = $("#div_levelTwo_" + intDefultBookId + "_" + strChapterId);
    var steLevelThree = $("#div_levelThree_" + intDefultBookId + "_" + strChapterId);
    var steLevelFour = $("#div_levelFour_" + intDefultBookId + "_" + strChapterId);
    var steLevelFive = $("#div_levelFive_" + intDefultBookId + "_" + strChapterId);
    var steLevelSix = $("#div_levelSix_" + intDefultBookId + "_" + strChapterId);

    if (strUserLevel == '1') {
        steLevelOne.show();
        steLevelTwo.hide();
        steLevelThree.hide();
        steLevelFour.hide();
        steLevelFive.hide();
        steLevelSix.hide();
        VISIBLE_OBJ = steLevelOne;
    } else if (strUserLevel == '2') {
        steLevelOne.hide();
        steLevelTwo.show();
        steLevelThree.hide();
        steLevelFour.hide();
        steLevelFive.hide();
        steLevelSix.hide();
        VISIBLE_OBJ = steLevelTwo;
    } else if (strUserLevel == '3') {
        steLevelOne.hide();
        steLevelTwo.hide();
        steLevelThree.show();
        steLevelFour.hide();
        steLevelFive.hide();
        steLevelSix.hide();
        VISIBLE_OBJ = steLevelThree;
    } else if (strUserLevel == '4') {
        steLevelOne.hide();
        steLevelTwo.hide();
        steLevelThree.hide();
        steLevelFour.show();
        steLevelFive.hide();
        steLevelSix.hide();
        VISIBLE_OBJ = steLevelFour;
    } else if (strUserLevel == '5') {
        steLevelOne.hide();
        steLevelTwo.hide();
        steLevelThree.hide();
        steLevelFour.hide();
        steLevelFive.show();
        steLevelSix.hide();
        VISIBLE_OBJ = steLevelFive;
    } else if (strUserLevel == '6') {
        steLevelOne.hide();
        steLevelTwo.hide();
        steLevelThree.hide();
        steLevelFour.hide();
        steLevelFive.hide();
        steLevelSix.show();
        VISIBLE_OBJ = steLevelSix;
    }
    return;
}

/************************* FUnction > communicates with mobile APP**********/
/***************************************************************************/

function fnSendUserRequest(jsonData) {
    var jsonText = JSON.stringify(jsonData);

    if (!jsonText) {
        fnAppNotify(0, "json_validate", "Input can not be empty");
        return;
    }
    try {
        send_request_2_server(jsonText);
    } catch (ex) {}
    return false;
}

function send_request_2_server(jsonText) {

    /*if(appDevice =='Android' ) {
			JsHandler.alert("jsonText data"+jsonText);
		}

		*/
    if (W_SOCKET_ENABLED) {
        socket.send(jsonText);
    } else if (appDevice == 'iPad') {
        $("#jsonText_holder").val(jsonText);
        $("#jsonMethod_holder").val(strWSMETHOD);

        window.location = 'inapp://capture?fil=val';
    } else if (appDevice == 'Android') {
        JsHandler.adaptiveFnCall(jsonText, strWSMETHOD);
    } else { // AJAX REQUEST TO WEB SERVICE
        if (0) {
            var reqURL = host + strWSMETHOD + '/';
            var data = {
                p: jsonText
            };
        } else {
            var reqURL = host;
            var data = {
                req_action: strWSMETHOD,
                p: jsonText
            };
        }
        $.ajax({
            url: reqURL,
            type: "post",
            data: data,
            success: function(response, textStatus, jqXHR) {
                var msg = new Array();
                msg['data'] = response;

                fnGetResponseAction(msg);
            }
        });
    }
}

/*
 * Trigger Notification within App
 */

function fnAppNotify(flag, method_, msg_) {
    var jsonData = {
        "flag": flag,
        "method_": method_,
        "msg_": msg_
    };
    var jsonText = JSON.stringify(jsonData);

    if (appDevice == 'iPad') {
        window.location = "inapp://onJsNotification?data=" + jsonText;
    } else if (appDevice == 'Android') {
        JsHandler.onJsNotification(jsonText);
    } else {
        alert(msg_);
    }
}

function fnTurnpageEventtoDevice() {
    var doc_URL_arr = document.URL.split('/');
    var doc_URLindex = doc_URL_arr[doc_URL_arr.length - 1];
    //var _cookie_name	= "Restorepage"+strBookUID+"_"+doc_URLindex;
    var _cookie_name = "Restorepage" + strBookUID;
    var jsonData = {
        "doc_URLindex": doc_URLindex,
        "currentPage": currentPage
    };
    var jsonText = JSON.stringify(jsonData);

    if (appDevice == 'iPad') {
        window.location = 'inapp://TurnpageEventtoDevice?doc_URLindex=' + jsonText;
    }
    if (appDevice == 'Android') {
        JsHandler.TurnpageEventtoDevice(jsonText);
    }

    //saveData(_cookie_name,currentPage);
}

function fnnumRestorePage(pagenum) {


    // return false;
    _restored = 1;

    var t_num = parseInt(pagenum);

    currentPage = (isNaN(t_num)) ? 0 : t_num;

    //JsHandler.alert("fnnumRestorePage"+currentPage);

    turnPage();


}

function fnRestorePage() {

    if (_restored == 1)
        return false;

    _restored = 1;
    var _cookie_name = "Restorepage" + strBookUID;

    if (0) { //navigator.appVersion.indexOf("Android")!=-1
        JsHandler.getTurnPageEventToDevice();
    } else if (0) { //navigator.appVersion.indexOf("iPad")!=-1 || navigator.appVersion.indexOf("iPhone")!=-1
        window.location = 'inapp://getTurnPageEventToDevice';
    } else {



        var jsonRestoreReading = getData(_cookie_name).split("||||");
        if (jsonRestoreReading[2] != intUserId)
            return false;
        fnnumRestorePage(jsonRestoreReading[1]);
    }
}
/*
 *Reached end / begining of the content Send notification to device
 */

function fn_prevnextcall(req_method) {
    /*
	FLAG_PREVNXT2 = '';

		if(req_method != '') {
			if(appDevice == 'iPad') {
				window.location = "inapp://prevnextcall?fil="+req_method;
			}
			if(appDevice == 'Android') {
				JsHandler.onPreviousOrNext(req_method);
			}
		}
	*/
}
/*
Send updated URL index to device
*/

function fn_updateUrlIndex() {
    /*
	if(appDevice == 'Android') {
		var doc_URL_arr  = document.URL.split('/');
		var doc_URLindex = doc_URL_arr[doc_URL_arr.length - 1];
		JsHandler.updateUrlIndex(doc_URLindex);
		}
	else if(appDevice == 'iPad'){
		var doc_URL_arr  = document.URL.split('/');
		//var doc_URLindex = doc_URL_arr[doc_URL_arr.length - 1];
		//return doc_URLindex;
		}
	*/
}
/*******************END OF FUnction > communicates with mobile APP**********/

function fniosRemoveHighLightText() {

    var uniq_timstamp = $(".hidden_uniqtime").val();
    highlight_txt = $('.' + uniq_timstamp).html();
    //VISIBLE_OBJ.removeHighlight(highlight_txt);
    $('.' + uniq_timstamp).removeClass("ithas_note");
}

function fnCancelHighlightText() {

    //alert("in cancel action=="+uniq_timstamp);
    //alert(uniq_timstamp);
    var uniq_timstamp = $(".hidden_uniqtime").val();
    //alert(uniq_timstamp);
    var note_dbid = $("." + uniq_timstamp).attr('note_dbid');
    //alert(note_dbid);

    if (parseInt(note_dbid) <= 0 || note_dbid == 'undefined' || note_dbid == '') {
        highlight_txt = $('.' + uniq_timstamp).html();
        VISIBLE_OBJ.removeHighlight(highlight_txt);
        $('.' + uniq_timstamp).removeClass("ithas_note");
    }
}


/*******************START FUnction > NOTES *********************************/

function fniOSCallNoteSelection(_selectedstr, txt_param, note_from_user) {
    //alert("note_from_user=="+note_from_user);
    NOTE_TXT_FROM_ANDRIOD = note_from_user;
    if (!$("#quiz").is(':visible') && !$("#note").is(':visible')) {

        fnActionNotesselection(uniq_timstamp, _selectedstr, txt_param);
        _appendnote_icon(note_from_user, uniq_timstamp, 0);
        $("." + uniq_timstamp).attr("dyn_title", NOTE_TXT_FROM_ANDRIOD);

        //alert(VISIBLE_OBJ.html());
    }

}

function fniOSTextSelection() {
    //alert("fniOSTextSelection==");
    _selectedstr = window.getSelection().toString();
    if (_selectedstr.indexOf("\n") == -1)
        fnGetSelectedText("font", "", "", 1);
    else
        uniq_timstamp = tempTimeStamp = parseInt(Math.round(+new Date() / 1000)) + parseInt(Math.random() * 100);
}

function fnTxtselectCallback(selectionParentElement, _selectedstr, txt_param) {

    remov_selection();
    if (!$("#quiz").is(':visible') && !$("#note").is(':visible')) {

        if (_selectedstr.indexOf("\n") == -1)
            fnGetSelectedText("font", "", "", 1);
        else
            uniq_timstamp = tempTimeStamp = parseInt(Math.round(+new Date() / 1000)) + parseInt(Math.random() * 100)

            fnActionNotesselection(uniq_timstamp, _selectedstr, txt_param);
        if (txt_param != 'highlight') {
            _appendnote_icon(NOTE_TXT_FROM_ANDRIOD, uniq_timstamp, 0);
        }
        $("." + uniq_timstamp).attr("dyn_title", NOTE_TXT_FROM_ANDRIOD);

    }
}

function remov_selection() {
    $(".ithas_note").each(function(index, element) {
        if (typeof $(this).attr("dyn_title") == 'undefined' || $(this).attr("dyn_title") == '')
            $(this).attr("class", "noclas_");
    });
}

function fnActionNotesselection(uniq_timstamp, _selectedstr, txt_param) {
    var originaltxt = _selectedstr;


    var _note_dbid_ = $("." + uniq_timstamp).attr("note_dbid");

    //alert(_note_dbid_);

    if (typeof dyn_title_ == 'undefined' || dyn_title_ == '') {
        $("._2").hide();
        $("._1").show();
    } else {
        $("._1").hide();
        $("._2").show();
    }
    var strFound = 0;
    var strFoundCount = 0;
    var strSrchend = 0;
    var Srchcompleted = 0;
    GLOB_HIGHLITE_CLAS = "findIndexof";
    _stopfurther = 0;

    if (_note_dbid_ == 0 || _note_dbid_ == NaN || typeof _note_dbid_ == "undefined") {
        if (_selectedstr.indexOf("\n") == -1) {
            tempTimeStamp = uniq_timstamp;
            // VISIBLE_OBJ.highlight($.trim(_selectedstr),1,"rrr",0);
            // For indexing of the highlighted word/note
            VISIBLE_OBJ.highlight(_selectedstr);

            tempTimeStamp = 0;
        } else {
            arr_selectedstr = $.trim(_selectedstr).split('\n\n');
            for (i = 0; i < arr_selectedstr.length; i++) {
                _stopfurther = 0;
                if (tempTimeStamp == 0) {
                    tempTimeStamp = parseInt(Math.round(+new Date() / 1000)) + parseInt(Math.random() * 100)
                    $(".hidden_uniqtime").val(tempTimeStamp);
                } else {
                    tempTimeStamp = uniq_timstamp;
                    $(".hidden_uniqtime").val(tempTimeStamp);
                }
                VISIBLE_OBJ.highlight($.trim(arr_selectedstr[i]), 1, "rrr", 0);
                //alert($.trim(arr_selectedstr[i]));
            }
            uniq_timstamp = tempTimeStamp;
            remove_selection();
            tempTimeStamp = 0;
        }

        intText_index = 0;
        $(".findIndexof").each(function(index, element) {
            if ($(this).parent("font").attr("id") == uniq_timstamp) {
                intText_index = index + 1;
            }
        });
        $(".findIndexof").removeClass("findIndexof");
    }
    $(".hidden_selectedstr").val(_selectedstr);
    $(".hidden_uniqtime").val(uniq_timstamp);

    if (intText_index == 0)
        intText_index = 1;
    $("." + uniq_timstamp).attr("myIndex", intText_index);

    if (appDevice != 'iPad' && appDevice != 'Android') {
        highlightme_();
    }
    if (appDevice == 'Android') {
        var jsonData = {
            "selected_text_for_note": _selectedstr,
            "user_level": strUserLevel,
            "text_index": intText_index,
            'uniqtime': uniq_timstamp
        };
        var jsonText = JSON.stringify(jsonData);
        JsHandler.setSelectedText(jsonText);
    }
    if (appDevice == 'iPad') {
        uniq_timstamp_new = uniq_timstamp;

        if (_note_dbid_ > 0)
            var jsonData = {
                "selected_text_for_note": _selectedstr,
                "user_level": strUserLevel,
                "text_index": intText_index,
                'uniqtime': uniq_timstamp,
                "noteid": _note_dbid_,
                "userlevel": strUserLevel,
                "strUserNote": NOTE_TXT_FROM_ANDRIOD
            };
        else
            var jsonData = {
                "selected_text_for_note": _selectedstr,
                "user_level": strUserLevel,
                "text_index": intText_index,
                'uniqtime': uniq_timstamp,
                "noteid": 0,
                "userlevel": strUserLevel,
                "strUserNote": NOTE_TXT_FROM_ANDRIOD
            };

        strWSMETHOD = "addnotes";
        fnSendUserRequest(jsonData);
    }
}

function fnHighLightIssue() {

    var selection;
    var elements = [];
    var ranges = [];
    var rangeCount = 0;
    var frag;
    var lastChild;
    var selectedString = "";

    selection = window.getSelection();
    selectedString = selection.toString();

    var note_dbid = 0;
    if (selection.rangeCount) {
        selectedString = selection.toString();
        sel_text_2note = selectedString;
        var i = selection.rangeCount;

        while (i--) {

            ranges[i] = selection.getRangeAt(i).cloneRange();
            elements[i] = document.createElement("font");

            elements[i].setAttribute("id", uniq_timstamp);
            elements[i].setAttribute("class", "ithas_note");

            elements[i].setAttribute("dyn_title", '##HIGHLIGHTME__');
            elements[i].setAttribute("note_dbid", note_dbid);

            elements[i].appendChild(ranges[i].extractContents());

            ranges[i].insertNode(elements[i]);
            ranges[i].selectNode(elements[i]);
        }
        selection.removeAllRanges();
        i = ranges.length;

    }
    return selectedString;
}

function fnGetSelectedText(tagName, _mynote, note_dbid, flagChk) {
    //alert("in fnGetSelectedText");
    var selection;
    var elements = [];
    var ranges = [];
    var rangeCount = 0;
    var frag;
    var lastChild;
    var selectedString = "";
    if (window.getSelection) {
        selection = window.getSelection();
        selectedString = selection.toString();

        if (selection.rangeCount) {
            selectedString = selection.toString();
            sel_text_2note = selectedString;
            var i = selection.rangeCount;
            while (i--) {
                ranges[i] = selection.getRangeAt(i).cloneRange();
                elements[i] = document.createElement(tagName);
                uniq_timstamp = parseInt(Math.round(+new Date() / 1000)) + parseInt(Math.random() * 100);

                if (flagChk == 1) {
                    elements[i].setAttribute("id", uniq_timstamp);
                    elements[i].setAttribute("class", "ithas_note " + uniq_timstamp);
                    if (typeof _mynote != 'undefined')
                        elements[i].setAttribute("dyn_title", _mynote);
                    elements[i].setAttribute("note_dbid", note_dbid);
                } else if (flagChk == 2) {
                    elements[i].setAttribute("class", "searchedResult");
                } else {
                    elements[i].setAttribute("class", "findIndexof");
                }
// For showing paragraph selected for a moment
selection.removeAllRanges();
                elements[i].appendChild(ranges[i].extractContents());

                ranges[i].insertNode(elements[i]);
                ranges[i].selectNode(elements[i]);
                if (flagChk != 2) {
                    _appendnote_icon(_mynote, uniq_timstamp, 0); // append icon with position beside corresponding text !
                }
            }
            // Restore ranges
            selection.removeAllRanges();
            i = ranges.length;
            $(".hidden_uniqtime").val(uniq_timstamp);
        }

    }
    return selectedString;
}
/*
iconReposition [0] : do not add icon.. just position it to poper location
*/

function _appendnote_icon(_mynote, uniq_timstamp, iconReposition) {

    var BOOK_WIDTH_50 = BOOK_WIDTH / 2 - 60;
    var intLineHeight = parseInt( $('#story_content').css('line-height') );

    if ((typeof _mynote != 'undefined' && _mynote != 'undefined' && _mynote != '' && _mynote != '##HIGHLIGHTME__') || iconReposition == 1) {
        var _abs_position = $("#" + uniq_timstamp).offset();

        var intNoteOnHeight  = parseInt($('#' + uniq_timstamp).height());
        var strNoteOnContent = $.trim($('#' + uniq_timstamp).html());
        var intAdjustTop     = 0;

        if ( intNoteOnHeight > intLineHeight && strNoteOnContent.indexOf(' ') > -1) {
            // Prepend a marker for the starting position of note
            $('#' + uniq_timstamp).prepend('<font id="note_start_marker" style="display: inline; background-color: red; position: relative"></font>');
            // Get marker top position
            var intMarkerTopLeft = $('#note_start_marker').offset().top;
            // Removing marker
            $('#note_start_marker').remove();

            intAdjustTop = 1;
        }

        if (iconReposition != 1)
            $("#content").append('<div class="icon_tinynote of' + uniq_timstamp + '" title="View Note" style="display: block;" ofnote_="' + uniq_timstamp + '"></div>');

        if ((_abs_position.left % BOOK_WIDTH) > BOOK_WIDTH_50 || theOrientation == 'portrait') {
            $(".of" + uniq_timstamp).css(_abs_position);
            $(".of" + uniq_timstamp).css("left", (BOOK_WIDTH - 50) + "px");
            $("#" + uniq_timstamp).attr("pos_", "r");
        } else if (((Math.abs(_abs_position.left)) % BOOK_WIDTH) < BOOK_WIDTH_50 && _abs_position.left < 0) {
            $(".of" + uniq_timstamp).css(_abs_position);
            $(".of" + uniq_timstamp).css("left", (BOOK_WIDTH - 50) + "px");
            $("#" + uniq_timstamp).attr("pos_", "r");
        } else {
            $(".of" + uniq_timstamp).css(_abs_position);
            $(".of" + uniq_timstamp).css("left", (BOOK_WIDTH_50 + 25) + "px");
            $("#" + uniq_timstamp).attr("pos_", "l");
        }

        if ( intAdjustTop == 1 ) {
            $('.of' + uniq_timstamp).css('top', intMarkerTopLeft + 'px');
            intAdjustTop = 0;
        }
    }
}

function noteIconReposition() {

    $(".ithas_note").each(function(index, element) {
        _appendnote_icon("", this.id, 1);
    });

    fnNoteiconVisibility(true);
}

function highlightme_() {
    var strUniqueId = $(".hidden_uniqtime").val();
    var intBookId = intDefultBookId;
    var intChapterId = strChapterId;
    var intNoteId = 0;

    var html = $(".hidden_selectedstr").val();

    if (html == '') {
        return false;
    }
    fnSubmitNote(strUniqueId, intBookId, intNoteId);
    $(".hidden_uniqtime").val("0");
}

function fnSubmitNote(strDynamicId, intBookId, intNoteId) {

    strWSMETHOD = "addnotes";
    var strUserNote = $("#divNotepopup_" + strDynamicId).val();

    if (strUserNote == null)
        strUserNote = "##HIGHLIGHTME__";
    else
        _appendnote_icon(strUserNote, strDynamicId, 0);

    var isError = false;
    if (strUserNote != "") {} else {
        isError = true;
        fnAppNotify(0, "note_validate", "Please insert note");
    }

    if (isError == false) {

        sel_text_2note = $.trim($(".hidden_selectedstr").val());

        if (typeof intText_index == 'undefined' || intText_index == 0 || intText_index == '') intText_index = 1;
        if (typeof intNoteId == 'undefined' || intNoteId == '') intNoteId = "0";

        var jsonData = {
            "userid": intUserId,
            "tokenID": inttokenID,
            "book_unique_id": strBookUID,
            "noteid": intNoteId,
            "strUserNote": strUserNote,
            "userlevel": strUserLevel,
            "selected_text_for_note": sel_text_2note,
            "text_index": intText_index,
            "device_id": strDeviceId
        };
        fnSendUserRequest(jsonData);

        var note_dbid = $("." + strDynamicId).attr("note_dbid");

        if (typeof note_dbid == "undefined") {
            $("." + uniq_timstamp).attr("dyn_title", strUserNote);
            $("." + uniq_timstamp).attr("myIndex", intText_index);
        } else {
            $("." + strDynamicId).attr("dyn_title", strUserNote);
            $("." + uniq_timstamp).attr("myIndex", intText_index);
        }


    }

    return false;
}

function fnnotemarkdeleted_action() {}

function fnaddnotes_action() {
    //JsHandler.alert("asdasfdsf");
    var objJson = JSON_OPT;
    var arrResponse = objJson.response_data;
    var strResponse = arrResponse.msg;

    //JsHandler.alert(objJson.return_code);
    if (appDevice == 'iPad') {
        uniq_timstamp_new = uniq_timstamp;
    }



    if (objJson.return_code == 1) {
        //JsHandler.alert(arrResponse.note_id);
        $("." + uniq_timstamp_new).attr("note_dbid", arrResponse.note_id);

        // Updating the newly added paperclip attributes to work
        $('.of' + uniq_timstamp_new).attr("note_dbid", arrResponse.note_id);
        $('.of' + uniq_timstamp_new).attr("ofnote_", uniq_timstamp_new);

        $(".note-popup").attr("contenteditable", "false");
        fnClosePopUp("#note");
    }
    $(".user_helpsec").hide();
    return false;
}

function fnGetUserAddedNote(strDynamicId) {
    var _selectedstr = $(".hidden_selectedstr").val(); //$(".fnGetUserAddedNote").val();
    //alert(strDynamicId+" || hidden_selectedstr || "+$(".hidden_selectedstr").val());
    var strUniqueId = $(".hidden_uniqtime").val();
    intText_index = $("#" + strDynamicId).attr("myIndex");
    strWSMETHOD = "getnote";
    var jsonData = {
        "userid": intUserId,
        "tokenID": inttokenID,
        "book_unique_id": strBookUID,
        "strUniqueId": strDynamicId,
        "userlevel": strUserLevel,
        "selected_text_for_note": _selectedstr,
        "text_index": intText_index,
        "device_id": strDeviceId
    };


    fnSendUserRequest(jsonData);
    return;
}

function fngetnote_action() {
    var getnoteof = $(".hidden_uniqtime").val();
    var strAddedNoteResponse = $("#" + getnoteof).attr("dyn_title");
    if (strAddedNoteResponse == "##HIGHLIGHTME__" || typeof strAddedNoteResponse == 'undefined')
        strAddedNoteResponse = "";
    var strUniqueId = getnoteof;
    var intBookId = intDefultBookId;
    var intChapterId = strChapterId;
    var intNoteId = $("#" + getnoteof).attr("note_dbid");

    var strNoteContent = '<textarea class="note-popup" id="divNotepopup_' + strUniqueId + '">' + strAddedNoteResponse + '</textarea>';
    var strNoteButon = '<span class="notes_btn BtnObject" href="javascript:void(0);" onclick="fnSubmitNote(\'' + strUniqueId + '\', \'' + intBookId + '\', \'' + intNoteId + '\');" >OK</span><span class="notes_btn cancl_btn">Cancel</span><span class="notes_btn remove_btn">Remove</span>';
    $("#note").html(strNoteContent + " " + strNoteButon);

    fnOpenPopUp('#note');
    return false;
}



function fnWithOutServer() {
    //JsHandler.alert("hey im cool");
    fnChangeLevelContent();
    set_level_selected();
    calculateNumberOfPage(currentPage);
    if (appDevice == 'Android') {
        JsHandler.toggleCoverImageView();
    }
    fnRestorePage();
}


function fnLoadAssignedLevel() {
    //alert("in fnLoadAssignedLevel");
    if (appDevice == 'Android') {
        //JsHandler.alert("Loading");
    }
    strWSMETHOD = "loadassignedlevel";
    var jsonData = {
        "userid": intUserId,
        "tokenID": inttokenID,
        "book_unique_id": strBookUID,
        "device_id": strDeviceId
    };
    fnSendUserRequest(jsonData);
    return;
}

function fnloadassignedlevel_action() {

    //alert("in fnloadassignedlevel_action");
    if (appDevice == 'Android') {
        //JsHandler.alert("fnloadassignedlevel_action ");
    }
    var objJson = JSON_OPT;
    var strUserLevel = objJson.response_data;
    //strUserLevel = JSON_OPT.response_data;

    //var strUserLevel 		= arrResponse.response_data;

    //JsHandler.alert("fnloadassignedlevel_action userlevel =="+strUserLevel);

    saveData("epub_myuserlevel", strUserLevel);
    //fnChangeLevelContent();
    fnChangeLevelContent();
    set_level_selected();

    //JsHandler.alert("fnloadassignedlevel_action"+currentPage);

    calculateNumberOfPage(currentPage);

    //alert("below calculateNumberOfPage");
    fnLoadBookNotesBookmarks();
    //alert("below fnLoadBookNotesBookmarks");
    fnRestorePage();
    if (appDevice == 'Android') {
        //	JsHandler.alert(numberOfPages);
        //JsHandler.alert("below change contgent fnloadassignedlevel_action ");

    }

    /* it's hide previously*/ //calculateNumberOfPage(0);


}

function fnLoadBookNotesBookmarks(strDynamicId) {
    //alert("into fnLoadBookNotesBookmarks");
    strWSMETHOD = "getnotebookmarks_all";
    var jsonData = {
        "userid": intUserId,
        "tokenID": inttokenID,
        "book_unique_id": strBookUID,
        "userlevel": strUserLevel,
        "orientation": theOrientation,
        "device_id": strDeviceId
    };
    fnSendUserRequest(jsonData);
    return;
}

function fngetnotebookmarks_all_action() {


    //alert("inside fngetnotebookmarks_all_action");
    if (appDevice == 'Android') {
        //JsHandler.alert("hide cover page");
        JsHandler.toggleCoverImageView();
    }
    try {
        //JsHandler.alert("This is alert 3");
        $(".ithas_note").removeClass("ithas_note");
        var objJson = JSON_OPT;
        var arrResponse = objJson.response_data;


        var note_belongto_text = "";
        var note_dbid = 0;
        var strResponse = arrResponse.msg;

        var notetext_all = eval(arrResponse.notes_data);
        /*var bookmarks    =    arrResponse.bookmarks_list.bookmarks_list;*/
        /* ####################### LOAD QUESTIONS IMPLEMENTATION  ######################## */
        var arrQuesload = eval(arrResponse.question_data);
        for (var intSecnum = 1; intSecnum <= 2; intSecnum++) {
            var strSectiondata = eval('arrQuesload.section' + intSecnum);
            if (typeof strSectiondata == 'undefined' || strSectiondata == null || strSectiondata == '') {
                $("#of_" + strUserLevel + "_" + intSecnum + " .al_quize_load").html('<div class="questionRow BtnObject" style="padding:0"><span class="questionLabel" style="text-align:center;display:block">No Question to Display</span><span class="questionSelection"> </span></div>');
            } else {
                var arrQuestionsdata = strSectiondata.split(',');
                var arrQuestionsdata_length = arrQuestionsdata.length;
                var str_Questionhtml = '';
                $("#of_" + strUserLevel + "_" + intSecnum + " .al_quize_load").html('');
                for (var Qcnt = 1; Qcnt <= arrQuestionsdata_length; Qcnt++) {


                    str_Questionhtml += '<div class="questionRow BtnObject" data-secnum="' + intSecnum + '" data-questionid="' + arrQuestionsdata[(Qcnt - 1)] + '"><span class="questionLabel">Question ' + Qcnt + '</span><span class="questionSelection"> </span></div>';
                }
                $("#of_" + strUserLevel + "_" + intSecnum + " .al_quize_load").append(str_Questionhtml);
            }
        }
        /* ####################### LOAD QUESTIONS IMPLEMENTATION  ######################## */

        //alert(notetext_all.length);
        var notes_total = (typeof notetext_all == 'undefined') ? 0 : notetext_all.length;
        var startOffset = 0;
        var endOffset = 0;
        var text_index = '';
        var prev_note_id = 0;


        for (var cnt = 0; cnt < notes_total; cnt++) {
            note_belongto_text = notetext_all[cnt]['noteBLONGTO'];
            note_belongto_text = note_belongto_text.replace(/\\/g, '');

            note_text = notetext_all[cnt]['noteTXT'];
            note_dbid = notetext_all[cnt]['noteID'];
            //JsHandler.alert(note_dbid);
            text_index = notetext_all[cnt]['text_index'];


            GLOB_HIGHLITE_CLAS = "findIndexof";
            _stopfurther = 0;

            if (prev_note_id == note_dbid) {
                try {
                    VISIBLE_OBJ.highlight(note_belongto_text, text_index, notetext_all[cnt], 0);
                } catch (e) {
                    break;
                }
            } else {

                tempTimeStamp = note_dbid;
                try {
                    VISIBLE_OBJ.highlight(note_belongto_text, text_index, notetext_all[cnt], 1);
                } catch (e) {
                    break;
                }
            }
            $(".findIndexof").removeClass("findIndexof");
            prev_note_id = note_dbid;

        }
        tempTimeStamp = 0;
        /* #######################  New logic for bookmarking  ######################## */

        /*	if(arrResponse.jsonBookmarksData != "null") {
		var jsonBookmarkData = eval(arrResponse.jsonBookmarksData);
		var jsonBookmarkData_length = jsonBookmarkData.length;

		BOOK_MARK_PAGES		 = Array();
		for(var i = 0; i < jsonBookmarkData_length ; i++) {
			eleOrientation 	= jsonBookmarkData[i][0];
			elePageNumber  	= jsonBookmarkData[i][1];
			eleRestoreText	= jsonBookmarkData[i][2];
			eleUniqueId		= jsonBookmarkData[i][3];

			if(eleOrientation == theOrientation && $.inArray(elePageNumber, BOOK_MARK_PAGES) == -1) {
				BOOK_MARK_PAGES.push(parseInt((elePageNumber)));
				//BOOK_MARK_UNIQUE.push(eleUniqueId);
				BOOK_MARK_UNIQUE[elePageNumber] = eleUniqueId;
			} else if(BOOKMARK_TXTSRCH) {
				uniq_timstamp = eleUniqueId ;
				GLOB_HIGHLITE_CLAS = "BookmarkedText";
				fnFlipbookSearch(eleRestoreText);

				currentPage = 0;
				turnPage();
				var pageNum  = 0; var pagesCalculated = false; var EODObj = $('.searchedResult');
				var intBookmarkPagenum = 0;

				currentPage = parseInt(Math.round( EODObj.position().left/BOOK_WIDTH));

				intBookmarkPagenum = currentPage ;
				$('.searchedResult').removeClass('searchedResult');

				if($.inArray(intBookmarkPagenum, BOOK_MARK_PAGES) == -1){
					BOOK_MARK_PAGES.push(parseInt(intBookmarkPagenum));
					BOOK_MARK_UNIQUE[intBookmarkPagenum] = eleUniqueId;
				}
			}
		}

		}
		*/
        /* #######################  New logic for bookmarking  ######################## */

        fnNoteiconVisibility(1, '');
    } catch (e) {
        /*if(appDevice == 'Android'){
				JsHandler.alert("Please check your inter");
			}else{
				alert("hide cover page");
			}*/
    }


}
/*fnRemoveNote_anroid used to remove note from andriod device */

function fnRemoveNote_anroid(note_id) {
    //alert(note_id);
    if (note_id != 'undefined')
        fnNotemarkdeleted(note_id, '');
    uniq_timstamp = $(".hidden_uniqtime").val();

    // $("." + uniq_timstamp).removeClass("ithas_note");
    // Remove font element, it is not required any more(Removing only class leaves border to the highlighted word)
    $('.'+uniq_timstamp).replaceWith($('.'+uniq_timstamp).html());
    // Font element it replaced by its content

    $(".user_helpsec").hide();
    $(".of" + uniq_timstamp).remove();
}

function fnRemovenote() {
    uniq_timstamp = $(".hidden_uniqtime").val();
    var note_dbid = $("." + uniq_timstamp).attr('note_dbid');

    if (note_dbid != 'undefined')
        fnNotemarkdeleted(note_dbid, uniq_timstamp);
    // $("." + uniq_timstamp).removeClass("ithas_note");

    // Remove font element, it is not required any more(Removing only class leaves border to the highlighted word)
    $('.'+uniq_timstamp).replaceWith($('.'+uniq_timstamp).html());
    // Font element it replaced by its content

    $(".user_helpsec").hide();
    $(".of" + uniq_timstamp).remove();
}

function fnNotemarkdeleted(intNoteId, uniq_timstamp) {
    strWSMETHOD = "notemarkdeleted";
    var jsonData = {
        "userid": intUserId,
        "tokenID": inttokenID,
        "book_unique_id": strBookUID,
        "noteid": intNoteId,
        "userlevel": strUserLevel,
        "device_id": strDeviceId
    };
    fnSendUserRequest(jsonData);
}

function fnNoteiconVisibility(hidpopup, dir) {

    if (hidpopup)
        fnHideNoteDisplayData();

    $(".icon_tinynote").hide();
    var page = currentPage + 1;
    var leftpos = 0;
    var _compareWith = '';

    $(".ithas_note").each(function(index, element) {

        var leftpos = $(this).offset().left;

        if (dir == 'left') {
            leftpos = leftpos; //+BOOK_WIDTH;
        } else if (dir == 'right') {
            leftpos = leftpos; //- BOOK_WIDTH;
        } else if (dir == 'clickleft') {
            leftpos = leftpos - BOOK_WIDTH;
        } else if (dir == 'clickright') {
            leftpos = leftpos + BOOK_WIDTH;
        } else {
            leftpos = 0;
        }

        if (leftpos < BOOK_WIDTH && leftpos > 0) {
            var strNoteid = this.id;
            $(".of" + strNoteid).show();
        }
        if (leftpos == 0) {
            _compareWith = $(this).offset().left;

            if (_compareWith < BOOK_WIDTH && _compareWith > 0) {
                var strNoteid = this.id;
                $(".of" + strNoteid).show();
            }
        }

    });
}

function fnFlipbookSearch(searchElement) {

    //$(".searchedResult").removeClass("searchedResult");
    var SrchCount = 0,
        pos = 0,
        strFound = 0,
        strSrchend = 0,
        step = searchElement.length;

    _stopfurther = 0;

    GLOB_HIGHLITE_CLAS = "searchedResult";
    VISIBLE_OBJ.removeHighlight(searchElement, "ALL");

    $(".searchedResult").removeClass("searchedResult");
    VISIBLE_OBJ.highlight(searchElement, "ALL");

    $(".searchbox .search_result").text($(".searchedResult").length + " found");

}
/*
 *Hide note popup , remove selection , notes action buttons [turning page, orientation change]
 */

function fnHideNoteDisplayData() {
    fnClosePopUp('#note');
    $(".user_helpsec").hide();
    remov_selection();
}

function fnRemoveBookmarks(strBookmarkString) {
    strWSMETHOD = "removebookmarks";

    var bookmarksdata = BOOK_MARK_PAGES.join(",");
    var jsonData = {
        "userid": intUserId,
        "tokenID": inttokenID,
        "strUserLevel": strUserLevel,
        "book_unique_id": strBookUID,
        "orientation": theOrientation,
        "bookmarksdata": bookmarksdata,
        "strBookmarkString": strBookmarkString,
        "currentPage": currentPage,
        "device_id": strDeviceId
    };
    fnSendUserRequest(jsonData);
}


function fnUpdateBookmarks(strBookmarkString) {
    strWSMETHOD = "updatebookmarks";
    var bookmarksdata = BOOK_MARK_PAGES.join(",");
    //alert("fnUpdateBookmarks"+strBookmarkString+"|"+bookmarksdata+"|"+intUserId+"|"+strUserLevel+"|"+bookmarksdata+"|"+strBookUID+"|"+currentPage);

    var jsonData = {
        "userid": intUserId,
        "tokenID": inttokenID,
        "strUserLevel": strUserLevel,
        "book_unique_id": strBookUID,
        "orientation": theOrientation,
        "bookmarksdata": bookmarksdata,
        "strBookmarkString": strBookmarkString,
        "currentPage": currentPage,
        "device_id": strDeviceId
    };
    fnSendUserRequest(jsonData);
}

function fnremovebookmarks_action() {
    var objJson = JSON_OPT;
}

function fnupdatebookmarks_action() {
    var objJson = JSON_OPT;
}

function fnOpenNotesActionwindow(t, l, flag_) {

    if (appDevice == 'iPad') {
        if ($("#" + uniq_timstamp).attr("dyn_title") != '##HIGHLIGHTME__') {
            fnGetUserAddedNote('1');
        } else {
            window.location = 'inapp://openNotesActionwindow?fil=val';
        }
    } else if (appDevice == 'Android') {
        if ($("#" + uniq_timstamp).attr("dyn_title") != '##HIGHLIGHTME__') {
            fnGetUserAddedNote('1');
        } else {
            JsHandler.adaptiveFnCall("", "openNotesActionwindow");
        }
    } else {

        if ($("#" + uniq_timstamp).attr("dyn_title") != '##HIGHLIGHTME__') {
            fnGetUserAddedNote('1');
        } else {
            if (confirm("Remove")) fnRemovenote();
            else {}
        }
    }
}


/*******************END FUnction > NOTES ***********************************/
/*
funtion fnUpdateBookReading : update reading percentage to database
*/

function fnUpdateBookReading() {
    strWSMETHOD = (boolLoadAssignLevel == 1) ? "updatebookreading_back" : "updatebookreading";
    var bookmarksdata = BOOK_MARK_PAGES.join(",");
    var page_reading = (currentPage == (numberOfPages - 1)) ? (currentPage + 1) : currentPage;
    //console.log(page_reading+"||"+numberOfPages);
    var boolreading_per = parseInt((page_reading / numberOfPages) * 100);
    var jsonData = {
        "userid": intUserId,
        "tokenID": inttokenID,
        "book_unique_id": strBookUID,
        "orientation": theOrientation,
        "TotalPages": numberOfPages,
        "readingPercent": boolreading_per,
        "currentPage": page_reading,
        "strUserLevel": strUserLevel,
        "device_id": strDeviceId
    };

    fnSendUserRequest(jsonData);

    fnUpdateLastReadingPosition(); // temporary update while each page turn
}

function fnupdatebookreading_action() {

    if (boolLoadAssignLevel == 1) {
        fnLoadAssignedLevel();
        boolLoadAssignLevel = 0;
    }

}

function fnupdatebookreading_back_action() {

    if (boolLoadAssignLevel == 1) {
        fnLoadAssignedLevel();
        boolLoadAssignLevel = 0;
    }

}

function fnUpdateLastReadingPosition() {
    if (BOOKMARK_TXTSRCH)
        var strVisibleString = fnGetVisibleContent();
    else
        var strVisibleString = '';
    fnUpdateUserCookies();
    //strVisibleString = $.trim(strVisibleString);
    /*var jsonDataLocal 	  	= theOrientation+"||||"+currentPage+"||||"+intUserId;
		var _cookie_name	= "Restorepage"+strBookUID;
		saveData(_cookie_name,jsonDataLocal);*/
    //console.log(getData("cookie"+_cookie_name));
}
/////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {

    $('body').on(TWOEVENTEND, '#your_level_dd', function() {
        window.location = 'inapp://fnGetAppMode';
    });


    $(".quiz_cancl_btn").live(TWOEVENTSTART, function(e) {
        fnBackToQuestionBox();
    });

    $(".level_chooser").live(TWOEVENTSTART, function(e) {
        var userlevel = $(this).data("level");
        choose_level(userlevel);
    });

    /*$( "#your_level_dd" ).live(TWOEVENTSTART ,function(e) {
				e.preventDefault();
				$("#level"+strUserLevel).addClass("selected_lvl");
	 		 	$('.popup_wrapper').fadeIn("slow");
		});*/

    // $(".icon_tinynote").live(TWOEVENTSTART,function(e){ //click
    $('#content').on(TWOEVENTSTART, '.icon_tinynote', function(e) {
        e.preventDefault();

        var ofnote_ = $(this).attr('ofnote_');
        var _selectedstr = $("#" + ofnote_).html();
        var _text_index = $("#" + ofnote_).attr("myIndex");
        var _dyn_title_ = $("#" + ofnote_).attr("dyn_title");
        var _note_dbid_ = $("#" + ofnote_).attr("note_dbid");

        $(".hidden_selectedstr").val(_selectedstr);
        $(".hidden_uniqtime").val(ofnote_);
        $(".user_helpsec").hide();

        if (appDevice == 'iPad') {
            // Generate click event on this note
            $('font#' + ofnote_ + '.ithas_note').trigger(TWOEVENTEND);
        }

        if (appDevice != 'iPad' && appDevice != 'Android') {
            fnGetUserAddedNote('1_1_1');
        } else {

            var jsonData = {
                "selected_text_for_note": _selectedstr,
                "user_level": strUserLevel,
                "text_index": _text_index,
                "noteid": _note_dbid_,
                "strUserNote": _dyn_title_
            };
            var jsonText = JSON.stringify(jsonData);

            JsHandler.showAddedNotes(jsonText);
        }
    });

    $(".cancl_btn").live(TWOEVENTSTART, function(e) {
        fnHideNoteDisplayData();
        e.preventDefault();
    });

    $(".close_note_").live(TWOEVENTSTART, function(e) {
        remov_selection();
        $(".user_helpsec").hide();
        e.preventDefault();
    });

    $(".removenote_icon").live(TWOEVENTSTART, function(e) {
        fnRemovenote();
        fnClosePopUp("#note");
        e.preventDefault();
    });

    $(".remove_btn").live(TWOEVENTSTART, function(e) {
        fnRemovenote();
        fnClosePopUp("#note");
        e.preventDefault();
    });

    $(".questionRow").live(TWOEVENTEND, function(event) {
        var intsecnum = $(this).data("secnum");
        var questionid = $(this).data("questionid");

        //JsHandler.alert(intsecnum+"||"+questionid);
        fnSendQuestionRequest(intsecnum, questionid);
    });


    $(".quiz_submitbtn").live(TWOEVENTEND, function(event) {

        var questionid = $(this).data("questionid");
        var questiontype = $(this).data("questiontype");
        //JsHandler.alert(questionid+"||"+questiontype);
        fnSubmitAns(questionid, questiontype);
    });

    $(".ithas_note").live(TWOEVENTEND, function(event) {
        //return false;
        event.stopPropagation();
        /*		DIsplay particular note		*/
        uniq_timstamp = $(this).attr("id");
        var _selectedstr = $(this).html();
        var position = $("#" + uniq_timstamp).offset();
        var width_ = $("#" + uniq_timstamp).width();
        var position_l = position.left + (width_) / 2 - 60;
        var note_dbid_ = $("." + uniq_timstamp).attr("note_dbid");
        var dyn_title_ = $("." + uniq_timstamp).attr("dyn_title");
        var text_index = $("." + uniq_timstamp).attr("myIndex");

        //JsHandler.alert("note_id="+note_dbid_);
        //alert("uniq_timstamp="+uniq_timstamp);
        //JsHandler.alert(STORY_CONTENT.html());

        if (typeof dyn_title_ == 'undefined' || dyn_title_ == '' || dyn_title_ == 'undefined') {
            dyn_title_ = "##HIGHLIGHTME__";
        } else {
            $("._1").hide();
            $("._2").show();
        }


        $(".hidden_selectedstr").val(_selectedstr);
        $(".hidden_uniqtime").val(uniq_timstamp);

        if (appDevice != 'iPad' && appDevice != 'Android') {
            fnOpenNotesActionwindow(position.top, position_l, 1);
        } else if (appDevice == 'iPad') {

            if (dyn_title_ != '##HIGHLIGHTME__') {
                //alert("ready=="+note_dbid_);
                var jsonData = {
                    "selected_text_for_note": _selectedstr,
                    "userlevel": strUserLevel,
                    "text_index": text_index,
                    "noteid": note_dbid_,
                    "strUserNote": dyn_title_
                };
                var jsonText = JSON.stringify(jsonData);

                $("#jsonText_holder").val(jsonText);

                window.location = 'inapp://showeditnote';
            } else {
                //alert("sandy in highlight");

                window.location = 'inapp://showHighlightAlert';


                //var reply  = confirm("Are you sure want to remove highlight of the text?");

                /*if(reply==true){
						  	fnRemovenote();
						}*/

            }
            //alert("outside if else");

        } else {
            //JsHandler.alert(dyn_title_)
            if (dyn_title_ != '##HIGHLIGHTME__') {
                var jsonData = {
                    "selected_text_for_note": _selectedstr,
                    "user_level": strUserLevel,
                    "text_index": text_index,
                    "noteid": note_dbid_,
                    "strUserNote": dyn_title_
                };
                var jsonText = JSON.stringify(jsonData);
                JsHandler.showAddedNotes(jsonText);
            } else {
                JsHandler.adaptiveFnCall("", "openNotesActionwindow");
            }

        }

        event.preventDefault();
    });

});

/************************* WEB SERVICE Response Handler ***************************/

function fnGetResponseAction(msg) {
    var responseData = "";
    var objJson = "";
    if (appDevice == 'webBrowser') {
        responseData = msg.data;
        try {
            objJson = eval(responseData);
        } catch (err) {}
    } else {
        responseData = msg;
        objJson = responseData;
    }

    var arrResponse = objJson;


    if (arrResponse.return_code == 0) {
        console.log("Something wrong in request. Please try later.");
    } else {

        //if(strWSMETHOD == 'getnotebookmarks_all' && initWs == 0) strWSMETHOD = "loadassignedlevel";
        //if(strWSMETHOD == 'loadassignedlevel' && initWs == 1) strWSMETHOD = "getnotebookmarks_all";

        var strResponseAction = "fn" + strWSMETHOD + "_action()"; // these functions are defined is reader_reusables.js
        JSON_OPT = objJson;
        eval(strResponseAction); // executes function [ input => JSON_OPT ]

        //  if(strWSMETHOD != 'getquestion')
        //	fnRestoreDummyContentHandlers();
    }
    return;
}

function fnAppenNoteId_android(uniq_timstamp, noteId) {
    //JsHandler.alert("noteid=="+noteId);
    //JsHandler.alert("time=="+uniq_timstamp);
    $("." + uniq_timstamp).attr('note_dbid', noteId);

}

function fnUpdateNoteText_android(userNoteStr, noteID) {
    $('.ithas_note').each(function() {
        if ($(this).attr('note_dbid') == noteID) {
            $(this).attr('dyn_title', userNoteStr);
        }
    })
}
/* new function on call on note*/

function fnCallOnNote(strParam) {

    NOTE_TXT_FROM_ANDRIOD = strParam;

    init_txt_selection_event('');
}
/*
 Functions for Notes manupulation
 */

function init_txt_selection_event(txt_param) {
    var txt_param = txt_param;
    if (typeof window.getSelection != "undefined") { // Non-IE

        var sel = window.getSelection();
        var _selectedstr = sel.toString();

        if (sel.rangeCount > 0) {

            var range = sel.getRangeAt(0);
            if (range.toString()) {
                var selParentEl = range.commonAncestorContainer;
                if (selParentEl.nodeType == 3) {
                    selParentEl = selParentEl.parentNode;
                }
                fnTxtselectCallback(selParentEl, _selectedstr, txt_param);
            }
        }

    } else if (typeof document.selection != "undefined") { // IE

        var sel = document.selection;
        var _selectedstr = sel.toString();
        if (sel.type == "Text") {
            var textRange = sel.createRange();
            if (textRange.text != "") {
                fnTxtselectCallback(textRange.parentElement(), _selectedstr, txt_param);
            }
        }
    }
}

function fnSetAppMode(intAppStatus) {
    window.APP_MODE = parseInt(intAppStatus);

    /*if ( APP_MODE == 0 ) { // If offline mode then calculate number of pages in book
		// calculateNumberOfPage(o);
	}*/
}
