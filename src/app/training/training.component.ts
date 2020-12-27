import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UIService } from '../shared/ui.service';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css'],
})
export class TrainingComponent implements OnInit, OnDestroy {
  ongoingTraining = false;
  exerciseSubscription: Subscription;
  isLoading = false;
  private loadingSubs: Subscription;

  constructor(
    private trainingService: TrainingService,
    private uiService: UIService
  ) {}

  ngOnInit(): void {
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(
      (isLoading) => {
        this.isLoading = isLoading;
      }
    );
    this.exerciseSubscription = this.trainingService.exerciseChanged.subscribe(
      (exercise) => {
        if (exercise) {
          this.ongoingTraining = true;
        } else {
          this.ongoingTraining = false;
        }
      }
    );
  }

  ngOnDestroy() {
    if (this.loadingSubs) {
      this.loadingSubs.unsubscribe();
    }
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
  }
}
