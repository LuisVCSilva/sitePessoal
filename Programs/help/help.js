function Help () {
$.ajax({
   url: "evaluate.php?current_directory=/root_directory&call=cat&arg_0=help_initialText.txt",
   type: 'GET',
   dataType: 'text',
   success: function (response) {
    saida = JSON.parse(response);
    eval(saida["eval"]);
   }
})
}

