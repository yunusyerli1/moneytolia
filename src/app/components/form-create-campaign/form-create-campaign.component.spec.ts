import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreateCampaignComponent } from './form-create-campaign.component';

describe('FormCreateCampaignComponent', () => {
  let component: FormCreateCampaignComponent;
  let fixture: ComponentFixture<FormCreateCampaignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCreateCampaignComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCreateCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
