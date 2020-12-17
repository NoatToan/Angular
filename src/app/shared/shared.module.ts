import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table'  ;
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTabsModule} from '@angular/material/tabs';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
 imports:      [  CommonModule, 
                  MatSliderModule,
                  MatTableModule,
                  MatPaginatorModule,
                  MatTabsModule,
                  MatListModule,
                  MatIconModule,
                  MatFormFieldModule,
                  MatInputModule, 
                ],
 declarations: [                   

                ],
 exports:      [                  
                  MatSliderModule,
                  MatTableModule,
                  MatPaginatorModule,
                  MatTabsModule,
                  MatListModule,
                  MatIconModule,
                  MatFormFieldModule,
                  MatInputModule, 
                  CommonModule,
                  FormsModule ]
})
export class SharedModule { }