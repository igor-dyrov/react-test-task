import React from 'react';
import { withBemMod } from '@bem-react/core';

import cnButton from '../index';

export default withBemMod(cnButton(), { type: 'link' }, (Button) => (
	(props) => (
		<Button {...props} TagName='a' />
	)
));
