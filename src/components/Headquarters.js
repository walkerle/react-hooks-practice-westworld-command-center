import React from "react";
import { Grid } from "semantic-ui-react";
import ColdStorage from "./ColdStorage";
import Details from "./Details";
import LogPanel from "./LogPanel";
import "../stylesheets/Headquarters.css";

function Headquarters({decommissionedHosts, onHostClick, hostDetail, onOptionChange, onActiveChange, allActivated, onActivateAllClick, logs}) {
  return (
    <Grid celled="internally">
      <Grid.Column width={8}>
        <ColdStorage hosts={decommissionedHosts} onHostClick={onHostClick} hostDetail={hostDetail} />
      </Grid.Column>
      <Grid.Column width={5}>
        <Details hostDetail={hostDetail} onOptionChange={onOptionChange} onActiveChange={onActiveChange} />
      </Grid.Column>
      <Grid.Column width={3}>
        <LogPanel allActivated={allActivated} onActivateAllClick={onActivateAllClick} logs={logs} />
      </Grid.Column>
    </Grid>
  );
}

export default Headquarters;
