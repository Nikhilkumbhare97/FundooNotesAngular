import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { NoteServiceService } from 'src/app/service/noteService/note-service.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  pin : boolean = false;
  fullEdit : boolean = false;

  @Output() messageEvent = new EventEmitter<string>();
  constructor(private eRef: ElementRef, private elRef:ElementRef, private NotesService:NoteServiceService) {  }
  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if(!this.eRef.nativeElement.contains(event.target)) {
      this.fullEdit = false;
      this.createNote();
      (<HTMLInputElement>document.getElementById("note")).innerText = '';
    }
  }

  takeNote(){
    this.createNote();
    this.fullEdit = false;
    (<HTMLInputElement>document.getElementById("note")).innerText = '';
  }
  createNote(){
    let reqData={
      title :(<HTMLInputElement>document.getElementById("title"))?
       (<HTMLInputElement>document.getElementById("title")).value:'',
      text : (<HTMLInputElement>document.getElementById("note")).innerText.trim(),
      IsPin: this.pin
  }
    if(reqData.text != ''){
      this.NotesService.createNote(reqData).subscribe(
        (response: any) => {
        console.log(response);
          this.messageEvent.emit()
      });;
    }
    this.pin = false
  }

  ngAfterViewInit() {
  }

  ngOnInit(): void {
    
  }
  
  togglePin(){
    this.pin = !this.pin; 
  }
  adjustHeight(event: any){
    var target = event.target;
   target.style.height = "1px";
   target.style.height = (target.scrollHeight)+"px";
  }
  displayFull(){
    this.fullEdit = true;
  }
  

}
