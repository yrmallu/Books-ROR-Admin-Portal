/************************************************
 *           gloabal variable declaration       *
 ************************************************/
var BOOK_HEIGTH, BOOK_WIDTH, numberOfPages, currentPage, theOrientation, STORY_WIDTH, CONTENT_HEIGHT, host, intUserId, appDevice, HEIGHT_CONTENT, JSON_OPT, strWSMETHOD, WSMETHODTYPE, belongto_global, sel_text_2note, GLOB_HIGHLITE_CLAS, VISIBLE_OBJ, scripts_load, numRestorePage, _restored, rightfoldObj, leftfoldObj, NOTE_TXT_FROM_ANDRIOD = '', ElementText, ElementHtml, ArrElementText, APP_MODE = 1, intClearCookies = 0;

var the_book_name = "The Necklace";
var strUserLevel = '2';
var intDefultBookId = '1';
var T_OFFSET = 100;
var strBookUID = "67KG7asd78aAdaCal";
var strDeviceId = "MYDEVICE_ID";
var intUserLevel = 2;
var intUserWrongCount = 0;
var strQuePopupId = ".quiz";
var quiz_load_to = ".al_quize_load_clas";
var al_strQuePopupId = ".al_quiz";
var strLoaderId = ".quize_load";
var al_strLoaderId = ".al_quize_load";
var current_ques = 0;
var strLoginBoxId = "#login_box";
var currentPage = 0;
var uniq_timstamp = 0;
var strChapterId = 1;
var intUserId = 322;
var inttokenID = "1";
var arrChapters = new Array();
var _restored = 0;

var CONTENT_MAIN = $("#content");
var STORY_CONTENT = $(".story_content");
HEIGHT_CONTENT = STORY_CONTENT.height();
var GSWIPE = 0;
var PREVENTTAB = 0;
var TWOEVENTSTART = 'touchstart';
var TWOEVENTEND = 'touchend';
var HIGHLIGHTER;

/***** Append left and right fold*****/
$(document).ready(function() {
	browser = new detectBrowser();
	browserInfo = browser.detect();

	if (browserInfo.os == "iOS" && browserInfo.agent == "WebView")
	{
		window.location = 'inapp://fnGetValuesFromApp';		
		STORY_CONTENT.append('<input type="hidden" id="jsonText_holder" name="jsonText_holder" /><input type="hidden" id="jsonMethod_holder" name="jsonMethod_holder" /><div id="customhighlightv2"></div><div id="debuger" style="position:fixed; top:92px; height: 70px; left:0; background:#ff0000; z-index:6000;">Ths is debuger.</div>');

		$("body").append('<div class="bookActions"><div class="fontresizer fl"></div><div class="uparrow bookPopup"></div><div class="fontresizer_popup bookPopup"><a id="jfontsize-m" class="jfontsize-button jfontsize_minus"></a><a id="jfontsize-d" class="jfontsize-button jfontsize"></a><a id="jfontsize-p" class="jfontsize-button jfontsize_plus"></a></div></div><div class="position: relative;"><div class="selectionMenu"><a id="highlightLink">Highlight</a><a id="noteLink">Note</a><a id="closeNoteMenu">X</a></div></div>');
	}
	else
	{
		STORY_CONTENT.append('<input type="hidden" id="jsonText_holder" name="jsonText_holder" /><input type="hidden" id="jsonMethod_holder" name="jsonMethod_holder" /><div id="customhighlightv2"></div><div id="debuger" style="position:fixed; top:92px; height: 70px; left:0; background:#ff0000; z-index:6000;">Ths is debuger.</div>');

		CONTENT_MAIN.parent().append('<div class="bookActions"><div class="fontresizer fl"></div><div class="uparrow bookPopup"></div><div class="fontresizer_popup bookPopup"><a id="jfontsize-m" class="jfontsize-button jfontsize_minus"></a><a id="jfontsize-d" class="jfontsize-button jfontsize"></a><a id="jfontsize-p" class="jfontsize-button jfontsize_plus"></a></div></div><div class="position: relative;"><div class="selectionMenu" style="top: 72px; background: #2e394e; padding: 10px"><a style="font-size: 18px;" id="highlightLink">Highlight</a><a id="noteLink" style="font-size: 18px;">Note</a><a id="closeNoteMenu" style="font-size: 18px;">X</a></div></div>');
		
		initView();
	}
});

