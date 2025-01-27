import React from "react";
import Button from "./Button.component";
import TestRenderer from "react-test-renderer";

import { shallow, render, mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

// Make Enzyme functions available in all test files without importing
global.shallow = shallow;
global.render = render;
global.mount = mount;

test("Button Snapshot", () => {
  const props = {
    text: "Submit"
  };

  // TODO : Test snapshot of button with props provided
  const wrapper = TestRenderer.create(<Button {...props}/>).toJSON()
  expect(wrapper).toMatchSnapshot()
});

test("Test button handler action", () => {
  const props = {
    text: "Submit",
    onClick: jest.fn()
  };
  // TODO: Test simulate event when click into button
  const wrapper = shallow(<Button {...props}/>)
  wrapper.find('button').simulate('click')
  expect(props.onClick).toHaveBeenCalled()
});

test("State should have message", () => {
  const props = {
    text: "Submit",
    onClick: jest.fn()
  };

  // TODO: Shalow render component and get state 
  // Assert state to know that message of state 
  // are equal message of expect
  const messageExpect = "Test Life Cycle Of Component";
  const wrapper = shallow(<Button {...props}/>)
  expect(wrapper.state('message')).toBe(messageExpect)
});
