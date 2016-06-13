<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace nk2580\wordsmith\plugin;

use nk2580\wordsmith\Environment;

/**
 * Description of Loader
 *
 * @author Nik Kyriakidis
 */
class Loader {
    /*
     * Basic Init function
     * 
     * this should be called inside the theme functions.php file before anything else
     */

    public static function init($dir) {
        if (is_plugin_active('Wordsmith/Wordsmith.php')) {
            Environment::boot($dir);
            self::loadDir(self::EXTENSIONS_DIR());
            self::loadDir(self::APP_DIR());
            self::loadDir(self::CONTROLLER_DIR());
        }
    }

}
