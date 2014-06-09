/* globals $, brackets, Mustache, define */
define(function (require, exports)
{
    "use strict";

	var Menus 			= brackets.getModule("command/Menus");
	var CommandManager  = brackets.getModule("command/CommandManager");
    var Commands        = brackets.getModule("command/Commands");
	var Dialogs         = brackets.getModule("widgets/Dialogs");

	var PreferencesManager  = brackets.getModule("preferences/PreferencesManager");
    var prefs = PreferencesManager.getExtensionPrefs("notification");

	prefs.definePreference("enabled", "boolean", true);
	prefs.definePreference("delay", "number", 2000);

	var SETTINGS_COMMAND_ID = "notification.settings";

	var dialogTemplate = require('text!settings.template');
	var dialog;
	var $dialog;


	CommandManager.register("Notification settings", SETTINGS_COMMAND_ID, openNotificationsDialog);
    Menus.getMenu(Menus.AppMenuBar.FILE_MENU).addMenuItem(SETTINGS_COMMAND_ID, "", Menus.AFTER, Commands.FILE_PROJECT_SETTINGS);

	function openNotificationsDialog()
	{
		var settings =
		{
			enabled: (prefs.get("enabled") ? 'checked' : ''),
			delay: prefs.get("delay")
		};

		var compiledTemplate = Mustache.render(dialogTemplate, settings);
		dialog = Dialogs.showModalDialogUsingTemplate(compiledTemplate);
		$dialog = dialog.getElement();

		$("#notification-settings-save", $dialog).click(function()
		{
			prefs.set("enabled", $("#notification-settings-enabled", $dialog).is(":checked"));
			prefs.set("delay", $("#notification-settings-delay", $dialog).val());
			prefs.save();

		});
	}

	function getSetting(property)
	{
		return prefs.get(property);
	}

	exports.get = getSetting;
});
