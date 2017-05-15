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
      currentFloor: 5,
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
      currentFloor: 2,
      inTransit: false,
      doorsOpen: false
    }
  ],

  // Methods
  // ---------------------------------------------------------------------------
  /**
   * Handles 'opening' elevator doors and marking it available to be dispatched
   * @method _markAvailable
   * @private
   * @param elevator The target elevator to be updated
   * @return {undefined}
   */
  _markAvailable(elevator) {
    elevator.doorsOpen = true;
    elevator.inTransit = false;
  },
  /**
   * Handles 'closing' elevator doors and marking it unavailable when dispatched
   * @method _markAvailable
   * @private
   * @param elevator The target elevator to be updated
   * @return {undefined}
   */
  _markUnavailable(elevator) {
    elevator.doorsOpen = false;
    elevator.inTransit = true;
  },

  // Actions
  // ---------------------------------------------------------------------------
  actions: {
    /**
     * Selects the elevator closest to floor 1 and summons it to the first
     * floor.
     * @method summon
     * @return {undefined}
     */
    summon() {
      const elevators = this.get('allElevators');
      const availableElevators = elevators.filter(elev => !elev.inTransit).sort((a, b) => a.currentFloor > b.currentFloor);
      const selectedIndex = elevators.findIndex(ele => ele.id === availableElevators[0].id);
      const selectedElev = elevators.objectAt(selectedIndex);
      Ember.set(selectedElev, 'currentFloor', 1);
    },
    /**
     * Dispatches an elevator to the specified floor
     * @method dispatch
     * @param elevID ID property of target elevator to dispatch
     * @param floor Destination floor
     * @return {undefined}
     */
    dispatch(elevID, floor) {
      const elevators = this.get('allElevators');
      const targetIndex = elevators.findIndex(elev => elev.id === elevID);
      const targetElevator = elevators.objectAt(targetIndex);
      Ember.set(targetElevator, 'currentFloor', floor);
    }
  }
});
