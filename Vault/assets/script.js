var divider = '------------------------------------------------------------------------------------<br>------------------------------------------------------------------------------------';
var text;
function readFile(input, pass) {
var password = pass;

        let new_file = input.files[0]; 
        let new_fileReader = new FileReader(); 
        new_fileReader.fileName = new_file.name
        new_fileReader.readAsText(new_file); 
        new_fileReader.onload = function() {
          text = CryptoJS.AES.encrypt(new_fileReader.result, password).toString();
        }; 
        new_fileReader.onerror = function() {
          alert(new_fileReader.error);
        };         

        let file = input.files[0]; 
        let fileReader = new FileReader(); 
        fileReader.fileName = file.name
        fileReader.readAsDataURL(file); 
        fileReader.onload = function() {
          document.getElementById('files').innerHTML += `<span onclick="unlock($(this).data('id'), $(this).data('label'), this.innerHTML)" data-id="`+CryptoJS.AES.encrypt(fileReader.result, password).toString()+`" data-label="`+text+`" class="item"><p>`+file.name+`</p></span>`;
        }; 
        fileReader.onerror = function() {
          alert(fileReader.error);
        }; 

      }

var inp;
function login(input){
    inp = input;
    document.getElementById('form').style.display = 'block';
}

document.getElementById('password-btn').addEventListener('click',function(){
    var pass = document.getElementById('password').value;
    document.getElementById('form').style.display = 'none';
    document.getElementById('password').value = '';
    readFile(inp, pass);
});

function blinker() {

  if ($('input[type=text]').attr('placeholder')) {
    // get the placeholder text
    $('input[type=text]').attr('placeholder', '');
  } else {
    $('input[type=text]').attr('placeholder', '> Enter a password to protect this file.');
  }

  setTimeout(blinker, 500);

}
var default_page;
function unlock(dataId, content, title){
default_page = document.getElementsByTagName('body')[0].innerHTML;

var encry = dataId;
var password = prompt("Enter this file's password to unlock its content.")

var dec = CryptoJS.AES.decrypt(encry, password);
var text_parsed = CryptoJS.AES.decrypt(content, password);

document.body.innerHTML = 
`<h1>Showing content of file "`+title.split('<p>')[1].split('</p>')[0]+`:"<br>`+divider+`</h1><br><i>Look strange? This file type may not be supported. Try downloading to view the correct content.</i><br><br><code style="background-color:darkgray; color:green;">`+(text_parsed.toString(CryptoJS.enc.Utf8)).substring(0, 1000)+`...`+`</code><br><br><br>`;
document.body.innerHTML += `
<a href="`+dec.toString(CryptoJS.enc.Utf8)+`" download="`+title.split('<p>')[1].split('</p>')[0]+`">Download This File</a><br><p style="cursor:pointer;" onclick="return_home()"><- Back to Files</p>
`
}
window.addEventListener('load',function(){

    if (localStorage.getItem('backup') !== null){
    document.getElementById('files').innerHTML = localStorage.getItem('backup');
    }

});

function saveIt(){
    document.getElementById('form').style.display = 'none';
    localStorage.setItem('backup', document.getElementById('files').innerHTML);
}
function return_home(){
document.getElementsByTagName('body')[0].innerHTML = default_page;
}
