import React from 'react';
import { expect } from 'chai';
import { render, shallow } from 'enzyme';
import sinon from "sinon";
import types from "../ducks/devices/types";
import FilterAndFetchingIndicator from './FilterAndFetchingIndicator';

describe('FilterAndFetchingIndicator', () => {
	it('renders without crashing', () => {
		const mockProps = {
			fetchingStatuses: { eu: {}, us: {} },
			filterMode: types.DEVICES_ALL,
			setFilterMode: () => {}
		};
		const wrapper = shallow(<FilterAndFetchingIndicator {...mockProps} />);
		expect(wrapper).to.have.lengthOf(1);
	});

	it('renders an active spinner for fetching EU device availability', () => {
		const mockProps = {
			fetchingStatuses: { eu: { availability: true }, us: {} },
			filterMode: types.DEVICES_ALL,
			setFilterMode: () => {}
		};
		const wrapper = render(<FilterAndFetchingIndicator {...mockProps} />);
		expect(wrapper.find('[data-qa="eu-availability-spinner"]').hasClass('filterAndFetchingIndicator__spinner--active')).to.equal(true);
	});

	it('renders an active spinner for fetching US device availability', () => {
		const mockProps = {
			fetchingStatuses: { eu: {}, us: { availability: true } },
			filterMode: types.DEVICES_ALL,
			setFilterMode: () => {}
		};
		const wrapper = render(<FilterAndFetchingIndicator {...mockProps} />);
		expect(wrapper.find('[data-qa="us-availability-spinner"]').hasClass('filterAndFetchingIndicator__spinner--active')).to.equal(true);
	});

	it('renders certain text when fetching the EU device list', () => {
		const mockProps = {
			fetchingStatuses: { eu: { deviceList: true }, us: {} },
			filterMode: types.DEVICES_ALL,
			setFilterMode: () => {}
		};
		const wrapper = render(<FilterAndFetchingIndicator {...mockProps} />);
		expect(wrapper.text()).to.contain('Fetching EU devices...');
	});

	it('renders certain text when fetching the US device list', () => {
		const mockProps = {
			fetchingStatuses: { eu: {}, us: { deviceList: true } },
			filterMode: types.DEVICES_ALL,
			setFilterMode: () => {}
		};
		const wrapper = render(<FilterAndFetchingIndicator {...mockProps} />);
		expect(wrapper.text()).to.contain('Fetching US devices...');
	});

	it('calls setFilterMode when the <select> is changed', () => {
		const spy = sinon.fake();
		const mockProps = {
			fetchingStatuses: { eu: {}, us: { deviceList: true } },
			filterMode: types.DEVICES_ALL,
			setFilterMode: spy
		};
		const wrapper = shallow(<FilterAndFetchingIndicator {...mockProps} />);
		wrapper.find('#set-filter-mode').simulate('change', types.DEVICES_IOS);
		expect(spy.callCount).to.equal(1);
	});
});
