function Select() {
    this.allKeys = null;
    this.lastFocusedKey = null;
    
    this.cycleFocusedKey = function(dir) {
        if(this.allKeys === null) {
            this.allKeys = document.querySelectorAll("div.whiteKey, div.blackKey");
        }
        
        var currentFocusedKey = document.activeElement;
        var currentTabIndex = currentFocusedKey.tabIndex;
        
        var i;
        var newValue;
        if(currentTabIndex >= 1 && currentTabIndex <= this.allKeys.length) {
            newValue = currentTabIndex + dir;
            newValue = mod(newValue-1, this.allKeys.length) + 1;
            for(i = 0; i < this.allKeys.length; i++) {
                if(this.allKeys[i].tabIndex == newValue) {
                    this.allKeys[i].focus();
                    this.lastFocusedKey = this.allKeys[i];
                    break;
                }
            }
        } else {
            if(this.lastFocusedKey !== null) {
                this.lastFocusedKey.focus();
            } else {
                $("c0k").focus();
            }
        }
    };
}

var select = new Select();

function cycleFocusKeyPress(keyEvent) {
    var keyValue = keyEvent.keyCode;
    if(keyValue == 37) {
        select.cycleFocusedKey(Direction.DOWN);
        return null;
    } else if(keyValue == 39) {
        select.cycleFocusedKey(Direction.UP);
        return null;
    }
}

function updateFocusedKey(event) {
    select.lastFocusedKey = event.currentTarget;
}
