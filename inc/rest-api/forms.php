<?php
/**
 * @author  wpWax
 */

namespace wpWax\vm\rest_api;

use wpWax\vm\db\DB;

class Forms extends Base {

	public function __construct() {
		$this->rest_base = 'forms';
		parent::__construct();
	}

	public function register_routes() {

		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base,
			array(
				array(
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_items' ),
					'permission_callback' => array( $this, 'check_admin_permission' ),
					'args'                => array(
						'page' => array(
							'default'           => 1,
							'validate_callback' => array( $this, 'validate_int' ),
						),
					),
				),
				array(
					'methods'             => \WP_REST_Server::CREATABLE,
					'callback'            => array( $this, 'create_item' ),
					'permission_callback' => array( $this, 'check_admin_permission' ),
					'args'                => array(
						'name'    => array(
							'required'          => true,
							'sanitize_callback' => 'sanitize_text_field',
						),
						'options' => array(
							'default'           => '',
							'sanitize_callback' => 'sanitize_text_field',
						),
					),
				),
			)
		);

		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/(?P<form_id>[\d]+)',
			array(
				'args' => array(
					'form_id' => array(
						'type' => 'integer',
					),
				),
				array(
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_item' ),
					'permission_callback' => array( $this, 'check_admin_permission' ),
				),
				array(
					'methods'             => \WP_REST_Server::EDITABLE,
					'callback'            => array( $this, 'update_item' ),
					'permission_callback' => array( $this, 'check_admin_permission' ),
					'args'                => array(
						'name'    => array(
							'default'           => '',
							'sanitize_callback' => 'sanitize_text_field',
						),
						'options' => array(
							'default'           => '',
							'sanitize_callback' => 'sanitize_text_field',
						),
					),
				),
				array(
					'methods'             => \WP_REST_Server::DELETABLE,
					'callback'            => array( $this, 'delete_item' ),
					'permission_callback' => array( $this, 'check_admin_permission' ),
				),
			)
		);
	}

	public function get_items( $request ) {
		$args = $request->get_params();
		$data = DB::get_forms( $args['page'] );

		$rest_data = array_map(
			function( $item ) {
				$result = array(
					'form_id' => esc_html( $item['form_id'] ),
					'name'    => esc_html( $item['name'] ),
				);
				return $result;
			},
			$data
		);

		return $this->response( true, $rest_data );
	}

	public function get_item( $request ) {
		$args = $request->get_params();
		$data = DB::get_form( $args['form_id'] );

		if ( $data ) {
			$success   = true;
			$rest_data = array(
				'form_id' => esc_html( $data['form_id'] ),
				'name'    => esc_html( $data['name'] ),
				'options' => maybe_unserialize( $data['options'] ),
			);

		} else {
			$success   = false;
			$rest_data = array();
		}

		return $this->response( $success, $rest_data );
	}

	public function create_item( $request ) {
		$args    = $request->get_params();
		$data    = DB::create_form( $args );
		$success = $data ? true : false;
		return $this->response( $success, $data );
	}

	public function update_item( $request ) {
		$args      = $request->get_params();
		$operation = DB::update_form( $args );
		$success   = ( $operation === false ) ? false : true;
		return $this->response( $success );
	}

	public function delete_item( $request ) {
		$args      = $request->get_params();
		$operation = DB::delete_form( $args['form_id'] );
		$success   = $operation ? true : false;
		return $this->response( $success );
	}
}
