import Ember from 'ember';
const { ActionHandler } = Ember;

export default Ember.Service.extend(ActionHandler, {
  // Properties
  // ---------------------------------------------------------------------------
  /**
   * Array of elevator objects
   * @property allElevators
   * @type {array}
   */
  allElevators: [
    {
      id: 1,
      currentFloor: 1,
      inTransit: false,
      doorsOpen: false
    },
    {
      id: 2,
      currentFloor: 1,
      inTransit: false,
      doorsOpen: false
    },
    {
      id: 3,
      currentFloor: 1,
      inTransit: false,
      doorsOpen: false
    }
  ],

  // Actions
  // ---------------------------------------------------------------------------
  actions: {
    summonElevator() {
      const elevators = this.get('allElevators');
      const availableElevators = elevators.filter(elev => !elev.inTransit).sort((a, b) => a.currentFloor > b.currentFloor);
      const selectedElevatorIndex = elevators.findIndex(ele => ele.id === availableElevators[0].id);
      console.log('index', selectedElevatorIndex);
    }
  }
});
