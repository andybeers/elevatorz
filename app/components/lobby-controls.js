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
    <div class="lobby-controls">
      {{#rad-button 
        click=(action 'summonElevator' target=elevatorService)}}
        I SUMMON THEE
      {{/rad-button}}  
    </div>
  `
});
