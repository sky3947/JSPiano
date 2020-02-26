function Scale() {
    this.scales = [
        ["C",           [], true],
        ["C#",          ["c", "d", "e", "f", "g", "a", "b"], true],
        ["D",           ["f", "c"], true],
        ["D&#x266D;",   ["d", "e", "g", "a", "b"], false],
        ["E",           ["f", "g", "c", "d"], true],
        ["E&#x266D;",   ["e", "a", "b"], false],
        ["F",           ["b"], false],
        ["F#",          ["f", "g", "a", "c", "d", "e"], true],
        ["G",           ["f"], true],
        ["G&#x266D;",   ["g", "a", "b", "c", "d", "e"], false],
        ["A",           ["c", "f", "g"], true],
        ["A&#x266D;",   ["a", "b", "d", "e"], false],
        ["B",           ["c", "d", "f", "g", "a"], true],
        ["B&#x266D;",   ["b", "e"], false],
        ["CUSTOM",      [], true]
        ];
    
    this.curMajor = 0;
    this.scaleNotes = [];
    this.isSharpMajor = true;
    
    this.changeMajor = function(dir) {
        this.curMajor = this.curMajor + dir;
        this.curMajor = mod(this.curMajor, this.scales.length);
        
        $("scaleDisp").innerHTML = this.scales[this.curMajor][0] + " Major";
        this.scaleNotes = this.scales[this.curMajor][1];
        this.isSharpMajor = this.scales[this.curMajor][2];
    };
    
    this.changeToMajor = function(major) {
        var index = -1;
        var i;
        for(i = 0; i < this.scales.length; i++) {
            if(this.scales[i][0] == major) {
                index = i;
                break;
            }
        }
        
        if(index != -1) {
            this.curMajor = index;
            $("scaleDisp").innerHTML = this.scales[this.curMajor][0] + " Major";
            this.scaleNotes = this.scales[this.curMajor][1];
            this.isSharpMajor = this.scales[this.curMajor][2];
        }
    };
    
    this.updateScales = function() {
        $("scaleDisp").innerHTML = this.scales[this.curMajor][0] + " Major";
        this.scaleNotes = this.scales[this.curMajor][1];
        this.isSharpMajor = this.scales[this.curMajor][2];
    };
}

var scale = new Scale();

function handleScaleChange(keyEvent) {
    var keyValue = keyEvent.keyCode;
    
    if(keyEvent.shiftKey) {
        if(keyValue == 188) {
            scale.changeMajor(Direction.DOWN);
        } else if(keyValue == 190) {
            scale.changeMajor(Direction.UP);
        }
    }
}
