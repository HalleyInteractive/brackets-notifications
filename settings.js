/* globals $, brackets, Mustache, define */
define(function (require, exports, module)
{
    "use strict";

	// Load brackets modules
	var Menus 			= brackets.getModule("command/Menus");
	var CommandManager  = brackets.getModule("command/CommandManager");
    var Commands        = brackets.getModule("command/Commands");
	var Dialogs         = brackets.getModule("widgets/Dialogs");
	var FileUtils		= brackets.getModule("file/FileUtils");
	var FileSystem		= brackets.getModule("filesystem/FileSystem");
	var PreferencesManager  = brackets.getModule("preferences/PreferencesManager");

	// Constants
	var SETTINGS_COMMAND_ID = "notification.settings";
	var SETTINGS_DIALOG_TEMPLATE = require('text!templates/settings.template');
	var SETTINGS_GENERAL_TEMPLATE = require('text!templates/settings-tab-general.template');
	var SETTINGS_EXTENSIONS_TEMPLATE = require('text!templates/settings-tab-extensions.template');
	var SETTINGS_NOTIFICATIONS_TEMPLATE = require('text!templates/settings-tab-notifications.template');

	// Load preferences and settings
    var prefs = PreferencesManager.getExtensionPrefs("notification");
	prefs.definePreference("enabled", "boolean", true);
	prefs.definePreference("delay", "number", 2000);

	var settingsFile = FileSystem.getFileForPath(FileUtils.getNativeModuleDirectoryPath(module) + '/settings.json');
	var settingsJSON;

	var promise = FileUtils.readAsText(settingsFile);
	promise.done(function(text) { settingsJSON = JSON.parse(text); })
	.fail(function (errorCode) { console.log("Error #" + errorCode); });


	var dialog;
	var $dialog;

	CommandManager.register("Notification settings", SETTINGS_COMMAND_ID, openNotificationsDialog);
    Menus.getMenu(Menus.AppMenuBar.FILE_MENU).addMenuItem(SETTINGS_COMMAND_ID, "", Menus.AFTER, Commands.FILE_PROJECT_SETTINGS);

	/**
	* Compiles the templates and displays a dialog box
	*/
	function openNotificationsDialog()
	{
		var settings =
		{
			enabled: (prefs.get("enabled") ? 'checked' : ''),
			delay: prefs.get("delay")
		};

		// Compile templates
		var compiledDialog = Mustache.render(SETTINGS_DIALOG_TEMPLATE, settings);
		var compiledGeneralTab = Mustache.render(SETTINGS_GENERAL_TEMPLATE, settings);
		var compiledExtensionsTab = Mustache.render(SETTINGS_EXTENSIONS_TEMPLATE, settingsJSON.extensions);
		var compiledNotificationsTab = Mustache.render(SETTINGS_NOTIFICATIONS_TEMPLATE, settingsJSON.notifications);

		// Show dialog
		dialog = Dialogs.showModalDialogUsingTemplate(compiledDialog);
		$dialog = dialog.getElement();

		// Append panes to the dialog
		$("#notification-settings-tab-general", $dialog).append(compiledGeneralTab);
		$("#notification-settings-tab-extensions", $dialog).append(compiledExtensionsTab);
		$("#notification-settings-tab-notifications", $dialog).append(compiledNotificationsTab);

		// Save button action
		$("#notification-settings-save", $dialog).click(function()
		{
			prefs.set("enabled", $("#notification-settings-enabled", $dialog).is(":checked"));
			prefs.set("delay", $("#notification-settings-delay", $dialog).val());
			prefs.save();

		});

		// Tab button actions
		$("#notification-settings-dialog .nav-button").click(function()
		{
			var element = $(this);
			if(!element.hasClass('active'))
			{
				// Remove active state from current tab and pane
				$(".tab-content .tab-pane.active").hide().removeClass("active");
				$(".nav-button.active").removeClass("active");

				// Add active state to the new tab and pane
				element.addClass("active");
				$("#" + element.data('tab')).show().addClass('active');
			}
		});
	}

	function saveSettingsFile()
	{
		FileUtils.writeText(settingsFile, JSON.stringify(settingsJSON, null, '\t'));
	}

	function saveNotification(notification)
	{
		settingsJSON.notifications.push(notification);
		saveSettingsFile();
	}

	/**
	* Returns a setting from the preference file
	*/
	function getSetting(property)
	{
		return prefs.get(property);
	}

	// Exports
	exports.get = getSetting;
	exports.saveNotification = saveNotification;
});
