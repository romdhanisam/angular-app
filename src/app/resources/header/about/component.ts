import {Component} from '@angular/core';
import packageInfo from '../../../../../package.json';
import {CommonModule} from "@angular/common";

@Component({
    selector: 'ot-about',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './template.html'
})
export class AboutComponent  {
    public version: string = packageInfo.version;
    public ngVersion: string = packageInfo.dependencies['@angular/core'];
}
