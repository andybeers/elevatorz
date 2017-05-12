import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
const { inject } = Ember;

export default Ember.Component.extend({
  // Injections
  // ---------------------------------------------------------------------------

  elevatorService: inject.service('elevator'),

  layout: hbs`
    <div class="wrapper">
      {{#each elevatorService.allElevators as |elevator|}}
        {{elevator-single elevator=elevator}}
      {{/each}}
      {{lobby-controls summonElevator=elevatorService.summonElevator}}
    </div>
  `
});
