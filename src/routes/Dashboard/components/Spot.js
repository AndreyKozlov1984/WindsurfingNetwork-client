import React from 'react';
import { Media } from 'react-bootstrap';
import { Link } from 'react-router';

class Spot extends React.PureComponent {
  static propTypes = {
    id: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
    country: React.PropTypes.string.isRequired,
    region: React.PropTypes.string.isRequired,
    logo: React.PropTypes.string.isRequired,
    usersCount: React.PropTypes.number.isRequired,
    schoolsCount: React.PropTypes.number.isRequired,
    photosCount: React.PropTypes.number.isRequired,
    useLinks: React.PropTypes.bool.isRequired,
  };
  render () {
    return (
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
    );
  }
}

export default Spot;

