import React from 'react';
import PropTypes from 'prop-types';
import constants from "../ducks/devices/constants";

import "./FilterAndFetchingIndicator.scss";

/**
 * Houses the filter by OS <select> and indicators for fetching
 */
const FilterAndFetchingIndicator = ({ fetchingStatuses: { eu, us }, filterMode, setFilterMode }) => {
	const euSpinnerClassName = `filterAndFetchingIndicator__spinner ${eu.availability ? 'filterAndFetchingIndicator__spinner--active' : ''}`;
	const usSpinnerClassName = `filterAndFetchingIndicator__spinner ${us.availability ? 'filterAndFetchingIndicator__spinner--active' : ''}`;

	return (
		<section>
			<div className="filterAndFetchingIndicator">
				<div className="filterAndFetchingIndicator__filter">
					<label htmlFor="set-filter-mode">OS:</label>
					<br />
					<select value={filterMode} onChange={setFilterMode} id="set-filter-mode">
						<option value={constants.DEVICES_ALL}>All devices</option>
						<option value={constants.DEVICES_ANDROID}>Android</option>
						<option value={constants.DEVICES_IOS}>iOS</option>
					</select>
				</div>
				<div className="filterAndFetchingIndicator__fetchingStatus">
					Fetching Availability Status:
				<br />
					<span data-qa="eu-availability-spinner" className={euSpinnerClassName}>↻</span>🇪🇺
				<br />
					<span data-qa="us-availability-spinner" className={usSpinnerClassName}>↻</span>🇺🇸
				</div>
			</div>
			{eu.deviceList && (
				<p>
					Fetching EU devices...
				</p>
			)}
			{us.deviceList && (
				<p>
					Fetching US devices...
				</p>
			)}
		</section>
	);
};

FilterAndFetchingIndicator.propTypes = {
	/** each of these represent whether the browser is actively fetching this information */
	fetchingStatuses: PropTypes.shape({
		eu: PropTypes.shape({
			deviceList: PropTypes.bool,
			availability: PropTypes.bool,
		}).isRequired,
		us: PropTypes.shape({
			deviceList: PropTypes.bool,
			availability: PropTypes.bool,
		}).isRequired
	}),
	/** needed to supply as value for the <select> */
	filterMode: PropTypes.oneOf([constants.DEVICES_ALL, constants.DEVICES_ANDROID, constants.DEVICES_IOS]),
	/** changes the filter mode by creating the action up at the container level */
	setFilterMode: PropTypes.func.isRequired
};

export default FilterAndFetchingIndicator;
