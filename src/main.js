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
    document.getElementById("msg").innerHTML = '';
    const key = event.key.toUpperCase(); // "a", "1", "Shift", etc.
    if (rack.includes(key)){
        document.getElementById("build").innerHTML += 
            '<div class="block green">' + key + '<div>';
        document.getElementById("word").innerHTML += key;
    }
    if (key == 'ENTER'){
        checkWord(document.getElementById("word").innerHTML);
    }
    if (key == 'BACKSPACE'){
        clearWord();
    }
});

function loadLetters() {
    var pad = function(num) {return (num < 10 ? '0' : '') + num;};
    var date = new Date();

    date = date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate());
    letters = rackJSON[date];
    loadRack();
}

function loadRack() {
    document.getElementById("rack").innerHTML = '';
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

    for (let i = 0; i < rack.length; i++) {
        document.getElementById("rack").innerHTML +=
            '<div class="block rack">' + rack[i] + '</div>';
    }
}

function checkWord(word){
    if (words.includes(word)) {
        document.getElementById("msg").innerHTML = word + ' was already used<br /><br />';
    }
    else if (dictionary.includes(word.toLowerCase())) {
        words.push(word);
        displayWordList();
        clearWord();
    }
    else {
        document.getElementById("msg").innerHTML = word + " is not a word<br /><br />";
    }
}

function clearWord(){
    document.getElementById("build").innerHTML = '';
    document.getElementById("word").innerHTML = '';
}

function displayWordList(){
    document.getElementById("wordList").innerHTML = '';
    words.sort();
    for (word of words)
        document.getElementById("wordList").innerHTML += word + '<br />';
}