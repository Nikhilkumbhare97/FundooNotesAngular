import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NoteServiceService } from 'src/app/service/noteService/note-service.service';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {

  @Input()
  ngStyle: { 'background-color' : any; }
  
  @Input()
  isArchive: any

  @Input() 
  isTrash: any
  
  @Input()
  card: any;

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
 
  @Output() refreshRequest = new EventEmitter<any>();

  constructor(private noteService : NoteServiceService, private router: Router) { }

  ngOnInit(): void {
  
  }

  deleteNote(){
    console.log(this.card)
    let data = {
      noteIdList: [this.card.id],
      isDeleted: false,
    };
    console.log(data);
    
    let id = localStorage.getItem('id')
    this.noteService.deleteForever(data, id).subscribe((res) => {
      console.log(res);
      this.refreshRequest.emit({ refresh: true, message: 'deleted permanently' });
    }, (error) => {
      console.log(error)
    })
  }

  archiveNote() {
    let data = {
      noteIdList: [this.card.id],
      isArchived: true
    };
    console.log(data);
    
    let id = localStorage.getItem('id')
    this.noteService.moveToArchive(data, id).subscribe((res) => {
      console.log(res);
      this.router.navigate(['/dashboard/notes']);
      this.refreshRequest.emit({ refresh: true, message: 'archived' });
    }, (error) => {
      console.log(error)
    })
  }

  addToTrash() {
    let token = localStorage.getItem('id')
    console.log(token)
    let data = {
      noteIdList: [this.card.id],
      isDeleted: true
    }
    console.log(data)
    this.noteService.moveToTrash(data, token).subscribe((res) => {
      console.log(res)
      this.refreshRequest.emit({ refresh: true, message: 'deleted' })
      this.router.navigate(['']);
    }, (error) => {
      console.log(error)
    })
  }

  changeColor(color: any) {
    this.card.color = color;
    let id = localStorage.getItem('id')
    let data ={
      noteIdList: [this.card.id],
      color: color,
     }
     console.log(data);
     
     this.noteService.changeColor(id, data).subscribe((res)=> {
       console.log(res)
       this.refreshRequest.emit({ refresh: true, message: 'colored'})
     },(error)=> {
       console.log(error)
     })
  }
}
