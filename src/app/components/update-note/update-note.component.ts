import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoteServiceService } from 'src/app/service/noteService/note-service.service';
import { NoteComponent } from '../note/note.component';

@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.scss']
})
export class UpdateNoteComponent implements OnInit {

  title: any;
  description: any;

  constructor(private dialogRef: MatDialogRef<UpdateNoteComponent>,
    @Inject(MAT_DIALOG_DATA) public card: any,
    private noteService : NoteServiceService) {

  }
  ngOnInit(): void {
    this.title = this.card.note.title;
    this.description=this.card.note.description
  }

  onClose() {
    this.dialogRef.close({ 'success': false });
  }

  submit() {

    let note = {
      noteId: this.card.note.id,
      title: this.title,
      description: this.description,
    };
  
    let id = localStorage.getItem('id')
    console.log(id)
    console.log('Updating the note', note);
    this.noteService.updateNotes(note, id).subscribe((resp: any) => {
      console.log(resp);
      this.dialogRef.close({ 'success': true });
    }, (error) => {
      console.log(error);
    });
  }
}
