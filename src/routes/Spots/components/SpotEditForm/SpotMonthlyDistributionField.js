// @flow
import React from 'react';
import { monthByNumber } from '~/utils/formatters';
import _ from 'lodash-es';

const columnWidth = 100.0 / 12.0;
const color = function (value: number) {
  if (value <= 20) {
    return 'red';
  }
  if (value <= 60) {
    return 'orange';
  }
  if (value <= 80) {
    return 'yellow';
  }
  return 'green';
};
const SpotMonthlyDistribution = ({ distribution, onChange }: { distribution: number[], onChange: Function }) => {
  const handleClick = function (e: any, index: number) {
    const newValue = 100 - 100.0 * e.nativeEvent.offsetY / e.currentTarget.clientHeight;
    const roundedNewValue = Math.round(newValue / 20) * 20;
    const finalNewValue = roundedNewValue === 0 ? 1 : roundedNewValue;
    const newDistribution = distribution.map((x: number, i: number) => (i === index ? finalNewValue : x));
    onChange(newDistribution);
  };
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
            <div style={{ zIndex: 1, height: '90%', width: '100%', position: 'relative' }}>
              <div
                style={{
                  height: '100%',
                  width: '50%',
                  left: '25%',
                  position: 'relative',
                  background: 'grey',
                  cursor: 'pointer',
                  zIndex: 2,
                }}
                onClick={(e: MouseEvent) => handleClick(e, month)}
              >
                <div
                  style={{
                    width: '100%',
                    height: `${distribution[month]}%`,
                    top: `${100 - distribution[month]}%`,
                    position: 'relative',
                    background: color(distribution[month]),
                    zIndex: 3,
                    pointerEvents: 'none',
                  }}
                />
              </div>
            </div>
            <div style={{ width: '100%', textAlign: 'center' }}><b>{monthByNumber(month).substring(0, 3)}</b></div>
          </div>
        );
      })}

    </div>
  );
};

const SpotMonthlyDistributionField = ({ input }: { input: any }) => (
  <SpotMonthlyDistribution distribution={input.value} onChange={input.onChange} />
);
export default SpotMonthlyDistributionField;

