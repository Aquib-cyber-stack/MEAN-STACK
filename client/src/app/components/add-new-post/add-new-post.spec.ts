import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewPost } from './add-new-post';

describe('AddNewPost', () => {
  let component: AddNewPost;
  let fixture: ComponentFixture<AddNewPost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddNewPost]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewPost);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
