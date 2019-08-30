import React from 'react';
import PropTypes from 'prop-types';

import "./FilterAndFetchingIndicator.scss";

const FilterAndFetchingIndicator = ({ fetchingStatuses: { eu, us } }) => {
	const euSpinnerClassName = `filterAndFetchingIndicator__spinner ${eu.availability ? 'filterAndFetchingIndicator__spinner--active' : ''}`;
	const usSpinnerClassName = `filterAndFetchingIndicator__spinner ${us.availability ? 'filterAndFetchingIndicator__spinner--active' : ''}`;

	return (
		<section className="filterAndFetchingIndicator">
			<div>
				Server Status: Checking availability
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
	})
};

export default FilterAndFetchingIndicator;
