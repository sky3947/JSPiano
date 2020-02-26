function resizeKeyboard() {
    var offsetX = 16;
    var maxPianoWidth = $$("piano")[0].clientWidth;
    var maxPianoHeight = $$("piano")[0].clientHeight;
    var windowWidth = window.innerWidth - offsetX;
    var percentageX = windowWidth/maxPianoWidth;
    
    $("scalable").style.transform =
    (windowWidth < maxPianoWidth) ?
        "scale(" + percentageX + ")" :
        "scale(1)";
    
    $("desk").style.transform =
    (windowWidth < maxPianoWidth) ?
        "scale(" + percentageX + ")" :
        "scale(1)";
    
    var margin = 40*percentageX - (1 - percentageX*maxPianoHeight) - maxPianoHeight;
    
    $("desk").style.marginTop =
    (windowWidth < maxPianoWidth) ?
        margin + "px" :
        "40px";
}

window.addEventListener("resize", function () {
    resizeKeyboard();
});
