import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  loading: boolean = true;
  nodata: boolean = false;
  title = 'assignment-project';
  userids: any[] = [];
  data: any[] = [];
  collectionFromFireStore: any;
  public newUserData: any;
  public addFormVisible: boolean = false;
  public editFormVisible: boolean = false;
  addUserForm!: FormGroup;
  public rolesAdded = [] as any;

  constructor(
    private fs: AngularFirestore,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.getDataFromFireStore();
    this.formBuilderFunction();
  }

  getDataFromFireStore() {
    this.loading = true;
    this.data = [];
    this.userids = [];
    this.fs.collection('users').get()
      .subscribe((snapshot: any) => {
        if (snapshot.empty === true) {
          this.nodata = true;
          this.loading = false;
        }
        else {
          snapshot.forEach((doc: any) => {
            var obj = doc.data();
            Object.assign(obj, { userid: doc.id });
            this.data.push(obj);
            this.userids.push(doc.id);
            this.loading = false;
            this.nodata = false;
          }
          );
        }
      })
  }

  formBuilderFunction() {
    console.log('form builder function is called');
    this.addUserForm = this.formBuilder.group({
      name: ['', Validators.required],
      mail: ['', Validators.required, Validators.email],
      roles: ['', Validators.required],
      disabled: [null, Validators.required]
    });
  }

  addNewUserFunction(submittedData: any) {
    console.log('add new user function is called');
    var isDisabled;
    this.newUserData = submittedData.value;
    this.newUserData.roles = this.rolesAdded;
    if (this.newUserData.disabled === 'true') {
      isDisabled = true;
    }
    else isDisabled = false;
    this.addUserForm.reset();
    this.rolesAdded = [];
    var userid = 'user' + (this.userids.length + 1);
    this.fs.collection('users').doc(userid).set({
      name: this.newUserData.name,
      mail: this.newUserData.mail,
      roles: this.newUserData.roles,
      disabled: isDisabled
    });
    this.getDataFromFireStore();
  }

  addRole(e: any) {
    console.log('add role function called');
    var add = e.value;
    this.rolesAdded.push(add);
    this.addUserForm.get('roles')?.setValue('');
  }

  removeRole(i: number) {
    this.rolesAdded.splice(i, 1);
  }

  updateDisabledValue(id: any, val: boolean) {
    this.loading = true;
    this.fs.collection('users').doc(id).update({ disabled: !val }).then(a => {
      this.getDataFromFireStore();
    })
  }

  deleteUser(id: any){
    this.fs.collection('users').doc(id).delete();
    this.getDataFromFireStore();
  }
}
