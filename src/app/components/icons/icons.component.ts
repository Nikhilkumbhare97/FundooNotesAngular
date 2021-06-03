import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {

  @Input()
  noteCard: any;

  @Output() refreshRequest = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

}
