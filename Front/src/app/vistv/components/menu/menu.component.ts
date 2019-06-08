import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogModule } from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModalProductoComponent } from '../modal-producto/modal-producto.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import { SnackbarProductComponent } from '../snackbar-product/snackbar-product.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';



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
    prod_nombre : this.nombre,
    prod_precio: this.precio,
    prod_categoria: this.cat,
    prod_desc: this.des,
    prod_img: this.im
  }

  listaProductos = {
    productos : this.producto
  }

  listProductos = [];

  durationInSeconds = 1;

  animal: string;
  name: string;

  Tabla;

  displayedColumns: string[] = [ 'Nombre', 'Precio', 'Categoria', 'Descripción', 'Imagen'];
  dataSource= new MatTableDataSource(this.listProductos);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  

  constructor( public dialog: MatDialog, private _snackBar: MatSnackBar) {
    
    if(localStorage.getItem('productos')){
      this.listProductos = JSON.parse(localStorage.getItem('productos'));
      console.log(this.listProductos)
    }
  }

  ngOnInit() {
    // para la tabla
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log(this.listProductos);
    
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  crearProducto(e){
    console.log(e);
    
    let objProducto = this.producto;
    this.listProductos.push(objProducto);
    localStorage.setItem("productos",JSON.stringify(this.listProductos));
    
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
