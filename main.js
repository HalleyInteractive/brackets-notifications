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
	function constructSimpleNotification(title, message)
	{
		console.log("Construct Simple Notification");
		var simpleNotification = $("<div class='simple-notification'><h3>"+title+"</h3><p>"+message+"</p></div>");
		$("#notifications-container").append(simpleNotification);
		simpleNotification.delay(2000).fadeOut();
	}

    // First, register a command - a UI-less object associating an id to a handler
    var SIMPLE_NOTIFICATION_COMMAND_ID = "notifications.simple";   // package-style naming to avoid collisions
    CommandManager.register("Send Simple Notification notification", SIMPLE_NOTIFICATION_COMMAND_ID, constructSimpleNotification);

});
