import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhiteListManagerComponent } from './white-list-manager.component';

describe('WhiteListManagerComponent', () => {
  let component: WhiteListManagerComponent;
  let fixture: ComponentFixture<WhiteListManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhiteListManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhiteListManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
