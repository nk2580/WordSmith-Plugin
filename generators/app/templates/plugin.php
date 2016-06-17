<?php

/*
  Plugin Name:  <%= plugin %>
  Version:      0.0.1
  Author:       <%= author %>
 */

namespace <%= vendor %>\<%= package %>;

use <%= vendor %>\<%= package %>\Instance;

class <%= package %> {

    static $plugin_basename;
    static $plugin_url;
    static $plugin_path;

    /**
     * Constructor
     */
    public function __construct() {
        include_once( ABSPATH . 'wp-admin/includes/plugin.php' );
        if (is_plugin_active('WordSmith/Wordsmith.php')) {
            require_once ABSPATH.'wp-content/plugins/WordSmith/Wordsmith.php';
            //plugin is activated
            self::$plugin_basename = plugin_basename(__FILE__);
            self::$plugin_url = strtolower(plugin_dir_url(self::$plugin_basename));
            self::$plugin_path = trailingslashit(dirname(__FILE__));
            //LOAD Framework
            require_once 'Instance.php';
            Instance::init(self::$plugin_path, self::$plugin_url);
        }
    }

}

//INJECT PLUGIN CLASS TO WP ENVIRONMENT
$<%= package %> = new <%= package %>();
$GLOBALS['<%= package %>'] = $<%= package %>;

//WP METHOD TO ACCESS PLUGIN
function <%= package %>() {
    return $GLOBALS['<%= package %>'];
}
