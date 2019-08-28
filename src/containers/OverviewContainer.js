import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import actions from "../ducks/devices/actions";

class OverviewContainer extends Component {
  componentDidMount() {
    this.props.fetchEuDeviceList();
    this.props.fetchUsDeviceList();
  }

  render() {
    return "The devices overview goes here"
  }
}

OverviewContainer.propTypes = {
  /** kicks off the API call to get the list of devices from EU data center */
  fetchEuDeviceList: PropTypes.func.isRequired,
  /** same as above, but for the US */
  fetchUsDeviceList: PropTypes.func.isRequired,
};

const mapStateToProps = ({ devices }) => ({
  devices // normally I would write a selector, but this app is small
});

const mapDispatchToProps = {
  fetchEuDeviceList: actions.fetchEuDeviceList,
  fetchUsDeviceList: actions.fetchUsDeviceList
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OverviewContainer)
