$(function() {
    function AutomakerViewModel(parameters) {
        var self = this;

        self.monitorPrinter = function() {
            $.ajax({
                url: "http://localhost:8000/default/monitor_printer_monitor__post",
                type: "POST",
                dataType: "json",
                data: JSON.stringify({
                    monitoring: true
                }),
                contentType: "application/json; charset=UTF-8",
                success: function(response) {
                    alert("Monitoring started successfully!");
                },
                error: function() {
                    alert("An error occurred while starting monitoring.");
                }
            });
        };
    }

    OCTOPRINT_VIEWMODELS.push({
        construct: AutomakerViewModel,
        elements: ["#automaker_plugin_custom_tab"]
    });
});