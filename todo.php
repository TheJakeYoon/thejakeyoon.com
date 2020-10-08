<?php 
    // initialize errors variable
	$errors = "";

	// connect to database
	$db = mysqli_connect("localhost", "root", "", "todo");

	// insert a quote if submit button is clicked
	if (isset($_POST['submit'])) {
		if (empty($_POST['task'])) {
			$errors = "You must fill in the task";
		}else{
			$task = $_POST['task'];
			$sql = "INSERT INTO tasks (task) VALUES ('$task')";
			mysqli_query($db, $sql);
			header('location: contact.php');
		}
    }	

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form method="post" action="contact.php" class="input_form">
    <?php if (isset($errors)) { ?>
	<p><?php echo $errors; ?></p>
    <?php } ?>
		<input type="text" name="task" class="task_input">
		<button type="submit" name="submit" id="add_btn" class="add_btn">Add Task</button>
    </form>
    
    <?php
        $db = mysqli_connect("jakeyoon_thejakeyoon.com", "jakeyoon_jake", "password", "todo");

        $task = mysqli_query($db, "SELECT * FROM todo");
        $i = 1; while ($row = mysqli_fetch_array($tasks)) { 
    ?>
            <tr>
                <td> <?php echo $i; ?> </td>
                <td class="task"> <?php echo $row['task']; ?> </td>
                <td class="delete"> 
                    <a href="contact.php?del_task=<?php echo $row['id'] ?>">x</a> 
                </td>
            </tr>
        <?php $i++; } ?>	
    <?php
        if (isset($_GET['del_task'])) {
	        $id = $_GET['del_task'];

	        mysqli_query($db, "DELETE FROM tasks WHERE id=".$id);
	        header('location: contact.php');
        }
    ?>


</body>
</html>