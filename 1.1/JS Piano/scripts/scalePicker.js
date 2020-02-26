function ScalePicker() {
    this.menuOpen = false;
    
    this.menu = null;
    this.scaleButton = null;
    
    this.toggleScalesMenu = function(event) {
        if(event.target == this.scaleButton || event.target == $("scaleDisp")) {
            if(this.menuOpen) {
                this.menuOpen = false;
                
                this.menu.classList.add("hidden");
                this.scaleButton.classList.remove("active");
            } else {
                this.menuOpen = true;
                
                this.menu.classList.remove("hidden");
                this.scaleButton.classList.add("active");
            }
        }
    };
    
    this.closeScalesMenu = function() {
        this.menuOpen = false;
                
        this.menu.classList.add("hidden");
        this.scaleButton.classList.remove("active");
    };
}

var scalePicker = new ScalePicker();

function setupScalePicker() {
    scalePicker.menu = $("scaleItems");
    scalePicker.scaleButton = $("scaleButton");
}

function toggleCustomScaleSelect(event) {
    var element = event.target;
    var key = event.target.innerHTML.toLowerCase();
    
    if(element.classList.contains("active")) {
        element.classList.remove("active");
        scale.scales[scale.scales.length-1][1].splice(indexFromValue(scale.scales[scale.scales.length-1][1], key), 1);
    } else {
        element.classList.add("active");
        scale.scales[scale.scales.length-1][1].push(key);
    }
    
    scale.updateScales();
}

function toggleCustomScaleSharpness(event) {
    if(scale.scales[scale.scales.length-1][2]) {
        event.target.innerHTML = "Flats";
    } else {
        event.target.innerHTML = "Sharps";
    }
    scale.scales[scale.scales.length-1][2] = !scale.scales[scale.scales.length-1][2];
    
    scale.updateScales();
}
