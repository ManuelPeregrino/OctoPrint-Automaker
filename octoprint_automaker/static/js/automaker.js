/*
 * View model for OctoPrint-Automaker
 *
 * Author: Manuel Alejandro Peregrino Clemente
 * License: AGPLv3
 */
$(function() {
    function AutomakerViewModel(parameters) {
        var self = this;

        // An observable for the welcome message
        self.welcomeMessage = ko.observable("Hello Automaker!");

        // You can add more logic here if needed
    }

    /* view model class, parameters for constructor, container to bind to
     * Please see http://docs.octoprint.org/en/master/plugins/viewmodels.html#registering-custom-viewmodels for more details
     * and a full list of the available options.
     */
    OCTOPRINT_VIEWMODELS.push({
        construct: AutomakerViewModel,
        // ViewModels your plugin depends on, e.g. loginStateViewModel, settingsViewModel, ...
        dependencies: [],
        // Elements to bind to, e.g. #settings_plugin_automaker, #tab_plugin_automaker, ...
        elements: ["#automaker_message"]
    });
});