var detectBrowser = function (){

	this.Browser = new Object();

    this.setInfo = function(OS,Agent) {
		this.Browser.os = OS;
		this.Browser.agent = Agent;
	},
    this.Android = function() {
		if (navigator.userAgent.match(/Android/i))
			return (navigator.userAgent.match(/Version/i)) ? this.setInfo("Android","Browser") : this.setInfo("Android","WebView");
    },
    this.BlackBerry = function() {
		if (navigator.userAgent.match(/BlackBerry|BB/i))
			return (navigator.userAgent.match(/Version/i)) ? this.setInfo("BlackBerry","Browser") : this.setInfo("BlackBerry","WebView");
    },
    this.iOS = function() {
		if (navigator.userAgent.match(/iPhone|iPad|iPod/i))
			return (navigator.userAgent.match(/Version/i)) ? this.setInfo("iOS","Browser") : this.setInfo("iOS","WebView");
    },
    this.Windows = function() {
		if (navigator.userAgent.match(/IEMobile/i))
			return (navigator.userAgent.match(/Version/i)) ? this.setInfo("Windows","Browser") : this.setInfo("Windows","WebView");
    },
    this.detect = function() {
		this.setInfo("Desktop","Browser");
		mobileBrowser = (this.Android() || this.BlackBerry() || this.iOS() || this.Windows());
		return this.Browser;
    }
};

browser = new detectBrowser();
browserInfo = browser.detect();

if (browserInfo.os == "iOS" && browserInfo.agent == "Browser")
{
	document.onselectionchange = userSelectionChanged;
}
function userSelectionChanged() {
	
	if (getSelectionText() != "") {
		$(".selectionMenu").css("display","");
	}
}

function initView() {

    $(".quizcontainer").addClass("elememt_unselectable");

    intUserLevel = getData("epub_myuserlevel");

    if (typeof intUserLevel == 'undefined' || intUserLevel == null)
	{
		intUserLevel = 2;
	}

    saveData("epub_" + intDefultBookId + "_intUserId", intUserId);
    saveData("epub_" + intDefultBookId + "_intUserLevel", intUserLevel);
    strUserLevel = intUserLevel;

    $("#al_quiz_header book_name").text(the_book_name);
    rightfoldObj = $("#rightfold");
    leftfoldObj  = $("#leftfold");

	browser = new detectBrowser();
	browserInfo = browser.detect();

	if (browserInfo.os == "iOS" && browserInfo.agent == "WebView")
	{
		appDevice = 'iPad';
	}
	else if (browserInfo.os == "Android" && browserInfo.agent == "WebView")
	{
		appDevice = 'Android';
	}
	else
	{
		appDevice = 'webBrowser';
		initDesktopSwipe();
	}

    init_flip();

	if (appDevice == 'webBrowser')
	{
		setLoggedinUserId();
		setCurrentBookId();
	}

    $(".fontresizer").on(TWOEVENTSTART+" click", function(e) {
        $(".fontresizer_popup").toggle();
        $(".uparrow").toggle();
		e.stopPropagation();
    });

    CONTENT_MAIN.jfontsize({
        btnMinusClasseId: '#jfontsize-m',
        btnDefaultClasseId: '#jfontsize-d',
        btnPlusClasseId: '#jfontsize-p'
    });

    STORY_CONTENT.textHighlighter({
		onBeforeHighlight: function(range) {
			return true;
		},
		onAfterHighlight: function(highlights, range) {
			//alertMessage("onAfterHighlight = "+HIGHLIGHTER.serializeHighlights());
			if (appDevice == 'webBrowser')
			{
				showNoteHighlightTooltip();
			}
		}
	});

	HIGHLIGHTER = STORY_CONTENT.getHighlighter();

	if ( browserInfo.os == "iOS" || browserInfo.os == "Android")
	{
		applyPageSwipeEffect();

		$("#highlightLink").on("click touchend",function(){
			highlightText()
			hideNoteHighlightTooltip();
		});

		$("#noteLink").on("click touchend",function(){
			highlightNoteText();
			openAddNoteBox();
		});
		
		$("#closeNoteMenu").on("click touchend",function(e){
			e.stopPropagation();
			remove_selection();
		});
		appendNoteHighlightElements();
	}
	else if (appDevice == 'webBrowser')
	{
		$.textHighlighter.createWrapper = function(options) {
			uniq_timstamp = parseInt(Math.round(+new Date()/1000)) + parseInt(Math.random()*100);
			return $('<font></font>').addClass("highlighted "+uniq_timstamp);
		};
		appendNoteHighlightElements();
	}

    $(CONTENT_MAIN).on('touchend click', function(event) {
        $(".fontresizer_popup").hide();
        $(".uparrow").hide();

        if (PREVENTTAB == 0) {
            var strTarget = $(event.target).is('.ithas_note');
            var iconTarget = $(event.target).is('.icon_tinynote');
            if (strTarget == false && iconTarget == false) {
                if (appDevice == 'Android') {
                    JsHandler.showReaderMenu();
                }
            }
        }
    });

    fnLoadAssignedLevel();
    fnArrangeImage(BOOK_HEIGTH);
}

