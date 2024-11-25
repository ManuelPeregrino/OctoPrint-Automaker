/*
 * View model for OctoPrint-Automaker
 *
 * Author: Manuel Alejandro Peregrino Clemente
 * License: AGPLv3
 */
$(function() {
    function AutomakerViewModel(parameters) {
        var self = this;

        // Observable para el mensaje de bienvenida
        self.welcomeMessage = ko.observable("Hello Automaker!");

        // Lógica para mostrar la ventana emergente
        self.showLoginPopup = function () {
            $("#login_popup").show();      // Mostrar la ventana emergente
            $("#popup_overlay").show();   // Mostrar la capa de fondo
        };

        // Lógica para cerrar la ventana emergente
        self.closeLoginPopup = function () {
            $("#login_popup").hide();     // Ocultar la ventana emergente
            $("#popup_overlay").hide();  // Ocultar la capa de fondo
        };

        // Lógica para manejar el evento de login
        self.handleLogin = function () {
            var username = $("#username").val(); // Obtener el usuario
            var password = $("#password").val(); // Obtener la contraseña

            // Por ahora, solo imprime los datos en la consola
            console.log("Username:", username);
            console.log("Password:", password);

            // Lógica futura: Validar con microservicios
        };

        // Vincular eventos a los botones
        $("#open_login_popup").click(self.showLoginPopup);
        $("#close_popup, #popup_overlay").click(self.closeLoginPopup);
        $("#login_button").click(self.handleLogin);
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