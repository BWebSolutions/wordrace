
function share () {
    var date = new Date();
    var d = date.toLocaleString('en-us', { month: 'short' }) + ' ' + date.getDate() + ', ' + date.getFullYear();
    copy = 'Word Race: ' + d + '\n';
    // copy += document.getElementById("shareRack").innerHTML + '\n';
    copy += document.getElementById("legend0").innerHTML + '\n';
    copy += 'https://bwebsolutions.github.io/wordrace/';

    navigator.clipboard.writeText(copy).then(function() {  
        document.getElementById('shareMsg').innerHTML = 'Results copied to clipboard.<br />Paste on social media to challenge friends!<br />';
    });

    // Check if navigator.share is supported by the browser
    if (navigator.share && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        navigator.share({
                title: 'Word Race',
                text: copy
            })
            .then(() => console.log('Successful share'))
            .catch((error) => console.log('Error sharing', error));
    } 
}