import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  idRest:any
  prodId:any
  constructor(private _http: HttpClient, private _router:Router) { }
  
  getRest(){
    return this._http.get('https://huariquesback.herokuapp.com/api/restaurante/traertodos');
  }
  buscarpopalabra(palabra){
    return this._http.get(`https://huariquesback.herokuapp.com/api/restaurante/encontrar/${palabra}`);
  }

  getRestByUsuId(usuId){
    console.log(usuId);    
    return this._http.get(`https://huariquesback.herokuapp.com/api/restaurante/getByUsuId/${usuId}`)
  }

  getProductosByRestId(restId){
    console.log(restId);
    return this._http.get(`https://huariquesback.herokuapp.com/api/producto/porIdRest/${restId}`)    
  }

  getProductByProdId(prodId){
    return this._http.get(`https://huariquesback.herokuapp.com/api/producto/porId/${prodId}`)
  }

  updateProductByProdId(prodId,objProd){
    console.log(objProd);
    console.log(prodId);
    
    var jsonProd = JSON.stringify(objProd);
    console.log(jsonProd);
    


    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log(headers);
    
    return this._http.put(`https://huariquesback.herokuapp.com/api/producto/actualizar/${prodId}`, jsonProd ,{headers:headers} )
    
  }

  getInfoRest(restId){
    return this._http.get(`https://huariquesback.herokuapp.com/api/restaurante/getById/${restId}`)
  }

  adminRest(idRest){
    console.log(idRest);
    return idRest    
  }


  setRest(idRest){
    this.idRest=idRest
    localStorage.setItem("idR", JSON.stringify(this.idRest));

  }
  getIdRest(){
    return this.idRest
  }


  setIdProd(prodId){
    this.prodId=prodId

  }
  getIdProd(){
    return this.prodId
  }

}
