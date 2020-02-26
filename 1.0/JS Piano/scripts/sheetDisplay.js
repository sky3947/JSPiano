function SheetDisplay() {
    this.openedSheet = presetSheets[0][SheetProperties.NAME]; // Default sheet
    this.page = 0;
    this.totalPages = 0;
    this.sheetDisplayID = "SHEETDISPLAYID";
    this.hasOverflown = false;
    
    this.pageScroll = null;
    this.sheetBackground = null;
    this.sheet = null;
    this.overflowMessage = null;
    this.forceNewPageBox = null;
    
    this.openSheet = function(sheetToOpen) {
        removeAllChildNodes(this.sheet);
        
        // Figure out which sheet to dispaly
        var sheetName = presetSheets[0][SheetProperties.NAME];
        var sheetData = presetSheets[0][SheetProperties.SHEET];
        var i, j;
        for(i = 0; i < presetSheets.length; i++) {
            if(presetSheets[i][SheetProperties.NAME] == sheetToOpen) {
                sheetName = presetSheets[i][SheetProperties.NAME];
                sheetData = presetSheets[i][SheetProperties.SHEET];
                break;
            }
        }
        this.openedSheet = sheetName;
        
        // First, figure out how tall the page is
        var maxLines = -1;
        if(this.openedSheet != "default") {
            var measurementTable = document.createElement("UL");
            measurementTable.style.height = this.sheetBackground.style.height;
            measurementTable.setAttribute("class", "sheetNotes"); // Get the right font
            var measurementItem = document.createElement("LI");
            measurementItem.style.color = "transparent"; // Invisible in case of lag
            
            measurementTable.appendChild(measurementItem);
            this.sheet.appendChild(measurementTable);
            
            while(measurementItem.scrollHeight <= this.sheetBackground.clientHeight) {
                measurementItem.innerHTML += maxLines + "<br>";
                maxLines++;
            }
            removeAllChildNodes(this.sheet);
        }
        
        // Create the pages
        if(maxLines > 0) {
            this.hasOverflown = false;
            var readerPosition = 0, pages = [], currentPage = [];
            
            while(readerPosition < sheetData.length) {
                currentPage = [];
                for(i = 0; i < maxLines; i++) {
                    // Add a character for manually forcing a new page
                    if(sheetData[readerPosition] == "~") {
                        readerPosition++;
                        
                        if(currentPage.length !== 0 && this.forceNewPageBox.checked) {
                            break;
                        }
                    }
                    
                    currentPage.push(sheetData[readerPosition]);
                    readerPosition++;
                    
                    if(readerPosition >= sheetData.length) {
                        break;
                    }
                }
                pages.push(currentPage);
                currentPage = [];
            }
            
            // Render the pages
            var columnOne = null, columnTwo = null;
            for(i = 0; i < pages.length; i++) {
                if(pages.length == 1) {
                    columnOne = document.createElement("LI");
                    columnOne.setAttribute("class", "last");
                } else if(i == pages.length-1) {
                    break;
                } else {
                    columnOne = document.createElement("LI");
                    columnTwo = document.createElement("LI");
                    columnTwo.setAttribute("class", "last");
                }
                
                var currentRenderingPage = document.createElement("UL");
                currentRenderingPage.style.height = this.sheetBackground.style.height;
                currentRenderingPage.setAttribute("id", this.sheetDisplayID+i);
                currentRenderingPage.setAttribute("class", "sheetNotes");
                
                // First page
                for(j = 0; j < pages[i].length; j++) {
                    columnOne.innerHTML += pages[i][j];
                    if(j != pages[i].length-1) {
                        columnOne.innerHTML += "<br>";
                    }
                }
                currentRenderingPage.appendChild(columnOne);
                
                // Second page
                if(columnTwo !== null) {
                    for(j = 0; j < pages[i+1].length; j++) {
                        columnTwo.innerHTML += pages[i+1][j];
                        if(j != maxLines-1) {
                            columnTwo.innerHTML += "<br>";
                        }
                    }
                    currentRenderingPage.appendChild(columnTwo);
                }
                
                this.sheet.appendChild(currentRenderingPage);
                
                // Check for overflow
                if(!this.hasOverflown) {
                    if(columnOne.scrollWidth > columnOne.clientWidth) {
                        this.hasOverflown = true;
                    }
                    if(columnTwo !== null) {
                        if(columnTwo.scrollWidth > columnTwo.clientWidth) {
                            this.hasOverflown = true;
                        }
                    }
                }
                currentRenderingPage.classList.add("hidden");
                
                columnOne = null;
                columnTwo = null;
            }
            
            this.totalPages = pages.length;
        } else {
            // Render the default page if requested or if error occurred
            var defaultTable = document.createElement("UL");
            defaultTable.setAttribute("id", this.sheetDisplayID+"0");
            defaultTable.setAttribute("class", "sheetNotes");
            var noSheetMessage = document.createElement("LI");
            noSheetMessage.setAttribute("class", "last");
            noSheetMessage.innerHTML = sheetData;
            defaultTable.appendChild(noSheetMessage);
            this.sheet.appendChild(defaultTable);
            
            this.totalPages = 1;
        }
        this.page = 0;
        
        if(this.hasOverflown) {
            this.overflowMessage.classList.remove("hidden");
        } else {
            this.overflowMessage.classList.add("hidden");
        }
        
        updateSheetPages();
    };
}

var sheetDisplay = new SheetDisplay();

function updateSheets() {
    sheetDisplay.openSheet(sheetDisplay.openedSheet);
}

function updateSheetPages() {
    if(sheetDisplay.totalPages <= 1) {
        $("pageScroll").innerHTML = "1-1 of 1";
    } else {
        $("pageScroll").innerHTML = (sheetDisplay.page+1)+"-"+(sheetDisplay.page+2)+" of "+sheetDisplay.totalPages;
    }
    
    var allPages = $$("sheetNotes");
    var i;
    for(i = 0; i < allPages.length; i++) {
        allPages[i].className = "sheetNotes hidden";
    }
    $(sheetDisplay.sheetDisplayID+sheetDisplay.page).className = "sheetNotes";
}

function changeSheetPage(dir) {
    if(sheetDisplay.totalPages > 1) {
        var newPage = sheetDisplay.page + dir;
        newPage = (newPage > sheetDisplay.totalPages-2) ? sheetDisplay.totalPages-2 : newPage;
        newPage = (newPage < 0) ? 0 : newPage;
        sheetDisplay.page = newPage;
        $("pageScroll").innerHTML = (newPage+1)+"-"+(newPage+2)+" of "+sheetDisplay.totalPages;
    }
    
    updateSheetPages();
}

function changeSheetPageShortcut(keyEvent) {
    var keyValue = keyEvent.keyCode;
    if($("Sheets").style.display == "block") {
        if(keyValue == 187 && keyEvent.shiftKey) {
            changeSheetPage(Direction.DOWN);
        } else if(keyValue == 187) {
            changeSheetPage(Direction.UP);
        }
    }
}

document.addEventListener("keydown", changeSheetPageShortcut);

function setupSheetDisplay() {
    sheetDisplay.pageScroll = $("pageScroll");
    sheetDisplay.sheetBackground = $$("sheetBackground")[0];
    sheetDisplay.sheet = $("sheet");
    sheetDisplay.overflowMessage = $("overflowWarning");
    sheetDisplay.forceNewPageBox = $("forceNewPage");
    
    sheetDisplay.openSheet("default");
}
