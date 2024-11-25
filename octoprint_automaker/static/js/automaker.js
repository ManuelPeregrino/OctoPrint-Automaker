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

        // Mostrar la ventana emergente
        self.showLoginPopup = function () {
            $("#login_popup").show();      // Mostrar la ventana emergente
            $("#popup_overlay").show();   // Mostrar la capa de fondo
        };

        // Cerrar la ventana emergente
        self.closeLoginPopup = function () {
            $("#login_popup").hide();     // Ocultar la ventana emergente
            $("#popup_overlay").hide();  // Ocultar la capa de fondo
        };

        // Manejar el evento de login
        self.handleLogin = function () {
            var username = $("#username").val(); // Obtener el usuario
            var password = $("#password").val(); // Obtener la contraseña

            // Imprimir los datos en la consola
            console.log("Username:", username);
            console.log("Password:", password);

            // Puedes agregar lógica futura aquí para autenticar
        };

        // Enlazar eventos a los botones después de asegurarte de que el DOM está listo
        $(document).ready(function () {
            $("#open_login_popup").on("click", self.showLoginPopup);
            $("#close_popup, #popup_overlay").on("click", self.closeLoginPopup);
            $("#login_button").on("click", self.handleLogin);
        });
    }

    OCTOPRINT_VIEWMODELS.push({
        construct: AutomakerViewModel,
        dependencies: [],
        elements: ["#automaker_message"]
    });
});
