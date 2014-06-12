/* globals $, brackets, Mustache, define */
define(function (require, exports, module)
{
    "use strict";

	var Menus 			= brackets.getModule("command/Menus");
	var CommandManager  = brackets.getModule("command/CommandManager");
    var Commands        = brackets.getModule("command/Commands");
	var Dialogs         = brackets.getModule("widgets/Dialogs");
	var FileUtils		= brackets.getModule("file/FileUtils");
	var FileSystem		= brackets.getModule("filesystem/FileSystem");

	var PreferencesManager  = brackets.getModule("preferences/PreferencesManager");
    var prefs = PreferencesManager.getExtensionPrefs("notification");

	prefs.definePreference("enabled", "boolean", true);
	prefs.definePreference("delay", "number", 2000);

	var SETTINGS_COMMAND_ID = "notification.settings";

	var SETTINGS_DIALOG_TEMPLATE = require('text!templates/settings.template');
	var SETTINGS_GENERAL_TEMPLATE = require('text!templates/settings-tab-general.template');
	var SETTINGS_EXTENSIONS_TEMPLATE = require('text!templates/settings-tab-extensions.template');
	var SETTINGS_NOTIFICATIONS_TEMPLATE = require('text!templates/settings-tab-notifications.template');

	var settingsFile = FileSystem.getFileForPath(FileUtils.getNativeModuleDirectoryPath(module) + '/settings.json');
	var settingsJSON;
	var promise = FileUtils.readAsText(settingsFile);
	promise.done(function(text)
	{
		settingsJSON = JSON.parse(text);
	})
	.fail(function (errorCode)
	{
		console.log("Error #" + errorCode);  // one of the FileSystemError constants
	});

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

		var compiledDialog = Mustache.render(SETTINGS_DIALOG_TEMPLATE, settings);

		var compiledGeneralTab = Mustache.render(SETTINGS_GENERAL_TEMPLATE, settings);
		var compiledExtensionsTab = Mustache.render(SETTINGS_EXTENSIONS_TEMPLATE, settingsJSON.extensions);
		var compiledNotificationsTab = Mustache.render(SETTINGS_NOTIFICATIONS_TEMPLATE, settingsJSON.notifications);

		dialog = Dialogs.showModalDialogUsingTemplate(compiledDialog);
		$dialog = dialog.getElement();

		$("#notification-settings-tab-general", $dialog).append(compiledGeneralTab);
		$("#notification-settings-tab-extensions", $dialog).append(compiledExtensionsTab);
		$("#notification-settings-tab-notifications", $dialog).append(compiledNotificationsTab);

		$("#notification-settings-save", $dialog).click(function()
		{
			prefs.set("enabled", $("#notification-settings-enabled", $dialog).is(":checked"));
			prefs.set("delay", $("#notification-settings-delay", $dialog).val());
			prefs.save();

		});

		$("#notification-settings-dialog .nav-button").click(function()
		{
			var element = $(this);
			if(!element.hasClass('active'))
			{
				$(".tab-content .tab-pane.active").hide().removeClass("active");
				$(".nav-button.active").removeClass("active");

				element.addClass("active");
				$("#" + element.data('tab')).show().addClass('active');
			}
		});
	}

	function getSetting(property)
	{
		return prefs.get(property);
	}

	exports.get = getSetting;
});
