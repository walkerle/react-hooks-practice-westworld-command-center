import React from "react";
import { Card } from "semantic-ui-react";
import Host from './Host';

function HostList({hosts, onHostClick, hostDetail}) {
  // Iterate and render hosts
  const renderHosts = hosts.map(host => {
    return <Host key={host.id} host={host} onHostClick={onHostClick} hostDetail={hostDetail} />
  })

  return (
    <Card.Group itemsPerRow={6}>
      {/* What do you think, partner? */}
      {renderHosts}
    </Card.Group>
  );
}

export default HostList;
