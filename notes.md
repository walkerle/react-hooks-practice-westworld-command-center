# Component Tree
App.js
  -> [x] Fetch host data here
  -> [x] Hosts should be filtered into WestworldMap or ColdStorage component here
  -> [x] Event Handler: Selects host on click

  => WestworldMap.js - top section of screen
    -> [x] Fetch area data here
    -> [x] Iterate and renders areas
    => Area.js
      -> [x] Fix name format for specific area
      => HostList.js
        -> [x] Iterate and renders active hosts
        => Host.js - will need to be passed into WestworldMap and ColdStorage
          -> [x] Event Listener: Host click
          -> [x] Renders selected host with red border

  => Headquarters.js - bottom section of screen
    => ColdStorage.js
      => HostList.js
        -> [x] Iterate and renders decommissioned hosts
        => Host.js - will need to be passed into WestworldMap and ColdStorage
          -> [x] Event Listener: Host click
          -> [x] Renders selected host with red border
    => Details
      => HostInfo.js
        -> [~] Render details of selected host
    => LogPanel.js