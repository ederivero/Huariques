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

  displayedColumns: string[] = ['Id','Nombre', 'Precio',  'Descripción', 'Imagen', 'Disponibilidad'];
  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  restInfo = [];


  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar, ruta: ActivatedRoute) {

    // if(localStorage.getItem('productos')){
    //   this.listProductos = JSON.parse(localStorage.getItem('productos'));
    //   console.log(this.listProductos)
    // }
    var usuId = +ruta.snapshot.params.usuId
    var restId = +ruta.snapshot.params.restId

    // fetch(`https://huariquesback.herokuapp.com/api/restaurante/getByUsuId/${usuId}`)
    //   .then(response => {
    //     // console.log("SFsfsgsgs");
    //     return response.json()
    //   }).then(datarest => {
    //     console.log(datarest.content);

    //     // console.log(usuId);
    //     console.log(restId);
        

    //     datarest.content.forEach(idRest => {
    //       if (idRest === restId) {           

    //         this.restInfo.push({
    //           rId: idRest.rest_id,
    //           rSocial: idRest.rest_rSocial,
    //           rDir: idRest.rest_direccion,
    //           img:idRest.rest_img
  
    //         })
    //         console.log(this.restInfo);            
    //       }else{
    //         console.log("N E L S O N");
            
    //       }
    //     });

    //   })

    fetch(`https://huariquesback.herokuapp.com/api/producto/porIdRest/${restId}`)
      .then(response => {
        console.log("productos");
        return response.json()
      }).then(dataprod => {

        console.log(dataprod.content);

        dataprod.content.forEach(idForProd => {
          // console.log(idForRest);

          console.log(this.id_prod = idForProd.prod_id);
          this.p_desc = idForProd.prod_desc;
          this.p_disp = idForProd.prod_disp;
          this.p_nomb = idForProd.prod_nom;
          this.p_prec = idForProd.prod_precio;
          this.p_imagen = idForProd.prod_img;

          if (!this.p_imagen) {
            this.p_imagen = "https://firebasestorage.googleapis.com/v0/b/api-project-161182547768.appspot.com/o/restaurantes%2Ffotito.png?alt=media&token=9b1da490-016c-4c08-b7f2-69e07f8137e9"
          }

          this.load = true;

          this.p_cadauno.push({
            pId: idForProd.prod_id,
            pDesc: idForProd.prod_desc,
            pDisp: idForProd.prod_disp,
            pNom: idForProd.prod_nom,
            pPre: idForProd.prod_precio,
            img: idForProd.prod_img

          })

        })

        console.log(this.p_cadauno);
        


      })

      this.dataSource = new MatTableDataSource(this.p_cadauno);

  }






  ngOnInit() {
    // para la tabla

    // console.log(this.listProductos);

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



  crearProducto(e) {
    console.log(e);

    let objProducto = this.producto;
    this.listProductos.push(objProducto);
    localStorage.setItem("productos", JSON.stringify(this.listProductos));

    console.log(this.listProductos);



    // this._snackBar.open(prod_nombre, "Ha sido Agregado", {
    //   duration: 2000,
    // });

  };

  openSnackBar() {
    this._snackBar.openFromComponent(SnackbarProductComponent, {
      duration: this.durationInSeconds * 1000,
    });
  };

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalProductoComponent, {
      width: '300px',
      // data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }


}
