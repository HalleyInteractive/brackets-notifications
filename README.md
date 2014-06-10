brackets-notifications
======================

Brackets - Notifications

-- WHAT AND WHY ---

#### Implementing notifications in your brackets extension

Your extension should include the [Brackets CommandManager](http://www.dehats.com/bracketsdocs/#CommandManager) module.  
Use the execute function from the module to send a notification to the user.

ID of the notifications extension is `notifications.notification`


##### Example
```javascript
var notification = {
	title: 'Sample notification title',
	message: 'Sample notification body',
	time: null // Default is 2000
}
var CommandManager = brackets.getModule("command/CommandManager");
CommandManager.execute("notifications.notification", notification);
```

##### Possible options

| Option | Description |
|----:|----|
| title | The title shown in the notification. |
| message | The body of the notification. |
| time | Number of milliseconds before the notification dissapears automatically. *Default: 2000* |
| actions | Array of actions to be added to the notification |

> * None of the options are required
> * Adding html to the title or message is possible
> * Setting the time to 0 makes the notification a permanent notification

###### Actions

An action will be displayed as a button in the notification. The notification will be removed after the user clicks on a action button.

| Property | Description |
|----:|----|
| label | A short label describing the action. |
| callback | Function to be called after the user clicks this action |

