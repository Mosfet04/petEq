import { Component, Input, Output, OnInit, EventEmitter, OnChanges, SimpleChanges } from "@angular/core";

@Component({
  selector: "pagination",
  templateUrl: "./pagination.component.html",
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() pages: number;
  @Output() pageChanged = new EventEmitter<number>();

  hasNextPage: boolean = false;
  currentPage: number = 1;
  range: Array<number> = [];
  rangeLimit: number = 3;

  ngOnInit(): void {
    this.updateRange();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.pages && changes.pages.currentValue) {
      this.updateRange();
    }
  }

  updateRange(): void {
    if (this.pages > 0) {
      this.range = Array.from({ length: Math.min(this.pages, this.rangeLimit) }, (_, i) => i + 1);
      this.hasNextPage = this.pages > this.range.length;
    }
  }

  changePage(page: number): void {
    if (page > 0 && page <= this.pages) {
      this.currentPage = page;
      this.pageChanged.emit(this.currentPage);
      this.updateRange();
    }
  }

  toggleLastPage(): void {
    this.range = Array.from({ length: this.rangeLimit }, (_, i) => this.pages - i)
      .filter(page => page > 0)
      .sort((a, b) => a - b);
    this.currentPage = this.pages;
    this.pageChanged.emit(this.currentPage);
  }

  toggleFirstPage(): void {
    this.range = Array.from({ length: Math.min(this.pages, this.rangeLimit) }, (_, i) => i + 1);
    this.currentPage = 1;
    this.pageChanged.emit(this.currentPage);
    this.hasNextPage = this.range[this.range.length - 1] < this.pages;
  }

  nextPage(): void {
    if (this.currentPage < this.pages) {
      this.changePage(this.currentPage + 1);
    }
  }

  backPage(): void {
    if (this.currentPage > 1) {
      this.changePage(this.currentPage - 1);
    }
  }
}