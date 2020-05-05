<?php

$files1 = array_fill_keys(array_slice(scandir(getcwd()."/Programs"),2),'');
foreach($files1 as $key=>$value) {
$files1[$key] = file_get_contents(getcwd()."/Programs/".$key."/man.txt",true);
}
echo isset($_GET["arg_0"]) ? json_encode(array("eval" => "imprime(false,'".addcslashes(str_replace("\"","'",$files1[$_GET["arg_0"]]),"'")."');")) : json_encode(array("eval" => file_get_contents(getcwd()."/Programs/help/help.js")."Help();") + array("" => $files1));
//+(array("" => $files1))
?>
