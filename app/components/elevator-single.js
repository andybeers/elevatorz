import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
const { inject } = Ember;

export default Ember.Component.extend({
  // Injections
  // ---------------------------------------------------------------------------
  elevatorService: inject.service('elevator'),

  // Properties
  // ---------------------------------------------------------------------------
  /**
   * @property inputFloor
   * @type {number}
   */
  inputFloor: '',

  // Actions
  // ---------------------------------------------------------------------------
  actions: {
    resetInputField() {
      this.set('inputFloor', '');
    }
  },

  // Layout
  // ---------------------------------------------------------------------------
  layout: hbs`
    <div class="elevator-single {{if elevator.doorsOpen 'doorsOpen'}}">
      <div class="floor-box">
        <h4 class="arrow {{if elevator.goingDown 'active'}}">&#x2228;</h4>
        <h4>{{elevator.currentFloor}}</h4>
        <h4 class="arrow {{if elevator.goingUp 'active'}}">&#x2227;</h4>
      </div>
      <img src='/assets/images/doors.jpg' alt="Tacky Gilded Elevator Doors">
    </div>
    <div class="single-controls">
      <div class="status-bulb {{if elevator.inTransit 'unavailable'}}"></div>
      {{#if (and (eq elevator.currentFloor 1) elevator.doorsOpen)}}
        {{input 
          placeholder='Where to?'
          value=inputFloor}}
        {{#rad-button
          click=(pipe-action (action 'dispatch' elevator.id inputFloor target=elevatorService) (action 'resetInputField') )}}
          GO
        {{/rad-button}}
      {{/if}}
    </div>
  `
});