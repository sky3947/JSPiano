function dropdownSetup() {
    var selectors = $$("selector");
    
    // Create the dropdown options
    for(var i = 0; i < selectors.length; i++) {
        var selector = selectors[i].getElementsByClassName("selectorOptions")[0];
        var selected = document.createElement("DIV");
        
        selected.setAttribute("class", "selected");
        selected.innerHTML = selector.options[selector.selectedIndex].innerHTML;
        selectors[i].appendChild(selected);
        
        var selectorItems = document.createElement("DIV");
        selectorItems.setAttribute("class", "selectorItems hidden");
        
        for(var j = 1; j < selector.length; j++) {
            var option = document.createElement("DIV");
            if(selector.options[j].innerHTML == "IMPORTED SHEET") {
                option.setAttribute("id", "importOption");
            }
            option.innerHTML = selector.options[j].innerHTML;
            option.setAttribute("onclick", selector.options[j].getAttribute("onclick"));
            
            // Give each dropdown option a click event
            option.addEventListener("click", function(event) {
                var selector_ = this.parentNode.parentNode.getElementsByClassName("selectorOptions")[0];
                var selected_ = this.parentNode.previousSibling;
                
                for(var k = 0; k < selector_.length; k++) {
                    if(selector_.options[k].innerHTML == this.innerHTML) {
                        selector_.selectedIndex = k;
                        selected_.innerHTML = this.innerHTML;
                        var selectedOption = this.parentNode.getElementsByClassName("selectedOption");
                        for(var l = 0; l < selectedOption.length; l++) {
                            selectedOption[l].removeAttribute("class");
                        }
                        this.setAttribute("class", "selectedOption");
                        break;
                    }
                }
                
                // selected_.click();
            });
            selectorItems.appendChild(option);
        }
        selectors[i].appendChild(selectorItems);
        selected.addEventListener("click", function(event) {
            event.stopPropagation();
            closeAllSelect(this);
            this.nextSibling.classList.toggle("hidden");
            this.classList.toggle("activeArrow");
        });
    }
}

function closeAllSelect(selector) {
    var selectorItems = $$("selectorItems");
    var selected = $$("selected");
    var arrayNumber = [];
    
    var i;
    for(i = 0; i < selected.length; i++) {
        if(selector == selected[i]) {
            arrayNumber.push(i);
        } else {
            selected[i].classList.remove("activeArrow");
        }
    }
    for(i = 0; i < selectorItems.length; i++) {
        if(arrayNumber.indexOf(i)) {
            selectorItems[i].classList.add("hidden");
        }
    }
}

document.addEventListener("click", closeAllSelect);
