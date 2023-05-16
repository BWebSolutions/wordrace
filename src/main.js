let dictionary = Array();
let letters = Array();
let words = Array();
let rack = '';

// Load the dictionary file and store it into the dictionary array
fetch('https://raw.githubusercontent.com/BWebSolutions/word/main/dictionary.json')
.then(response => response.json())
.then(data => {
    dictionary = data;
    loadLetters();
})
.catch(error => console.error('Error:', error));


document.addEventListener('keydown', function(event) {
    const timerElement = document.getElementById("timer");
    const wordElement = document.getElementById("word");
    const msgElement = document.getElementById("msg");

    if (timerElement.innerHTML != 'TIME EXPIRED') {
        msgElement.innerHTML = '';
        const key = event.key.toUpperCase();

        if (rack.includes(key)) {
            wordElement.innerHTML += key;
            buildIt();
        }
        if (key == 'ENTER') {
            checkWord(wordElement.innerHTML);
        }
        if (key == 'BACKSPACE') {
            wordElement.innerHTML = wordElement.innerHTML.slice(0, -1);
            buildIt();
        }
    }   
});


function buildIt() {
    const word = document.getElementById("word").innerHTML;
    const blocks = [];
    for (const s of word) {
        blocks.push('<div class="block green">' + s + '</div>');
    }
    document.getElementById("build").innerHTML = blocks.join('');
    console.log(blocks.join(''));
}

function checkWord(word) {
    const msgElement = document.getElementById("msg");

    if (words.includes(word)) {
        msgElement.innerHTML = '<br /><strong>' + word + '</strong> was already used<br />';
    } else if (dictionary.includes(word.toLowerCase())) {
        words.push(word);
        displayWordList();
        clearWord();
    } else {
        msgElement.innerHTML = '<br /><strong>' + word + "</strong> is not a word<br />";
    }
}

function displayWordList() {
    const wordList = [];
    let letters = 0;
    words.sort();

    for (const word of words) {
        wordList.push('<a href="https://www.merriam-webster.com/dictionary/' + word + '" target="new">' + word + '<br />');
        letters += word.length;
    }

    document.getElementById("wordList").innerHTML = wordList.join('');
    document.getElementById("legend0").innerHTML = 'Words: ' + words.length + ', Letters: ' + letters;
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
    var n = a.length;

    for (var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    rack = a.join("");
    
    const rackBlocks = [];
    for (const r of rack) {
        rackBlocks.push('<div class="block rack">' + r + '</div>');
    }
    document.getElementById("rack").innerHTML = rackBlocks.join('');
}

function addLetter(l){
        document.getElementById("word").innerHTML += l;
        buildIt();
}

function clearWord(){
    document.getElementById("build").innerHTML = '';
    document.getElementById("word").innerHTML = '';
}


function startClock(){
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
        document.getElementById("shareDiv").style.display = "block";
    }
    }, 1000);
}

function showHelp(b){
    if (b)
        document.getElementById('help').style.visibility='visible';
    else{
        document.getElementById('help').style.visibility='hidden';
        startClock();
        document.getElementById('keyboard').focus();
    }
}