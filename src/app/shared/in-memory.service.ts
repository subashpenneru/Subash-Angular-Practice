import {InMemoryDbService} from 'angular-in-memory-web-api';

export class InMemoryService implements InMemoryDbService {
  createDb() {
    const posts = [
      { id: 1, post: 'Hello', author: 'Subash' },
      { id: 2, post: 'World', author: 'Subash' },
    ];
    return { posts };
  }
}
