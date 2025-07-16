import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-about',
  imports: [CommonModule, MaterialModule],
  templateUrl: './about.html',
  styleUrl: './about.css'
})

export class AboutComponent {
}
