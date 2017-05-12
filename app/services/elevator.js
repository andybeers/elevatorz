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
      currentFloor: 3,
      inTransit: false,
      doorsOpen: false
    },
    {
      id: 2,
      currentFloor: 4,
      inTransit: false,
      doorsOpen: false
    },
    {
      id: 3,
      currentFloor: 5,
      inTransit: false,
      doorsOpen: false
    }
  ],

  // Actions
  // ---------------------------------------------------------------------------
  actions: {
    summonElevator() {
      console.log('Oh boy, here I go killing again.');
      const elevators = this.get('allElevators');
      const availableElevators = elevators.filter(elev => !elev.inTransit).sort((a, b) => a.currentFloor > b.currentFloor);
      const selectedIndex = elevators.findIndex(ele => ele.id === availableElevators[0].id);
      const selectedElev = this.get('allElevators').objectAt(selectedIndex);
      Ember.set(selectedElev, 'currentFloor', 1);
    }
  }
});
