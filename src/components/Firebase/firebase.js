import firebaseConfig from "./config";
import axios from 'axios';

class Firebase {
  constructor(app) {
    if(!firebaseInstance) {
      app.initializeApp(firebaseConfig);

      this.auth = app.auth();
      this.db = app.firestore();
      this.functions = app.functions();
      this.storage = app.storage();
    }
  }

  subscribeToBookComments({bookId, onSnapshot}) {
    const bookRef = this.db.collection('books').doc(bookId)
    return this.db
      .collection('comments')
      .where('book', '==', bookRef)
      .orderBy('dateCreated', 'desc')
      .onSnapshot(onSnapshot)
  }

  getUser({userId, onSnapshot}) {
    return this.db
      .collection('users')
      .where('userId', '==', userId)
      .limit(1)
      .onSnapshot(onSnapshot)
  }

  async postComment({text, bookId}) {
    const postCommentCallable = this.functions.httpsCallable('postComment')
    return postCommentCallable({
      text,
      bookId
    })
  }

  async register({email, password, username}) {
    await this.auth.createUserWithEmailAndPassword(email, password)
    const createUserCallable = this.functions.httpsCallable('createUser');
    return createUserCallable({
      username
    })
  }

  async login({email, password}) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  async logout() {
    await this.auth.signOut();
  }

  async createAuthor({authorName}) {
    const createAuthorCallable = this.functions.httpsCallable('createAuthor');
    return createAuthorCallable({
      authorName
    })
  }

  async createBook({name, author, bookCover, summary}) {
    const createBookCallable = this.functions.httpsCallable('createBook');
    return createBookCallable({
      name,
      author,
      bookCover,
      summary
    })
  }

  async getAuthors() {
    return this.db.collection('authors').get();
  }
}

let firebaseInstance;

function getFirebaseInstance(app) {
  if(!firebaseInstance && app){
    firebaseInstance = new Firebase(app);
    return firebaseInstance;
  }else if(firebaseInstance){
    return firebaseInstance
  }else{
    return null;
  }
}

export default getFirebaseInstance;
