import {Component} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";

@Component({
    selector: 'ot-button',
    standalone: true,
    imports: [MatButtonModule, MatIconModule, MatDividerModule],
    templateUrl: `template.html`,
    styleUrls: [`style.scss`]
})
export default class ButtonOverviewComponent {}
