import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import actions from "../ducks/devices/actions";
import constants from "../ducks/devices/constants";
import selectors from "../ducks/devices/selectors";
import types from "../ducks/devices/types";
import DevicesSection from "../components/DevicesSection"
import FilterAndFetchingIndicator from "../components/FilterAndFetchingIndicator";

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
  componentDidUpdate({ euDeviceList: oldDeviceListEu, usDeviceList: oldDeviceListUs }) {
    const { euDeviceList, usDeviceList } = this.props;
    if (oldDeviceListUs.length === 0 && usDeviceList !== 0) {
      this.fetchUsDeviceAvailability();
      this.kickoffFetchUsDeviceAvailability();
    }

    if (oldDeviceListEu.length === 0 && euDeviceList.length !== 0) {
      this.fetchEuDeviceAvailability();
      this.kickoffFetchEuDeviceAvailability();
    }
  }

  /**
   * Handles the kickoff of polling for EU device availability
   * @returns {undefined}
   */
  kickoffFetchEuDeviceAvailability = () => {
    this.euAvailabilityIntervalId = window.setInterval(this.fetchEuDeviceAvailability, 5000);
  }

  /**
   * Handles the kickoff of polling for US device availability
   * @returns {undefined}
   */
  kickoffFetchUsDeviceAvailability = () => {
    this.usAvailabilityIntervalId = window.setInterval(this.fetchUsDeviceAvailability, 5000);
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

  /**
   * Determines whether to show all the devices, just iOS, or just Android
   * @param {object} event - js event from changing the value of a <select />
   * @returns {undefined}
   */
  setFilterMode = ({ currentTarget: { value } }) => {
    this.props.setFilterMode(value);
  }

  render() {
    const { euDeviceList, usDeviceList, filterMode, fetching } = this.props;

    let devicesToShow = euDeviceList.concat(usDeviceList);
    if (filterMode === constants.DEVICES_IOS) {
      devicesToShow = devicesToShow.filter(({ os }) => (os === constants.DEVICES_IOS));
    } else if (filterMode === constants.DEVICES_ANDROID) {
      devicesToShow = devicesToShow.filter(({ os }) => (os === constants.DEVICES_ANDROID));
    }

    return (
      <main>
        <FilterAndFetchingIndicator
          fetchingStatuses={fetching}
          filterMode={this.props.filterMode}
          setFilterMode={this.setFilterMode}
        />
        <DevicesSection deviceList={devicesToShow} />
      </main>
    );
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
  fetchUsDeviceAvailability: PropTypes.func.isRequired,
  /** list of all EU devices, available and unavailable */
  euDeviceList: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** list of all US devices, available and unavailable */
  usDeviceList: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** determines which devices to show based on OS */
  filterMode: PropTypes.oneOf([constants.DEVICES_ALL, constants.DEVICES_ANDROID, constants.DEVICES_IOS]),
  /** true if the app is currently fetching data for initial device list or availability for EU or US */
  fetching: PropTypes.shape({
    eu: PropTypes.shape({
      deviceList: PropTypes.bool.isRequired,
      availability: PropTypes.bool.isRequired,
    }).isRequired,
    us: PropTypes.shape({
      deviceList: PropTypes.bool.isRequired,
      availability: PropTypes.bool.isRequired,
    }).isRequired
  })
};

export const mapStateToProps = (state) => ({
  euDeviceList: selectors.selectDeviceList(state, types.NAMESPACE_EU),
  usDeviceList: selectors.selectDeviceList(state, types.NAMESPACE_US),
  filterMode: selectors.selectFilterMode(state),
  fetching: selectors.selectFetchingStatuses(state)
});

const mapDispatchToProps = {
  fetchEuDeviceList: actions.fetchEuDeviceList,
  fetchUsDeviceList: actions.fetchUsDeviceList,
  fetchEuDeviceAvailability: actions.fetchEuDeviceAvailability,
  fetchUsDeviceAvailability: actions.fetchUsDeviceAvailability,
  setFilterMode: actions.filterSet
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OverviewContainer)
