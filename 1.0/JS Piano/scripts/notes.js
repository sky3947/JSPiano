function Notes() {
    this.noteOrdering = ["c", "d", "e", "f", "g", "a", "b"];
    this.possibleKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m"];
    this.possibleSharps = ["c", "d", "f", "g", "a"];
    this.possibleFlats = ["d", "e", "g", "a", "b"];
    
    this.isSharp = function(note) {
        return (note.indexOf('~') != -1);
    };
}

var notes = new Notes();
