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
        self.settings = parameters[0];

        self.login = function () {
            if (self.username() && self.password()) {
                $.ajax({
                    url: API_BASEURL + "plugin/automaker/login",
                    type: "POST",
                    dataType: "json",
                    data: JSON.stringify({
                        command: "login",
                        username: self.username(),
                        password: self.password()
                    }),
                    contentType: "application/json; charset=UTF-8",
                    success: function (response) {
                        if (response.status === "success") {
                            self.isLoggedIn(true);
                            alert("Login successful!");
                        } else {
                            alert("Login failed: " + response.message);
                        }
                    },
                    error: function () {
                        alert("An error occurred during login.");
                    }
                });
            } else {
                alert("Please enter a username and password.");
            }
        };

        self.logout = function () {
            $.ajax({
                url: API_BASEURL + "plugin/automaker",
                type: "POST",
                dataType: "json",
                data: JSON.stringify({
                    command: "logout"
                }),
                contentType: "application/json; charset=UTF-8",
                success: function (response) {
                    if (response.status === "success") {
                        self.isLoggedIn(false);
                        self.username("");
                        self.password("");
                        alert("Logout successful");
                    } else {
                        alert("Logout failed: " + response.message);
                    }
                },
                error: function () {
                    alert("An error occurred during logout.");
                }
            });
        };
    }

    OCTOPRINT_VIEWMODELS.push({
        construct: AutomakerViewModel,
        elements: ["#automaker_plugin_custom_tab"]
    });
});