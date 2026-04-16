import {Directive, EventEmitter, HostBinding, HostListener, inject, Output} from '@angular/core';
import {FileHandle} from '../model/file-handle.model';
import {DomSanitizer} from '@angular/platform-browser';

@Directive({
  selector: '[appDrag]'
})
export class DragDirective {

  private sanitizer: DomSanitizer = inject(DomSanitizer)

  @Output() files: EventEmitter<FileHandle> = new EventEmitter();

  @HostBinding("style.background") background = "#eee";
  constructor() { }

  @HostListener("dragover", ['$event'])
  public onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.background = "#999";
  }

  @HostListener("dragleave", ['$event'])
  public onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.background = "#eee";
  }

  @HostListener("drop", ['$event'])
  public onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.background = "#eee";

    if (!event.dataTransfer) {
      return;
    }

    if (!event.dataTransfer.files || event.dataTransfer.files.length === 0) {
      return;
    }

    const file = event.dataTransfer.files[0];


    const objectUrl = URL.createObjectURL(file);


    const fileHandle: FileHandle = {
      file,
      url: this.sanitizer.bypassSecurityTrustUrl(objectUrl),
      urlString: objectUrl
    };

    this.files.emit(fileHandle);
  }
}
