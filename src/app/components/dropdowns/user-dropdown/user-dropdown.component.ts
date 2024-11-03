import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from "@angular/core";
import { createPopper } from "@popperjs/core";
import { Router } from '@angular/router';
import axios from "axios";

@Component({
  selector: "app-user-dropdown",
  templateUrl: "./user-dropdown.component.html",
})
export class UserDropdownComponent implements AfterViewInit, OnInit {
  dropdownPopoverShow = false;
  @ViewChild("btnDropdownRef", { static: false }) btnDropdownRef: ElementRef;
  @ViewChild("popoverDropdownRef", { static: false })
  userPhoto: string | ArrayBuffer | null = 'assets/img/default-avatar.png';
  popoverDropdownRef: ElementRef;

  constructor(private router: Router) {}

  ngOnInit() {
    this.getUserPhoto();
  }

  ngAfterViewInit() {
    createPopper(
      this.btnDropdownRef.nativeElement,
      this.popoverDropdownRef.nativeElement,
      {
        placement: "bottom-start",
      }
    );
  }
  toggleDropdown(event) {
    event.preventDefault();
    if (this.dropdownPopoverShow) {
      this.dropdownPopoverShow = false;
    } else {
      this.dropdownPopoverShow = true;
    }
  }

  async getUserPhoto(){
    const headers = { Authorization: `Bearer ${localStorage.getItem("accessToken")}` };
    try {
      const response = await axios.get('https://graph.microsoft.com/v1.0/me/photo/$value', { headers, responseType: 'blob' });
      console.log(response);
      const reader = new FileReader();
      reader.onloadend = () => {
        this.userPhoto = reader.result;
      };
      reader.readAsDataURL(response.data);
    } catch (error) {
      this.userPhoto = String('assets/img/team-1-800x800.jpg')
      console.error('Erro ao obter a foto do usuário', error);
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
