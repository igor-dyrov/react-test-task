import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@bem-react/classname';

import './Select.css';

const cnSelect = cn('select');

export default function Select(props) {
	const { options } = props;
	const { className } = props;
	const { onClick } = props;
	
	return (
		<select className={cnSelect({}, [className])} onClick={onClick}>
			{options.map((element) => <option key={element} value={element}>{element}</option>)}
		</select>
	);
}

Select.propTypes = {
	className: PropTypes.string,
	options: PropTypes.array,
	onClick: PropTypes.func,
};

Select.defaultProps = {
	className: '',
	options: [],
	onClick: () => {},
};