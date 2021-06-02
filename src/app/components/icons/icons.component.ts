import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {
  public colorPalette: any[] = [
    [
      { color: '#fff' },
      { color: '#f28b82' },
      { color: '#fbbc04' }
    ],
    [
      { color: '#fff475' },
      { color: '#ccff90' },
      { color: '#a7ffeb' }
    ],
    [
      { color: '#cbf0f8' },
      { color: '#aecbfa' },
      { color: '#d7aefb' }
    ]
  ]

  constructor() { }

  ngOnInit(): void {
  }
}
