var inicial = 
"<div id='shell-logo'>\n" + 
"Luis Vinicius' Home Page                                                        <span></span>\n" + 
"Yep, it's only a terminal, that's all anyone needs                              <span></span>\n" + 
"Type \"help\" for help and use intuition to get what you want                     <span></span>\n" + 
"</div>\n";



var CWD = null;
var commandHistory = [];
var historyPosition = 0;
var eShellCmdInput = null;
var eShellContent = null;
var current_directory = "/root_directory";
var user = "guest";

function convert(text) {
var text1=String(text).replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, "<a href='$1'>$1</a>");
return text1.replace(/(^|[^\/])(www\.[\S]+(\b|$))/gim, '$1<a target="_blank" href="http://$2">$2</a>').replace(/([a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4})/ig, "<a href='mailto:$1'>$1</a>");
}

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function _insertCommand(command) {
retorno = main(command);
}

function imprime (asInput,str) {
str = String(str);
eShellContent.innerHTML += '\n';
if(asInput===true){
    eShellContent.innerHTML += '<span class=\"shell-prompt-context\">'+user+'@' + 'web' + ':</span><span class=\"shell-prompt-directory\">' + current_directory + '$</span> ' + '<span class=\"shell-prompt-user-input\">' + str + '</span>';
}
else {
    if(str.includes("\\n"))
    {
       for(var i=0;i<str.split("\\n").length;i++)
       {
       imprime(false,""+str.split("\\n")[i]);
       }
    }
    else
    {
    eShellContent.innerHTML += '<span class=\"shell-output\">'+ genPrompt(CWD) + " " + convert(str) + '</span> ';
    }
}
eShellContent.scrollTop = eShellContent.scrollHeight;
}

function main (command) {
imprime(true,command);
saida = {};
if(command.length != 0 && command.trim()) {
saida = request(command);
}
return saida;
}

function request (command) {
if(command=="clear")
{
eShellContent.innerHTML = inicial;
}
else
{
s = [];
   if(command.includes("\""))
   {
      aux = command.split("\"");
      for (var i=1;i<aux.length-1;i++) {
      s.push(aux[i]);
      i++;
      }
   _url = s;
   }
else
{
_url = Array.from(command.split(" ").slice(1));
}
for(var i=0;i<_url.length;i++) {
_url[i] = "arg_"+i+"="+_url[i];
}
_url = 'evaluate.php?current_directory='+current_directory+'&call='+command.split(" ")[0]+"&"+_url.join("&");
$.ajax({
   url: _url,
   type: 'GET',
   dataType: 'json',
   success: function (response) {
    if(response["eval"]!=null)
    {
    eval(response["eval"]);
    }
    delete response["eval"];
    imprime(false,JSON.stringify(response,null,4));
   }
}).fail(function (jqXHR, textStatus, error) {
   try {
    imprime(false,eval(command));
   }
   catch (err) {
    imprime(false,err.name + ": " + err.message);
   }
});
}
}

function _insertStdout(stdout) {
    eShellContent.innerHTML += escapeHtml(stdout);
    eShellContent.scrollTop = eShellContent.scrollHeight;
}

function featureShell(command) {
    _insertCommand(command);
}

function featureHint() {
    if (eShellCmdInput.value.trim().length === 0) return;  // field is empty -> nothing to complete
    function _requestCallback(data) {
        if (data.files.length <= 1) return;  // no completion
        if (data.files.length === 2) {
if (type === 'cmd') {
    eShellCmdInput.value = data.files[0];
} else {
    var currentValue = eShellCmdInput.value;
    eShellCmdInput.value = currentValue.replace(/([^\s]*)$/, data.files[0]);
}
        } else {
_insertCommand(eShellCmdInput.value);
_insertStdout(data.files.join("\n"));
        }
    }
    var currentCmd = eShellCmdInput.value.split(" ");
    var type = (currentCmd.length === 1) ? "cmd" : "file";
    var fileName = (type === "cmd") ? currentCmd[0] : currentCmd[currentCmd.length - 1];
}
function genPrompt(cwd) {
    cwd = cwd || "";
    var shortCwd = cwd;
    if (cwd.split("/").length > 3) {
        var splittedCwd = cwd.split("/");
        shortCwd = "…/" + splittedCwd[splittedCwd.length-2] + "/" + splittedCwd[splittedCwd.length-1];
    }
    return "<span class=\"" + cwd + "\">" + shortCwd + "</span>";
}

function updateCwd(cwd) {
    if (cwd) {
        _updatePrompt();
        return;
    }
}

function escapeHtml(string) {
    return string
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}
function _updatePrompt() {
    var eShellPrompt = document.getElementById("shell-prompt");
    eShellPrompt.innerHTML = genPrompt(CWD);
}

function _onShellCmdKeyDown(event) {
switch (event.key) {
case "Enter":
   featureShell(eShellCmdInput.value);
   insertToHistory(eShellCmdInput.value);
   eShellCmdInput.value = "";
break;

case "ArrowUp":
   if (historyPosition > 0) {
    historyPosition--;
    eShellCmdInput.blur();
    eShellCmdInput.focus();
    eShellCmdInput.value = commandHistory[historyPosition];
   }
break;

case "ArrowDown":
if (historyPosition >= commandHistory.length) {
    break;
}
historyPosition++;
if (historyPosition === commandHistory.length) {
    eShellCmdInput.value = "";
} else {
    eShellCmdInput.blur();
    eShellCmdInput.focus();
    eShellCmdInput.value = commandHistory[historyPosition];
}
break;

case 'Tab':
event.preventDefault();
featureHint();
break;
}
}

function insertToHistory(cmd) {
    commandHistory.push(cmd);
    historyPosition = commandHistory.length;
}

window.onload = function() {
    eShellCmdInput = document.getElementById("shell-cmd");
    eShellContent = document.getElementById("shell-content");
    updateCwd();
    eShellCmdInput.focus();
};

