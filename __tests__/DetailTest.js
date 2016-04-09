jest.autoMockOff();

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const Detail = require('../src/pages/Detail').default;

describe('Detail', () => {
  it('starts with zero commits', () => {
      const rendered = TestUtils.renderIntoDocument(
          <Detail params={{repo: ''}} />
      );

      expect(rendered.state.commits.length).toEqual(0);
  });

  it('shows commits by default', () => {
    const rendered = TestUtils.renderIntoDocument(
        <Detail params={{repo: ''}} />
    );

    expect(rendered.state.mode).toEqual('commits');
  });

  it('shows forks when the button is tapped', () => {
    const rendered = TestUtils.renderIntoDocument(
        <Detail params={{repo: ''}} />
    );

    const btns = TestUtils.scryRenderedDOMComponentsWithTag(rendered, 'button');
    const forksButton = btns[1];
    TestUtils.Simulate.click(forksButton);
    expect(rendered.state.mode).toEqual('forks');
  });

  it('fetches forks from a local source', () => {
    const rendered = TestUtils.renderIntoDocument(
        <Detail params={{repo: ''}} />
    );

    const testData = require('./forks.json');
    rendered.setState({mode: 'forks', forks: testData});

    expect(rendered.state.forks.length).toEqual(30);
  });

});
