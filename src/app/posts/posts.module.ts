import { NgModule } from '@angular/core';
import { PostListComponent } from './posts-list/post-list.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { MatPaginatorModule, MatProgressSpinnerModule, MatExpansionModule, MatToolbarModule, MatButtonModule, MatCardModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations:[
    PostCreateComponent,
    PostListComponent
  ],
  imports:[
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    AppRoutingModule
  ]
})
export class PostsModule {

}
