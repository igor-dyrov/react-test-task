import React from 'react';
import PropTypes from 'prop-types';

import cnButton from './index';

export default function Button(props) {
	const { children } = props;
	const { className } = props;
	const { TagName } = props;
	const { href } = props;
	const { onClick } = props;
	const { target } = props;
	
	return (
		<TagName className={cnButton({}, [className])} href={href} onClick={onClick} target={target}>
			{children}
		</TagName>
	);
}

Button.propTypes = {
	className: PropTypes.string,
	TagName: PropTypes.string,
	children: PropTypes.string,
	href: PropTypes.string,
	onClick: PropTypes.func,
	target: PropTypes.string,
};

Button.defaultProps = {
	className: '',
	TagName: 'div',
	children: '',
	href: '',
	onClick: () => {},
	target: ''
};
