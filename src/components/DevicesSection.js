import React from 'react';
import PropTypes from 'prop-types';
import types from "../ducks/devices/types";

import "./DevicesSection.scss";

/**
 * Lists out all the devices
 */
const DevicesSection = ({ deviceList }) => {
	return (
		<section className="devicesSection">
			{deviceList.map(({ descriptorId, name, os, osVersion, region, available }) => (
				<div
					key={`${region}-${descriptorId}`}
					className="devicesSection__device"
					data-qa={`device-${descriptorId}`}
				>
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
					<span>{region === types.NAMESPACE_EU ? '🇪🇺' : '🇺🇸'}</span>
					<br />
					<span>{available ? 'available' : 'not available'}</span>
				</div>
			))}
		</section>
	);
}

DevicesSection.propTypes = {
	/** possibly empty if the API fails at the EU and US data centers */
	deviceList: PropTypes.arrayOf(PropTypes.shape({
		descriptorId: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		os: PropTypes.string,
		osVersion: PropTypes.string.isRequired,
		region: PropTypes.oneOf([types.NAMESPACE_EU, types.NAMESPACE_US]),
		available: PropTypes.bool
	}))
};

DevicesSection.defaultProps = {
	deviceList: []
};

export default DevicesSection;
