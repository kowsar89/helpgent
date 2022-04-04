<?php
/**
 * Plugin Name: Video Message
 * Plugin URI: https://wpwax.com
 * Description: Video Message
 * Version: 1.0
 * Author: wpWax
 * Author URI: https://wpwax.com
 * Text Domain: wpwaxvm
 * Domain Path: /languages
 */

if ( ! defined( 'ABSPATH' ) ) exit;

define( 'WPWAXVM_PATH'   , plugin_dir_path( __FILE__ ) );

final class wpWax_Video_Messagge {

	public function __construct() {
		add_action( 'init', array( $this, 'load_textdomain' ) );
		add_action( 'plugins_loaded', array( $this, 'includes' ) );
	}

    public function load_textdomain(){
        load_plugin_textdomain( 'wpwaxvm', false, dirname( plugin_basename(__FILE__) ) . '/languages/' );
    }

	public function includes(){
		// require_once VM_PATH . 'inc/init.php';
	}
}

new wpWax_Video_Messagge();