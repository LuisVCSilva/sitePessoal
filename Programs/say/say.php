<?php
echo json_encode(array("eval" => !isset($_GET["arg_0"]) ? "imprime(false,'Please specifiy a file to download');" : str_replace(array("\r", "\n"), '', file_get_contents(getcwd()."/Programs/say/say.js"))."Say('".$_GET['arg_0']."');"
));
?>
