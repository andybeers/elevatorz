import Ember from 'ember';
const { ActionHandler } = Ember;

/**
 * @class Service.Elevator
 * @constructor
 * @extends Ember.Service
 */
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
      doorsOpen: true,
      goingUp: false,
      goingDown: false
    },
    {
      id: 2,
      currentFloor: 4,
      inTransit: false,
      doorsOpen: true,
      goingUp: false,
      goingDown: false
    },
    {
      id: 3,
      currentFloor: 2,
      inTransit: false,
      doorsOpen: true,
      goingUp: false,
      goingDown: false
    }
  ],
  /**
   * True when all elevators are in motion. Error message hook.
   * @property unavailable
   * @type {boolean}
   */
  unavailable: false,
  /**
   * True when destination floor input exceeds this.topFloor value. Error message hook.
   * @property badFloor
   * @type {boolean}
   */
  badFloor: false,
  /**
   * Set maximum possible floor
   * @property topFloor
   * @type {number}
   */
  topFloor: 25,

  // Methods
  // ---------------------------------------------------------------------------
  /**
   * Handles toggling of elevator doorsOpen and inTransit properties
   * @method _handleStatus
   * @private
   * @param elevator The target elevator to be updated
   * @return {undefined}
   */
  _handleStatus(elevator, goingUp) {
    Ember.set(elevator, 'doorsOpen', !elevator.doorsOpen);
    Ember.set(elevator, 'inTransit', !elevator.inTransit);
  },
  /**
   * Recursive method to send an elevator from floor to floor with
   * simulated delay, stopping at the final destination.
   * @method _traverseFloor
   * @private
   * @param elevator The target elevator
   * @param currentFloor The current floor
   * @param endFloor The final destination floor
   * @return {undefined}
   */
  _traverseFloor(elevator, currentFloor, endFloor) {
    endFloor = parseInt(endFloor, 10);
    if (currentFloor < endFloor) {
      Ember.set(elevator, 'goingUp', true);
    } else if (currentFloor > endFloor) {
      Ember.set(elevator, 'goingDown', true);
    }
    // setTimeout magic for simulating the delay of elevators moving betwen floors
    // When end floor is reached, resets all motion-related elevator and service properties
    setTimeout(() => {
      Ember.set(elevator, 'currentFloor', currentFloor);
      if (currentFloor === endFloor) {
        Ember.set(elevator, 'goingUp', false);
        Ember.set(elevator, 'goingDown', false);
        this._handleStatus(elevator);
        this.set('unavailable', false);
        return;
      }
      if (currentFloor < endFloor) {
        this._traverseFloor(elevator, (currentFloor + 1), endFloor);
      } else {
        this._traverseFloor(elevator, (currentFloor - 1), endFloor);
      }
    }, 1000);
  },

  // Actions
  // ---------------------------------------------------------------------------
  actions: {
    /**
     * Summons the closest available elevator to the first floor
     * @method summon
     * @return {undefined}
     */
    summon() {
      const elevators = this.get('allElevators');
      const availableElevators = elevators.filter(elev => !elev.inTransit).sort((a, b) => a.currentFloor > b.currentFloor);
      if (!availableElevators.length) {
        this.set('unavailable', true);
        return;
      }
      const selectedIndex = elevators.findIndex(ele => ele.id === availableElevators[0].id);
      const selectedElev = elevators.objectAt(selectedIndex);
      if (selectedElev.currentFloor === 1) { return; }
      this._handleStatus(selectedElev);
      this._traverseFloor(selectedElev, (selectedElev.currentFloor - 1), 1);
    },
    /**
     * Dispatches an elevator to the specified floor
     * @method dispatch
     * @param elevID ID property of target elevator to dispatch
     * @param floor Destination floor
     * @return {undefined}
     */
    dispatch(elevID, floor) {
      this.set('badFloor', false);
      if (!floor || isNaN(floor)) { return; }
      floor = parseInt(floor, 10);
      if (floor > this.get('topFloor')) {
        this.set('badFloor', true);
        return;
       }

      const elevators = this.get('allElevators');
      const targetIndex = elevators.findIndex(elev => elev.id === elevID);
      const targetElevator = elevators.objectAt(targetIndex);
      if (targetElevator.currentFloor === floor) { return; }

      this._handleStatus(targetElevator);
      this._traverseFloor(targetElevator, 2, floor);
    }
  }
});
