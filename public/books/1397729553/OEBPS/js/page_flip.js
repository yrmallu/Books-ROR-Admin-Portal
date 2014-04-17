/************************************************
 *           gloabal variable declaration       *
 ************************************************/
var BOOK_HEIGTH, BOOK_WIDTH, numberOfPages, currentPage, theOrientation, STORY_WIDTH, CONTENT_HEIGHT, host, intUserId, strUserLevel, appDevice, HEIGHT_CONTENT, intText_index, JSON_OPT, strWSMETHOD, belongto_global, sel_text_2note, GLOB_HIGHLITE_CLAS, VISIBLE_OBJ, scripts_load, numRestorePage, _restored, rightfoldObj, leftfoldObj,
	NOTE_TXT_FROM_ANDRIOD = '';

var ElementText, ElementHtml, ArrElementText;

if (0)
	host = "http://107.21.250.244/epub_live/ws_v2/index.php";
else
	host = "http://localhost/epub_web/trunk/API/ws_v2/index.php";

var the_book_name    = "Cinderella";
var W_SOCKET_ENABLED = 0;
var strUserLevel     = '1';

var intDefultBookId   = '48';
var T_OFFSET          = 100;
var strBookUID        = "ijkgusi76asiasuih";
var strDeviceId       = "MYDEVICE_ID";
var strChapterId      = '1';
var intUserLevel      = 2;
var intUserWrongCount = 0;
var strQuePopupId     = ".quiz";
var quiz_load_to      = ".al_quize_load_clas";
var al_strQuePopupId  = ".al_quiz";
var strLoaderId       = ".quize_load";
var al_strLoaderId    = ".al_quize_load";
var current_ques      = 0;
var strLoginBoxId     = "#login_box";
var currentPage       = 0;
var uniq_timstamp     = 0;
var intUserId         = 1;
var inttokenID        = "1";

var strRedirect      = "story1.xhtml";
var arrChapters      = new Array();
var BOOK_MARK_PAGES  = new Array();
var BOOK_MARK_UNIQUE = new Array();

var intText_index = 0;
var _stopfurther  = 0;
var _LOADED       = 0;
var _restored     = 0;
//var initWs                = 0;
/////////////////////////// START OF LOAD HTML TO BUK ////////////////////////////////////////
$('body').append('<input type="hidden" id="jsonText_holder" name="jsonText_holder" /><input type="hidden" id="jsonMethod_holder" name="jsonMethod_holder" /><div class="bookActions"><div class="fontresizer fl"></div><div class="uparrow bookPopup"></div><div class="fontresizer_popup bookPopup"><a id="jfontsize-m" class="jfontsize-button jfontsize_minus"></a><a id="jfontsize-d" class="jfontsize-button jfontsize"></a><a id="jfontsize-p" class="jfontsize-button jfontsize_plus"></a></div></div><div class="tooltip-content" id="note"></div><div class="user_helpsec dyn_position"><div class="mid"><input type="hidden" class="hidden_selectedstr" value="" /><input type="hidden" class="hidden_uniqtime" value="" /><a class="_1 highlight_icon fl" title="Highlight" href="javascript:void(0);" onclick="highlightme_(0);"></a><a class="_1 seperator" href="javascript:void(0);"></a><a class="_2 removenote_icon fl BtnObject" title="Remove note" href="javascript:void(0);"></a><a class="_2 seperator" href="javascript:void(0);"></a><a class="noteIcon BtnObject" onclick="fnGetUserAddedNote(\'1_1_1\');" title="Note popup here" href="javascript:void(0);"></a><a class="seperator" href="javascript:void(0);"></a><a class="help_icon fl helptooltip" title="Coming soon.." href="javascript:void(0);"></a><a class="seperator" href="javascript:void(0);"></a><a class="seperator close_note_" title="Close">x</a></div></div><div class="foot_pagination elememt_unselectable"><div id="paginationBookSlider"></div><div id="_pag_nos"></div></div><div class="popup_wrapper"> <div id="popup_box"><h3 class="paragraph_title">Choose your level</h3><div class="lavel_blockmarg"><div id="level1" data-level="1" class="level_chooser BtnObject"><b>Level 1</b><br /><span>Suggested Ages 8 - 10</span></div><div id="level2" data-level="2" class="level_chooser BtnObject"><b>Level 2</b><br /><span>Suggested Ages 10 - 12</span></div><div id="level3" data-level="3" class="level_chooser BtnObject"><b>Level 3</b><br /><span>Suggested Ages 12 - 14</span></div><a  href= "javascript:void(0);" onclick="FnHidePopup();" class="popupBoxClose"></a></div></div></div>');
/////////////////////////// END OF LOAD HTML TO BUK ////////////////////////////////////////

