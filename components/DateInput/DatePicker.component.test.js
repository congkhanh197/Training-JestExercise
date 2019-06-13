import React from "react";
import DatePicker from "./DatePicker.component";
import TestRenderer from "react-test-renderer";
import { shallow, render, mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

// Make Enzyme functions available in all test files without importing
global.shallow = shallow;
global.render = render;
global.mount = mount;

describe("DatePicker Test ", () => {
  it("Should render snapshot for date picker", () => {
    const wrapper = TestRenderer.create(<DatePicker/>).toJSON()
    expect(wrapper).toMatchSnapshot()
  });
});
