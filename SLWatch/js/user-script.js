/*
 * This is a sample script.
 *
 * Before using the functionality of WebHelperClient, make sure to call this function
 * passing the handler object as its parameter.
 *
 * var WebHelperClientHandler = {
 *  onInit : function () {
 *      // Do what you want when your IME gets the INIT message
 *  }
 * };
 * WebHelperClient.initialize(WebHelperClientHandler);
 */

/* global WebHelperClient */
/* exported backspacePressed, enterPressed, keyPressed, spacePressed */

var prevMode = "rect-english-lowercase";
var mql, rectkbd, circlekbd;
var WebHelperClientHandler = {
    onInit : function() {
        mql = window.matchMedia("(-tizen-geometric-shape: rectangle)");
        rectkbd = document.getElementById("rect-english-lowercase");
        circlekbd = document.getElementById("circle-english-lowercase");
        if (mql.matches) {
            rectkbd.classList.remove("invisible");
            rectkbd.classList.add("visible");
            prevMode = "rect-english-lowercase";
        } else {
            circlekbd.classList.remove("invisible");
            circlekbd.classList.add("visible");
            prevMode = "circle-english-lowercase";
        }
        WebHelperClient.log("ON INIT");
    },
	onSetLayout : function (layout) {
		var nextMode;
		if (mql.matches) {
			if (layout === "phonenumber") {
				nextMode = "rect-phonenumber";
			} else if (layout === "number") {
				nextMode = "rect-numsym1";
			} else if (layout === "ip") {
				nextMode = "rect-ip";
			} else if (layout === "month") {
				nextMode = "rect-numsym1";
			} else if (layout === "numberonly") {
				nextMode = "rect-numberonly";
			} else if (layout === "datetime") {
				nextMode = "rect-numberonly";
			} else {
				nextMode = "rect-english-lowercase";
			}
		} else {
			if (layout === "phonenumber") {
				nextMode = "circle-phonenumber";
			} else if (layout === "number") {
				nextMode = "circle-numsym1";
			} else if (layout === "ip") {
				nextMode = "circle-ip";
			} else if (layout === "month") {
				nextMode = "circle-numsym1";
			} else if (layout === "numberonly") {
				nextMode = "circle-numberonly";
			} else if (layout === "datetime") {
				nextMode = "circle-numberonly";
			} else {
				nextMode = "circle-english-lowercase";
			}
		}
		inputModeChanged(prevMode, nextMode);
		prevMode = nextMode;
	},
    onShow : function () {
        var screenWidth = window.screen.width;
        var screenHeight = window.screen.height;
        WebHelperClient.setKeyboardSizes(screenWidth, screenHeight / 2,
                screenHeight, screenWidth / 2);
    }
};

function isSingleTouch() {
    var touchNum = 0;
    if (event.touches !== null) {
        if (event.touches.length !== null) {
            touchNum = event.touches.length;
        }
    }
    return (touchNum < 2);
}
function keyCode(key) {
    event.preventDefault();
    if (isSingleTouch()) {
        WebHelperClient.sendKeyEvent(key);
    }
}
function keyPressed(key) {
    event.preventDefault();
    if (isSingleTouch()) {
        WebHelperClient.commitString(key);
    }
    return true;
}
function backspacePressed() {
    event.preventDefault();
    if (isSingleTouch()) {
        keyCode(WebHelperClient.Keycode.BACKSPACE);
    }
}
function spacePressed() {
    event.preventDefault();
    if (isSingleTouch()) {
        keyCode(WebHelperClient.Keycode.SPACE);
    }
}
function enterPressed() {
    event.preventDefault();
    if (isSingleTouch()) {
        keyCode(WebHelperClient.Keycode.RETURN);
    }
}
function inputModeChanged(from, to) {
    event.preventDefault();
    if (isSingleTouch()) {
        var from_div = document.getElementById(from);
        from_div.style.display = "none";
        var to_div = document.getElementById(to);
        to_div.style.display = "block";
        prevMode = to;
    }
}

WebHelperClient.initialize(WebHelperClientHandler);
