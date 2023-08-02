import React from "react";
import "../stylesheets/Area.css";
import HostList from './HostList';

function Area({area, hosts, onHostClick,hostDetail}) {
  // Destructured area data
  const {name} = area;

  // Fix area name
  const fixedName = name
    // Change area name to array and capitalize first letter of each word
    .split('_').map(word => word[0].toUpperCase() + word.slice(1))
    // Change area name back to string and add any spaces
    .join(' ');
    // .toString().replace(',', ' '); // alternate way

  return (
    <div
      className="area"
      id={name}
    >
      <h3 className="labels">{fixedName}</h3>
      {/* See Checkpoint 1 item 2 in the Readme for a clue as to what goes here */}
      <HostList hosts={hosts} onHostClick={onHostClick} hostDetail={hostDetail} />
    </div>
  );
}

Area.propTypes = {
  hosts: function (props) {
    if (props.hosts.length > props.limit) {
      throw Error(
        `HEY!! You got too many hosts in ${props.name}. The limit for that area is ${props.limit}. You gotta fix that!`
      );
    }
  },
};

export default Area;
