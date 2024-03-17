import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule, MatIconModule],
  exports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule, MatIconModule],
})
export class MaterialModule {}
