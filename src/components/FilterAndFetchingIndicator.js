import React from 'react';
import PropTypes from 'prop-types';
import constants from "../ducks/devices/constants";

import "./FilterAndFetchingIndicator.scss";

const FilterAndFetchingIndicator = ({ fetchingStatuses: { eu, us }, filterMode, setFilterMode }) => {
	const euSpinnerClassName = `filterAndFetchingIndicator__spinner ${eu.availability ? 'filterAndFetchingIndicator__spinner--active' : ''}`;
	const usSpinnerClassName = `filterAndFetchingIndicator__spinner ${us.availability ? 'filterAndFetchingIndicator__spinner--active' : ''}`;

	return (
		<section className="filterAndFetchingIndicator">
			<div>
				<label htmlFor="set-filter-mode">OS:</label>
				<br />
				<select value={filterMode} onChange={setFilterMode} id="set-filter-mode">
					<option value={constants.DEVICES_ALL}>All devices</option>
					<option value={constants.DEVICES_ANDROID}>Android</option>
					<option value={constants.DEVICES_IOS}>iOS</option>
				</select>
			</div>
			<div className="filterAndFetchingIndicator__fetchingStatus">
				Availability Fetching Status:
				<br />
				<span className={euSpinnerClassName}>↻</span>🇪🇺
				<br />
				<span className={usSpinnerClassName}>↻</span>🇺🇸
			</div>
		</section>
	);
};

FilterAndFetchingIndicator.propTypes = {
	/** each of these represent whether the browser is actively fetching this information */
	fetchingStatuses: PropTypes.shape({
		eu: PropTypes.shape({
			deviceList: PropTypes.bool.isRequired,
			availability: PropTypes.bool.isRequired,
		}).isRequired,
		us: PropTypes.shape({
			deviceList: PropTypes.bool.isRequired,
			availability: PropTypes.bool.isRequired,
		}).isRequired
	}),
	/** needed to supply as value for the <select> */
	filterMode: PropTypes.oneOf([constants.DEVICES_ALL, constants.DEVICES_ANDROID, constants.DEVICES_IOS]),
	/** changes the filter mode by creating the action up at the container level */
	setFilterMode: PropTypes.func.isRequired
};

export default FilterAndFetchingIndicator;
