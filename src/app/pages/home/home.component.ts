import { Component } from '@angular/core';
import { iPost } from '../../Modules/i-post';

import { DbPostService } from '../../services/db-post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private postSvc: DbPostService) {}
  featuredPost!: iPost;
  relatedPosts: iPost[] = [];
  filteredPosts: iPost[] = [];
  changePost: iPost = {
    id: 0,
    title: '',
    body: '',
    userId: 0,
    tags: [],
    active: false,
  };
  activeTag: string | null = null;

  formOpenId!: number | null;

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

  tagsArr: string[] = [];

  getAllTags(postsArr: iPost[]) {
    postsArr.forEach((postObj) => {
      postObj.tags.forEach((tag) => {
        if (!this.tagsArr.find((t) => t === tag)) {
          this.tagsArr.push(tag);
        }
      });
    });
  }
  filtraPost(tag: string) {
    if (this.activeTag === tag) {
      this.activeTag = null;
      this.filteredPosts = this.postSvc.posts;
    } else {
      this.activeTag = tag;
      this.filteredPosts = this.postSvc.filterPost(tag);
    }
  }
  ngOnInit() {
    const postsArrShuffled = this.shuffleArray(this.postSvc.posts);
    this.filteredPosts = this.postSvc.posts;
    this.featuredPost = postsArrShuffled[0];
    this.relatedPosts = postsArrShuffled.slice(1, 5);
    this.getAllTags(this.postSvc.posts);
  }
  handleData(event: number) {
    const postToChange = this.postSvc.posts.find((p) => p.id === event);
    if (this.formOpenId === event) {
      // Se il form è già aperto, si chiude
      this.formOpenId = null;
    } else {
      // Altrimenti si apre il form per questo post
      this.formOpenId = event;
      const postToChange = this.postSvc.posts.find((p) => p.id === event);
      if (postToChange) {
        this.changePost = postToChange;
        const index = this.postSvc.posts.findIndex((p) => p.id === event); // Trova l'indice dell'oggetto

        if (index !== -1) {
          this.postSvc.posts[index].title = this.changePost.title; // Aggiorna la proprietà desiderata
          this.postSvc.posts[index].body = this.changePost.body; // Aggiorna altre proprietà
        }
      }
    }
  }
}
