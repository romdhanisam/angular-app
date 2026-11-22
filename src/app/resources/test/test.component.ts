import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {RouterModule} from "@angular/router";

import {HttpClient} from "@angular/common/http";
import {delay, forkJoin, Subject} from "rxjs";
import {BranchState, DiagramMetadata} from "@powsybl/network-viewer-core";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

// import {MylibModule} from "@cell4rom/mylib"; // prod version
import {MylibModule, NadNodeMoveEvent, NadNodeSelectEvent} from "@CompoLib";

@Component({
  standalone: true,
  selector: 'ot-lib-test',
  templateUrl: './test.component.html',
  styleUrls: ['./style.scss'],
  imports: [CommonModule, RouterModule, MylibModule, MatCardModule, MatButtonModule, NgOptimizedImage, MatInputModule, MatProgressSpinnerModule],
})
export default class TestComponent implements OnInit {
  private http = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  public loading: boolean = false

  svgLink: string = '/demo/src/diagram-viewers/data/nad-four-substations.svg';//sld/sld-example.svg';
  metadataLink: string = '/demo/src/diagram-viewers/data/nad-four-substations_metadata.json';//sld/sld-example_metadata.json';
  svgContent: string | null = null;
  metadata: DiagramMetadata | null = null;

  diagram$ = forkJoin({
    svg: this.http.get(this.svgLink, { responseType: 'text' }),
    metadata: this.http.get<DiagramMetadata>(this.metadataLink),
  });
  branchStates?: BranchState[];
  selected = '';

  onSelect(e: NadNodeSelectEvent) { this.selected = e.equipmentId; }
  onMove(e: NadNodeMoveEvent) {}

  ngOnInit(): void {
    this.loading = true;
    this.diagram$
        // .pipe(delay(500))
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(({ svg, metadata }) => {
      this.svgContent = svg;
      this.metadata = metadata;
      this.loading = false;
    });
  }
}