function initDesktopSwipe()
{
	$(CONTENT_MAIN).append('<div id="leftfold"></div><div id="rightfold"></div>');

	rightfoldObj = $("#rightfold");
    leftfoldObj = $("#leftfold");

	rightfoldObj.css({"height":BOOK_HEIGTH,"width":"50","height":"100%"});
    leftfoldObj.css({"height":BOOK_HEIGTH,"width":"50","height":"100%"});

	rightfoldObj.on("click", function(e) { showNextPage(); });
	leftfoldObj.on("click", function(e) { showPrevPage(); });
}

function setLoggedinUserId()
{
	var userInfo = "";
	try { userInfo = getCookieData("userinfo"); } catch (e) {  }
	if (userInfo == "")
	{
		alert("Application is not able to recongnize you. You won't be able to add notes at this moment.")
		return false;
	}

	objUserInfo = JSON.parse(userInfo);
	intUserId = parseInt(objUserInfo.id);
	//strUserLevel = objUserInfo.level;
}

function setCurrentBookId()
{
	locationInfo = location.href.split("/");
	strBookUID = locationInfo[locationInfo.length - 1];
}

function showNextPage()
{
	if (currentPage == numberOfPages) {
        return false;
    }

	$(STORY_CONTENT).animate({ left: "-" + (BOOK_WIDTH) * (currentPage + 1) + "px" }, {
        duration: 200, complete: function() { currentPage++; fnUpdateBookReading(); }
    });
}

function showPrevPage()
{
	if (currentPage == 0) {
        return false;
    }

	$(STORY_CONTENT).animate({ left: "-" + (BOOK_WIDTH) * (currentPage - 1) + "px" }, {
        duration: 200,
        complete: function() { currentPage--; fnUpdateBookReading(); }
    });
}