var CONTENT_MAIN        = $("#content");
var STORY_CONTENT       = $(".story_content");
HEIGHT_CONTENT          = STORY_CONTENT.height();
var BOOKMARK_TXTSRCH    = 0;
var GSWIPE              = 0;
var PREVENTTAB          = 0;
var TWOEVENTSTART       = 'touchstart';
var TWOEVENTEND         = 'touchend';
var boolLoadAssignLevel = 0;
/***** Append left and right fold*****/
$(CONTENT_MAIN).append('<div id="leftfold"></div><div id="rightfold"></div>');
//$(CONTENT_MAIN).prepend('<div id="id_test"></div>');
$(document).ready(function() {
	initView();

	window.location = 'inapp://fnGetAppMode';
});

function initView() {

	$(".quizcontainer").addClass("elememt_unselectable");

	intUserLevel = getData("epub_myuserlevel");

	if (typeof intUserLevel == 'undefined' || intUserLevel == null) intUserLevel = 2;


	saveData("epub_" + intDefultBookId + "_intUserId", intUserId);
	saveData("epub_" + intDefultBookId + "_intUserLevel", intUserLevel);
	strUserLevel = intUserLevel;


	$("#al_quiz_header book_name").text(the_book_name);
	rightfoldObj = $("#rightfold");
	leftfoldObj = $("#leftfold");



	/**** Page Flip ****/
	_cue_init_flip(); // initiate flip

	//JsHandler.alert("cue flip");

	if (navigator.appVersion.indexOf("iPad") != -1 || navigator.appVersion.indexOf("iPhone") != -1) {
		appDevice = 'iPad';
		//document.getElementById("rightfold").addEventListener("touchend", handleRightTouchStart, false);
		//document.getElementById("leftfold").addEventListener("touchend", handleLeftTouchStart, false);
		rightfoldObj.css("width", '0px');
		leftfoldObj.css("width", '0px');

	} else if (navigator.appVersion.indexOf("Android") != -1) {
		appDevice = 'Android';
		document.getElementById("rightfold").addEventListener("touchend", handleRightTouchStart, false);
		document.getElementById("leftfold").addEventListener("touchend", handleLeftTouchStart, false);
	} else {
		appDevice = 'webBrowser';
		rightfoldObj.live("mouseup", function(e) {
			initRightDrag(e.pageX);
		}); // when you select to drag
		leftfoldObj.live("mouseup", function(e) {
			initLeftDrag(e.pageX);
		});
	}


	/*
	Bind Notes Action Events // touchend taphold
	*/
	$(".contentsearch").live(TWOEVENTSTART, function(e) {
		$(".bookPopup").hide();
		$(".searchbox").toggle();
		$(".searchbox input[type=text]").focus();
		$(".uparrow").toggle();
	});

	$(".fontresizer").live(TWOEVENTSTART, function(e) {
		//$(".bookPopup").hide();
		$(".fontresizer_popup").toggle();
		$(".uparrow").toggle();

	});

	//JsHandler.alert("after fontresizer");


	//STORY_CONTENT
	CONTENT_MAIN.jfontsize({
		btnMinusClasseId: '#jfontsize-m',
		btnDefaultClasseId: '#jfontsize-d',
		btnPlusClasseId: '#jfontsize-p'
	});
	//STORY_CONTENT.live('mouseup keyup',function(e){ e.preventDefault(); init_txt_selection_event(); });

	$(".jfontsize-button").live(TWOEVENTSTART, function(e) {

		fnHideNoteDisplayData();
		calculateNumberOfPage(currentPage);

	});

	$(".InitSearch").live(TWOEVENTSTART, function(e) {
		var searchElement = $(".searchInput").val();
		if (searchElement != '') {
			fnFlipbookSearch(searchElement);
		}
	});

	//JsHandler.alert("below  InitSearch");

	/*$(".bookmark").live('touchstart',function(e){
		if(!$(this).hasClass("bookmark_deact")) {
			var intBookmarkPageUniqueId = "";

			intBookmarkPageUniqueId = BOOK_MARK_UNIQUE[currentPage];
			fnChangeBookMarkIcon("disable");
			fnRemoveBookMarkPages(intBookmarkPageUniqueId,currentPage);

			return false;
	}*/

	/*if(BOOKMARK_TXTSRCH)
		strFinalString = fnGetVisibleContent();
		else
		strFinalString = '';

		$(".bookPopup").hide();
		remov_selection();
		if($(this).hasClass("bookmark_deact")) {
			fnChangeBookMarkIcon("enable");
			fnAddBookMarkPages(currentPage,strFinalString); //+1
		}
	});*/

	$(CONTENT_MAIN).bind('touchstart', function(event) {
		if (appDevice == 'iPad') {
			//  remove_selection();
		}
	});

	/* on tab fire below event*/
	$(CONTENT_MAIN).bind('touchend', function(event) {

		$(".fontresizer_popup").hide();
		$(".uparrow").hide();

		if (PREVENTTAB == 0) {
			var strTarget = $(event.target).is('.ithas_note');
			var iconTarget = $(event.target).is('.icon_tinynote');
			if (strTarget == false && iconTarget == false) {
				if (appDevice == 'Android') {
					JsHandler.showReaderMenu();
				} else {

				}
			}
		}
	});


	if (appDevice == 'Android') {
		//  JsHandler.alert("above load");
	}

	fnLoadAssignedLevel();

	var thirtyPercentageWidth = parseInt((BOOK_WIDTH * 30) / 100);
	var intPageMidPoint = parseInt(BOOK_WIDTH / 2);

	fnArrangeImage(BOOK_HEIGTH, BOOK_WIDTH);

	var intPageX = 0;

	$(CONTENT_MAIN).swipe({
		swipeStatus: function(event, phase, direction, distance, duration, fingers) {

			// Store current page number
			var tempPagestart = currentPage;

			if (phase == 'move') {
				event.stopPropagation();
				PREVENTTAB = 1;
				if (appDevice == 'iPad') {
					window.location = 'inapp://removeMenuBarItem?selectedstr=asdasdsad';
				}
			} else if (phase == 'end') {
				PREVENTTAB = 0;
			}

			if (intPageX == 0) {
				intPageX = event.pageX;
			}

			remove_selection();
			//alert("Phase is :"+phase+" You swiped " + typeof direction + " with " + fingers + " fingers and distance is "+ distance+" x-value=="+event.pageX);

			/*** This code used when click on left and right fold ***/
			if (GSWIPE == 1) {
				GSWIPE = 0;
				return false;
			}
			/*** This code used when click on left and right fold ***/

			if (currentPage == numberOfPages && direction == 'left') {
				return false;
			} // if student at last page don;t swipe at left side


			if (phase == 'move' && direction == 'left') {
				$(".icon_tinynote").hide();
				$(STORY_CONTENT).css("left", "-" + ((BOOK_WIDTH) * (currentPage) + distance) + "px");
			} else if (phase == 'end' && direction == 'left') {
				intPageX = 0;
				$(".icon_tinynote").hide();
				if (distance <= thirtyPercentageWidth) {
					$(STORY_CONTENT).animate({
						left: "-" + (BOOK_WIDTH) * (currentPage) + "px"
					}, {
						// After completing animation show paperclips
						duration: 200,
						complete: function() {
							if (tempPagestart == currentPage) {
								fnNoteiconVisibility(1, 'restore_orig');
							}
						}
					});

				} else {

					$(STORY_CONTENT).animate({
						left: "-" + (BOOK_WIDTH) * (currentPage + 1) + "px"
					}, {
						duration: 200,
						complete: function() {
							currentPage++;
							fnNoteiconVisibility(0, 'left');
							fnUpdateBookReading();
						}
					});
				}

			} else if (phase == 'move' && direction == 'right') {
				$(".icon_tinynote").hide();
				$(STORY_CONTENT).css("left", "-" + ((BOOK_WIDTH) * (currentPage) - distance) + "px");
			} else if (phase == 'end' && direction == 'right') {
				intPageX = 0;
				if (currentPage > 0) {
					$(".icon_tinynote").hide();
					if (distance <= thirtyPercentageWidth) {
						$(STORY_CONTENT).animate({
							left: "-" + (BOOK_WIDTH) * (currentPage) + "px"
						}, {
							// After completing animation show paperclips
							duration: 200,
							complete: function() {
								if (tempPagestart == currentPage) {
									fnNoteiconVisibility(1, 'restore_orig');
								}
							}
						});
					} else {

						$(STORY_CONTENT).animate({
							left: "-" + (BOOK_WIDTH) * (currentPage - 1) + "px"
						}, {
							duration: 200,
							complete: function() {
								currentPage--;
								fnNoteiconVisibility(0, 'right');
								fnUpdateBookReading();
							}
						});
					}
				}
			} else if ((phase == 'end' || phase == 'cancel') && direction == null && distance == 0 && appDevice == 'iPad') {

				if (numberOfPages === undefined || numberOfPages == 0) {
					calculateNumberOfPage(currentPage);
				}

				if (intPageX <= 60) {
					if (currentPage > 0) {
						fnNoteiconVisibility(0, 'clickright');
						$(STORY_CONTENT).animate({
							left: "-" + (BOOK_WIDTH) * (currentPage - 1) + "px"
						}, 200);
						currentPage--;
						fnUpdateUserCookies();
						GSWIPE = 1;
					}
				} else if (intPageX >= (BOOK_WIDTH - 60)) {
					if (currentPage < numberOfPages) {
						fnNoteiconVisibility(0, 'clickleft');
						$(STORY_CONTENT).animate({
							left: "-" + (BOOK_WIDTH) * (currentPage + 1) + "px"
						}, 200);
						currentPage++;
						fnUpdateBookReading();
						GSWIPE = 1;
					}
				}
				intPageX = 0;
			} else if (phase == 'start' && direction == null && distance == 0 && appDevice == 'iPad') {
				_selectedstr = window.getSelection().toString()
				if (_selectedstr != "")
					window.location = 'inapp://removeMenuBarItem';
			}

		},
		threshold: 0,
		fingers: 'all'
	});

	//JsHandler.alert("after swipe effect");

	/*window.addEventListener('load', function() {

	}, false);*/

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

	fnNoteiconVisibility(0, 'clickleft');
	$(STORY_CONTENT).animate({
		left: "-" + (BOOK_WIDTH) * (currentPage + 1) + "px"
	}, 200);
	currentPage++;
	fnUpdateBookReading();
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

		fnNoteiconVisibility(0, 'clickright');
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
	var jsonDataLocal = theOrientation + "||||" + currentPage + "||||" + intUserId;
	var _cookie_name = "Restorepage" + strBookUID;
	saveData(_cookie_name, jsonDataLocal);
}

