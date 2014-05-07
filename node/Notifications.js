/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global exports */

(function () {
	"use strict";
	
	var dm;
	
	// Dispatches the simple notification event
	function simpleNotification(t, m)
	{
		console.log("Simple notification function called: " + t);
		console.log("Simple notification function called: " + m);

		dm.emitEvent(
		"notifications",	// Domain
		"simple-notification",	// Event
		{
			title: t,
			messsage: m
		}
		);

	}

	// Registers all commands and events
	function init(domainManager)
	{
		dm = domainManager;
		
        if (!dm.hasDomain("notifications")) { dm.registerDomain("notifications", {major: 0, minor: 1}); }

        dm.registerCommand(
            "notifications",		// domain name
            "simple-notification",		// command name
            simpleNotification,			// command handler function
            false,						// this command is synchronous in Node
            "Shows a notification in the Brackets editor view",
            [{
				// Parameter 1
				name: "title",
				type: "string",
				descriptions: "This will be the title in the notification"
			},
			{
				// Parameter 2
				name: "message",
				type: "string",
				descriptions: "This will be the message in the notification"
			}],
            []
		);

		dm.registerEvent(
            "notifications",		// domain name
            "simple-notification",		// command name
            [{
				// Parameter 1
				name: "title",
				type: "string",
				descriptions: "This will be the title in the notification"
			},
			{
				// Parameter 2
				name: "message",
				type: "string",
				descriptions: "This will be the message in the notification"
			}]
		);
	}

    exports.init = init;

}());
