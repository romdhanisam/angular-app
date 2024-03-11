import {Component} from '@angular/core';
import packageInfo from '../../../../package.json';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";

@Component({
    selector: 'about',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatButtonModule, MatTableModule, NgOptimizedImage],
    templateUrl: 'template.html'
})
export default class AboutProjectComponent  {
    public version: string = packageInfo.version;
    displayedColumns: string[] = ['name', 'version'];
    dataSource = [
        {name: "@angular/", version: "v"+packageInfo.dependencies['@angular/core']},
        {name: "@ngrx/store", version: "v"+packageInfo.dependencies['@ngrx/store']},
        {name: "bootstrap", version: "v"+packageInfo.dependencies['bootstrap']},

    ];
}
