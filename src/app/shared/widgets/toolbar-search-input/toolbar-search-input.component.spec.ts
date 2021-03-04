import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarSearchInputComponent } from './toolbar-search-input.component';

describe('ToolbarSearchInputComponent', () => {
  let component: ToolbarSearchInputComponent;
  let fixture: ComponentFixture<ToolbarSearchInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolbarSearchInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarSearchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
