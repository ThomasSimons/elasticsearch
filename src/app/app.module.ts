import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ElasticSearchComponent } from './elastic-search/elastic-search.component'
import { AppComponent } from './app.component';
import { JobService } from './job.service';

@NgModule({
  declarations: [
    AppComponent,
    ElasticSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [JobService],
  bootstrap: [AppComponent]
})
export class AppModule { }
