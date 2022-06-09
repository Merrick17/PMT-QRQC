/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
import renderer from 'react-test-renderer';
// Note: test renderer must be required after react-native.
//const renderer = new ShallowRenderer();

it('renders correctly', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});
