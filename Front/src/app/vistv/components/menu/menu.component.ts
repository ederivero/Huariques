import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogModule } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalProductoComponent } from '../modal-producto/modal-producto.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarProductComponent } from '../snackbar-product/snackbar-product.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AuthServiceLocal } from 'src/app/services/auth.service';
import { RestService } from 'src/app/services/rest.service';
import { Subscription } from 'rxjs';



export interface DialogData {
  animal: string;
  name: string;
}



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  nombre;
  precio;
  cat;
  des;
  im;

  producto = {
    prod_nombre: this.nombre,
    prod_precio: this.precio,
    prod_categoria: this.cat,
    prod_desc: this.des,
    prod_img: this.im
  }

  listaProductos = {
    productos: this.producto
  }

  listProductos = [];

  id_prod: any;
  p_desc: any;
  p_disp: any;
  p_nomb: any;
  p_prec: any;
  p_imagen: any;
  load: boolean;
  p_cadauno = [];
  dataSource;

  durationInSeconds = 1;

  animal: string;
  name: string;

  Tabla;

  displayedColumns: string[] = ['Id', 'Nombre', 'Precio', 'Descripción', 'Imagen', 'Disponibilidad','Editar'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  restInfo = [];
  user: any;
  usuId: any;
  suscriptor: Subscription;
  prod: any;
  restId: any;
  srcResult: any;
  nprod: void;


  constructor(public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private ruta: ActivatedRoute,
    private _authServ: AuthServiceLocal,
    private _sRest: RestService
    ) {

    if (localStorage.getItem('idR')) {
      this.restId = JSON.parse(localStorage.getItem('idR'));
      // console.log(this.restId);

      this._sRest.getProductosByRestId(this.restId).subscribe((dataprod: any) => {
        // console.log(dataprod.content);

        dataprod.content.forEach(idForProd => {

          this.load = true;

          this.p_cadauno.push({
            prod_id: idForProd.prod_id,
            prod_desc: idForProd.prod_desc,
            prod_disp: idForProd.prod_disp,
            prod_nom: idForProd.prod_nom,
            prod_precio: idForProd.prod_precio,
            prod_img: idForProd.prod_img,
            rest_id: idForProd.rest_id
          })
        });
        // console.log(this.p_cadauno);

      })


    } else {

      this.restId = this._sRest.getIdRest();
      // console.log(this.restId);

      this._authServ.getUserLogged(this._authServ.getUserDetails().usu_id).subscribe((res: any) => {
        this.user = res.content;
        // console.log(this.user);
        this.user.forEach((e) => {
          this.usuId = e.usu_id
        })
        // console.log(this.usuId);

        this.suscriptor = this._sRest.getRestByUsuId(this.usuId).subscribe((datarest: any) => {
          // console.log(datarest.content);

          this.restId = this._sRest.getIdRest();

          // console.log(this.restId);

          this._sRest.getProductosByRestId(this.restId).subscribe((dataprod: any) => {
            // console.log(dataprod.content);

            dataprod.content.forEach(idForProd => {

              this.load = true;

              this.p_cadauno.push({
                prod_id: idForProd.prod_id,
                prod_desc: idForProd.prod_desc,
                prod_disp: idForProd.prod_disp,
                prod_nom: idForProd.prod_nom,
                prod_precio: idForProd.prod_precio,
                prod_img: idForProd.prod_img,
                rest_id: idForProd.rest_id

              })
            });
            // console.log(this.p_cadauno);

          })

        })


      })


    }

    //       if (!this.p_imagen) {
    //         this.p_imagen = "https://firebasestorage.googleapis.com/v0/b/api-project-161182547768.appspot.com/o/restaurantes%2Ffotito.png?alt=media&token=9b1da490-016c-4c08-b7f2-69e07f8137e9"
    //       }

    //     

    this.dataSource = new MatTableDataSource(this.p_cadauno);

  }






  ngOnInit() {

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');

    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
        // console.log(this.srcResult);

      };

      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }

  editProd(prod_id){
    // console.log(prod_id);
    this.nprod = this._sRest.setIdProd(prod_id);
    this.openDialog();
    // console.log(this.nprod);
    return this.nprod
  }

  crearProducto(e, prod_nombre) {
    // console.log(e);

    let objProducto = this.producto;
    this.listProductos.push(objProducto);
    localStorage.setItem("productos", JSON.stringify(this.listProductos));

    // console.log(this.listProductos);



    if (prod_nombre == "") {
      this._snackBar.open(prod_nombre, "Ha sido Agregado", {
        duration: 2000,
      });
    } else {
      this._snackBar.open("No hay producto", "", {
        duration: 2000,
      }); 
    }


  };

  openSnackBar() {
    this._snackBar.openFromComponent(SnackbarProductComponent, {
      duration: this.durationInSeconds * 1000,
    });
  };

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalProductoComponent, {
      width: '580px',
      // data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      this.animal = result;
    });
  }
}
