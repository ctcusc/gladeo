import React from 'react';
import renderer from 'react-test-renderer';

import HomeScreen from '../../../src/screens/HomeScreen/HomeScreen';

// Example - Proof of concept
describe('<HomeScreen />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<HomeScreen />).toJSON();
    expect(tree.children.length).toBe(4);
  });

  it('renders correctly', () => {
    const tree = renderer.create(<HomeScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
})