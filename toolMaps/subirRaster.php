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
  if ($_FILES['archivoRaster']["error"] > 0) 
  {
    echo "Error".$_FILES['archivoRaster']["error"]."<br />";
  }
  else
  {
    echo "<script>alert('Exito')</script>";
    echo "<script>window.location.assign(\"http://localhost:800/SIFEM/toolMaps/index.php\");</script>";
  }

  move_uploaded_file($_FILES['archivoRaster']['tmp_name'], "raster/" . $_FILES['archivoRaster']['name']);
?><!DOCTYPE html>
<html>
<head>
  <title></title>
  <script type="text/javascript" src="../js/libs/amplify/amplify.js"></script>
</head>
<body>
</body>
</html>


  