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
      }, 2000);
    });
  },

  methodThing: task(function* () {
    console.log('Don\'t be sad...');
    let shout = yield this.doAsync('I\'m sorry, Dave...');
    console.log(shout);
    shout = yield this.doAsync('I know how you feel...');
    console.log(shout);
    shout = yield this.doAsync('It will get better...');
    console.log(shout);
  }).drop(),

  actions: {
    actionThing() {
      return this.get('methodThing').perform();
    }
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
    {{#rad-button
      click=(action 'actionThing')}}
      CONSOLE
    {{/rad-button}}
  `
});
