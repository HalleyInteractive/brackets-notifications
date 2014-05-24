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
		// Save options to the element's data
		var notification = $("<div class='notification'><h3>"+input.title+"</h3><p>"+input.message+"</p></div>").data(input);
        if(input.actions !== undefined)
		{
			var actions = $("<div class='actions'></div>");
			for(var i=0; i<input.actions.length; i++)
			{
				var action = $("<div class='action'>"+input.actions[i].label+"</div>");
				if(input.actions[i].callback !== undefined)
				{
					action.click(clickHandler);
					action.click(input.actions[i].callback);
				}
				actions.append(action);
			}
			notification.append(actions);
		}
		notification.click(clickHandler);
		if(input.clicked !== undefined)
		{
			notification.click(input.clicked);
		}
		
		$("#notifications-container").append(notification);
		
		// Fade if time is set
		if(input.time !== 0)
        {
            notification.delay(input.time).fadeOut();
        }
		
		return notification;
	}
    
    // First, register a command - a UI-less object associating an id to a handler
    var NOTIFICATION_COMMAND_ID = "notifications.notification";   // package-style naming to avoid collisions      TODO: Check whether this is not crazy naming..
    CommandManager.register("Send Notification notification", NOTIFICATION_COMMAND_ID, constructNotification);

    // Handle clicks fired by notif and actions.
    function clickHandler()
    {
		if($(this).hasClass('action'))
		{
			$(this).parents('.notification').fadeOut();		// TODO: prevent parents() from going to far up the DOM
		}else{
			$(this).fadeOut();
		}
    }
});
