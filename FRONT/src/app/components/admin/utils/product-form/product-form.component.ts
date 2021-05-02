import { ProductService } from './../../../../services/product.service';
import { Product } from './../../../../models/product';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  @Output() product: EventEmitter<Product>;
  @Output() close: EventEmitter<boolean>;
  @Input() productRecived: Product;

  myForm: FormGroup;

  name:  FormControl;
  description:  FormControl;
  price:  FormControl;
  img:  FormControl;
  brand:  FormControl;
  active:  FormControl;
  category_id:  FormControl;
  provider_id: FormControl;
  stock: FormControl;


  categories: any[] = [];
  providers: any[] = [];


  constructor( private _productService: ProductService) { 
    this.product = new EventEmitter();
    this.close = new EventEmitter();
  }

  ngOnInit(): void {
    this.createForm();
    this.loadInfo();
  }

  createForm(): void {
  
    this.myForm = new FormGroup({
      name:             new FormControl('', Validators.required), 
      description:      new FormControl('', Validators.required),
      price:            new FormControl('', Validators.required),
      img:              new FormControl('', Validators.required),
      brand:            new FormControl('', Validators.required),
      active:           new FormControl('', Validators.required),
      category_id:      new FormControl(1, Validators.required),
      provider_id:      new FormControl(1, Validators.required),
      stock:            new FormControl('', Validators.required)
    });
    

    this.setFormControlsVariables();
      
  }

  setFormControlsVariables(): void {

    this.name           = this.myForm.controls.name         as FormControl;
    this.description    = this.myForm.controls.description  as FormControl;
    this.price          = this.myForm.controls.price        as FormControl;
    this.img            = this.myForm.controls.img          as FormControl;    
    this.brand          = this.myForm.controls.brand        as FormControl;
    this.active         = this.myForm.controls.active       as FormControl;
    this.category_id    = this.myForm.controls.postcode     as FormControl;
    this.provider_id    = this.myForm.controls.provider_id  as FormControl;
    this.stock          = this.myForm.controls.stock        as FormControl;

    if(this.productRecived){

      this.myForm.setValue({
        name: this.productRecived.name,
        description: this.productRecived.description,
        price: this.productRecived.price,
        img: this.productRecived.img,
        brand: this.productRecived.brand,
        category_id: this.productRecived.category_id,
        provider_id: this.productRecived.provider_id,
        stock: this.productRecived.stock,
        active: this.productRecived.active
      });
    }
  }

  loadInfo(){

    this._productService.getCategories()
      .subscribe( (res: any) => {
        this.categories = res.data;
      }, err => {
        console.log(err);
      });

      this._productService.getProviders()
      .subscribe( (res: any) => {
        this.providers = res.data;
      }, err => {
        console.log(err);
      });
  }

  onSubmit(){

    if( !this.myForm.valid ) this.myForm.markAllAsTouched();
    
    else {
      let product: Product = this.myForm.value;
      
      //necesitamos castear por validacion.
      product.price = +product.price;
      product.category_id = +product.category_id;
      product.provider_id = +product.provider_id;
      
      if( this.productRecived ) {
        product.id = this.productRecived.id;
      } 
      

      this.product.emit( product );
    }
  }

}
