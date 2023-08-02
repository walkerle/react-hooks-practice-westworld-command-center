import React, { useState } from "react";
import {
  Radio,
  Icon,
  Card,
  Grid,
  Image,
  Dropdown,
  Divider,
} from "semantic-ui-react";
import "../stylesheets/HostInfo.css";

function HostInfo({hostDetail, onOptionChange, onActiveChange}) {
  // This state is just to show how the dropdown component works.
  // Options have to be formatted in this way (array of objects with keys of: key, text, value)
  // Value has to match the value in the object to render the right text.
  
  // Destructured hostDetail
  const {id, firstName, active, imageUrl, gender, area} = hostDetail;

  // IMPORTANT: But whether it should be stateful or not is entirely up to you. Change this component however you like.
  const [options] = useState([
  // const options = ([
    { key: "high_plains", text: "High Plains", value: "high_plains" },
    { key: "lowlands", text: "Lowlands", value: "lowlands" },
    { key: "under_construction", text: "Under Construction", value: "under_construction" },
    { key: "pariah", text: "Pariah", value: "pariah" },
    { key: "python_pass", text: "Python Pass", value: "python_pass" },
    { key: "badlands", text: "Badlands", value: "badlands" }
  ]);

  // const [value] = useState("some_area"); // Destination area to check host limit?

  // Event Listener: Dropdown change | Semantic UI's <Dropdown> component makes this a controlled input
  function handleOptionChange(e, { value }) {
    // the 'value' attribute is given via Semantic's Dropdown component.
    // Put a debugger or console.log in here and see what the "value" variable is when you pass in different options.
    // See the Semantic docs for more info: https://react.semantic-ui.com/modules/dropdown/#usage-controlled
    // console.log('value', value);
    // setDropdownValue(value);
    // debugger;

    onOptionChange(value);
  }
  
  // Event Listener: Active/Decommissioned click
  function handleRadioChange() {
    // console.log("The radio button fired");
    onActiveChange();

    // Event Handler: Active/Decommissioned change => backend
    fetch(`http://localhost:3001/hosts/${id}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({...hostDetail, active: !hostDetail.active})
    })
    .then(res => res.json())
  }

  return (
    <Grid>
      <Grid.Column width={6}>
        <Image
          src={imageUrl}
          floated="left"
          size="small"
          className="hostImg"
        />
      </Grid.Column>
      <Grid.Column width={10}>
        <Card>
          <Card.Content>
            <Card.Header>
              {firstName} | {(gender === "Male") ? <Icon name="man" /> : <Icon name="woman" />}
              {/* Think about how the above should work to conditionally render the right First Name and the right gender Icon */}
            </Card.Header>
            <Card.Meta>
              {/* Sometimes the label should take "Decommissioned". How are we going to conditionally render that? */}
              {/* Checked takes a boolean and determines what position the switch is in. Should it always be true? */}
              <Radio
                onChange={handleRadioChange}
                label={(active ? "Active" : "Decommissioned")}
                checked={active}
                slider
              />
            </Card.Meta>
            <Divider />
            Current Area:
            <Dropdown
              onChange={handleOptionChange}
              // value={dropdownValue}
              value={area}
              options={options}
              selection
            />
          </Card.Content>
        </Card>
      </Grid.Column>
    </Grid>
  );
}

export default HostInfo;