function applyPageSwipeEffect()
{
    var thirtyPercentageWidth = parseInt((BOOK_WIDTH * 30) / 100);
    var intPageMidPoint = parseInt(BOOK_WIDTH / 2);

    fnArrangeImage(BOOK_HEIGTH);

    var intPageX = 0;

    $(CONTENT_MAIN).swipe({
        swipeStatus: function(event, phase, direction, distance, duration, fingers) {
            if($(event.target).hasClass('icon_tinynote')) {
                return false;
            }

            if (phase == 'move') {
                event.stopPropagation();
				$("#closeNoteMenu").trigger("touchend");
                PREVENTTAB = 1;
				if (appDevice == 'iPad' && appDevice == 'webBrowser')
				{
					remove_selection();
				}
                else if (appDevice == 'iPad')
				{
                    window.location = 'inapp://removeMenuBarItem?selectedstr=';
                }
            } else if (phase == 'end') {
                PREVENTTAB = 0;
            }

            if (intPageX == 0) {
                intPageX = event.pageX;
            }

            if (GSWIPE == 1) {
                GSWIPE = 0;
                return false;
            }

            if (currentPage == numberOfPages && direction == 'left') {
                return false;
            }

            if (phase == "move")
            {
                $(".icon_tinynote").hide();
            }
            else
            {
                $(".icon_tinynote").show();
            }

            if (phase == 'move' && direction == 'left')
            {
                $(STORY_CONTENT).css("left", "-" + ((BOOK_WIDTH) * (currentPage) + distance) + "px");
            }
            else if (phase == 'end' && direction == 'left')
            {
                intPageX = 0;
                if (distance <= thirtyPercentageWidth)
                {
                    $(STORY_CONTENT).animate({ left: "-" + (BOOK_WIDTH) * (currentPage) + "px" }, {
                        duration: 200, complete: function() { } });
                }
				else
				{
                    showNextPage();
                }
            }
            else if (phase == 'move' && direction == 'right')
            {
                $(STORY_CONTENT).css("left", "-" + ((BOOK_WIDTH) * (currentPage) - distance) + "px");
            }
            else if (phase == 'end' && direction == 'right')
            {
                intPageX = 0;
                if (currentPage > 0)
                {
                    if (distance <= thirtyPercentageWidth)
                    {
                        $(STORY_CONTENT).animate({ left: "-" + (BOOK_WIDTH) * (currentPage) + "px" }, {
                            duration: 200, complete: function() { }
                        });
                    }
					else
					{
						showPrevPage();
                    }
                }
            }
			else if ((phase == 'end' || phase == 'cancel') && direction == null && distance == 0) {
                // For Offline access
                if (numberOfPages === undefined || numberOfPages == 0) {
                    calculateNumberOfPage(currentPage);
                }

                if (intPageX <= 60) {
                    if (currentPage > 0) {
                        // Check if already tapped
                        if(leftfoldObj.data('tapped') == 1) {
                            return false;
                        }

                        // Disable left tap
                        leftfoldObj.data('tapped', 1);
                        $(STORY_CONTENT).animate({ left: "-" + (BOOK_WIDTH) * (currentPage - 1) + "px" }, {
                            duration: 200,
                            complete: function() { --currentPage; fnUpdateBookReading(); GSWIPE = 1; fnUpdateUserCookies(); leftfoldObj.data('tapped', 0); }
                        });
                    }
                } else if (intPageX >= (BOOK_WIDTH - 60)) {
                    if (currentPage < numberOfPages) {
                        // Check if already tapped
                        if(rightfoldObj.data('tapped') == 1) {
                            return false;
                        }

                        // Disable right tap
                        rightfoldObj.data('tapped', 1);
                        $(STORY_CONTENT).animate({ left: "-" + (BOOK_WIDTH) * (currentPage + 1) + "px" }, {
                            duration: 200,
                            complete: function() { ++currentPage; fnUpdateBookReading(); GSWIPE = 1; fnUpdateUserCookies(); rightfoldObj.data('tapped', 0); }
                        });
                    }
                }
                intPageX = 0;
            }
			else if ((phase == 'end' || phase == 'cancel') && direction == null && distance == 0 && appDevice == 'webBrowser') {
				if (getSelectionText() != "") {
					$("#customhighlightv2").trigger( "touchend" );
				}
			}
        },
        threshold: 0,
        fingers: 'all'
    });
}
/* function initRightDrag is used for right swipe*/

function handleRightTouchStart(event) {
    var touches = event.changedTouches;
    initRightDrag();
    event.preventDefault();
    event.stopPropagation();
}

function initRightDrag() {
    if (currentPage == numberOfPages) {
        return false;
    }

    $(STORY_CONTENT).animate({
        left: "-" + (BOOK_WIDTH) * (currentPage + 1) + "px"
    }, 200);
    currentPage++;
    fnUpdateBookReading();
    fnUpdateUserCookies();
    GSWIPE = 1;
}
/* function initLeftDrag is used for right swipe*/

function handleLeftTouchStart(event) {
    var touches = event.changedTouches;
    initLeftDrag();
    event.preventDefault();
    event.stopPropagation();
}

function initLeftDrag() {

    if (currentPage > 0) {

        $(STORY_CONTENT).animate({
            left: "-" + (BOOK_WIDTH) * (currentPage - 1) + "px"
        }, 200);
        currentPage--;
        fnUpdateUserCookies();
        GSWIPE = 1;
    }
}
/* function fnUpdateUserCookies is used to update student reading book and page number */

