import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AssetPipe, ErrorPipe, HighlightPipe, PhonePipe } from '.';

@NgModule({
  declarations: [
    AssetPipe,
    ErrorPipe,
    HighlightPipe,
    PhonePipe,
  ],
  exports: [
    AssetPipe,
    ErrorPipe,
    HighlightPipe,
    PhonePipe,
  ],
  imports: [
    CommonModule,
  ],
  providers: []
})
export class SharedPipesModule {}
