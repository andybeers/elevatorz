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
      doorsOpen: true
    },
    {
      id: 2,
      currentFloor: 4,
      inTransit: false,
      doorsOpen: true
    },
    {
      id: 3,
      currentFloor: 2,
      inTransit: false,
      doorsOpen: true
    }
  ],

  // Methods
  // ---------------------------------------------------------------------------
  /**
   * Handles toggling of elevator doors and availability properties
   * @method _handleStatus
   * @private
   * @param elevator The target elevator to be updated
   * @return {undefined}
   */
  _handleStatus(elevator) {
    Ember.set(elevator, 'doorsOpen', !elevator.doorsOpen);
    Ember.set(elevator, 'inTransit', !elevator.inTransit);
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
      this._handleStatus(targetElevator);
      setTimeout(() => {
        Ember.set(targetElevator, 'currentFloor', floor);
        this._handleStatus(targetElevator);
      }, 3000);
    }
  }
});
