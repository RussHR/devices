import React from 'react';
import PropTypes from 'prop-types';

import "./DevicesSection.scss";

/**
 * Lists out all the devices
 */
const DevicesSection = ({ deviceList }) => {
	return (
		<section className="devicesSection">
			{deviceList.map(({ descriptorId, name, os, osVersion, region, available }) => (
				<div key={`${region}-${descriptorId}`} className="devicesSection__device">
					<img
						src={`https://d3ty40hendov17.cloudfront.net/device-pictures/${descriptorId}.png`}
						alt={`Mobile device: ${name}.`}
					/>
					<br />
					<span>{name}</span>
					<br />
					<span>{os}</span>
					<br />
					<span>{osVersion}</span>
					<br />
					<span>{region === 'eu' ? '🇪🇺' : '🇺🇸'}</span>
					<br />
					<span>{available ? 'available' : 'not available'}</span>
				</div>
			))}
		</section>
	);
}

DevicesSection.propTypes = {
	/** possibly empty if the API fails at the EU data center */
	deviceList: PropTypes.arrayOf(PropTypes.shape({
		descriptorId: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		os: PropTypes.string,
		osVersion: PropTypes.string.isRequired,
		region: PropTypes.oneOf(['us', 'eu']),
		available: PropTypes.bool
	})),
};

DevicesSection.defaultProps = {
	deviceList: []
};

export default DevicesSection;
