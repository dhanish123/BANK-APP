import { Component } from '@angular/core';

@Component({
  selector: 'app-root',//selector specify the simple css selector
  templateUrl: './app.component.html',//html template that define our view
  styleUrls: ['./app.component.css']//the css style or style sheets,that this component needs
})
export class AppComponent {
  title = 'bankapp';
}