/*
 * Function fnGetVisibleContent : For bookmarking & getting last reading position of book
 */

function fnGetVisibleContent() {
	var startIndex = 0;
	var objChildElements = $("#story_content").find('*:visible');
	var IntElementsCount = objChildElements.length;
	var finalString = '';
	var strFinalString = '';
	var ElementFound = ESearch(startIndex, IntElementsCount, CANVAS_WIDTH, objChildElements);

	var ElementHTML = ElementFound.html();
	ArrElementText = ElementFound.text().split(" ");
	if (0) {
		var lOffset = (ArrElementText.length < 40) ? ArrElementText.length : 40;
		finalString = ArrElementText.slice(0, lOffset).join(" ");
	} else {
		var boolElementFount = false;
		var intStartIndex = 0;
		var intEndIndex = ArrElementText.length;
		var intMiddleElement = 0;

		while (boolElementFount == false) {
			intMiddleElement = (intStartIndex + intEndIndex) / 2;
			strSearchString = $.trim(ArrElementText.slice(intMiddleElement - 2, intMiddleElement + 2).join(" "));
			try {
				ElementFound.html(ElementHTML.replace(strSearchString, "<i class='viewSearch' style='background: red;'>" + strSearchString + "</i>"));
				if ($(".viewSearch").position().left < 0) {
					intStartIndex = intMiddleElement;
				} else {
					boolElementFount = true;
				}
			} catch (e) {
				intStartIndex = intMiddleElement;
			}
		}

		var intFoundEndPosition = intMiddleElement;
		var intFoundStartPosition = 0;
		var intOffsetLength = 4;
		ArrElementText = fncleanArray(ArrElementText);
		while (intMiddleElement > intFoundStartPosition) {

			strSearchString = ArrElementText.slice(intMiddleElement - 4, intMiddleElement).join(" ");
			try {
				ElementFound.html(ElementHTML.replace(strSearchString, "<i class='viewSearch' style='background: red;'>" + strSearchString + "</i>"));
				if ($(".viewSearch").position().left > 0) {
					intMiddleElement = intMiddleElement - intOffsetLength;
				} else {
					break;
				}
			} catch (e) {
				intMiddleElement = intMiddleElement - intOffsetLength;
			}
		}

		intFoundStartPosition = (intMiddleElement < 0) ? 0 : intMiddleElement;
		var strFinalString = ArrElementText.slice(intFoundStartPosition, intFoundEndPosition).join(" ");

		if (strFinalString.length > 30) {
			var strFinalString = strFinalString.substr(0, 30);
		}

		ElementFound.html(ElementHTML);

		arrNewBookMarkString = strFinalString.split("\n");
		var arrNewBookMarkStringNew = new Array();
		for (var i = 0; i <= (arrNewBookMarkString.length - 1); i++) {

			if (arrNewBookMarkString[i] != '' && typeof arrNewBookMarkString[i] != "undefined" && arrNewBookMarkString[i] != "undefined") {
				arrNewBookMarkStringNew[i] = arrNewBookMarkString[i];
			}
		}

		arrNewBookMarkString = new Array();
		arrNewBookMarkString = arrNewBookMarkStringNew;

		strFinalString = arrNewBookMarkString[(arrNewBookMarkString.length) - 1];

	}
	return strFinalString;
}

