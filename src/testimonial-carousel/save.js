import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	return (
		<div
			{ ...useBlockProps.save() }
			data-attributes={ JSON.stringify( attributes ) }
		></div>
	);
}