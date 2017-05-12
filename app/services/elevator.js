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
  }
});
