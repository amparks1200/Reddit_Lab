import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface RedditPost {
  title: string;
  link: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class RedditApiService {
 posts: RedditPost[] = [];

  constructor(private http: HttpClient) {}

  getPosts() {
    const url = "https://www.reddit.com/r/aww/.json";
    this.http.get(url).subscribe(
      (response: any) => {
      const posts = response.data.children;

      for (let post of posts) {
        console.log(post);

        const redditPost : RedditPost = {
          title: post.data.title,
          link: "https://reddit.com" + post.data.permalink,
          image: post.data.thumbnail
        };

        this.posts.push(redditPost);
      }
      }, //this is what happens on success
      (error) => { //this is what happens if I get an error
        console.log(error);
      }  
    );
  }
}
