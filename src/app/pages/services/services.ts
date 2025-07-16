import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-services',
  imports: [CommonModule, MaterialModule],
  templateUrl: './services.html',
  styleUrl: './services.css'
})

export class ServicesComponent {
}
