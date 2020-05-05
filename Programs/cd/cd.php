<?php 
if(!isset($_GET["arg_0"]))
{
echo json_encode(array("eval" => "imprime(false,'Please specifiy a directory to go');"));
}
else
{
if($_GET["arg_0"]=="..")
{
	if($_GET["current_directory"]=="/root_directory")
	{
	echo json_encode(array("eval" => "imprime(false,\"You can't leave this folder\");"));
	}
	else
	{
	$aux = explode("/",$_GET["current_directory"]);
	array_pop($aux);
	$aux = implode("",$aux);
	$_GET["current_directory"] = "/".$aux;
	echo json_encode(array("eval" => "current_directory = \"".$_GET["current_directory"]."\";"));
	}
}
else if(is_dir($_GET["current_directory"]) || (is_dir(getcwd().$_GET["current_directory"]."/".$_GET["arg_0"])))
{
echo json_encode(array("eval" => "current_directory = \"".$_GET["current_directory"]."/".$_GET["arg_0"]."\";"));
}
else
{
echo json_encode(array("eval" => "imprime(false,\"This directory doesn\'t exist or is not a folder\");"));
}
}
?>

