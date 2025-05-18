import { Injectable } from '@angular/core';
import { Comment } from '../models/comment';
import {
  BehaviorSubject,
  combineLatest,
  from,
  map,
  Observable,
  of,
  switchMap,
} from 'rxjs';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  Firestore,
  getDocs,
  updateDoc,
} from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private commentCollection$ = new BehaviorSubject<Comment[]>([]);

  constructor(private firestore: Firestore) {
    this.loadCommentCollection();
  }

  loadCommentCollection(): void {
    from(this.fetchCommentCollection()).subscribe((comments) => {
      this.commentCollection$.next(comments);
    });
  }

  private async fetchCommentCollection(): Promise<Comment[]> {
    try {
      const commentColRef = collection(this.firestore, 'Torrents');
      const commentsSnapshot = await getDocs(commentColRef);

      return commentsSnapshot.docs.map((docSnap) => {
        if (!docSnap.exists()) {
          return [];
        }
        return { ...docSnap.data() };
      }) as Comment[];
    } catch (error) {
      console.error('Error fetching comments:', error);
      return [];
    }
  }

  getTorrentCommentsWithUser(torrentId: string): Observable<any[]> {
    return collectionData(collection(this.firestore, 'Comments'), {
      idField: 'id',
    }).pipe(
      map((comments: any[]) =>
        comments.filter((c) => c.torrentId === torrentId)
      ),
      switchMap((comments: any[]) => {
        if (comments.length === 0) return of([]);
        const commentsWithUser$ = comments.map((comment) =>
          docData(doc(this.firestore, 'Users', comment.userId)).pipe(
            map((user) => ({
              ...comment,
              user,
            }))
          )
        );
        return combineLatest(commentsWithUser$);
      })
    );
  }
  getTorrentComments(torrentId: string): Observable<Comment[]> {
    return this.commentCollection$.pipe(
      map((comments) => comments.filter((c) => c.torrentId == torrentId))
    );
  }

  getCommentById(commentId: string): Observable<Comment[] | undefined> {
    return this.commentCollection$.pipe(
      map((comments) => comments.filter((c) => c.id == commentId))
    );
  }

  async createComment(newComment: Comment): Promise<void> {
    const commentColRef = collection(this.firestore, 'Comments');
    await addDoc(commentColRef, newComment);
    this.loadCommentCollection();
  }

  async deleteCommentById(commentId: string): Promise<void> {
    const commentColRef = doc(this.firestore, 'Comments', commentId);
    await deleteDoc(commentColRef);
    this.loadCommentCollection();
  }

  async updateCommentById(
    commentId: string,
    updatedData: Partial<Comment>
  ): Promise<void> {
    const commentDocRef = doc(this.firestore, 'Comments', commentId);
    await updateDoc(commentDocRef, updatedData);
    this.loadCommentCollection();
  }
}
