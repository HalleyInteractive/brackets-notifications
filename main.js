/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, brackets, $ */

define(function (require, exports, module)
{
    "use strict";
	
	// Load brackets modules
	var ExtensionUtils = brackets.getModule("utils/ExtensionUtils"),
		CommandManager = brackets.getModule("command/CommandManager");

	// Load stylesheet
	ExtensionUtils.loadStyleSheet(module, "brackets-notifications.css");

	// All notifications are appended to this container
	$(".main-view .content #editor-holder").append("<div id='notifications-container'></div>");
	
	// Adds the notification to the notifications container
	function constructNotification(input)
	{
		console.log("Construct Notification");
		
		// ReturnData contains the notification element and the action elements for binding events to
		var returnData = {};
		
		// Define defaults
        var defaults = 
        {
            title:"",
            message:"",
            time:2000
        }
        // Merge missing defaults into input
        for(var prop in defaults)
        {
            input[prop] = input[prop] !== undefined? input[prop] : defaults[prop];
        }
    
		// Contruct and append notification
		var notification = $("<div class='notification'><h3>"+input.title+"</h3><p>"+input.message+"</p></div>");
        if(input.actions !== undefined)
		{
			var actions = $("<div class='actions'></div>");
			returnData.actions = [];
			for(var i=0; i<input.actions.length; i++)
			{
				var action = $("<div class='action'>"+input.actions[i]+"</div>")
				actions.append(action);
				returnData.actions[input.actions[i]] = action;
			}
			notification.append(actions);
		}
		notification.click(clickHandler);
		$("#notifications-container").append(notification);
        returnData.notification = notification;
		
		// Fade if time is set
		if(input.time !== 0)
        {
            notification.delay(input.time).fadeOut();
        }
		
		return returnData;
	}
    
    // First, register a command - a UI-less object associating an id to a handler
    var NOTIFICATION_COMMAND_ID = "notifications.notification";   // package-style naming to avoid collisions      TODO: Check whether this is not crazy naming..
    CommandManager.register("Send Notification notification", NOTIFICATION_COMMAND_ID, constructNotification);

    // Handle clicks.
    function clickHandler(e)
    {
        $(this).fadeOut();
    }
});
