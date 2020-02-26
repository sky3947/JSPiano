// Tracks are generated when they are selected in "Sheets" tab
function Autoplay() {
    this.trackID = "GENERATEAUTOPLAYTRACKID";
    
    this.soundtrack = [];
    this.currentLine = 0;
    this.reader = 0;
    this.playing = false;
    this.totalLines = 0;
    
    this.track = null;
    this.name = null;
    this.bpm = null;
    this.playButton = null;
    this.stopButton = null;
    this.autoplayError = null;
    
    this.generateAutoplayTrack = function() {
        this.track.innerHTML = "";
        
        if(sheetDisplay.openedSheet == "default") {
            this.track.innerHTML = 'Select a sheet in the "Sheets" tab to get started.';
            this.name.innerHTML = "Nothing";
        } else {
            var i, j, sheetIndex;
            for(i = 0; i < presetSheets.length; i++) {
                if(presetSheets[i][SheetProperties.NAME] == sheetDisplay.openedSheet) {
                    sheetIndex = i;
                    break;
                }
            }
            scale.changeToMajor(presetSheets[sheetIndex][SheetProperties.MAJOR]);
            
            // First, make some white space for scrolling purposes
            var trackConstruction = "";
            this.soundtrack = [];
            trackConstruction += '<span id="'+(this.trackID+"0")+'" class="'+this.trackID+'">'+"-START-"+'</span><br>';
            this.soundtrack.push("-START-");
            for(i = 1; i < 8; i++) {
                trackConstruction += '<span id="'+(this.trackID+i)+'" class="'+this.trackID+'"></span><br>';
                this.soundtrack.push("");
            }
            
            // Next, make the spans of text
            
            // this.soundtrack is responsible for keeping track of the raw notes to play. The computer parses this.
            var sheet = presetSheets[sheetIndex][SheetProperties.SHEET];
            var temp;
            for(j = 0; j < sheet.length; j++) {
                if(sheet[j][0] != "~") {
                    temp = sheet[j].replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, ">");
                    this.soundtrack.push(temp);
                }
            }
            
            // sheet is responsible for keeping whitespace (&nbsp;) characters. This is what the user sees.
            for(j = 0; j < sheet.length; j++) {
                if(sheet[j][0] != "~") {
                    trackConstruction += '<span id="'+(this.trackID+i)+'" class="'+this.trackID+'">'+sheet[j]+'</span><br>';
                    i++;
                }
            }
            
            // Last, make some more white space for scrolling purposes
            for(j = 0; j < 7; j++) {
                trackConstruction += '<span id="'+(this.trackID+i)+'" class="'+this.trackID+'"></span><br>';
                this.soundtrack.push("");
                i++;
            }
            trackConstruction += '<span id="'+(this.trackID+i)+'" class="'+this.trackID+'">'+"-END-"+'</span><br>';
            this.soundtrack.push("-END-");
            i++;
            
            // Do some construction
            this.track.innerHTML = trackConstruction;
            
            this.totalLines = i;
            
            $(this.trackID+"0").classList.add("highlight");
            
            this.bpm.value = presetSheets[sheetIndex][SheetProperties.BPM];
            
            if(sheetDisplay.openedSheet != "IMPORTED SHEET") {
                this.name.innerHTML = sheetDisplay.openedSheet;
            } else {
                this.name.innerHTML = presetSheets[SheetProperties.CUSTOM_SHEET][SheetProperties.CUSTOM_SHEET_NAME];
            }
        }
    };
    
    this.playSong = function() {
        if(this.playing) {
            this.playing = false;
            this.playButton.innerHTML = "Play";
        } else if(this.totalLines > 0) {
            this.playing = true;
            if(this.currentLine >= this.totalLines) {
                this.currentLine = 0;
                this.reader = 0;
            }
            this.playButton.innerHTML = "Pause";
            this.hideError();
            this.recPlaying();
        }
    };
    
    this.recPlaying = function() {
        if(this.playing && this.currentLine < this.totalLines) {
            var element = $(this.trackID+this.currentLine);
            var line = this.soundtrack[this.currentLine];
            var MSPB = (this.bpm.value == 0) ? 300 : Math.floor(1000 / (this.bpm.value / 60));
            var end;
            
            if(this.reader < line.length) {
                if(line[this.reader] == "[") {
                    end = line.indexOf("]", this.reader+1);
                    
                    if(end == -1) {
                        this.showError("chord is missing ']'");
                        if(this.playing) {
                            this.playSong();
                        }
                    } else {
                        if(!this.playChord(line.substring(this.reader+1, end))) {
                            if(this.playing) {
                                this.playSong();
                            }
                        } else {
                            this.reader = end + 1;
                        }
                    }
                    setTimeout(function() { autoplay.recPlaying() }, MSPB);
                } else if(line[this.reader] == "{") {
                    end = line.indexOf("}", this.reader+1);
                    
                    if(end == -1) {
                        this.showError("grace note is missing '}'");
                        if(this.playing) {
                            this.playSong();
                        }
                    } else {
                        if(this.playGrace(line.substring(this.reader+1, end), MSPB)) {
                            this.reader = end + 1;
                            setTimeout(function() { autoplay.recPlaying() }, MSPB);
                        } else {
                            if(this.playing) {
                                this.playSong();
                            }
                        }
                    }
                } else if(line[this.reader] == " ") {
                    this.reader++;
                    autoplay.recPlaying();
                } else if(line[this.reader] == ".") {
                    this.reader++;
                    setTimeout(function() { autoplay.recPlaying() }, MSPB);
                } else if(line[this.reader] == "-") {
                    this.removeAllHighlighted();
                    this.currentLine++;
                    
                    if(this.currentLine < this.totalLines) $(this.trackID+this.currentLine).classList.add("highlight");
                    if(this.currentLine-4 > 0) $(this.trackID+(this.currentLine-4)).scrollIntoView();
                    autoplay.recPlaying();
                } else if(indexFromValue(notes.possibleNotes, line[this.reader]) != -1) {
                    this.playChord(line[this.reader]);
                    this.reader++;
                    setTimeout(function() { autoplay.recPlaying() }, MSPB);
                } else {
                    this.showError("unrecognized note '"+line[this.reader]+"'");
                    if(this.playing) {
                        this.playSong();
                    }
                }
            } else {
                this.removeAllHighlighted();
                this.currentLine++;
                this.reader = 0;
                
                if(this.currentLine < this.totalLines) $(this.trackID+this.currentLine).classList.add("highlight");
                if(this.currentLine-4 > 0) $(this.trackID+(this.currentLine-4)).scrollIntoView();
                autoplay.recPlaying();
            }
        } else {
            if(this.currentLine < this.totalLines) {
                this.reader = 0;
            } else {
                $(this.trackID+(this.totalLines-1)).classList.add("highlight");
            }
            if(this.playing) {
                this.playSong();
            }
        }
    };
    
    this.playGrace = function(grace, MSPB) {
        var reader = 0;
        var chords = [];
        var i, end;
        
        for(i = 0; i < grace.length; i++) {
            if(grace[i] == "[") {
                end = grace.indexOf("]", i+1);
                
                if(end == -1) {
                    this.showError("chord is missing ']' in grace note");
                    return false;
                } else {
                    chords.push(grace.substring(i+1, end));
                    i = end;
                }
            } else if(indexFromValue(notes.possibleNotes, grace[i]) != -1 || grace[i] == ".") {
                chords.push(grace[i]);
            } else {
                this.showError("unrecognized note in grace note '"+grace[i]+"'");
                return false;
            }
        }
        
        for(i = 0; i < chords.length; i++) {
            if(chords[i] != ".") {
                setTimeout(this.playChord.bind(null, chords[i]), i*(MSPB/chords.length));
            }
        }
        
        return true;
    };
    
    this.playChord = function(chord) {
        var noteIndex, note;
        for(var i = 0; i < chord.length; i++) {
            noteIndex = indexFromValue(notes.possibleNotes, chord[i]);
            if(noteIndex != -1) {
                if(noteIndex % 2 == 0) {
                    note = keyIndexToNote(indexFromValue(notes.possibleKeys, chord[i]), false);
                } else {
                    note = keyIndexToNote(indexFromValue(notes.possibleKeys, notes.possibleNotes[noteIndex-1]), true);
                }
                
                if(note !== null) {
                    music(note);
                    showKeyPressed(note);
                }
                
            } else {
                this.showError("unrecognized note in chord '"+chord+"'");
                return false;
            }
        }
        
        return true;
    };
    
    this.stopSong = function() {
        this.removeAllHighlighted();
        
        if(this.totalLines > 0) {
            this.track.scrollIntoView(true);
            $(this.trackID+"0").classList.add("highlight");
        }
        
        this.currentLine = 0;
        this.reader = 0;
        
        if(this.playing) {
            this.playSong();
        }
        
        this.hideError();
    };
    
    this.removeAllHighlighted = function() {
        var lines = $$(this.trackID);
        for(var i = 0; i < lines.length; i++) {
            lines[i].classList.remove("highlight");
        }
    };
    
    this.fixScroll = function() {
        if(this.currentLine == 0 && this.totalLines > 0) {
            this.track.scrollIntoView(true);
        } else {
            if(this.currentLine-4 > 0) $(this.trackID+(this.currentLine-4)).scrollIntoView();
        }
    };
    
    this.showError = function(msg) {
        this.autoplayError.innerHTML = "Error: "+msg;
        this.autoplayError.classList.remove("hidden");
    };
    
    this.hideError = function() {
        this.autoplayError.classList.add("hidden");
    };
}

var autoplay = new Autoplay();

function setupAutoplay() {
    autoplay.track = $("songProgress");
    autoplay.name = $("songName");
    autoplay.bpm = $("BPM");
    autoplay.playButton = $("playButton");
    autoplay.stopButton = $("stopButton");
    autoplay.autoplayError = $("autoplayError");
}
