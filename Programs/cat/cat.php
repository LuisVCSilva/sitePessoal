<?php
echo json_encode(array("eval" => !isset($_GET["arg_0"]) ? "imprime(false,'Please specifiy a file to print/concatenate');" : str_replace(array("\r", "\n"), '', file_get_contents(getcwd()."/Programs/cat/cat.js"))."Cat('".substr($_GET['current_directory'],1)."/".$_GET['arg_0']."');"));
?>
