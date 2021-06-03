import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NoteServiceService } from 'src/app/service/noteService/note-service.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  public title: any;
  public description: any;

  @Input()
  clicked: any;
  @Output() sendEventToGetAllNotes = new EventEmitter<string>();

  @ViewChild('createCard')
  card!: ElementRef;

  constructor(private noteService: NoteServiceService,
    private renderer: Renderer2) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (e.target === this.card.nativeElement) {
        console.log("Outside");
        console.log(this.card);
        this.clicked = false;
      }
    })
  }

  ngOnInit(): void {
  }

  createNote() {
    let id = localStorage.getItem('id')
    this.clicked = !this.clicked
    let data = {
      title: this.title,
      description: this.description
    }
    console.log(data)
    console.log(id)
    this.noteService.createNote(data, id).subscribe((response: any) =>{
      console.log(response);
      this.sendEventToGetAllNotes.emit();
    }, (error: any) => {
      console.log(error);
    })
  }

  insideCard(){
    this.clicked = true;
  }
}