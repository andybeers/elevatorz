import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
const { inject } = Ember;
import { task } from 'ember-concurrency';

export default Ember.Component.extend({
  // Injections
  // ---------------------------------------------------------------------------
  elevatorService: inject.service('elevator'),

  doAsync(string) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(string);
      }, 1000);
    });
  },

  actionThing: task(function*() {
    const shout = yield this.doAsync('Hey guys.');
    console.log(shout);
  }),

  init() {
    this._super(...arguments);
    this.get('actionThing').perform();
  },

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
