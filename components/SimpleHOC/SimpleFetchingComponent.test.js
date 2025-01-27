import React from "react";
import TestRenderer from "react-test-renderer";

import { shallow, render, mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { JestEnvironment } from "@jest/environment";
import { testNameToKey } from "jest-snapshot/build/utils";
import withData from "./SimpleFetchingComponent";
import getJSON from "./GetJSON";
import { withStatement } from "@babel/types";

configure({ adapter: new Adapter() });

// Make Enzyme functions available in all test files without importing
global.shallow = shallow;
global.render = render;
global.mount = mount;

const data = "data";
const List = () => <div />;


jest.mock("./GetJSON", data =>
  jest.fn(() => ({ then: callback => callback(data) }))
);

test("should pass props into component via HOC", () => {
  const username = 'intern.jest';

  // TODO : 
  // Call HOC Component & Wrap it with List
  // Shallow rendering with props
  // Compare & expect props 
 
  const ListWrapFetch = withData()(List)
  const wrapper = shallow(<ListWrapFetch {...{username}}/>)

  expect(wrapper.prop('username')).toBe(username)
});

test("should call url for fetching data", () => {


  // TODO : Initialize HOC component with url
  // Wrap list into components
  // Expect getJSON func should be call with url

  const url = 'https://api.github.com/users/test/gists'
  const ListWrapFetch = withData(url)(List)
  const wrapper = shallow(<ListWrapFetch/>)

  expect(getJSON).toHaveBeenCalledWith(url)
});

test("should call url with specific path by props", () => {

  const props = {
    username: "SteveJob"
  };
  const url = jest.fn(
    props => `https://api.github.com/users/${props.username}/gists`
  );

  // TODO 
  // Expect url should be call with props
  // Expect getJson function should be call with url (which has username)
  const ListWrapFetch = withData(url)(List)
  const wrapper = shallow(<ListWrapFetch {...props}/>)

  expect(url).toHaveBeenCalledWith(props)
  expect(getJSON).toHaveBeenCalledWith(url(props))
});

test("should pass data to the component", () => {


  const user = {
    firstName: 'Steve',
    lastName: 'Job'
  }
  // Should mount component List with gist
  // Expect props user exist into the component 
  const ListWrapFetch = withData()(List)
  const wrapper = mount(<ListWrapFetch {...{user}}/>)
  expect(wrapper.prop('user')).toBe(user)
});
