/************************************************
 *		     gloabal variable declaration       *
 ************************************************/
var BOOK_HEIGTH, BOOK_WIDTH, numberOfPages, currentPage, theOrientation, STORY_WIDTH, CONTENT_HEIGHT, host, intUserId, appDevice, HEIGHT_CONTENT, intText_index, JSON_OPT, strWSMETHOD, belongto_global, sel_text_2note, GLOB_HIGHLITE_CLAS, VISIBLE_OBJ, scripts_load, numRestorePage, _restored, rightfoldObj, leftfoldObj, NOTE_TXT_FROM_ANDRIOD = '', ElementText, ElementHtml, ArrElementText, APP_MODE = 1, intClearCookies = 0;

var the_book_name = "Gold Rush";
var strUserLevel = '1';

var intDefultBookId = '57';
var T_OFFSET = 100;
var strBookUID = "0qwdfbn6ygb";
var strDeviceId = "MYDEVICE_ID";
var strChapterId = '1';
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
var intUserId = 1;
var inttokenID = "1";
var arrChapters = new Array();

var _restored = 0;

/////////////////////////// START OF LOAD HTML TO BUK ////////////////////////////////////////
$('body').append('<input type="hidden" id="jsonText_holder" name="jsonText_holder" /><input type="hidden" id="jsonMethod_holder" name="jsonMethod_holder" /><div class="bookActions"><div class="fontresizer fl"></div><div class="uparrow bookPopup"></div><div class="fontresizer_popup bookPopup"><a id="jfontsize-m" class="jfontsize-button jfontsize_minus"></a><a id="jfontsize-d" class="jfontsize-button jfontsize"></a><a id="jfontsize-p" class="jfontsize-button jfontsize_plus"></a></div></div><div class="tooltip-content" id="note"></div><div class="user_helpsec dyn_position"><div class="mid"><input type="hidden" class="hidden_selectedstr" value="" /><input type="hidden" class="hidden_uniqtime" value="" /><a class="_1 highlight_icon fl" title="Highlight" href="javascript:void(0);" onclick="highlightme_(0);"></a><a class="_1 seperator" href="javascript:void(0);"></a><a class="_2 removenote_icon fl BtnObject" title="Remove note" href="javascript:void(0);"></a><a class="_2 seperator" href="javascript:void(0);"></a><a class="noteIcon BtnObject" onclick="fnGetUserAddedNote(\'1_1_1\');" title="Note popup here" href="javascript:void(0);"></a><a class="seperator" href="javascript:void(0);"></a><a class="help_icon fl helptooltip" title="Coming soon.." href="javascript:void(0);"></a><a class="seperator" href="javascript:void(0);"></a><a class="seperator close_note_" title="Close">x</a></div></div><div class="foot_pagination elememt_unselectable"><div id="paginationBookSlider"></div><div id="_pag_nos"></div></div><div id="customhighlightv2"></div>');

/////////////////////////// END OF LOAD HTML TO BUK ////////////////////////////////////////

var CONTENT_MAIN = $("#content");
var STORY_CONTENT = $(".story_content");
HEIGHT_CONTENT = STORY_CONTENT.height();
var GSWIPE = 0;
var PREVENTTAB = 0;
var TWOEVENTSTART = 'touchstart';
var TWOEVENTEND = 'touchend';
var HIGHLIGHTER;

/***** Append left and right fold*****/
$(CONTENT_MAIN).append('<div id="leftfold"></div><div id="rightfold"></div>');

