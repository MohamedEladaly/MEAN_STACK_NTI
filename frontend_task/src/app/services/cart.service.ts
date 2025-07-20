import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _http:HttpClient) { }
  getcart(): Observable<any>{
   return this._http.get("http://localhost:3000/cart")
  }
  addToCard(data:any):Observable<any>{
    return this._http.post("http://localhost:3000/cart/add",data)
  }
  updateCard(data:any):Observable<any>{
    return this._http.put("http://localhost:3000/cart/item/:productId",data)
  }
  removeCard(data:any):Observable<any>{
    return this._http.delete("http://localhost:3000/cart/item/:productId",data)
  }
  clearCard():Observable<any>{
    return  this._http.delete("http://localhost:3000/cart/clear")
  }
  
}
