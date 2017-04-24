import React from 'react';
import { Button, Panel } from 'react-bootstrap';

import SurfaceCheckboxFilterContainer from '../containers/SurfaceCheckboxFilterContainer';
import BeachCheckboxFilterContainer from '../containers/BeachCheckboxFilterContainer';
import WindCheckboxFilterContainer from '../containers/WindCheckboxFilterContainer';
import ConvenienceCheckboxFilterContainer from '../containers/ConvenienceCheckboxFilterContainer';
import EntranceCheckboxFilterContainer from '../containers/EntranceCheckboxFilterContainer';
import BenthalCheckboxFilterContainer from '../containers/BenthalCheckboxFilterContainer';
import DangerCheckboxFilterContainer from '../containers/DangerCheckboxFilterContainer';

import CountrySelectorContainer from '../containers/CountrySelectorContainer';
import SpotList from './SpotList';
import ActivityList from './ActivityList';
import MapContainer from '../containers/MapContainer';

const Dashboard = ({ filters, data, selectAll, selectNone }) => {
  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <div className='layout-main'>
      <div className='layout-left'>
        <SurfaceCheckboxFilterContainer />
        <BeachCheckboxFilterContainer />
        <WindCheckboxFilterContainer />
        <ConvenienceCheckboxFilterContainer />
        <EntranceCheckboxFilterContainer />
        <BenthalCheckboxFilterContainer />
        <DangerCheckboxFilterContainer />
        <Panel header='Special'>
          <Button onClick={selectAll}>Select All</Button>
          <Button onClick={selectNone}>Select None</Button>
        </Panel>
        <CountrySelectorContainer />

      </div>
      <div className='layout-middle'>
        <MapContainer
          containerElement={<div style={{ height: `calc(100% - 40px)` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
        <p>{JSON.stringify(filters, 2)}</p>
      </div>
      <div className='layout-right' style={{ width: '400px' }}>
        <SpotList items={data.spots} />
        <ActivityList items={data.activities} />
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  filters: React.PropTypes.object.isRequired,
  data: React.PropTypes.object,
  selectAll: React.PropTypes.func.isRequired,
  selectNone: React.PropTypes.func.isRequired,
};

export default Dashboard;

