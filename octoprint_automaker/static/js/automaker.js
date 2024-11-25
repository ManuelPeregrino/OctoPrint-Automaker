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
        $("#open_login_popup").click(function() {
            $("#login_popup").show();
            $("#popup_overlay").show();
        });

        // Cerrar la ventana emergente
        $("#close_popup, #popup_overlay").click(function() {
            $("#login_popup").hide();
            $("#popup_overlay").hide();
        });

        // Manejar el evento del botón de login
        $("#login_button").click(function() {
            var username = $("#username").val();
            var password = $("#password").val();

            // Por ahora, solo imprime los datos en la consola
            console.log("Username:", username);
            console.log("Password:", password);

            // Lógica futura: enviar datos al servidor para autenticación
        });
    }

    OCTOPRINT_VIEWMODELS.push({
        construct: AutomakerViewModel,
        dependencies: [],
        elements: ["#automaker_container"]
    });
});
