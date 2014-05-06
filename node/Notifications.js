/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global exports */

(function () {
	"use strict";
	
	var domainManager;
	
	function notifciation(title, message)
	{
		domainManager.emitEvent(
		"halleyinteractive",
		"notification",
			{
				title: title,
				messsage: message
			}
		);
		return "test";
	}

	function init(domainManager)
	{
		domainManager = domainManager;
		
        if (!domainManager.hasDomain("halleyinteractive"))
		{
            domainManager.registerDomain("halleyinteractive", {major: 0, minor: 1});
        }
        domainManager.registerCommand (
            "halleyinteractive",		// domain name
            "notification",				// command name
            notifciation,				// command handler function
            false,						// this command is synchronous in Node
            "Shows a notification in the Brackets editor view",
            [{
				// Parameter 1
				name: "title",
				type: "String",
				descriptions: "This will be the title in the notification"
			},
			{
				// Parameter 2
				name: "message",
				type: "String",
				descriptions: "This will be the message in the notification"
			}],
            [{	
				// return values
				name: "test",
                type: "string",
                description: "test"
			}]
		);
	}
    exports.init = init;
}());