function appendNoteHighlightElements()
{
	STORY_CONTENT.append("<div class=\"notetooltip\" id=\"notetooltip\" style=\"display:none;\"><ul><li><a id=\"highlightLink\">Highlight</a></li><li><a id=\"noteLink\">Note</a></li></ul><span class=\"arrow\"></span></div><div id=\"overlay\" style=\"display:none;\"></div><div class=\"addNoteBox\" style=\"display:none;\"><h1>Note</h1><textarea class=\"txt-area\" id=\"noteText\"></textarea><div id=\"addNoteButtons\"><input type=\"button\" id=\"addNoteOk\" value=\"Ok\" name=\"Ok\" class=\"note-btn\" /><input type=\"button\" id=\"addNoteCancel\" value=\"Cancel\" name=\"cancel\" class=\"note-btn\" /></div><div id=\"editNoteButtons\"><input type=\"button\" id=\"editNoteOk\" value=\"Ok\" name=\"Ok\" class=\"note-btn\" /><input type=\"button\" id=\"editNoteCancel\" value=\"Cancel\" name=\"cancel\" class=\"note-btn\" /><input type=\"button\" id=\"editNoteRemove\" value=\"Remove\" name=\"Remove\" class=\"note-btn\" /></div></div>");

	if (appDevice == 'webBrowser')
		$("#overlay").css("width", BOOK_WIDTH+84).css("height", BOOK_HEIGTH+92);
	else
		$("#overlay").css("width", BOOK_WIDTH).css("height", BOOK_HEIGTH);
		
	$(".selectionMenu").css({"width":BOOK_WIDTH	,"display":"none"});
	addNotePopupWidth = (BOOK_WIDTH*40)/100;
	addNotePopupLeft = ( (BOOK_WIDTH - addNotePopupWidth) / 2)-10;
	addNotePopupTop = (BOOK_HEIGTH - parseInt($(".addNoteBox").css("height"))) / 2;

	$(".addNoteBox").css("left",addNotePopupLeft).css("top",addNotePopupTop).css("width",addNotePopupWidth);
	$("#noteText").css("width",addNotePopupWidth-30);

	$("#overlay").on("click",function(){
		HIGHLIGHTER.removeHighlights($("."+uniq_timstamp));
		hideNoteHighlightTooltip();
	});

	$("#notetooltip #noteLink").on("click",function(){
		openAddNoteBox();
	});

	$("#notetooltip #highlightLink").on("click",function(){
		submitNoteToServer();
		hideNoteHighlightTooltip();
		uniq_timstamp = 0;
	});

	$("#addNoteOk").on("click",function(){
		try {
			$("body").scrollTop(0);
		} catch (e) {

		}
		$("."+uniq_timstamp).attr("note",$("#noteText").val()).addClass("note");
		insertNotePaperClip(uniq_timstamp);
		submitNoteToServer();
		$("#noteText").val("");
		hideNoteHighlightTooltip();
		uniq_timstamp = 0;
	});

	$("#addNoteCancel").on("click",function(){
		try {
			$("body").scrollTop(0);
		} catch (e) {

		}
		HIGHLIGHTER.removeHighlights($("."+uniq_timstamp));
		$("#noteText").val("");
		hideNoteHighlightTooltip();
		uniq_timstamp = 0;
	});

	$("#editNoteOk").on("click",function(){
		try {
			$("body").scrollTop(0);
		} catch (e) {

		}
		$("."+uniq_timstamp).attr("note",$("#noteText").val());
		submitNoteToServer();
		$("#noteText").val("");
		hideNoteHighlightTooltip();
		uniq_timstamp = 0;
	});

	$("#editNoteRemove").on("click",function(){
		try {
			$("body").scrollTop(0);
		} catch (e) {

		}
		HIGHLIGHTER.removeHighlights($("."+uniq_timstamp));
		$("#"+uniq_timstamp).remove();
		$("#noteText").val("");
		hideNoteHighlightTooltip();
		uniq_timstamp = 0;
		submitNoteToServer();
	});

	$("#editNoteCancel").on("click",function(){
		try {
			$("body").scrollTop(0);
		} catch (e) {

		}
		$("#noteText").val("");
		hideNoteHighlightTooltip();
		uniq_timstamp = 0;
	});
}

function hideNoteHighlightTooltip()
{
	$("#notetooltip").css("display","none");
	$("#overlay").css("display","none");
	$("#noteStartIdentifier").remove();
	$(".addNoteBox").css("display","none");
	$(".selectionMenu").css("display","none");
}

