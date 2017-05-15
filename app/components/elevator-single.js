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
      <h4>#{{elevator.id}}</h4>
      <p>Current floor: <span><b>{{elevator.currentFloor}}</b></span></p> 
      {{#if (and (eq elevator.currentFloor 1) elevator.doorsOpen)}}
        {{input 
          placeholder='Where to?'
          value=inputFloor}}
        {{#rad-button
          click=(pipe-action (action 'dispatch' elevator.id inputFloor target=elevatorService) (action 'resetInputField') )}}
          GO
        {{/rad-button}}
      {{/if}}
      <div class="status-bulb {{if elevator.inTransit 'unavailable'}}"></div>
      {{!--TODO: figure out img PATH--}} 
      {{!--<img src='../../public/assets/img/doors.jpg' alt="Tacky Gilded Elevator Doors">--}}
    </div>
  `
});