// .storybook/manager.js

import { addons } from '@storybook/manager-api';
import yourTheme from './mytheme';

addons.setConfig({
  theme: yourTheme,
});