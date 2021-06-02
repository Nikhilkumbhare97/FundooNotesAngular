import { Component, ElementRef, EventEmitter,HostListener,Input, OnInit, Output, ViewChild} from '@angular/core';


@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {

  @Output() messageEvent = new EventEmitter<boolean>();
  @Output() moreEvent = new EventEmitter<boolean>();
  noteclick: boolean = false;
  @Input() childMessage: any | undefined;
  @ViewChild('moremenu') element!: ElementRef;
  top: number = 0;
  left : number = 0;
  more : boolean = false;
  constructor(elRef:ElementRef) { }
  move($event: any) {
    this.more = !this.more;
    this.moreEvent.emit(this.childMessage['noteID']);
  }

   @HostListener('click', ['$event'])
   noteClick(){
   }
   sendMessage() {
    this.messageEvent.emit(this.childMessage)
  }
  updateNoteProcess(){
    this.sendMessage();
  }
  ngOnInit(): void {
  }
}


