import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  private primaryColorSubject = new BehaviorSubject<string>(localStorage.getItem('primaryColor') || '#0891B2');
  private secondaryColorSubject = new BehaviorSubject<string>(localStorage.getItem('secondaryColor') || '#ff80b5');
  private iconLinkSubject = new BehaviorSubject<string>(localStorage.getItem('iconLink') || '#000000');

  primaryColor$ = this.primaryColorSubject.asObservable();
  secondaryColor$ = this.secondaryColorSubject.asObservable();
  iconLink$ = this.iconLinkSubject.asObservable();

  setPrimaryColor(color: string): void {
    localStorage.setItem('primaryColor', color);
    this.primaryColorSubject.next(color);
  }

  setSecondaryColor(color: string): void {
    localStorage.setItem('secondaryColor', color);
    this.secondaryColorSubject.next(color);
  }

  setIconLink(link: string): void {
    localStorage.setItem('iconLink', link);
    this.iconLinkSubject.next(link);
  }
}