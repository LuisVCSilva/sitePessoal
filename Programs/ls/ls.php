<?php

function ls ($target) {
return array_slice(scandir(getcwd().$_GET["current_directory"]),2);
}

echo !isset($_GET['arg_0']) ? 
	json_encode( array("" => ls(""))) :
	json_encode( array("eval" => "imprime(false,\"'ls' doesn't support arguments yet\");"))
;
?>
