/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, brackets */

define(function (require, exports, module)
{
    "use strict";
	
	var ExtensionUtils = brackets.getModule("utils/ExtensionUtils"),
        NodeDomain     = brackets.getModule("utils/NodeDomain");

    var simpleDomain = new NodeDomain("halleyinteractive", ExtensionUtils.getModulePath(module, "node/Notifications"));

	$("halleyinteractive").on("notification", function(title, message)
	{
		console.log("Notification received - title: " + title);
		console.log("Notification received - message: " + message);
	});
	
	
	simpleDomain.exec("notification")
	.done(function(msg)
	{
		console.log("notification done: " + msg);
	})
	.fail(function(msg)
	{
		console.log("notification fail: " + msg);
	});

});