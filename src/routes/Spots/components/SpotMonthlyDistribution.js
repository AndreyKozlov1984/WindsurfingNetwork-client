// @flow
import React from 'react';
import { monthByNumber } from '~/utils/formatters';
import _ from 'lodash';

const columnWidth = 100.0 / 12.0;
const SpotMonthlyDistribution = ({ distribution }: { distribution: number[] }) => {
  return (
    <div style={{ width: '100%', height: 200, position: 'relative' }}>
      {_.range(12).map(function (month: number) {
        return (
          <div
            key={month}
            style={{
              position: 'absolute',
              width: `${columnWidth}%`,
              left: `${month * columnWidth}%`,
              height: '100%',
              marginTop: 5,
            }}
          >
            <div style={{ height: '90%', width: '100%', position: 'relative' }}>
              <div
                style={{
                  width: '50%',
                  left: '25%',
                  height: `${distribution[month]}%`,
                  top: `${100 - distribution[month]}%`,
                  position: 'relative',
                  background: 'green',
                }}
              />
            </div>
            <div style={{ width: '100%', textAlign: 'center' }}><b>{monthByNumber(month).substring(0, 3)}</b></div>
          </div>
        );
      })}

    </div>
  );
};
export default SpotMonthlyDistribution;