function showNoteHighlightTooltip()
{
	$("<font id=\"noteStartIdentifier\" style=\"visibility:hidden; width: 1px;\">A</font>").insertBefore( "."+uniq_timstamp+":first" );

	noteIdentifierPosition = $("#noteStartIdentifier").position();

	maxLeftPosition = (BOOK_WIDTH*currentPage)+80;
	maxRightPosition = (BOOK_WIDTH*(currentPage+1))-240;

	noteIdentifierTop = noteIdentifierPosition.top;
	noteIdentifierLeft = noteIdentifierPosition.left;

	$("#noteStartIdentifier").remove();

	notePositionObject = $("."+uniq_timstamp).position();
	tooltipTopPosition = notePositionObject.top;
	tooltipLeftPosition = notePositionObject.left;

	if (noteIdentifierLeft > tooltipLeftPosition && (noteIdentifierTop - tooltipTopPosition) < 5)
	{
		//alertMessage("first if");
		tooltipLeftPosition = noteIdentifierLeft-74;
	}
	else if (maxLeftPosition < tooltipLeftPosition)
	{
		//alertMessage("second if");
		tooltipLeftPosition = tooltipLeftPosition-71;
	}

	if (maxLeftPosition > tooltipLeftPosition)
	{
		//alertMessage("1. tooltipLeftPosition = "+tooltipLeftPosition+" maxLeftPosition = "+maxLeftPosition)
		if (noteIdentifierLeft > tooltipLeftPosition)
			tooltipLeftPosition = tooltipLeftPosition+60;
		$("#notetooltip .arrow").css("margin-left","5px");
	}
	else if (maxRightPosition < tooltipLeftPosition)
	{
		//alertMessage("2. tooltipLeftPosition = "+tooltipLeftPosition+" maxRightPosition = "+maxRightPosition)
		$("#notetooltip .arrow").css("margin-left",( parseInt($("#notetooltip").css("width")) - 40)+"px");
		tooltipLeftPosition = tooltipLeftPosition-33;
	}
	else
	{
		//alertMessage("3. tooltipLeftPosition = "+tooltipLeftPosition);
		tooltipLeftPosition = tooltipLeftPosition+10;
		$("#notetooltip .arrow").css("margin-left","auto");
	}

	$("#notetooltip").css("display","block").css("top",(tooltipTopPosition-50)+"px").css("left",tooltipLeftPosition+"px");
	$("#overlay").css("display","block");
}

function openAddNoteBox()
{
	$("#addNoteButtons").css("display","none");
	$("#editNoteButtons").css("display","none");

	if (typeof $("."+uniq_timstamp).attr("note") != "undefined"){
		$("#editNoteButtons").css("display","");
		$("#noteText").val($("."+uniq_timstamp).attr("note"));
	}
	else{
		$("#addNoteButtons").css("display","");
		$("#noteText").val("");
	}

	$("#notetooltip").css("display","none");
	$(".addNoteBox").css("display","block");
}

function fnUpdateUserCookies()
{
    var jsonDataLocal = theOrientation + "||||" + currentPage + "||||" + intUserId;
    var _cookie_name = "Restorepage" + strBookUID + intUserId;
	saveData(_cookie_name, jsonDataLocal);
}

/*************************************************
 *                for turn page                 *
 *************************************************/

function turnPage() {

    if (currentPage == 0) {
        STORY_CONTENT.css("left", "");
    } else if (currentPage > numberOfPages) {
        calculateNumberOfPage(numberOfPages);
        STORY_CONTENT.css("left", "-" + (BOOK_WIDTH) * (numberOfPages) + "px");
    } else {
        STORY_CONTENT.css("left", "-" + (BOOK_WIDTH) * (currentPage) + "px");
    }
}

function calculateNumberOfPage(topage) {
    if(APP_MODE == 0)
    {
        fnChangeLevelContent();
    }

    if ($(".quizcontainer")[0])
        $('.quizcontainer:visible').append('<div class="endOfStoryLocater">--</div>');
    else
    if (VISIBLE_OBJ[0])
        VISIBLE_OBJ.append('<div class="endOfStoryLocater">--</div>');
    else
        STORY_CONTENT.append('<div class="endOfStoryLocater">--</div>');

    var pageNum         = 0;
    var pagesCalculated = false;
    var EODObj          = $('.endOfStoryLocater:last');

    // hack for avoid looping
    pageNum = parseInt(Math.round(EODObj.position().left / BOOK_WIDTH), 10);
    if (parseInt(EODObj.position().top, 10) < 100)
    {
        pageNum--;
    }

    /*currentPage   = pageNum;
    currentPage   = (typeof topage == 'undefined') ? 0 : topage;*/
    numberOfPages = pageNum;

    $(".endOfStoryLocater").remove();
    _LOADED = 1;
    if (currentPage > numberOfPages) {
        currentPage = numberOfPages;
        fnnumRestorePage(currentPage);
    }
    return currentPage;
}

