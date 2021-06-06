import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UpdateNoteComponent } from '../update-note/update-note.component';

@Component({
  selector: 'app-note-display',
  templateUrl: './note-display.component.html',
  styleUrls: ['./note-display.component.scss']
})
export class NoteDisplayComponent implements OnInit {

  @Input()
  isArchive: any;

  @Input()
  isTrash: any;
  
  @Input()
  notesArray: any[] = [];
  
  @Output() updateSignal = new EventEmitter<string>();

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
    console.log(this.notesArray);
  }


  openDialog(note: any) {
    const dialogRef = this.dialog.open(UpdateNoteComponent, {
      width: '500px',
      data: { note }
    });
    dialogRef.afterClosed().subscribe((resp: any) => {
      if (resp.success)
        this.updateSignal.emit('update');
    })
  }

}
