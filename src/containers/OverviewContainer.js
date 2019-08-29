import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import actions from "../ducks/devices/actions";

class OverviewContainer extends Component {
  componentDidMount() {
    this.props.fetchEuDeviceList();
    this.props.fetchUsDeviceList();

    /** for polling the device availability from the EU data center */
    this.euAvailabilityIntervalId = null;
    /** for polling the device availability from the US data center */
    this.usAvailabilityIntervalId = null;
  }

  componentWillUnmount() {
    window.clearInterval(this.euAvailabilityIntervalId);
    window.clearInterval(this.usAvailabilityIntervalId);
  }

  /** kickoff the setInterval calls only if devices have been fetched */
  componentDidUpdate({ devices: { deviceList: { us: oldDeviceListUs, eu: oldDeviceListEu }} }) {
    const { deviceList } = this.props.devices;

    if (Object.keys(oldDeviceListUs).length === 0 && Object.keys(deviceList.us).length !== 0) {
      this.kickoffFetchUsDeviceAvailability();
    }

    if (Object.keys(oldDeviceListEu).length === 0 && Object.keys(deviceList.eu).length !== 0) {
      this.kickoffFetchEuDeviceAvailability();
    }
  }

  /**
   * Handles the kickoff of polling for EU device availability
   * @returns {undefined}
   */
  kickoffFetchEuDeviceAvailability = () => {
    this.euAvailabilityIntervalId = window.setInterval(this.fetchEuDeviceAvailability, 2000);
  }

  /**
   * Handles the kickoff of polling for US device availability
   * @returns {undefined}
   */
  kickoffFetchUsDeviceAvailability = () => {
    this.usAvailabilityIntervalId = window.setInterval(this.fetchUsDeviceAvailability, 2000);
  }

  /**
  * Sends off API call for fetching EU device availability
   * @returns {undefined}
  */
  fetchEuDeviceAvailability = () => {
    this.props.fetchEuDeviceAvailability();
  }

  /**
  * Sends off API call for fetching US device availability
   * @returns {undefined}
  */
  fetchUsDeviceAvailability = () => {
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
