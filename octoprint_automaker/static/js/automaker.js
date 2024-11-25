/*
 * View model for OctoPrint-Automaker
 *
 * Author: Manuel Alejandro Peregrino Clemente
 * License: AGPLv3
 */
$(function () {
    function AutomakerViewModel(parameters) {
        var self = this;

        self.username = ko.observable("");
        self.password = ko.observable("");
        self.isLoggedIn = ko.observable(false);

        self.login = function () {
            if (self.username() && self.password()) {
                // Placeholder for actual login logic
                self.isLoggedIn(true);
                alert("Login successful!");
            } else {
                alert("Please enter a username and password.");
            }
        };

        self.logout = function () {
            self.isLoggedIn(false);
            self.username("");
            self.password("");
        };
    }

    OCTOPRINT_VIEWMODELS.push({
        construct: AutomakerViewModel,
        dependencies: [],
        elements: ["#automaker_plugin_custom_tab"]
    });
});
