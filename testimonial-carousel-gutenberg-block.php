<?php
/**
 * Plugin Name:       Testimonial Carousel for Gutenberg Block
 * Plugin URI:        https://github.com/ariful93/testimonial-carousel-gutenberg-block
 * Description:       Testimonials Carousel Block allows you to add a testimonials carousel block to your WordPress content via the block editor.
 * Author:            WPFound
 * Author URI         https://github.com/ariful93
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           1.0
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       testimonial-carousel-block
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */

if (!defined('ABSPATH')) {
	exit;
}

/**
 * Testimonial_Carousel_Gutenberg_Block class
 *
 * @class Testimonial_Carousel_Gutenberg_Block The class that holds the entire Testimonial_Carousel_Gutenberg_Block plugin
 */
class Testimonial_Carousel_Gutenberg_Block {
	/**
   * Singleton pattern
   *
   * @var bool $instance
   */
  private static $instance = false;

  /**
   * Initializes the Testimonial_Carousel_Gutenberg_Block class
   *
   * Checks for an existing Testimonial_Carousel_Gutenberg_Block instance
   * and if it cant't find one, then creates it.
   */
  public static function init()
  {

    if (!self::$instance) {
      self::$instance = new self();
    }

    return self::$instance;
  }

  /**
   * Constructor for the Testimonial_Carousel_Gutenberg_Block class
   *
   * Sets up all the appropriate hooks and actions
   * within our plugin.
   *
   * @return void
   */
	public function __construct()
	{

		// includes
		$this->includes();
		
	}

	/**
	 * Load all includes file
	 *
	 * @since 0.0.1
	 *
	 * @return void
	 */
	public function includes() {
    	add_action('init', array($this, 'testimonial_carousel_block_register_init'));  

  	}

	/**
	 * Register blocks
	 */
	public function testimonial_carousel_sub_block_register( $name, $options = array() ) {
		register_block_type( __DIR__ . '/build/' . $name, $options );

	}

	/**
	 * Blocks initialize
	 */
	public function testimonial_carousel_block_register_init() {
		$this->testimonial_carousel_sub_block_register( 'testimonial-carousel' );

	}

}

/**
 * Init the team member for gutenberg plugin
 *
 * @return Testimonial_Carousel_Gutenberg_Block the plugin object
 */
function testimonial_carousel_gutenberg_block()
{

  return Testimonial_Carousel_Gutenberg_Block::init();
}

testimonial_carousel_gutenberg_block();