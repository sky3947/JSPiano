function openTab(event, tab) {
    var allContent = $$("tabcontent");
    var i;
    for(i = 0; i < allContent.length; i++) {
        allContent[i].style.display = "none";
    }
    
    var allTabs = $$("tab");
    for(i = 0; i < allTabs.length; i++) {
        allTabs[i].classList.remove("active");
    }
    
    $(tab).style.display = "block";
    event.currentTarget.classList.add("active");
}
