import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-video-feed-pagination',
  templateUrl: './video-feed-pagination.component.html',
  styleUrls: ['./video-feed-pagination.component.css']
})
export class VideoFeedPaginationComponent implements OnInit {

  @Input() nrVideos: number;
  @Output() paginationEvent = new EventEmitter<any>();
  pages: number[] = [];
  @Input() selectedPage: number = 1;
  activeSize: number=1;
  leftLimit: number;
  rightLimit: number;
  beginDots: boolean;
  concatlimit:number = 3;
  endDots: boolean;
  videosPerPage: number=2;

  constructor() { }

  ngOnInit() {
    this.calculatePages();
    this.calculateNavigation();
  }

  ngOnChanges(){
    this.calculatePages();
    this.calculateNavigation();
  }

  pageChanged(event){
    this.selectedPage = parseInt(event.target.innerHTML);

    let newPagination = {
      limit:  this.videosPerPage,    //the maximum number of results
      skip:   (this.selectedPage-1)*this.videosPerPage      //skipping x docs
    }
    this.paginationEvent.emit(newPagination);
    this.calculateNavigation();
}

  videosPerPageChanged(event){
      this.selectedPage=1;
      this.videosPerPage=event.target.innerHTML;
      let newPagination = {
        limit: this.videosPerPage,
        skip: (this.selectedPage-1)*this.videosPerPage
      }
      this.calculatePages();
      this.calculateNavigation();
      this.paginationEvent.emit(newPagination); 
  }

  calculatePages(){
    if(this.nrVideos !=0){
      this.pages = [];
      for (let i = 1; i<this.nrVideos/this.videosPerPage+1; i++)
        this.pages.push(i);
    }
  }
  calculateNavigation(){
   // console.log("ACTIVESIZE:",this.activeSize,"SELECTEDPAGE:",this.selectedPage, "SELECTEDPAGE+ACTIVESIZE:",this.selectedPage+this.activeSize,"PAGESLENGHT-CONCATLIMIT",this.pages.length-this.concatlimit);
    if(this.selectedPage-this.activeSize>=this.concatlimit)
    {
       this.leftLimit= this.selectedPage - this.activeSize-1;
       this.beginDots=true;
    }else
    {
      this.leftLimit=1;
      this.beginDots=false;
    }
    if((this.selectedPage+this.activeSize) <= (this.pages.length - this.concatlimit))
    {
     this.rightLimit=this.selectedPage+this.activeSize;
     this.endDots=true; 
    }else
    {
      this.rightLimit=this.pages.length-1;
      this.endDots=false;
    }
} 

}
