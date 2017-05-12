import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

export default Ember.Component.extend({
  layout: hbs`
    <div class="elevator-single {{if elevator.doorsOpen doorsOpen}}">
      <h3>#{{elevator.id}}</h3>
      <p>Current floor: {{elevator.currentFloor}}</p> 
      {{!--TODO: figure out img PATH--}} 
      {{!--<img src='../../public/assets/img/doors.jpg' alt="Tacky Gilded Elevator Doors">--}}
    </div>
  `
});