import { Component } from '@angular/core';
import { iPost } from '../../Modules/i-post';
import { DbPostService } from '../../services/db-post.service';

@Component({
  selector: 'app-inactive-posts',
  templateUrl: './inactive-posts.component.html',
  styleUrl: './inactive-posts.component.scss',
})
export class InactivePostsComponent {
  constructor(private postSvc: DbPostService) {}
  inactivePost!: iPost[];
  shuffleArray(array: iPost[]): iPost[] {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  ngOnInit() {
    const postsArrShuffled = this.shuffleArray(this.postSvc.posts);
    this.inactivePost = postsArrShuffled.filter((p) => !p.active);
    console.log(this.inactivePost);
  }
}
