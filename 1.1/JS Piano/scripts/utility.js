function $(n) {
    return document.getElementById(n);
}

function $$(n) {
    return document.getElementsByClassName(n);
}

function indexFromValue(array, value) {
    return array.indexOf(value);
}

function mod(n, m) {
    return ((n % m) + m) % m;
}

function removeAllChildNodes(node) {
    while(node.firstChild) {
        node.removeChild(node.firstChild);
    }
}

var Direction = {
    DOWN: -1,
    UP: 1,
    NONE: 0
};

function hideCursor() {
    document.getElementsByTagName("html")[0].style.cursor = "none";
}
document.addEventListener("keydown", hideCursor);

function showCursor() {
    document.getElementsByTagName("html")[0].style.cursor = "";
}
document.addEventListener("mousemove", showCursor);

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};
