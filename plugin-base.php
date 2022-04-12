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

define( 'VM_VERSION', 1.0 );
define( 'VM_PATH',    trailingslashit( plugin_dir_path( __FILE__ ) ) );
define( 'VM_URL',     trailingslashit( plugin_dir_url( __FILE__ ) ) );

final class wpWax_Video_Messagge {

	protected static $instance = null;

	public $loader = [];

	public function __construct() {
		add_action( 'init', [ $this, 'load_textdomain' ] );

		$this->includes();
		$this->initialize();
	}

	public static function instance() {
		if ( null == self::$instance ) {
			self::$instance = new self;
		}

		return self::$instance;
	}

    public function load_textdomain() {
        load_plugin_textdomain( 'wpwaxvm', false, dirname( plugin_basename(__FILE__) ) . '/languages/' );
    }

	public function includes() {
		$this->autoload( 'inc' );
	}

	public function initialize() {
		$this->loader['scripts'] = new \wpWax\vm\Scripts;
	}

	public function autoload( $dir ) {
		$dir = VM_PATH . $dir . '/';
		foreach ( scandir( $dir ) as $file ) {
			if ( preg_match( "/.php$/i", $file ) ) {
				require_once( $dir . $file );
			}
		}
	}

	public function temp() {
		add_action('wp_body_open', function() {
			echo '<div id="root"></div>';
		});
	}

}

wpWax_Video_Messagge::instance();