import React from 'react';
import { withBemMod } from '@bem-react/core';

import cnButton from '../index';
import './Button_type_link.css';

export default withBemMod(cnButton(), { type: 'link' }, (Button) => (
	(props) => (
		<Button {...props} TagName='a' className='first after' target='_blank'/>
	)
));