function ESearch(startIndex, IntElementsCount, viewportwidth, objChildElements) {
	if (startIndex >= IntElementsCount) {
		console.log("sampla !");
		return false;
	}
	var currentIndex = parseInt((startIndex + IntElementsCount) / 2);
	var currentElement = objChildElements.eq(currentIndex);
	var currentElementParent = currentElement.parent();
	var currentElementTag = currentElement.prop('tagName');
	var EleposLeft = currentElement.position().left;
	var parentElementWidth = currentElementParent.width();
	var intBlankElementCount = 0;


	if ((IntElementsCount - startIndex) == 1) {

		if (EleposLeft > 0) {
			return currentElement;
		} else {

			intBlankElementCount = 0;
			// TO CHECK IF ELEMENTS' HAS VISIBLE SIBLING
			try {
				while (currentElement.next().position().left < 0) {
					currentElement = currentElement.prev();
					if (currentElement.html() == "")
						intBlankElementCount++;
				}

				for (intLoopCount = 0; intLoopCount < intBlankElementCount; intLoopCount++) {
					currentElement = currentElement.next();
				}

			} catch (err) {}
			intBlankElementCount = 0;


			try {
				var cntLoadParent = 0;
				do {
					cntLoadParent++;
					currentElementPrev = currentElement.prev();
					currentElementPrev.append('<i id="ParentPush' + cntLoadParent + '"></i>');
					intParentLeft = $("#ParentPush" + cntLoadParent).position().left;
					if (intParentLeft > 0) {
						currentElement = currentElementPrev;
					}
					if (intParentLeft <= 0) {
						currentElement.parent().prev().append('<i id="ParentPush' + cntLoadParent + '"></i>');
						intParentLeft = $("#ParentPush" + cntLoadParent).position().left;
						if (intParentLeft > 0) {
							currentElement = currentElement.parent().prev();
						}
					}

					$("#ParentPush" + cntLoadParent).remove();

				} while (intParentLeft > 0)
			} catch (err) {}


			while (currentElement.prop('tagName') == "br" || currentElement.prop('tagName') == "IMG" || $.trim(currentElement.text()) == "") {
				currentElement = currentElement.parent();
			}

			return currentElement;
		}

	}
	if (EleposLeft < 0) {

		if ((currentElementTag == "br" || currentElementTag == "IMG") && (currentElementParent.position().left + parentElementWidth) > 0) {
			return currentElementParent;
		} else {
			startIndex = currentIndex;
			return ESearch(startIndex, IntElementsCount, viewportwidth, objChildElements);
		}
	} else {
		if (EleposLeft == 0) {
			return currentElement;
		} else if (EleposLeft > 0 && EleposLeft <= viewportwidth) {

			if ((currentElementTag == "br" || currentElementTag == "IMG") && (EleposLeft + parentElementWidth) > 0) {
				currentElement = currentElementParent;
			} else if ((currentElementTag == "br" || currentElementTag == "IMG") && (EleposLeft + parentElementWidth) < 0) {
				startIndex = currentIndex--;
				return ESearch(startIndex, IntElementsCount, viewportwidth, objChildElements);
			}

			// TO CHECK IF ELEMENTS' HAS VISIBLE SIBLING
			intBlankElementCount = 0;
			try {
				while ((currentElement.prev().position().left + currentElement.prev().width()) > 0) { // 4/6/13
					currentElement = currentElement.prev();
					if (currentElement.html() == "")
						intBlankElementCount++;
				}


				for (intLoopCount = 0; intLoopCount < intBlankElementCount; intLoopCount++) {
					currentElement = currentElement.next();
				}
			} catch (err) {}

			// TO CHECK IF ELEMENT PARENTS' HAS VISIBLE SIBLING

			intBlankElementCount = 0;
			try {

				if (currentElement.parent().prev().position().left > 0) {

					currentElement = currentElement.parent().prev();
					while (currentElement.prev().position().left > 0) {
						currentElement = currentElement.prev();
						if (currentElement.html() == "")
							intBlankElementCount++;
					}

					for (intLoopCount = 0; intLoopCount < intBlankElementCount; intLoopCount++) {
						currentElement = currentElement.next();
					}

				}

			} catch (err) {}


			try {
				var cntLoadParent = 0;
				do {
					cntLoadParent++;
					currentElementPrev = currentElement.prev();
					currentElementPrev.append('<i id="ParentPush' + cntLoadParent + '"></i>');
					intParentLeft = $("#ParentPush" + cntLoadParent).position().left;
					if (intParentLeft > 0) {
						currentElement = currentElementPrev;
					}
					if (intParentLeft <= 0) {
						currentElement.parent().prev().append('<i id="ParentPush' + cntLoadParent + '"></i>');
						intParentLeft = $("#ParentPush" + cntLoadParent).position().left;
						if (intParentLeft > 0) {
							currentElement = currentElement.parent().prev();
						}
					}

					$("#ParentPush" + cntLoadParent).remove();
				} while (intParentLeft > 0)
			} catch (err) {}

			return currentElement;


			//////////////////////////
		} else {
			IntElementsCount = currentIndex;
			return ESearch(startIndex, IntElementsCount, viewportwidth, objChildElements);
		}
	}

	if ((currentElementTag == "br" || currentElementTag == "IMG"))
		return currentElementParent;
	else
		return currentElement;
}

