import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostToolComponent } from './post-tool.component';

describe('PostToolComponent', () => {
  let component: PostToolComponent;
  let fixture: ComponentFixture<PostToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
