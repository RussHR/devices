import { Component } from 'react';
import { connect } from 'react-redux';
import actions from "../ducks/devices/actions";

class OverviewContainer extends Component {
  componentDidMount() {
    this.props.fetchDeviceList();
  }

  render() {
    return "The devices overview goes here"
  }
}

OverviewContainer.propTypes = {};

const mapStateToProps = ({ devices }) => ({
  devices // normally I would write a selector, but this app is small
});

const mapDispatchToProps = {
  fetchDeviceList: actions.fetchList
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OverviewContainer)