function fnAddBookMarkPages(pageNo, strFinalString) {

	if ($.inArray(pageNo, BOOK_MARK_PAGES) == -1)
		BOOK_MARK_PAGES.push(pageNo);
	fnUpdateBookmarks($.trim(strFinalString));
}

function fnRemoveBookMarkPages(pageNo, intpagenum) {

	var existInlist = $.inArray(pageNo, BOOK_MARK_PAGES);
	if (existInlist != -1)
		BOOK_MARK_PAGES.splice(existInlist, 1);

	BOOK_MARK_PAGES.splice(BOOK_MARK_PAGES.indexOf(intpagenum), 1);
	fnRemoveBookmarks(pageNo);
}

function fnSetBookMarkIcon(pageNo) {
	if (typeof BOOK_MARK_PAGES == 'undefined') {
		fnChangeBookMarkIcon("disable");
		return;
	}
	if ($.inArray(pageNo, BOOK_MARK_PAGES) == -1)
		fnChangeBookMarkIcon("disable");
	else
		fnChangeBookMarkIcon("enable");
}

function fnChangeBookMarkIcon(setFlag) {
	var bObj = $(".bookmark");
	if (setFlag == "enable") {
		bObj.removeClass("bookmark_deact");
		bObj.addClass("bookmark_act");
	} else {
		bObj.removeClass("bookmark_act");
		bObj.addClass("bookmark_deact");
	}
}
/************************************************
 *                for turn page                 *
 ************************************************/

