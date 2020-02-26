function SheetImport() {
    this.userIsWriting = false;
    this.button = null;
    this.textarea = null;
    this.importOption = null;
    this.sheet = null;
    this.dropdown = null;
    this.pages = null;
    this.forceNewPage = null;
    
    this.toggleImport = function() {
        if(this.userIsWriting) {
            this.button.innerHTML = "Import Sheet";
            this.textarea.classList.add("hidden");
            this.dropdown.classList.remove("hidden");
            this.pages.classList.remove("hidden");
            this.forceNewPage.classList.remove("hidden");
            
            presetSheets[SheetProperties.CUSTOM_SHEET][SheetProperties.SHEET] = this.textarea.value.replaceAll(" ", "&nbsp;").split("\n");
            this.sheet.style.color = "";
            this.importOption.click();
        } else {
            this.button.innerHTML = "Click Again To Render";
            this.dropdown.classList.add("hidden");
            this.pages.classList.add("hidden");
            this.forceNewPage.classList.add("hidden");
            
            this.textarea.classList.remove("hidden");
            this.sheet.style.color = "transparent";
        }
        
        this.userIsWriting = !this.userIsWriting;
    };
}

sheetImport = new SheetImport();

function setupSheetImport() {
    sheetImport.button = $("importButton");
    sheetImport.textarea = $("customInput");
    sheetImport.importOption = $("importOption");
    sheetImport.sheet = $("sheet");
    sheetImport.dropdown = $("sheetSelector");
    sheetImport.pages = $("pages");
    sheetImport.forceNewPage = $("forceNewPageContainer");
}
