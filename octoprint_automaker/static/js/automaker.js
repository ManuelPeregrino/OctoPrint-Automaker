/*
 * View model for OctoPrint-Automaker
 *
 * Author: Manuel Alejandro Peregrino Clemente
 * License: AGPLv3
 */
$(function() {
    function AutomakerViewModel(parameters) {
        var self = this;

        // Mostrar la ventana emergente
        self.showLoginPopup = function () {
            $("#login_popup").show();
            $("#popup_overlay").show();
        };

        // Ocultar la ventana emergente
        self.closeLoginPopup = function () {
            $("#login_popup").hide();
            $("#popup_overlay").hide();
        };

        // Manejar el evento de login
        self.handleLogin = function () {
            var username = $("#username").val();
            var password = $("#password").val();

            // Enviar datos al backend
            $.ajax({
                url: API_BASEURL + "plugin/automaker/log_user",
                type: "POST",
                contentType: "application/json; charset=UTF-8",
                data: JSON.stringify({ username: username, password: password }),
                success: function (response) {
                    alert(response.message);  // Mostrar mensaje de éxito
                    self.closeLoginPopup();  // Cerrar el popup
                },
                error: function () {
                    alert("Failed to log user.");
                }
            });
        };

        // Enlazar eventos
        $(document).ready(function () {
            $("#open_login_popup").on("click", self.showLoginPopup);
            $("#close_popup, #popup_overlay").on("click", self.closeLoginPopup);
            $("#login_button").on("click", self.handleLogin);
        });
    }

    OCTOPRINT_VIEWMODELS.push({
        construct: AutomakerViewModel,
        dependencies: [],
        elements: []
    });
});
