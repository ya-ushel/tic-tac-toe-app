import React from 'react';

import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from 'assets/icons/icomoon/selection.json';
const IcomoonIcon = createIconSetFromIcoMoon(
  icoMoonConfig,
  'icomoon',
  'icomoon.ttf',
);

const Icon = ({ ...props }) => {
  console.log(icoMoonConfig);
  return <IcomoonIcon {...props} />;
};

export default Icon;
