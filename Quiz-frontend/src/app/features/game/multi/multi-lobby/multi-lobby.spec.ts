import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiLobby } from './multi-lobby';

describe('MultiLobby', () => {
  let component: MultiLobby;
  let fixture: ComponentFixture<MultiLobby>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiLobby],
    }).compileComponents();

    fixture = TestBed.createComponent(MultiLobby);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
