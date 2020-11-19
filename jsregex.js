/**
 * @author gsmith
 */

// When the user changes a textarea, update the result
function update() {

    // input
    var regex = document.getElementById("regex").value;
    var text = document.getElementById("text").value;
    
    // regex arguments
    var args = "";
    if (document.getElementById("m").checked) {
        args += "m";
    }
    if (document.getElementById("i").checked) {
        args += "i";
    }
    if (document.getElementById("g").checked) {
        args += "g";
    }
            
    // create and show the result
    var result;
    var resultArea = document.getElementsByName("matchArea")[0];
    try {
        if (document.getElementById("replace").checked) {
            result = text.replace(new RegExp(regex, args), document.getElementById("replacement").value);
        }
        else { // replace
            result = text.match(new RegExp(regex, args));
        }
        resultArea.style.color = "black";
    }
    // if regex impl provides a useful error on exception, display it
    catch(e) {
        result = e.message;
        resultArea.style.color = "red";
    }
    // message for no matches to valid regex
    if (result === null) {
        result = "No matches";
        resultArea.style.color = "#8B23BF";
    }
    resultArea.value = result;
}

// resizing textareas based on window size. it's a pain since percents don't work right
function resize() {
    var screenHeight;
    var regex, text, replacement, match; // heights for text areas
    
    var extraHeightForDocument = 10 + 5; // body margin
    var extraHeightPerTextarea = 22 + 5 + 1 + 1; // header, margin, padding
    
    // get screenHeight based on browser details
    if (window.innerHeight) {
        screenHeight = window.innerHeight;
    }
    else {
        screenHeight = document.documentElement.clientHeight;
    }
    
    // replace mode resize
    if (document.getElementById("replace").checked) {
        regex = Math.round(screenHeight / 5) - extraHeightPerTextarea;
        text = Math.round(screenHeight / 2.5) - extraHeightPerTextarea;
        replacement = Math.round(screenHeight / 5) - extraHeightPerTextarea;
        match = screenHeight - regex - text - replacement - extraHeightForDocument - (extraHeightPerTextarea * 4);
        document.getElementById("regex").style.height = regex + "px";
        document.getElementById("text").style.height = text + "px";
        document.getElementById("replacement").style.height = replacement + "px";
        document.getElementsByName("matchArea")[0].style.height = match + "px";
    }
    // match mode resize
    else {
        regex = Math.round(screenHeight / 4) - extraHeightPerTextarea;
        text = Math.round(screenHeight / 2) - extraHeightPerTextarea;
        match = screenHeight - regex - text - extraHeightForDocument - (extraHeightPerTextarea * 3);
        document.getElementById("regex").style.height = regex + "px";
        document.getElementById("text").style.height = text + "px";
        document.getElementsByName("matchArea")[0].style.height = match + "px";
    }
}

// switch between replace and match modes
function typeChange() {
    var replacementContainer = document.getElementById("replacementContainer");
    if (document.getElementById("replace").checked) {
        replacementContainer.style.display = "block";
    }
    else {
        replacementContainer.style.display = "none";
    }
    resize();
}
