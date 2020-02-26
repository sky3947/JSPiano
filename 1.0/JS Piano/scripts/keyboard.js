document.onkeydown = function(keyEvent) {
    if(document.getElementById("customInput") != document.activeElement) {
        var note = keyToNote(keyEvent);
        if(note !== null) {
            music(note);
            showKeyPressed(note);
        }
        cycleFocusKeyPress(keyEvent);
    }
};

function keyToNote(keyEvent) {
    var keyValue = keyEvent.keyCode;
    var key = String.fromCharCode(keyValue).toLowerCase();
    
    if(keyEvent.shiftKey) {
        if(keyValue == 188) {
            scale.changeMajor(Direction.DOWN);
            return null;
        } else if(keyValue == 190) {
            scale.changeMajor(Direction.UP);
            return null;
        }
    }
    // else {
    //     if(keyValue == 37) {
    //         select.cycleFocusedKey(Direction.DOWN);
    //         return null;
    //     } else if(keyValue == 39) {
    //         select.cycleFocusedKey(Direction.UP);
    //         return null;
    //     }
    // }
    
    var index = indexFromValue(notes.possibleKeys, key);
    
    if(keyValue == 13) {
        var focusedKeyID = document.activeElement.id;
        if(focusedKeyID.length < 1) {
            return null;
        }
        var focusedNoteID = focusedKeyID.substring(0, focusedKeyID.length-1);
        if(focusedNoteID.length < 1 || focusedNoteID.length > 3) {
            return null;
        }
        return focusedNoteID;
    }
    
    if(index == -1 || keyValue < 48 || keyValue > 90) {
        return null;
    } else {
        var note = ""+notes.noteOrdering[index % 7];
        var octave = ""+Math.floor(index / 7);
        
        if(indexFromValue(scale.scaleNotes, note) != -1 && octave != 5) {
            var relativeNote = scale.isSharpMajor? note : notes.possibleSharps[indexFromValue(notes.possibleFlats, note)];
            if(!keyEvent.shiftKey) {
                note = relativeNote + "~";
            }
        } else {
            if(keyEvent.shiftKey) {
                if(indexFromValue(notes.possibleSharps, note) != -1 && octave != 5) {
                    note+="~";
                } else {
                    return null;
                }
            }
        }
        
        return note+octave;
    }
}

function music(note) {
    var audio = $(note);
    var clonedAudio = audio.cloneNode();
    clonedAudio.play();
    clonedAudio.remove();
}

function musicFromClick(event) {
    music(event.currentTarget.id.substring(0, event.currentTarget.id.length-1));
}

function showKeyPressed(key) {
    var pianoKey = $(key+"k");
    
    var oldBackground;
    var newBackground;
    var oldHeight;
    var newHeight;
    if(notes.isSharp(key)) {
        oldBackground = "#275579";
        newBackground = "#092d49";
        oldHeight = "60%";
        newHeight = "57%";
    } else {
        oldBackground = "#9fd4ff";
        newBackground = "#7eafd6";
        oldHeight = "100%";
        newHeight = "95%";
    }
    
    pianoKey.style.background = newBackground;
    pianoKey.style.height = newHeight;
    setTimeout(function() {
        pianoKey.style.background = oldBackground;
    pianoKey.style.height = oldHeight;
    }, 200);
}
