// @flow
import React from 'react';
import { Media } from 'react-bootstrap';
import { Link } from 'react-router';
import { scrollToSpotBus, type ScrollToSpotPayload } from '~/store/globalBus';
import { type Spot as SpotType } from '../modules/dashboard';
import autobind from 'autobind-decorator';
import jquery from 'jquery';

export type PropsType = {| ...SpotType, useLinks: boolean |};

class Spot extends React.PureComponent<*, PropsType, *> {
  element: HTMLElement;
  componentWillMount () {
    scrollToSpotBus.subscribe(this.scrollIntoView);
  }
  componentWillUnmount () {
    scrollToSpotBus.unsubscribe(this.scrollIntoView);
  }
  @autobind scrollIntoView ({ id }: ScrollToSpotPayload) {
    if (id === this.props.id) {
      this.element.scrollIntoView();
      const container = jquery(this.element).closest('.scroll-container');
      container.scrollTop(container.scrollTop() - 15);
    }
  }
  render () {
    return (
      <div ref={(ref: HTMLElement) => (this.element = ref)}>
        <Media>
          <Media.Left align='top'>
            <img width={64} height={64} src={`/api/usercontent/${this.props.logo}`} alt={this.props.name} />
          </Media.Left>
          <Media.Body>
            <Media.Heading>
              {this.props.useLinks
                ? <Link to={`/spots/${this.props.id}`}>
                  {this.props.name}
                </Link>
                : <span>{this.props.name}</span>}
            </Media.Heading>
            {this.props.country}, {this.props.region}<br />
            <span>People: </span>
            <span>{this.props.usersCount}</span>
            <span>Schools:</span>
            <span>{this.props.schoolsCount}</span>
            <span>Photos: </span>
            <span>{this.props.photosCount}</span>
          </Media.Body>
        </Media>
      </div>
    );
  }
}

export default Spot;

