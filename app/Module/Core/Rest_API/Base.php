<?php

namespace WPWaxCustomerSupportApp\Module\Core\Rest_API;

abstract class Base {

    /**
     * @var string
     */
    public $namespace = WPWAX_CUSTOMER_SUPPORT_APP_REST_BASE_PREFIX . '/v1';

    /**
     * @var mixed
     */
    public $rest_base;

    public function __construct() {
        add_action( 'rest_api_init', [ $this, 'register_routes' ] );
    }

    abstract public function register_routes();

    /**
     * @param $value
     */
    public function validate_int( $value ) {
        return is_numeric( $value );
    }

    /**
     * @param $value
     */
    public function validate_email( $value ) {
        return is_email( $value );
    }

    /**
     * @param $value
     */
    public function sanitize_int( $value ) {
        return intval( $value );
    }

    /**
     * @param $is_success
     * @param $data
     */
    public function response( $is_success, $data = '' ) {
        $response = [
            'success' => $is_success,
            'message' => $is_success ? __( 'Operation Successful', 'wpwax-customer-support-app' ) : __( 'Operation Failed', 'wpwax-customer-support-app' ),
            'data'    => $is_success ? $data : null,
        ];

        return rest_ensure_response( $response );
    }

    public function error_nonce_missing() {
        return new \WP_Error(
            'nonce_missing',
            __( 'Header:X-WP-Nonce is missing' ),
            ['status' => rest_authorization_required_code()]
        );
    }

    public function error_admin_check_failed() {
        return new \WP_Error(
            'admin_check_failed',
            __( 'You are not allowed to perform this operation.' ),
            ['status' => rest_authorization_required_code()]
        );
    }

    /**
     * @param $request
     * @return mixed
     */
    public function check_user_permission( $request ) {
        return true;

		// @todo remove this later

        if ( ! $request->get_header( 'X-WP-Nonce' ) ) {
            return $this->error_nonce_missing();
        }

        return true;
    }

    /**
     * @param $request
     * @return mixed
     */
    public function check_admin_permission( $request ) {
        return true;

		// @todo remove this later

        if ( ! $request->get_header( 'X-WP-Nonce' ) ) {
            return $this->error_nonce_missing();
        }

        if ( ! current_user_can( 'edit_posts' ) ) {
            return $this->error_admin_check_failed();
        }

        return true;
    }

}
