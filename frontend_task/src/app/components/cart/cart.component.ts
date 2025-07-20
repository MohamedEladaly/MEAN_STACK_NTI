import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartItems: any[] = [];
  total: number = 0;


constructor(private _cartservices:CartService){}
ngOnInit(): void {
  this.getCartItems();
}

getCartItems(): void {
  this._cartservices.getcart().subscribe({
    next: (res) => {
      this.cartItems = res.items || [];
      this.calculateTotal();
    },
    error: (err) => {
      console.error('Failed to load cart', err);
    }
  });
}

calculateTotal(): void {
  this.total = this.cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
}

removeItem(productId: string): void {
  this._cartservices.removeCard(productId).subscribe({
    next: () => {
      this.cartItems = this.cartItems.filter(item => item.product._id !== productId);
      this.calculateTotal();
    },
    error: (err) => {
      console.error('Failed to remove item', err);
    }
  });
}

clearCart(): void {
  this._cartservices.clearCard().subscribe({
    next: () => {
      this.cartItems = [];
      this.total = 0;
    },
    error: (err) => {
      console.error('Failed to clear cart', err);
    }
  });
}
}
