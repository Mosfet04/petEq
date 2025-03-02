import { Component, OnInit, OnDestroy } from "@angular/core";
import { trigger, state, style, animate, transition } from "@angular/animations";
import { interval, Subscription } from "rxjs";

@Component({
  selector: "app-manutencao",
  templateUrl: "./manutencao.component.html",
  styleUrls: ["./manutencao.component.css"]
})
export class ManutencaoComponent implements OnInit, OnDestroy {
  animationState = "up";
  private animationSubscription: Subscription | null = null;

  ngOnInit(): void {
    this.animationSubscription = interval(1000).subscribe(() => {
      this.animationState = this.animationState === "up" ? "down" : "up";
    });
  }

  ngOnDestroy(): void {
    if (this.animationSubscription) {
      this.animationSubscription.unsubscribe();
    }
  }
}
