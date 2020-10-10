<?php
$dbServername = "localhost";
$dbUsername = "jakeyoon_jake";
$dbPassword = "password";
$dbName = "jakeyoon_thejakeyoon.com";

$conn = mysqli_connect($dbServername, $dbUsername, $dbPassword, $dbName);

$errors = "";

if(isset($_POST['submit'])){
    if(empty($_POST['task'])){
        $errors = "You must fill in the task";
    }
    else{
        $task = $_POST['task'];
        $sql = "INSERT INTO todo (task) VALUES ('$task')";
        mysqli_query($conn, $sql);
        header('location: todo.php');
    }
}
if (isset($_GET['del_task'])) {
    $id = $_GET['del_task'];

    ini_set('display_errors', 1);
    
	mysqli_query($conn, "DELETE FROM todo WHERE id=".$id);
	header('location: todo.php');
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.5.1/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.5.1/ScrollTrigger.min.js"></script>
    <link rel="stylesheet" href="css/style.css">
    <title>ToDo</title>
</head>
<body>
    <header>
        <nav class="navbar navbar-expand-md bg-custom navbar-dark fixed-top">
            <a class="navbar-brand" href="/">Jake Yoon</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="collapsibleNavbar">
                <ul class="navbar-nav nav-item-custom ml-auto">
					<li class="nav-item dropdown">
						<a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
						  Projects
						</a>
						<div class="dropdown-menu">
                            <a class="dropdown-item" href="bootstrap">Bootstrap</a>
                            <a class="dropdown-item" href="todo.php">Todo</a>
                            <a class="dropdown-item" href="http://www.dogabase.com">Dogabase</a>
                            <a class="dropdown-item" href="ehill">eHill</a>
                            <a class="dropdown-item" href="djikstra">Djikstra</a>
                            <a class="dropdown-item" href="cheaterz">Cheaterz</a>
						</div>
					  </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/about">About</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/contact">Contact</a>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
    
    <div style="padding: 10vw;">
        <form method="post" action="todo.php">
            <?php if(isset($errors)) { ?>
                <p><?php echo $errors; ?></p>
            <?php } ?>
            <input type="text" name="task">
            <button type="submit" name="submit">Add Task</button>
        </form>
    </div>
    </div class="container"">
                <table class="table table-dark table-striped">
                    <tr>
                        <th>No.</th>
                        <th>Tasks</th>
                    </tr>
                </table>
                <table class="table table-dark table-striped">
                    <?php
                        $tasks = mysqli_query($conn, "SELECT * FROM todo");
                        $i = 1;
                        while($row = mysqli_fetch_array($tasks)){
                    ?>
                    <tr>
                        <td><?php echo $i; ?></td>
                        <td><?php echo $row['task']; ?></td>
                        <td class="delete"> 
					        <a href="todo.php?del_task=<?php echo $row['id'] ?>">x</a> 
				        </td>
                    </tr>
                    <?php $i++; } ?>
                </table>
    </div>
</body>
</html>