$(document).ready(function() {
	window.location = 'inapp://fnGetValuesFromApp';

	// initView();
});

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
    leftfoldObj = $("#leftfold");

    init_flip();

    if (navigator.appVersion.indexOf("iPad") != -1 || navigator.appVersion.indexOf("iPhone") != -1)
	{
        appDevice = 'iPad';
        rightfoldObj.css("width", '0px');
        leftfoldObj.css("width", '0px');
	}
    else if (navigator.appVersion.indexOf("Android") != -1)
	{
        appDevice = 'Android';
        document.getElementById("rightfold").addEventListener("touchend", handleRightTouchStart, false);
        document.getElementById("leftfold").addEventListener("touchend", handleLeftTouchStart, false);
	}
	else
	{
        appDevice = 'webBrowser';
        rightfoldObj.live("mouseup", function(e) {
            initRightDrag(e.pageX);
        });
        leftfoldObj.live("mouseup", function(e) {
            initLeftDrag(e.pageX);
        });
    }

    $(".fontresizer").live(TWOEVENTSTART, function(e) {
        $(".fontresizer_popup").toggle();
        $(".uparrow").toggle();

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
        }
    });

	HIGHLIGHTER = $('#story_content').getHighlighter();

    /*$(".jfontsize-button").live(TWOEVENTSTART, function(e) {
		fnHideNoteDisplayData();
		calculateNumberOfPage(currentPage);
    });*/

    $(CONTENT_MAIN).bind('touchend', function(event) {

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

    var thirtyPercentageWidth = parseInt((BOOK_WIDTH * 30) / 100);
    var intPageMidPoint = parseInt(BOOK_WIDTH / 2);

    fnArrangeImage(BOOK_HEIGTH);

    var intPageX = 0;

    $(CONTENT_MAIN).swipe({
        swipeStatus: function(event, phase, direction, distance, duration, fingers) {
			if($(event.target).hasClass('icon_tinynote')) {
				return false;
			}

            var tempPagestart = currentPage;

            if (phase == 'move') {
                event.stopPropagation();
                PREVENTTAB = 1;
                if (appDevice == 'iPad') {
                    window.location = 'inapp://removeMenuBarItem?selectedstr=';
                }
            } else if (phase == 'end') {
                PREVENTTAB = 0;
            }

            if (intPageX == 0) {
                intPageX = event.pageX;
            }

            remove_selection();

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
                    $(STORY_CONTENT).animate({ left: "-" + (BOOK_WIDTH) * (currentPage + 1) + "px" }, {
                        duration: 200, complete: function() { ++currentPage; fnUpdateBookReading(); fnUpdateUserCookies(); }
                    });
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
						$(STORY_CONTENT).animate({ left: "-" + (BOOK_WIDTH) * (currentPage - 1) + "px" }, {
							duration: 200,
                            complete: function() { --currentPage; fnUpdateBookReading(); fnUpdateUserCookies(); }
                        });
                    }
                }
			}
			else if ((phase == 'end' || phase == 'cancel') && direction == null && distance == 0 && appDevice == 'iPad') {
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

function fnUpdateUserCookies() {
	var jsonDataLocal = theOrientation + "||||" + currentPage + '||||' + intUserId;
	var _cookie_name  = "Restorepage" + strBookUID + intUserId;
    saveData(_cookie_name, jsonDataLocal);
}

/*************************************************
 *                 for turn page                 *
 *************************************************/

function turnPage() {
    remove_selection();

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

    if (window.APP_MODE == 0)
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

    var pageNum = 0;
    var pagesCalculated = false;
    var EODObj = $('.endOfStoryLocater:last');

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
    if (window.getSelection().empty)
    {
        window.getSelection().empty();
    }
}

function init_flip() {
    BOOK_HEIGTH = $(window).height();
    BOOK_WIDTH = $(window).width();

    theOrientation = (BOOK_HEIGTH >= BOOK_WIDTH) ? 'portrait' : 'landscape';
    numberOfPages = 0;

    STORY_WIDTH = (BOOK_HEIGTH >= BOOK_WIDTH) ? (BOOK_WIDTH) : (BOOK_WIDTH / 2);
    CONTENT_HEIGHT = BOOK_HEIGTH;

    CONTENT_MAIN.css("width", BOOK_WIDTH).css("height", BOOK_HEIGTH);

	rightfoldObj.css("height", BOOK_HEIGTH);
	leftfoldObj.css("height", BOOK_HEIGTH);

    STORY_CONTENT.css("-moz-column-width", STORY_WIDTH - T_OFFSET).css("-webkit-column-width", STORY_WIDTH - T_OFFSET).css("column-width", STORY_WIDTH - T_OFFSET).css("width", BOOK_WIDTH - T_OFFSET).css("height", BOOK_HEIGTH - (T_OFFSET) - 20);

    STORY_CONTENT.css("column-rule", '1px solid #C9CACC').css("-moz-column-rule", '1px solid #C9CACC').css("-webkit-column-rule", '1px solid #C9CACC');

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
        alert(message);
    }
}
