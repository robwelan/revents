import React, { Component } from 'react';
import { connect } from 'react-redux';
import { incrementCounter, decrementCounter } from './testActions';
import { Button } from '../../frameworks/semantic-ui-react';

const mapState = state => ({
  data: state.test.data,
});

const actions = {
  incrementCounter,
  decrementCounter,
}

class TestComponent extends Component {
  render() {
    const { data, decrementCounter, incrementCounter } = this.props;
    return (
      <div>
        <h1>
          Test Component
        </h1>
        <h3>
          The answer is:
          {' '}
          {data}
        </h3>
        <Button
          onClick={incrementCounter}
          color="green"
          content="+"
        />
        <Button
          onClick={decrementCounter}
          color="red"
          content="-"
        />
      </div>
    );
  };
}

export default connect(mapState, actions)(TestComponent);
