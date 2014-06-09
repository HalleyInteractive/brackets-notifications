brackets-notifications
======================

Brackets - Notifications



#### Implementing notifications in your brackets extension

Your extension should include the Brackets CommandManager module.  
Use the execute function from the module to send a notification to the user.



##### Example
```Javascript
var notification = {
	title: 'Sample notification title',
	message: 'Sample notification body',
	time: null // Default is 2000
}
var CommandManager = brackets.getModule("command/CommandManager");
CommandManager.execute("notifications.notification", notification);
```