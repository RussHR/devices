import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import actions from "../ducks/devices/actions";

class OverviewContainer extends Component {
  componentDidMount() {
    this.props.fetchDeviceList('eu');
    this.props.fetchDeviceList('us');
  }

  render() {
    return "The devices overview goes here"
  }
}

OverviewContainer.propTypes = {
  /** kicks off the API call to get the list of devices */
  fetchDeviceList: PropTypes.func.isRequired,
};

const mapStateToProps = ({ devices }) => ({
  devices // normally I would write a selector, but this app is small
});

const mapDispatchToProps = {
  fetchDeviceList: actions.fetchDeviceList
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OverviewContainer)
