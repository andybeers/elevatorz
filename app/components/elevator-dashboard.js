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
    <div class="wrapper flex">
      {{#each elevatorService.allElevators as |elevator|}}
        {{elevator-single elevator=elevator}}
      {{/each}}
    </div>
    {{#if elevatorService.unavailable}}
      {{#rad-alert brand='danger'}}No available elevators!{{/rad-alert}}
    {{/if}}
    {{lobby-controls}}
  `
});
