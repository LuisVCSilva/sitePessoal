function UrlExists(url) {
var http = new XMLHttpRequest();
http.open('HEAD', url, false);
http.send();
return http.status!=404;
}

function Cat (file_content) {
saida = "";
if(file_content.includes(".") && UrlExists(file_content)) {
  $.ajax({
    url:file_content,
    success: function (data){
     saida = data;
     imprime(false,data);
    }
  });

}
else if (!file_content.includes('.')) {
imprime(false,'You can\'t cat extensionless files');
}
else {
imprime(false,'File does not exist!');
}
}