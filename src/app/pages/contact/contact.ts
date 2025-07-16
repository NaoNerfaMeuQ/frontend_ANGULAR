import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class ContactComponent {

}
