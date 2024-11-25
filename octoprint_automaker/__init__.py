# coding=utf-8
from __future__ import absolute_import

import flask
import octoprint.plugin
from octoprint.plugin import TemplatePlugin, AssetPlugin, SettingsPlugin

class AutomakerPlugin(TemplatePlugin, AssetPlugin, SettingsPlugin):
    def on_after_startup(self):
        self._logger.info("Hello Maker!")

    def get_template_configs(self):
        return [
            dict(type="tab", custom_bindings=True, template="automaker_tab.jinja2"),
            dict(type="settings", custom_bindings=True)
        ]

    ##~~ SettingsPlugin mixin

    def get_settings_defaults(self):
        return {
            # put your plugin's default settings here
        }

    ##~~ AssetPlugin mixin

    def get_assets(self):
        return {
            "js": ["js/automaker.js"],
            "css": ["css/automaker.css"],
            "less": ["less/automaker.less"]
        }

    ##~~ Softwareupdate hook

    def get_update_information(self):
        return {
            "automaker": {
                "displayName": "Automaker Plugin",
                "displayVersion": self._plugin_version,
                "type": "github_release",
                "user": "ManuelPeregrino",
                "repo": "OctoPrint-Automaker",
                "current": self._plugin_version,
                "pip": "https://github.com/ManuelPeregrino/OctoPrint-Automaker/archive/{target_version}.zip",
            }
        }

# Set the Python version your plugin is compatible with below. Recommended is Python 3 only for all new plugins.
# OctoPrint 1.4.0 - 1.7.x run under both Python 3 and the end-of-life Python 2.
# OctoPrint 1.8.0 onwards only supports Python 3.
__plugin_name__ = "Automaker Plugin"
__plugin_pythoncompat__ = ">=3,<4"  # Only Python 3

def __plugin_load__():
    global __plugin_implementation__
    __plugin_implementation__ = AutomakerPlugin()

    global __plugin_hooks__
    __plugin_hooks__ = {
        "octoprint.plugin.softwareupdate.check_config": __plugin_implementation__.get_update_information
    }