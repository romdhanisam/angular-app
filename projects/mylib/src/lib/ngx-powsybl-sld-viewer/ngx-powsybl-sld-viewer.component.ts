import {
  ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, NgZone,
  Output, SimpleChanges, ViewChild, inject } from '@angular/core';
import {
  BranchState, DiagramMetadata, NadViewerParametersOptions, NetworkAreaDiagramViewer,
} from '@powsybl/network-viewer-core';
import packageInfo from '../../../package.json';

export type VoltageLevelState = Parameters<NetworkAreaDiagramViewer['setVoltageLevelStates']>[0][number];

export type NadViewerOptions = Omit<NadViewerParametersOptions,
    'onMoveNodeCallback' | 'onMoveTextNodeCallback' | 'onSelectNodeCallback' |
    'onToggleHoverCallback' | 'onRightClickCallback' | 'onBendLineCallback'>;

type Pt = { x: number; y: number };
export interface NadNodeSelectEvent { equipmentId: string; nodeId: string; mousePosition: Pt }
export interface NadNodeMoveEvent { equipmentId: string; nodeId: string; x: number; y: number; xOrig: number; yOrig: number }
export interface NadHoverEvent { hovered: boolean; mousePosition: Pt | null; equipmentId: string; equipmentType: string }
export interface NadRightClickEvent { svgId: string; equipmentId: string; equipmentType: string; mousePosition: Pt }
export interface NadBendLineEvent { svgId: string; equipmentId: string; equipmentType: string; linePoints: Pt[] | null; lineOperation: string }

@Component({
  selector: 'ngx-powsybl-nad-viewer',
  templateUrl: './ngx-powsybl-sld-viewer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./ngx-powsybl-sld-viewer.component.scss']
})
export class NgxPowsyblSldViewerComponent {

  public coreVersion: string = packageInfo.dependencies['@powsybl/network-viewer-core'];

  @Input({ required: true }) svgContent!: string | null;
  @Input() metadata: DiagramMetadata | null = null;
  @Input() options: NadViewerOptions = {};
  @Input() branchStates?: BranchState[];
  @Input() voltageLevelStates?: VoltageLevelState[];
  @Input({required: false}) showVersion: boolean = true;

  @Output() nodeSelect = new EventEmitter<NadNodeSelectEvent>();
  @Output() nodeMove = new EventEmitter<NadNodeMoveEvent>();
  @Output() hoverToggle = new EventEmitter<NadHoverEvent>();
  @Output() rightClick = new EventEmitter<NadRightClickEvent>();
  @Output() bendLine = new EventEmitter<NadBendLineEvent>();
  @Output() viewerReady = new EventEmitter<NetworkAreaDiagramViewer>();

  @ViewChild('host', { static: true }) private host!: ElementRef<HTMLDivElement>;
  private zone = inject(NgZone);
  private _viewer?: NetworkAreaDiagramViewer;

  get viewer() { return this._viewer; }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['svgContent'] || changes['metadata'] || changes['options']) {
      this.createViewer();
    } else {
      this.applyStates(changes);
    }
  }

  ngOnDestroy(): void { this.clear(); }

  private createViewer(): void {
    this.clear();
    if (!this.svgContent) return;
    // The viewer only wires listeners for callbacks that are set (e.g. right-click overrides the
    // browser context menu), so only pass callbacks for outputs the parent actually binds.
    const emitIn = <T>(e: EventEmitter<T>, v: T) => this.zone.run(() => e.emit(v));
    const callbacks: NadViewerParametersOptions = {
      onSelectNodeCallback: this.nodeSelect.observed
          ? (equipmentId, nodeId, mousePosition) => emitIn(this.nodeSelect, { equipmentId, nodeId, mousePosition }) : null,
      onMoveNodeCallback: this.nodeMove.observed
          ? (equipmentId, nodeId, x, y, xOrig, yOrig) => emitIn(this.nodeMove, { equipmentId, nodeId, x, y, xOrig, yOrig }) : null,
      onToggleHoverCallback: this.hoverToggle.observed
          ? (hovered, mousePosition, equipmentId, equipmentType) => emitIn(this.hoverToggle, { hovered, mousePosition, equipmentId, equipmentType }) : null,
      onRightClickCallback: this.rightClick.observed
          ? (svgId, equipmentId, equipmentType, mousePosition) => emitIn(this.rightClick, { svgId, equipmentId, equipmentType, mousePosition }) : null,
      onBendLineCallback: this.bendLine.observed
          ? (svgId, equipmentId, equipmentType, linePoints, lineOperation) => emitIn(this.bendLine, { svgId, equipmentId, equipmentType, linePoints, lineOperation }) : null,
    };
    // svg.js pan/zoom/drag fire many DOM events: keep them out of change detection.
    this._viewer = this.zone.runOutsideAngular(() =>
        new NetworkAreaDiagramViewer(this.host.nativeElement, this.svgContent!, this.metadata, { ...this.options, ...callbacks }));
    this.applyStates();
    this.viewerReady.emit(this._viewer);
  }

  private applyStates(changes?: SimpleChanges): void {
    if (!this._viewer) return;
    if (this.branchStates && (!changes || changes['branchStates'])) this._viewer.setBranchStates(this.branchStates);
    if (this.voltageLevelStates && (!changes || changes['voltageLevelStates'])) this._viewer.setVoltageLevelStates(this.voltageLevelStates);
  }

  private clear(): void {
    this._viewer = undefined;
    this.host.nativeElement.replaceChildren();
  }
}
