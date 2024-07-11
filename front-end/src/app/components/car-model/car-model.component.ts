import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { DataService } from 'src/app/data.service';

export interface IGrid {
  brand: string;
  classname: string;
  modelname: string;
  modelcode: number;
  description: string;
  features: string;
  price: number;
  dom: string;
  active: boolean;
  sortorder: number;
}

@Component({
  selector: 'app-car-model',
  templateUrl: './car-model.component.html',
  styleUrls: ['./car-model.component.css'],
})
export class CarModelComponent implements OnInit {
  public editorContent: string = ``;

  public displayedColumns: string[] = [
    'brand',
    'classname',
    'modelname',
    'modelcode',
    'description',
    'features',
    'price',
    'dom',
    'active',
    'sortorder',
  ];

  public dataSource = [];

  public DEditor = ClassicEditor;

  public FEditor = ClassicEditor;

  public FEVal: string = '';

  public DEVal: string = '';

  public submitted = false;

  public isShowGrid: boolean = false;

  public isChecked: boolean = false;

  public form: FormGroup = new FormGroup({
    brand: new FormControl(''),
    classname: new FormControl(''),
    modelname: new FormControl(''),
    modelcode: new FormControl(''),
    description: new FormControl(''),
    features: new FormControl(''),
    price: new FormControl(''),
    dom: new FormControl(''),
    active: new FormControl(false),
    sortorder: new FormControl(''),
  });

  public constructor(
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private service: DataService
  ) {}

  public ngOnInit(): void {
    this.getRecord();
    this.editorContent;
    this.form = this.formBuilder.group({
      brand: ['Audi', Validators.required],
      classname: ['A-Class', Validators.required],
      modelname: ['', Validators.required],
      modelcode: ['1', Validators.required],
      description: ['', Validators.required],
      features: [''],
      price: ['', Validators.required],
      dom: ['', Validators.required],
      active: [''],
      sortorder: ['1'],
    });
  }

  public get f(): { [key: string]: AbstractControl | any } {
    return this.form.controls;
  }

  public getRecord() {
    this.service.getCars().subscribe((item: any) => {
      this.dataSource = item;
      this.cdr.detectChanges();
    });
  }

  public onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.isShowGrid = true;
    let AddRecord: IGrid[] = [
      {
        brand: this.form.value.brand,
        classname: this.form.value.classname,
        modelname: this.form.value.modelname,
        modelcode: this.form.value.modelcode,
        description: this.DEVal,
        features: this.FEVal,
        price: this.form.value.price,
        dom: this.form.value.dom,
        active: this.isChecked,
        sortorder: this.form.value.sortorder,
      },
    ];
    this.addRecord(AddRecord[0]);
    console.log(AddRecord[0]);
  }

  public addRecord(obj: IGrid) {
    this.service.addCars(obj).subscribe((res: any) => {
      this.getRecord();
      console.log(res);
      this.cdr.detectChanges();
    });
  }

  public onChange({ editor }: ChangeEvent, type: string) {
    if (type == 'DEditor') {
      this.DEVal = editor.getData();
    } else if (type == 'FEditor') {
      this.FEVal = editor.getData();
    }

    if (this.DEVal != '') {
      this.clearValidators('description');
    } else if (this.FEVal != '') {
      this.clearValidators('features');
    }
  }

  public clearValidators(_validatorType: string) {
    this.form.controls[_validatorType].clearValidators();
    this.form.controls[_validatorType].updateValueAndValidity();
  }

  public AddNewRecord() {
    this.isShowGrid = false;
    this.form.reset();
  }
}
