import React from "react";
import { Card } from "semantic-ui-react";
import "../stylesheets/Host.css";

function Host({host, onHostClick, hostDetail}) {
  /* NOTE: The className "host selected" renders a different style than simply "host". */
  // Destructured host data
  const {imageUrl} = host;

  return (
    <Card
      className={(host.id === hostDetail.id ? "host selected" : "host")}
      onClick={() => onHostClick(host)}
      image={imageUrl}
      raised
      link
    />
  );
}

export default Host;
