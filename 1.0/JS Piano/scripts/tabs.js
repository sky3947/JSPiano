function openTab(event, tab) {
    var allContent = $$("tabcontent");
    var i;
    for(i = 0; i < allContent.length; i++) {
        allContent[i].style.display = "none";
    }
    
    var allTabs = $$("tab");
    for(i = 0; i < allTabs.length; i++) {
        allTabs[i].className = allTabs[i].className.replace(" active", "");
    }
    
    $(tab).style.display = "block";
    event.currentTarget.className += " active";
}
