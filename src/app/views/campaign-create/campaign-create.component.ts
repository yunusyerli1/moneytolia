import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ICampaignModel } from '../../helpers/models/ICampaignModel';
import { CampaignService } from '../../services/campaign.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-campaign-create',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './campaign-create.component.html',
  styleUrl: './campaign-create.component.scss'
})
export class CampaignCreateComponent {
  campaignForm: FormGroup;
  successMessage: boolean = false;
  campaignList: ICampaignModel[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private campaignService: CampaignService
  ) {
    this.campaignForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(1000)]],
      points: [0],
      date: [new Date().toISOString().split('T')[0]]
    });
  }

  onSubmit() {
    if (this.campaignForm.valid) {
      const newCampaign: ICampaignModel = {
        ...this.campaignForm.value,
        id: uuidv4(), 
      };
      
      this.campaignService.saveCampaign(newCampaign);
      this.toastr.success('The campaign has been added successfully!', 'SUCCESS!');
      this.campaignForm.reset(); 
      this.campaignForm.patchValue({ points: 0, date: new Date().toISOString().split('T')[0] });
    }
  }
}
