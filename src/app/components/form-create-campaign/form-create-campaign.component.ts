import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ICampaignModel } from '../../helpers/models/ICampaignModel';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-form-create-campaign',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './form-create-campaign.component.html',
  styleUrl: './form-create-campaign.component.scss'
})
export class FormCreateCampaignComponent implements OnInit{
  @Output() formSubmitted = new EventEmitter<ICampaignModel>();
  @Input() formData: ICampaignModel = {
    title: "",
    description: "",
    points: 0,
    date: new Date(),
    id: ""
  }

  campaignForm!: FormGroup;
  successMessage: boolean = false;
  campaignList: ICampaignModel[] = [];
  
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    this.campaignForm = this.formBuilder.group({
      title: [this.formData.title ?? '', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      description: [this.formData.description ?? '', [Validators.required, Validators.minLength(20), Validators.maxLength(1000)]],
      points: [this.formData.points ?? 0],
      date: [new Date().toISOString().split('T')[0]]
    });
  }

  public onSubmit() {
    if (this.campaignForm.valid) {
      const id = this.formData.id && this.formData.id.trim() !== '' ? this.formData.id : uuidv4();
      const newCampaign: ICampaignModel = {
        ...this.campaignForm.value,
        id: id, 
      };
      
      this.formSubmitted.emit(newCampaign);
      this.toastr.success('The campaign has been added successfully!', 'SUCCESS!');
      this.campaignForm.reset(); 
      this.campaignForm.patchValue({ points: 0, date: new Date().toISOString().split('T')[0] });
    }
  }

}
