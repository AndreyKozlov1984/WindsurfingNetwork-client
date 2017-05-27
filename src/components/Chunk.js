// @flow
import React from 'react';
/* eslint-disable immutable/no-this */
type Props = {
  load: () => Promise<{ default: ReactClass<any> }>,
};
export default class Chunk extends React.Component {
  props: Props;

  state: {
    LoadedComponent: ?ReactClass<any>,
  } = {
    LoadedComponent: null,
  };

  componentWillMount () {
    this.load(this.props);
  }

  componentWillReceiveProps (nextProps: Props) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps);
    }
  }

  async load (props: Props) {
    this.setState({
      LoadedComponent: null,
    });

    const mod = await props.load();
    this.setState({
      LoadedComponent: mod.default,
    });
  }

  render () {
    const { LoadedComponent } = this.state;

    return LoadedComponent ? <LoadedComponent {...this.props} /> : <div>Loading...</div>;
  }
}
/* eslint-enable immutalbe/no-this */

