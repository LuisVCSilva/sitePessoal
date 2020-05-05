<?php 
echo json_encode(array("eval" => !isset($_GET["arg_0"]) || !isset($_GET["arg_1"]) ? "imprime(false,'Please specifiy the two matrices that represent the linear system');imprime(false,'Call \"help linsolve\" for more help')" : str_replace(array("\r", "\n"), '', file_get_contents(getcwd()."/Programs/linsolve/linsolve.js"))."linsolve(".$_GET["arg_0"].",".$_GET["arg_1"].");"
));
?>

