<?php
echo json_encode(array("eval" => str_replace(array("\r", "\n"), '', file_get_contents(getcwd()."/Programs/about/about.js"))."About();"));
?>
