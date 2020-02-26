function Notes() {
    this.noteOrdering = ["c", "d", "e", "f", "g", "a", "b"];
    this.possibleKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m"];
    this.possibleSharps = ["c", "d", "f", "g", "a"];
    this.possibleFlats = ["d", "e", "g", "a", "b"];
    
    // For use in autoplay
    // Even index: no shift key
    // Odd index: shift key
    this.possibleNotes = ["1", "!", "2", "@", "3", "#", "4", "$", "5", "%", "6", "^", "7", "&", "8", "*", "9", "(", "0", ")", "q", "Q", "w", "W", "e", "E", "r", "R", "t", "T", "y", "Y", "u", "U", "i", "I", "o", "O", "p", "P", "a", "A", "s", "S", "d", "D", "f", "F", "g", "G", "h", "H", "j", "J", "k", "K", "l", "L", "z", "Z", "x", "X", "c", "C", "v", "V", "b", "B", "n", "N", "m", "M"];
    
    this.isSharp = function(note) {
        return (note.indexOf('~') != -1);
    };
    
    this.nextNote = function(note) {
        return this.noteOrdering[mod(indexFromValue(this.noteOrdering, note)+1, 7)];
    };
    
    this.previousNote = function(note) {
        return this.noteOrdering[mod(indexFromValue(this.noteOrdering, note)-1, 7)];
    };
    
    this.isFirstNote = function(note, octave) {
        return (note == "c" && octave === 0) ? true : false;
    };
    
    this.isLastNote = function(note, octave) {
        return (note == "c" && octave === 5) ? true : false;
    };
}

var notes = new Notes();
