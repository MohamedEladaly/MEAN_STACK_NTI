import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{
  products: any[] = [];
constructor(private _productS:ProductService){}
ngOnInit(){
  this._productS.getProduct().subscribe( {next: (res) => {
    this.products = res;  
  },
  error: (err) => {
    console.error('Error fetching products:', err); 
  }
});
}
}
