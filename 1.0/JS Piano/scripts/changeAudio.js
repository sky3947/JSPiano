function changeAudio(piano) {
    var audioFiles = $("notes").childNodes;
    
    var i;
    for(i = 0; i < audioFiles.length; i++) {
        audioFiles[i].src = "notes/"+piano+"/notes/"+audioFiles[i].id+".mp3";
    }
}
