// @flow
import React from 'react';
import { Row, Col, FormControl, Button } from 'react-bootstrap';
import { type Option } from './SchoolsField';
/* eslint-disable immutable/no-this */
export class AddSchool extends React.Component {
  props: {|
    options: Option[],
    onAdd: (id: number) => any,
  |};
  state: {|
    selectedSchool: string,
  |};
  onClick = () => {
    this.props.onAdd(+this.state.selectedSchool);
    this.setState({ selectedSchool: '' });
  };
  onChange = (e: any) => {
    this.setState({ selectedSchool: e.target.value });
  };
  constructor () {
    super();
    this.state = { selectedSchool: '' }; // eslint-disable-line immutable/no-mutation
  }
  render () {
    return (
      <Row>
        <Col sm={8}>
          <FormControl componentClass='select' value={this.state.selectedSchool} onChange={this.onChange}>
            <option value=''>(Select a school to add to the spot)</option>
            {this.props.options.map((option: Option, index: number) => (
              <option key={index} value={option.id} disabled={option.disabled}>{option.name}</option>
            ))}
          </FormControl>
        </Col>
        <Col sm={4}>
          <Button disabled={!this.state.selectedSchool} onClick={this.onClick}>Add</Button>
        </Col>
      </Row>
    );
  }
}
/* eslint-enable immutable/no-this */

