import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mode-selection',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mode-selection.html',
  styleUrls: ['./mode-selection.css']
})
export class ModeSelection implements OnInit {
  quizTitle: string = 'Cybersecurity Fundamentals'; // Default title

  constructor(private route: ActivatedRoute, private location: Location) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['title']) {
        this.quizTitle = params['title'];
      }
    });
  }

  goBack() {
    this.location.back();
  }
}
