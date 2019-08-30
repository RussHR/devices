import React from 'react';
import PropTypes from 'prop-types';

const DevicesSection = ({ deviceList }) => {
	return (
		<section>
			{deviceList.map(({ descriptorId, name, os, osVersion, region, available }) => (
				<div key={`${region}-${descriptorId}`}>
					{name}
					{os}
					{osVersion}
					{region}
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
