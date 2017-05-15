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
      <div class="alert-box">
        {{#if elevatorService.unavailable}}
          {{#rad-alert brand='danger'}}No available elevators!{{/rad-alert}}
        {{/if}}
        {{#if elevatorService.badFloor}}
          {{#rad-alert brand='danger'}}Highest floor is 25{{/rad-alert}}
        {{/if}}
      </div>
    {{lobby-controls}}
  `
});
