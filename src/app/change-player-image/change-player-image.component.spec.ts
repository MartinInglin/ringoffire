import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePlayerImageComponent } from './change-player-image.component';

describe('ChangePlayerImageComponent', () => {
  let component: ChangePlayerImageComponent;
  let fixture: ComponentFixture<ChangePlayerImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangePlayerImageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChangePlayerImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
