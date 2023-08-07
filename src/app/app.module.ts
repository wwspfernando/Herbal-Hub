import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './blocks/root/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { BlocksModule } from './blocks/blocks.module';
import { CoreModule } from '@core/core.module';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    MatSnackBarModule,
    BlocksModule,
    CoreModule,
    MatCarouselModule.forRoot()
  ],
  
  bootstrap: [AppComponent],
  
  declarations: [ContactUsComponent]
})
export class AppModule { }