function turnPage() {
	remove_selection();
	//fnHideNoteDisplayData(); // commited by sandy while checking page load stuk
	//fnSetBookMarkIcon(currentPage);  //+1  // commited by sandy while checking page load stuk
	var turnmarginleft_p = (BOOK_WIDTH) * (currentPage + 1);
	var turnmarginleft_m = ((BOOK_WIDTH) * (currentPage - 1));

	if (currentPage == 0) {
		STORY_CONTENT.css("left", "");
	} else if (currentPage > numberOfPages) {
		STORY_CONTENT.css("left", "-" + (BOOK_WIDTH) * (numberOfPages) + "px");
	} else {
		STORY_CONTENT.css("left", "-" + (BOOK_WIDTH) * (currentPage) + "px");
	}

	if (currentPage != 0 && _restored) {
		//fnTurnpageEventtoDevice(); // commited by sandy while checking page load stuk
	}



	//var _pag_nosTXT = (numberOfPages > 1) ? (currentPage+1)+" of "+numberOfPages : '';
	//$("#_pag_nos").text(_pag_nosTXT); // commited by sandy while checking page load stuk
}

function calculateNumberOfPage(topage) {

	if (window.APP_MODE == 0) { // If offline mode then change level to calculate number of pages
		fnChangeLevelContent();
	}

	if ($(".quizcontainer")[0])
		$('.quizcontainer:visible').append('<div class="endOfStoryLocater">asdg fdsfd sfdsfs dfdsf</div>');
	else
	if (VISIBLE_OBJ[0])
		VISIBLE_OBJ.append('<div class="endOfStoryLocater">asdg fdsfd sfdsfs dfdsf</div>');
	else
		STORY_CONTENT.append('<div class="endOfStoryLocater">asdg fdsfd sfdsfs dfdsf</div>');

	var pageNum = 0;
	var pagesCalculated = false;
	var EODObj = $('.endOfStoryLocater:last');

	// hack for avoid looping
	pageNum = parseInt(Math.round(EODObj.position().left / BOOK_WIDTH));
	if ( parseInt(EODObj.position().top) < 100 ) {
		pageNum--;
	}

	currentPage = pageNum;

	currentPage = (typeof topage == 'undefined') ? 0 : topage;

	numberOfPages = pageNum;
	//turnPage();

	$(".endOfStoryLocater").remove();
	_LOADED = 1;

	if (currentPage > numberOfPages) {
		fnnumRestorePage(numberOfPages);
	}

	return currentPage;
}

