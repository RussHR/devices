import React from 'react';
import PropTypes from 'prop-types';

const DevicesSection = ({ euDeviceList, usDeviceList }) => {
	return (
		<section>
			{euDeviceList.map(({ descriptorId, name, os, osVersion, available }) => (
				<div key={descriptorId}>
					{name}
					{os}
					{osVersion}
					{available ? 'available' : 'not available'}
					<img
						src={`https://d3ty40hendov17.cloudfront.net/device-pictures/${descriptorId}.png`}
						alt={`Mobile device: ${name}.`}
					/>
				</div>
			))}
			{usDeviceList.map(({ descriptorId, name, os, osVersion, available }) => (
				<div key={descriptorId}>
					{name}
					{os}
					{osVersion}
					{available ? 'available' : 'not available'}
					<img
						src={`https://d3ty40hendov17.cloudfront.net/device-pictures/${descriptorId}.png`}
						alt={`Mobile device: ${name}.`}
					/>
				</div>
			))}
		</section>
	);
}

DevicesSection.propTypes = {
	/** possibly empty if the API fails at the EU data center */
	euDeviceList: PropTypes.arrayOf(PropTypes.shape({
		descriptorId: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		os: PropTypes.string,
		osVersion: PropTypes.string.isRequired,
		available: PropTypes.bool
	})),
	/** possibly empty if the API fails at the US data center */
	usDeviceList: PropTypes.arrayOf(PropTypes.shape({
		descriptorId: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		os: PropTypes.string,
		osVersion: PropTypes.string.isRequired,
		available: PropTypes.bool
	}))
};

DevicesSection.defaultProps = {
	euDeviceList: [],
	usDeviceList: []
};

export default DevicesSection;
