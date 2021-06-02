import { stringify } from '@angular/compiler/src/util';
import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NoteServiceService } from 'src/app/service/noteService/note-service.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  pin: boolean = false;
  fullEdit: boolean = false;

  @Output() messageEvent = new EventEmitter<string>();
  constructor(private eRef: ElementRef, private notesService: NoteServiceService, private route:ActivatedRoute) { }
  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.fullEdit = false;
      this.createNote();
      (<HTMLInputElement>document.getElementById("note")).innerText = '';
    }
  }

  createNote() {
    // let data = new FormData();
   
    let data =  {
      title: (<HTMLInputElement>document.getElementById("title")) ?
        (<HTMLInputElement>document.getElementById("title")).value : '',
      description: (<HTMLInputElement>document.getElementById("note")).innerText.trim(),
      isPined: this.pin
    }
  
    console.log(data);
    if (data.description != '') {
      let id = localStorage.getItem('id');
      console.log(id)
      this.notesService.createNote(data, id).subscribe(
        (response: any) => {
          console.log(response);
          this.messageEvent.emit(response)
        });;
    }
    this.pin = false
  }

  ngOnInit(): void {

  }

  togglePin() {
    this.pin = !this.pin;
  }

  adjustHeight(event: any) {
    var target = event.target;
    target.style.height = "1px";
    target.style.height = (target.scrollHeight) + "px";
  }

  displayFull() {
    this.fullEdit = true;
  }

}


