function SheetImport() {
    this.userIsWriting = false;
    this.button = null;
    this.customArea = null;
    this.customSheetName = null;
    this.customSheetBPM = null;
    this.customSheetScale = "C";
    this.textarea = null;
    this.importOption = null;
    this.sheetImported = null;
    this.sheet = null;
    this.dropdown = null;
    this.pages = null;
    this.forceNewPage = null;
    
    this.toggleImport = function() {
        if(this.userIsWriting) {
            this.button.innerHTML = "Import Sheet";
            this.customArea.style.display = "none";
            
            this.dropdown.classList.remove("hidden");
            this.pages.classList.remove("hidden");
            this.forceNewPage.classList.remove("hidden");
            
            var sheetName = this.customSheetName.value.split("\n")[0].trim();
            if(sheetName.length == 0) {
                sheetName = "Unnamed Sheet";
            } else {
                sheetName = sheetName.substring(0, 75);
            }
            
            var sheetBPM = this.customSheetBPM.value;
            if(sheetBPM < 1) {
                sheetBPM = 300;
            }
            
            presetSheets[SheetProperties.CUSTOM_SHEET][SheetProperties.SHEET] = this.textarea.value.replaceAll(" ", "&nbsp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").split("\n");
            presetSheets[SheetProperties.CUSTOM_SHEET][SheetProperties.CUSTOM_SHEET_NAME] = sheetName;
            presetSheets[SheetProperties.CUSTOM_SHEET][SheetProperties.BPM] = sheetBPM;
            presetSheets[SheetProperties.CUSTOM_SHEET][SheetProperties.MAJOR] = this.customSheetScale;
            
            this.sheet.style.color = "";
            this.importOption.innerHTML = presetSheets[SheetProperties.CUSTOM_SHEET][SheetProperties.CUSTOM_SHEET_NAME]+" (custom)";
            this.sheetImported.innerHTML = presetSheets[SheetProperties.CUSTOM_SHEET][SheetProperties.CUSTOM_SHEET_NAME]+" (custom)";
            this.importOption.click();
        } else {
            this.button.innerHTML = "Click Again To Render";
            this.dropdown.classList.add("hidden");
            this.pages.classList.add("hidden");
            this.forceNewPage.classList.add("hidden");
            
            this.customArea.style.display = "flex";
            this.sheet.style.color = "transparent";
        }
        
        this.userIsWriting = !this.userIsWriting;
    };
    
    this.changeScale = function(scale) {
        this.customSheetScale = scale;
    };
}

sheetImport = new SheetImport();

function setupSheetImport() {
    sheetImport.button = $("importButton");
    sheetImport.customArea = $("customSheetArea");
    sheetImport.textarea = $("customInput");
    sheetImport.customSheetName = $("customName");
    sheetImport.customSheetBPM = $("customBPM");
    sheetImport.importOption = $("importOption");
    sheetImport.sheetImported = $("sheetIMPORTED");
    sheetImport.sheet = $("sheet");
    sheetImport.dropdown = $("sheetSelector");
    sheetImport.pages = $("pages");
    sheetImport.forceNewPage = $("forceNewPageContainer");
}
