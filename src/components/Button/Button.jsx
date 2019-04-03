import React from 'react';
import PropTypes from 'prop-types';

import cnButton from './index';

export default function Button(props) {
	const { children } = props;
	const { className } = props;
	const { TagName } = props;
	
	return (
		<TagName className={cnButton({}, [className])}>
			{children}
		</TagName>
	);
}

Button.propTypes = {
	className: PropTypes.string,
	TagName: PropTypes.string,
	children: PropTypes.string,
};

Button.defaultProps = {
	className: '',
	TagName: 'button',
	children: '',
};
