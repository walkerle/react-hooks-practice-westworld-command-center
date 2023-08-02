import React, { useState, useEffect } from "react";
import { Segment } from "semantic-ui-react";
import "../stylesheets/App.css";
import WestworldMap from './WestworldMap';
import Headquarters from './Headquarters';
import { Log } from '../services/Log';

function App() {
  // React state(s)
  const [hosts, setHosts] = useState([]);
  const [areas, setAreas] = useState([]);
  const [hostDetail, setHostDetail] = useState([]);
  const [allActivated, setAllActivated] = useState();
  const [logs, setLogs] = useState([]);
  
  // Fetch hosts data
  useEffect(() => {
    fetch('http://localhost:3001/hosts')
    .then(res => res.json())
    .then(data => {
      setHosts(data);
      // console.log(data);

      // Set initial state for 'allActivated'
      const initialAllActivated = (data.filter(host => host.active === true).length > 0
      ? true : false)
      setAllActivated(initialAllActivated);
    })
    .catch(error => window.alert('hosts ' + error))
  }, [])

  // Fetch map area data
  useEffect(() => {
    fetch('http://localhost:3001/areas')
    .then(res => res.json())
    .then(data => {
      setAreas(data);
      // console.log(data);
    })
    .catch(error => window.alert('areas ' + error))
  }, [])

  // Event Handler: onHostClick
  function onHostClick(hostData) {
    // console.log('hostData:', hostData);
    setHostDetail(hostData);
  }

  // Event Handler: HostInfo.js Current Area change => frontend
  function onOptionChange(newArea) {
    // Area limit check should occur here? Block event if necessary
    const areaDestinationLimit = areas.find(area => area.name === newArea).limit;
    const numHostsInDestinationArea = hosts.filter(host => host.area === newArea).length;
    if(numHostsInDestinationArea < areaDestinationLimit) {
      // console.log('area open');

      // console.log('hostDetail', hostDetail);
      setHostDetail({...hostDetail, area: newArea});
      setHosts(hosts.map(host => (host.id === hostDetail.id ? {...hostDetail, area: newArea} : host)));
      
      // Event Handler: Current Area change => backend
      fetch(`http://localhost:3001/hosts/${hostDetail.id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({...hostDetail, area: newArea})
      })
      .then(res => res.json())
      
      // LogPanel message for changing areas
      const fixedName = newArea
      .split('_').map(word => word[0].toUpperCase() + word.slice(1))
      .join(' ');
      const newLog = Log.notify(`${hostDetail.firstName} set in area ${fixedName}`);
      // console.log('newLog:', newLog);
      setLogs([newLog, ...logs])
    } else {
      // console.log('area full');

      // LogPanel message when too many hosts in an area
      const fixedName = newArea
      .split('_').map(word => word[0].toUpperCase() + word.slice(1))
      .join(' ');
      const newLog = Log.error(`Too many hosts. Cannot add ${hostDetail.firstName} to ${fixedName}!`);
      setLogs([newLog, ...logs])
    }

  }

  // Event Handler: Active/Decommissioned change => frontend
  function onActiveChange() {
    // console.log('onActiveChange');
    setHostDetail({...hostDetail, active: !hostDetail.active})
    setHosts(hosts.map(host => (host.id === hostDetail.id ? {...hostDetail, active: !hostDetail.active} : host)));
    
    // Event Handler: Update ACTIVATE ALL / DECOMMISSION ALL button
    // Different behavior desired compared to instructions: DECOMMISSION ALL is available if one or more host is active.  ACTIVATE ALL is available only if all hosts are decommissioned.
    // ***useState set functions are async functions***
    (hosts.filter(host => host.active === true).length === 1 && hostDetail.active === true
    ? setAllActivated(false) : setAllActivated(true))

    // LogPanel message for activated/decommissioned host
    const newLog = (!hostDetail.active ? Log.warn(`Activated ${hostDetail.firstName}`) : Log.notify(`Decommissioned ${hostDetail.firstName}`))
    setLogs([newLog, ...logs])
    
  }

  // Event Handler: Activate/Decommission All Button => frontend & backend
  // Different behavior desired compared to instructions: DECOMMISSION ALL is available if one or more host is active.  ACTIVATE ALL is available only if all hosts are decommissioned.
  function onActivateAllClick() {
    // console.log('onActivateAllClick');
    setAllActivated(!allActivated);
    // console.log(hosts);

    const newHosts = hosts.map(host => {
      // backend => This causes the server to break, too many HTTP requests?
      // fetch(`http://localhost:3001/hosts/${host.id}`, {
      //   method: 'PATCH',
      //   headers: {'Content-Type': 'application/json'},
      //   body: JSON.stringify({...host, active: !allActivated})
      // })
      // .then(res => res.json())
      // .catch(error => window.alert('activate/decommission all hosts ' + error))

      return {...host, active: !allActivated}
    })

    setHosts(newHosts);
    setHostDetail({...hostDetail, active: !allActivated})

    // LogPanel message for activating/decommissioning all hosts
    const newLog = (!allActivated ? Log.warn(`Activating all hosts!`) : Log.notify(`Decommissioning all hosts.`))
    setLogs([newLog, ...logs])

  }

  // Assign decommissioned vs active hosts
  const decommissionedHosts = hosts.filter(host => host.active === false);
  const activeHosts = hosts.filter(host => host.active === true);

  return (
    <Segment id="app">
      {/* What components should go here? Check out Checkpoint 1 of the Readme if you're confused */}
      <WestworldMap areas={areas} activeHosts={activeHosts} onHostClick={onHostClick} hostDetail={hostDetail} />
      <Headquarters decommissionedHosts={decommissionedHosts} onHostClick={onHostClick} hostDetail={hostDetail} onOptionChange={onOptionChange} onActiveChange={onActiveChange} allActivated={allActivated} onActivateAllClick={onActivateAllClick} logs={logs} />
    </Segment>
  );
}

export default App;
