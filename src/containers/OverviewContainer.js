import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import actions from "../ducks/devices/actions";

class OverviewContainer extends Component {
  componentDidMount() {
    this.props.fetchEuDeviceList();
    this.props.fetchUsDeviceList();

    this.fetchDeviceAvailability();
    this.kickoffFetchDeviceAvailability();
  }

  componentWillUnmount() {
    window.clearInterval(this.intervalId);
  }

  /**
   * Handles the kickoff of polling for device availability and stores the intervalId
   */
  kickoffFetchDeviceAvailability = () => {
    this.intervalId = window.setInterval(this.fetchDeviceAvailability, 2000);
  }

  /**
   * Performs the API calls to get the list of currently available devices
   */
  fetchDeviceAvailability = () => {
    this.props.fetchEuDeviceAvailability();
    this.props.fetchUsDeviceAvailability();
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
  /** kicks off the API call to the the device availability from EU data center */
  fetchEuDeviceAvailability: PropTypes.func.isRequired,
  /** kicks off the API call to the the device availability from US data center */
  fetchUsDeviceAvailability: PropTypes.func.isRequired
};

const mapStateToProps = ({ devices }) => ({
  devices // normally I would write a selector, but this app is small
});

const mapDispatchToProps = {
  fetchEuDeviceList: actions.fetchEuDeviceList,
  fetchUsDeviceList: actions.fetchUsDeviceList,
  fetchEuDeviceAvailability: actions.fetchEuDeviceAvailability,
  fetchUsDeviceAvailability: actions.fetchUsDeviceAvailability
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OverviewContainer)
