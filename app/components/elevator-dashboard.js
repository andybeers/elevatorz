import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
const { inject } = Ember;

export default Ember.Component.extend({
  // Injections
  // ---------------------------------------------------------------------------

  elevatorService: inject.service('elevator'),

  layout: hbs`
    {{#each elevatorService.allElevators as |elevator|}}
      <ul>
        <li>
          Elevator #{{elevator.id}} --
          Floor: {{elevator.currentFloor}}
        </li>
      </ul>
    {{/each}}
  `
});
