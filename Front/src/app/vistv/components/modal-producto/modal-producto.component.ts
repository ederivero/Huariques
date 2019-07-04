import { Component, OnInit, Inject } from '@angular/core';
import { MenuComponent, DialogData } from '../menu/menu.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthServiceLocal } from 'src/app/services/auth.service';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-modal-producto',
  templateUrl: './modal-producto.component.html',
  styleUrls: ['./modal-producto.component.scss']
})
export class ModalProductoComponent implements OnInit {

  modProd = []
  prodId: any;

  producto = [];
  imagen = [];

  constructor(
    public dialogRef: MatDialogRef<MenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _authServ: AuthServiceLocal,
    private _sRest: RestService
  ) {
    // console.log(this._sRest.getIdProd());

    this.prodId = this._sRest.getIdProd();
    // console.log(this.prodId);


    this._sRest.getProductByProdId(this.prodId).subscribe((infoProd: any) => {
      // console.log(infoProd.content);
      infoProd.content.forEach(idForProd => {
        this.producto.push({
          prod_id: idForProd.prod_id,
          prod_desc: idForProd.prod_desc,
          prod_disp: idForProd.prod_disp,
          prod_nom: idForProd.prod_nom,
          prod_precio: idForProd.prod_precio,
          prod_img: idForProd.prod_img,
          rest_id: idForProd.rest_id
        })
      });
    })


  }

  ngOnInit() {
  }

  actualizarProd() {
    this.prodId;
    // console.log(this.prodId);

    // console.log("actualizado");

    this._sRest.updateProductByProdId(this.prodId, this.producto).subscribe((iProdUp) => {
      // console.log(this.prodId);
      // console.log(this.producto);


      // console.log(iProdUp);

    })


    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onFileChange(event) {
    this.imagen = event.target.files;
    // console.log(this.imagen);
  }


}
