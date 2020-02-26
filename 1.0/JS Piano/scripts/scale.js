function Scale() {
    this.scales = [
        ["C",           [], true],
        // ["C&#x266D",    ["c", "d", "e", "f", "g", "a", "b"], false],
        // ["C#",          ["c", "d", "e", "f", "g", "a", "b"], true],
        ["D",           ["f", "c"], true],
        // ["D&#x266D",    ["d", "e", "f", "g", "a", "b"], true],
        ["E",           ["f", "g", "c", "d"], true],
        ["F",           ["b"], false],
        ["G",           ["f"], true],
        ["A",           ["c", "f", "g"], true],
        ["B",           ["c", "d", "f", "g", "a"], true],
        // ["B&#x266D",    ["b", "e"], false],
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
}

var scale = new Scale();
