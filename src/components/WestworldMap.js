import React from "react";
import { Segment } from "semantic-ui-react";
import Area from './Area';

function WestworldMap({areas, activeHosts, onHostClick, hostDetail}) {
  // Iterate through and render each area
  const renderAreas = areas.map(area => {
    const activeAreaHosts = activeHosts.filter(host => (host.area === area.name ? host : ''))
    return <Area key={area.id} area={area} hosts={activeAreaHosts} onHostClick={onHostClick} hostDetail={hostDetail} />
  })

  return <Segment id="map">
    {/* What should we render on the map? */}
    {renderAreas}
  </Segment>;
}

export default WestworldMap;
