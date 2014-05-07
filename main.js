/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, brackets, $ */

define(function (require, exports, module)
{
    "use strict";
	
	// Load brackets modules
	var ExtensionUtils = brackets.getModule("utils/ExtensionUtils"),
        NodeDomain     = brackets.getModule("utils/NodeDomain");

	// Load node domain
    var NotificationsDomain = new NodeDomain("notifications", ExtensionUtils.getModulePath(module, "node/Notifications"));

	// Load stylesheet
	ExtensionUtils.loadStyleSheet(module, "brackets-notifications.css");

	// All notifications are appended to this container
	$(".main-view .content #editor-holder").append("<div id='notifications-container'></div>");

	// Simple notification event listener
	$(NotificationsDomain).on("simple-notification", function(title, message)
	{
		console.log("Notification received - title: " + title);
		console.log("Notification received - message: " + message);

		constructSimpleNotificaiton(title, message);
	});
	
	// Adds the notification to the notifications container
	function constructSimpleNotificaiton(title, message)
	{
		var simpleNotification = $("<div class='simple-notification'><h3>"+title+"</h3><p>"+message+"</p></div>");
		$("#notifications-container").append(simpleNotification);
		simpleNotification.delay(2000).fadeOut();
	}

	// Sample of triggering a notification
	NotificationsDomain.exec("simple-notification", "Sample title", "Sample message")
	.done(function(msg) { console.log("simple-notification triggered: " + msg); })
	.fail(function(msg) { console.log("simple-notification triggering failed: " + msg); });

});
