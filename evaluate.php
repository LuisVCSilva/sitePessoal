<?php
$program = $_GET['call'];
ob_start();
include ("Programs/".$program."/".$program.'.php');
$result = ob_get_clean();
echo $result;
?>