function remove_selection() {
	if (appDevice == 'iPad') {
		/*window.getSelection().empty();
		window.getSelection().removeAllRanges();
		document.selection.empty();*/
		//window.location = 'inapp://removeMenuBarItem';
	} else if (window.getSelection().empty) { // Chrome
		window.getSelection().empty();
	}
}

function _cue_init_flip() {

	BOOK_HEIGTH = $(window).height();
	BOOK_WIDTH = $(window).width();

	theOrientation = (BOOK_HEIGTH >= BOOK_WIDTH) ? 'portrait' : 'landscape';
	numberOfPages = 0;

	STORY_WIDTH = (BOOK_HEIGTH >= BOOK_WIDTH) ? (BOOK_WIDTH) : (BOOK_WIDTH / 2);
	CONTENT_HEIGHT = BOOK_HEIGTH;

	CONTENT_MAIN.css("width", BOOK_WIDTH).css("height", BOOK_HEIGTH);

	rightfoldObj.css("height", BOOK_HEIGTH),
	leftfoldObj.css("height", BOOK_HEIGTH),

	STORY_CONTENT.css("-moz-column-width", STORY_WIDTH - T_OFFSET).css("-webkit-column-width", STORY_WIDTH - T_OFFSET).css("column-width", STORY_WIDTH - T_OFFSET).css("width", BOOK_WIDTH - T_OFFSET).css("height", BOOK_HEIGTH - (T_OFFSET) - 20);

	STORY_CONTENT.css("column-rule", '1px solid #C9CACC').css("-moz-column-rule", '1px solid #C9CACC').css("-webkit-column-rule", '1px solid #C9CACC');

	currentPage = 0;
}

