import { Observable } from 'rxjs/Observable';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

task: AngularFireUploadTask;

percentage: Observable<number>;

snapshot: Observable<any>;

downloadURL: Observable<string>;

url: string;
show: boolean = false;

fileUploadUrl: string[] = [];

  constructor(private storage: AngularFireStorage) { }

  ngOnInit() {
  }


  startUpload(event: FileList) {
    const file = event.item(0);

    if (file.type.split('/')[0] !== 'image') { 
      console.error('unsupported file type :( ')
      return;
    }

    const path = `posts/${new Date().getTime()}_${file.name}`;

    // Totally optional metadata
    const customMetadata = { app: 'My AngularFire-powered PWA!' };

    // The main task
    this.task = this.storage.upload(path, file, { customMetadata })

    
    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(
      tap(snap => {
        if (snap.bytesTransferred === snap.totalBytes) {
          snap.ref.getDownloadURL().then(downloadURL => {
           this.url = downloadURL;
           this.fileUploadUrl.push(downloadURL);
           this.show = true;
          });
          //this.db.collection('photos').add( { path, size: snap.totalBytes })
        }
      })
    );
  
  }

    // Determines if the upload task is active
    isActive(snapshot) {
      return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
    }

}
