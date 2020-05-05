<?php
echo json_encode(array("eval" => (!isset($_GET["arg_0"]) || !isset($_GET["arg_1"])) ? "imprime(false,\"grep requires 2 arguments (string - pattern)\");" : str_replace(array("\r", "\n"), '', file_get_contents(getcwd()."/Programs/grep/grep.js"))."Grep(\"".$_GET["arg_0"]."\",\"".$_GET["arg_1"]."\");"));
?>
