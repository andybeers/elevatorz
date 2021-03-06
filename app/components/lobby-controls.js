import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
const { inject } = Ember;

export default Ember.Component.extend({
  // Injections
  // ---------------------------------------------------------------------------
  elevatorService: inject.service('elevator'),

  // Layout
  // ---------------------------------------------------------------------------
  layout: hbs`
    <div class="lobby-controls flex">
      {{#rad-button 
        click=(action 'summon' target=elevatorService)}}
        CALL ELEVATOR
      {{/rad-button}}
    </div>
  `
});
