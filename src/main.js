var dictionary = Array();
var letters = Array();
var words = Array();
var rack = '';

// first load the dictionary file and store it into the dictionary array
var xhttp = new XMLHttpRequest();
xhttp.open('GET', 'https://raw.githubusercontent.com/BWebSolutions/word/main/dictionary.json', true);
xhttp.responseType = 'text';
xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
        dictionary = JSON.parse(this.responseText);
        loadLetters();
    }
};
xhttp.send();

document.addEventListener('keydown', function(event) {
    if (document.getElementById("timer").innerHTML != 'TIME EXPIRED')
    {
        document.getElementById("msg").innerHTML = '';
        const key = event.key.toUpperCase(); // "a", "1", "Shift", etc.
        if (rack.includes(key)){
            document.getElementById("word").innerHTML += key;
            buildIt();
        }
        if (key == 'ENTER'){
            checkWord(document.getElementById("word").innerHTML);
        }
        if (key == 'BACKSPACE'){
            var s = document.getElementById("word").innerHTML;
            document.getElementById("word").innerHTML = s.slice(0, -1);
            buildIt();
        }
    }   
});

function buildIt(){
    var string = document.getElementById("word").innerHTML;
    document.getElementById("build").innerHTML = '';

    for (s of string){
        document.getElementById("build").innerHTML += 
            '<div class="block green">' + s + '<div>';
    }
}

function loadLetters() {
    var pad = function(num) {return (num < 10 ? '0' : '') + num;};
    var date = new Date();

    date = date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate());
    letters = rackJSON[date];
    loadRack();
}

function loadRack() {
    document.getElementById("rack").innerHTML = '';
    rack = '';
    for (let l in letters)
        rack += l;

    var a = rack.split("");
    n = a.length;

    for (var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    rack = a.join("");

    for (r of rack) {
        document.getElementById("rack").innerHTML +=
            '<div class="block rack">' + r + '</div>';
    }
}

function addLetter(l){
        document.getElementById("word").innerHTML += l;
        buildIt();
}

function checkWord(word){
    if (words.includes(word)) {
        document.getElementById("msg").innerHTML = '<strong>' + word + '</strong> was already used<br />';
    }
    else if (dictionary.includes(word.toLowerCase())) {
        words.push(word);
        displayWordList();
        clearWord();
    }
    else {
        document.getElementById("msg").innerHTML = '<strong>' + word + "</strong> is not a word<br />";
    }
}

function clearWord(){
    document.getElementById("build").innerHTML = '';
    document.getElementById("word").innerHTML = '';
}

function displayWordList(){
    document.getElementById("wordList").innerHTML = '';
    var letters = 0;
    words.sort();
    for (word of words){
        document.getElementById("wordList").innerHTML += 
            '<a href="https://www.merriam-webster.com/dictionary/' + word + '" target="new">' + 
            word + '<br />';
        letters += word.length;
    }

    document.getElementById("legend0").innerHTML = 
        'Words: ' + words.length + ', Letters: ' + letters;
}

var i = 181;

// Update the count down every 1 second
var x = setInterval(function() {

  i--;
    
   // Output like "1:01" or "4:03:59" or "123:03:59"
    let clock = "";

    const mins = Math.floor(i / 60);
    const secs = i - mins * 60;

    clock += "" + mins + ":" + (secs < 10 ? "0" : "");
    clock += "" + secs;

  // Output the result in an element with id="demo"
  document.getElementById("timer").innerHTML = 'Timer: ' + clock;
    
  if (i < 0) {
    clearInterval(x);
    document.getElementById("timer").innerHTML = "TIME EXPIRED";
    document.getElementById("shareBtn").style.visibility = "visible";
  }
}, 1000);