function fnArrangeImage(columnHeight, columnWidth) {
	//alert("in arrange img"+columnHeight+"||"+columnWidth);
	var c50 = (columnHeight * 5 / 10);
	$("body").append("<style type='text/css'>.story_content img { max-height:" + c50 + "px; max-width:96%;}</style>");
}
/*
Called into serverFunctions.js
if strpart == 1 means goto 1st half of the story else  2nd half
*/

function jump2page(strpart) {

	//alert("A"+CONTENT_HEIGHT+"|"+STORY_WIDTH+"|"+T_OFFSET);
	fnArrangeImage(CONTENT_HEIGHT, STORY_WIDTH - (T_OFFSET * 2));
	//alert("B"+strpart);
	calculateNumberOfPage(0);
	//alert("C"+strpart);
	currentPage = 0;
	turnPage();
	//alert("D"+strpart);
	if (strpart == 2) {
		currentPage = parseInt(Math.round($(".sectionbreak:visible").position().left / BOOK_WIDTH));
		turnPage();
		fnHideNoteDisplayData();
		fnLoadBookNotesBookmarks();
		noteIconReposition();
	}
	if (strpart == 1) {
		//alert("calling fnGotoPage");
		fnGotoPage("story1");
	}
	fnNoteiconVisibility(0, '');
}
