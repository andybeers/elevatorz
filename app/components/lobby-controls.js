import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

export default Ember.Component.extend({
  layout: hbs`
    <div class="lobby-controls">
      {{#rad-button 
        brand='primary'
        click=(action 'summonElevator')}}I SUMMON THEE{{/rad-button}}  
    </div>
  `
});
