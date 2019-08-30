import { expect } from "chai";
import { mapStateToProps } from "./OverviewContainer";
import types from "../ducks/devices/types";

describe('OverviewContainer', () => {
  describe('mapStateToProps', () => {
    let mockState;

    beforeAll(() => {
      mockState = {
        devices: {
          deviceList: {
            eu: {
              descriptorId_0: {
                name: 'name 0',
                os: 'ANDROID',
                osVersion: '7.8.9',
                available: false
              }
            },
            us: {
              descriptorId_1: {
                name: 'name 1',
                os: 'ANDROID',
                osVersion: '1.2.3',
                available: false
              },
              descriptorId_2: {
                name: 'name 2',
                os: 'IOS',
                osVersion: '4.5.6',
                available: false
              }
            }
          }
        }
      };
    });

    it('should include euDeviceList', () => {
      expect(mapStateToProps(mockState)).to.have.property('euDeviceList');
      expect(mapStateToProps(mockState).euDeviceList).to.deep.equal([{
        descriptorId: 'descriptorId_0',
        name: 'name 0',
        os: 'ANDROID',
        osVersion: '7.8.9',
        region: types.NAMESPACE_EU,
        available: false
      }]);
    });
    it('should include usDeviceList', () => {
      expect(mapStateToProps(mockState)).to.have.property('usDeviceList');
      expect(mapStateToProps(mockState).usDeviceList).to.deep.equal([
        {
          descriptorId: 'descriptorId_1',
          name: 'name 1',
          os: 'ANDROID',
          osVersion: '1.2.3',
          region: types.NAMESPACE_US,
          available: false
        },
        {
          descriptorId: 'descriptorId_2',
          name: 'name 2',
          os: 'IOS',
          osVersion: '4.5.6',
          region: types.NAMESPACE_US,
          available: false
        }
      ]);
    });
  });
});