function remove_selection()
{
	try { document.selection.removeAllRanges(); } catch (e) {  }
	try { window.getSelection().removeAllRanges(); } catch (e) {  }

	$(".selectionMenu").css("display","none");
	STORY_CONTENT.addClass("elememt_unselectable");
	STORY_CONTENT.removeClass("elememt_unselectable");
}

function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}

function init_flip() {
    BOOK_HEIGTH = $(window).height();
    BOOK_WIDTH  = $(window).width();

	if (appDevice == 'webBrowser')
	{
	    theOrientation = (BOOK_HEIGTH >= BOOK_WIDTH) ? 'portrait' : 'landscape';

		BOOK_WIDTH = BOOK_WIDTH - 70;
		BOOK_HEIGTH = BOOK_HEIGTH - 110;

	    numberOfPages = 0;

	    STORY_WIDTH = (BOOK_HEIGTH >= BOOK_WIDTH) ? (BOOK_WIDTH) : (BOOK_WIDTH / 2);
		STORY_WIDTH = STORY_WIDTH - 130;
	    CONTENT_HEIGHT = BOOK_HEIGTH;

	    CONTENT_MAIN.css("width", BOOK_WIDTH).css("height", BOOK_HEIGTH).css("margin","0");

	    STORY_CONTENT.css("-moz-column-width", STORY_WIDTH).css("-webkit-column-width", STORY_WIDTH).css("column-width", STORY_WIDTH).css("width", BOOK_WIDTH-50).css("height", BOOK_HEIGTH).css("padding","50px 0 0 50px");

	    STORY_CONTENT.css("column-rule", '1px solid #C9CACC').css("-moz-column-rule", '1px solid #C9CACC').css("-webkit-column-rule", '1px solid #C9CACC');

		$(".bookActions").css({"right":"100px","top":"70px"});
		
		//$("#debuger").css({"width":BOOK_WIDTH});
		$("#debuger").css({"display":"none"});
	}
	else
	{
	    theOrientation = (BOOK_HEIGTH >= BOOK_WIDTH) ? 'portrait' : 'landscape';
	    numberOfPages = 0;

	    STORY_WIDTH = (BOOK_HEIGTH >= BOOK_WIDTH) ? (BOOK_WIDTH) : (BOOK_WIDTH / 2);
	    CONTENT_HEIGHT = BOOK_HEIGTH;

	    CONTENT_MAIN.css("width", BOOK_WIDTH).css("height", BOOK_HEIGTH);

	    STORY_CONTENT.css("-moz-column-width", STORY_WIDTH - T_OFFSET).css("-webkit-column-width", STORY_WIDTH - T_OFFSET).css("column-width", STORY_WIDTH - T_OFFSET).css("width", BOOK_WIDTH - T_OFFSET).css("height", BOOK_HEIGTH - (T_OFFSET) - 20);

	    STORY_CONTENT.css("column-rule", '1px solid #C9CACC').css("-moz-column-rule", '1px solid #C9CACC').css("-webkit-column-rule", '1px solid #C9CACC');
	}

    currentPage = 0;
}

function fnArrangeImage(columnHeight)
{
    var maxHeight = (columnHeight * 5 / 10);
    $("body").append("<style type='text/css'>.story_content img { max-height:" + maxHeight + "px; max-width:96%;}</style>");
}

function jump2page(strpart) {

    fnArrangeImage(CONTENT_HEIGHT);
    calculateNumberOfPage(0);
    // currentPage = 0;
    turnPage();
    if (strpart == 2)
    {
        currentPage = parseInt(Math.round($(".sectionbreak:visible").position().left / BOOK_WIDTH));
        turnPage();
    }
    else if (strpart == 1)
    {
        fnGotoPage("story1");
    }
}

function alertMessage(message)
{
    if (appDevice == 'iPad')
    {
        alert(message);
    }
    else if (appDevice == "Android")
    {
        JsHandler.alert(message);
    }
    else
    {
        console.log(message);
    }
}
