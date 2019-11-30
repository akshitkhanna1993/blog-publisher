import { Component, OnInit } from '@angular/core';
import {Post} from '../app/posts/post.model';
import { AuthService } from './auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  title = 'myblog';

constructor(private authService : AuthService){}

  ngOnInit(){
this.authService.autoAuthUser();
  }

}
