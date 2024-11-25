# coding=utf-8
from __future__ import absolute_import

### (Don't forget to remove me)
# This is a basic skeleton for your plugin's __init__.py. You probably want to adjust the class name of your plugin
# as well as the plugin mixins it's subclassing from. This is really just a basic skeleton to get you started,
# defining your plugin as a template plugin, settings and asset plugin. Feel free to add or remove mixins
# as necessary.
#
# Take a look at the documentation on what other plugin mixins are available.

import octoprint.plugin
import pika
import os

class AutomakerPlugin(octoprint.plugin.SettingsPlugin,
    octoprint.plugin.AssetPlugin,
    octoprint.plugin.TemplatePlugin
):

    def __init__(self):
        self.rabbitmq_connection = None
        self.rabbit_mq_channel = None

    def on_after_startup(self):
        self._setup_rabbitmq()


    def _setup_rabbitmq(self):
        try:
            connection_params = pika.ConnectionParameters(
                host='localhost',
                port=5672,
                credentials=pika.PlainCredentials('guest', 'guest')
            )
            self.rabbitmq_connection = pika.BlockingConnection(connection_params)
            self.rabbit_mq_channel = self.rabbitmq_connection.channel()
            self.rabbit_mq_channel.queue_declare(queue='prints_queue')
            self.logger.info('RabbitMQ connection established')
        except Exception as e:
            self.logger.error('Error establishing RabbitMQ connection: %s' % e)

    def on_event(self, event, payload):
        if event == 'PrintDone':
            self._send_message_to_rabbitmq(payload['name'])

    def _send_status_to_rabbitmq(self, status):
        try:
            hotend_temp = self._printer.get_current_temperatures()['tool0']['actual']
            bed_temp = self._printer.get_current_temperatures()['bed']['actual']
            message = {
                'status': status,
                'hotend_temp': hotend_temp,
                'bed_temp': bed_temp
            }
            if self.rabbit_mq_channel:
                exchange = "",
                self.rabbit_mq_channel.basic_publish(exchange='', routing_key='prints_queue', body=message),               
                self.logger.info('Message sent to RabbitMQ')
            else:
                self.logger.error('RabbitMQ channel not available')
        except Exception as e:
            self.logger.error('Error sending message to RabbitMQ: %s' % e)

    def on_shutdown(self):
        if self.rabbitmq_connection:
            self.rabbitmq_connection.close()
            self.logger.info('RabbitMQ connection closed')

    ##~~ SettingsPlugin mixin

    def get_settings_defaults(self):
        return {
            # put your plugin's default settings here
        }

    ##~~ TemplatePlugin mixin

    def get_template_configs(self):
        return [
            {
                "type": "sidebar",  # Choose 'settings', 'tab', 'sidebar', etc. based on where you want the UI.
                "name": "Automaker",
                "template": "automaker_main.jinja2",
                "custom_bindings": False
            }
        ]
    ##~~ AssetPlugin mixin

    def get_assets(self):
        # Define your plugin's asset files to automatically include in the
        # core UI here.
        return {
            "js": ["js/automaker.js"],
            "css": ["css/automaker.css"],
            "less": ["less/automaker.less"]
        }

    ##~~ Softwareupdate hook

    def get_update_information(self):
        # Define the configuration for your plugin to use with the Software Update
        # Plugin here. See https://docs.octoprint.org/en/master/bundledplugins/softwareupdate.html
        # for details.
        return {
            "automaker": {
                "displayName": "Automaker Plugin",
                "displayVersion": self._plugin_version,

                # version check: github repository
                "type": "github_release",
                "user": "ManuelPeregrino",
                "repo": "OctoPrint-Automaker",
                "current": self._plugin_version,

                # update method: pip
                "pip": "https://github.com/ManuelPeregrino/OctoPrint-Automaker/archive/{target_version}.zip",
            }
        }


# If you want your plugin to be registered within OctoPrint under a different name than what you defined in setup.py
# ("OctoPrint-PluginSkeleton"), you may define that here. Same goes for the other metadata derived from setup.py that
# can be overwritten via __plugin_xyz__ control properties. See the documentation for that.
__plugin_name__ = "Automaker Plugin"


# Set the Python version your plugin is compatible with below. Recommended is Python 3 only for all new plugins.
# OctoPrint 1.4.0 - 1.7.x run under both Python 3 and the end-of-life Python 2.
# OctoPrint 1.8.0 onwards only supports Python 3.
__plugin_pythoncompat__ = ">=3,<4"  # Only Python 3

def __plugin_load__():
    global __plugin_implementation__
    __plugin_implementation__ = AutomakerPlugin()

    global __plugin_hooks__
    __plugin_hooks__ = {
        "octoprint.plugin.softwareupdate.check_config": __plugin_implementation__.get_update_information
    }