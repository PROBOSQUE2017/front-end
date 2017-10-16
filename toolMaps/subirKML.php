<!DOCTYPE html>
<html>
<head>
  <title></title>
  <script type="text/javascript" src="../js/libs/amplify/amplify.js"></script>
</head>
<body>
</body>
</html>
<?php
  if ($_FILES['archivo']["error"] > 0) 
  {
    echo "Error".$_FILES['archivo']["error"]."<br />";
  }
  else
  {
    echo "<script>alert('Exito')</script>";
    echo "<script>window.location.assign(\"http://localhost:800/SIFEM/toolMaps/index.php\");</script>";
  }

  move_uploaded_file($_FILES['archivo']['tmp_name'], "kml/" . $_FILES['archivo']['name']);
?>