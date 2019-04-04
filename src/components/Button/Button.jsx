import React from 'react';
import PropTypes from 'prop-types';

import cnButton from './index';

export default function Button(props) {
	const { children } = props;
	const { className } = props;
	const { TagName } = props;
	const { href } = props;
	
	return (
		<TagName className={cnButton({}, [className])} href={href} target='_blank'>
			{children}
		</TagName>
	);
}

Button.propTypes = {
	className: PropTypes.string,
	TagName: PropTypes.string,
	children: PropTypes.string,
	href: PropTypes.string,
};

Button.defaultProps = {
	className: '',
	TagName: 'div',
	children: '',
	href: '',
};
