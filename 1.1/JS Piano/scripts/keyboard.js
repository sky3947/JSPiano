document.onkeydown = function(keyEvent) {
    scalePicker.closeScalesMenu();
    if(document.activeElement.tagName == "BODY" || document.activeElement.tagName == "BUTTON" || document.activeElement.parentNode.parentNode.classList.contains("keys")) {
        var note = keyToNote(keyEvent);
        if(note !== null) {
            music(note);
            showKeyPressed(note);
        }
        handleFocusChange(keyEvent);
        handleScaleChange(keyEvent);
    }
};

function keyToNote(keyEvent) {
    var keyValue = keyEvent.keyCode;
    var key = String.fromCharCode(keyValue).toLowerCase();
    
    // Playing focused key
    if(keyValue == 13) {
        var focusedKeyID = "";
        if(select.lastFocusedKey !== null) {
            focusedKeyID = select.lastFocusedKey.id;
            select.lastFocusedKey.focus();
        }
        if(focusedKeyID.length < 1) {
            return null;
        }
        
        var focusedNoteID = focusedKeyID.substring(0, focusedKeyID.length-1);
        if(focusedNoteID.length < 1 || focusedNoteID.length > 3) {
            return null;
        }
        return focusedNoteID;
    }
    
    var index = indexFromValue(notes.possibleKeys, key);
    
    // Calculating key to play
    if(index == -1 || keyValue < 48 || keyValue > 90) {
        return null;
    } else {
        return keyIndexToNote(index, keyEvent.shiftKey);
    }
}

function keyIndexToNote(index, shiftKey) {
    var note = ""+notes.noteOrdering[index % 7];
    var octave = Math.floor(index / 7);
    
    // If the note is affected by the scale:
    if(indexFromValue(scale.scaleNotes, note) != -1) {
        var relativeNote;
        var relativeOctave;
        
        // Figure out the relative note
        if(scale.isSharpMajor) {
            if(indexFromValue(notes.possibleSharps, note) == -1) {
                if(note == "b") {
                    relativeOctave = octave + 1;
                }
                relativeNote = notes.nextNote(note);
            } else {
                relativeNote = note;
            }
        } else {
            if(note == "c") {
                relativeOctave = octave - 1;
            }
            relativeNote = notes.previousNote(note);
        }
        
        // If shift key isn't pressed, calculate the note to play
        if(!shiftKey) {
            // Behavior for a major defined by sharps
            if(scale.isSharpMajor) {
                if(indexFromValue(notes.possibleSharps, note) == -1) {
                    if(note == "b") {
                        octave = relativeOctave;
                    }
                    note = relativeNote;
                } else {
                    if(octave == 5) {
                        return null;
                    } else {
                        note = relativeNote + "~";
                    }
                }
            // Behavior for a major defined by flats
            } else {
                if(indexFromValue(notes.possibleFlats, note) == -1) {
                    if(note == "c") {
                        if(relativeOctave < 0) {
                            return null;
                        }
                        octave = relativeOctave;
                    }
                    note = relativeNote;
                } else {
                    note = relativeNote + "~";
                }
            }
        }
        // If shift key is pressed, play normal not as if there was no scale
    // If the note isn't affected by the scale:
    } else {
        if(shiftKey) {
            if(indexFromValue(notes.possibleSharps, note) != -1 && octave != 5) {
                note += "~";
            } else {
                if(note == "c" && octave == 5) {
                    return null;
                }
                if(note == "b") {
                    octave++;
                }
                note = notes.nextNote(note);
            }
        }
    }
    
    return note+octave;
}

function music(note) {
    var audio = $(note);
    var clonedAudio = audio.cloneNode();
    clonedAudio.play();
    clonedAudio.remove();
}

// Used by HTML keyboard
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
