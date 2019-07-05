import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
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
  i=0;
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

  displayedColumns: string[] = ['Id', 'Nombre', 'Precio', 'Descripción', 'Imagen', 'Disponibilidad', 'Editar'];

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



  // INICIO NUEVO

  click: boolean = false;
  usu_passConfirm: '';
  imagen: any[];

  objProduct = {
    prod_nom: '',
    prod_desc: '',
    prod_precio: '',
    prod_disp: '1',
    rest_id: ''
  }

  telefonoFormControl = new FormControl('', [

  ]);
  nombreFormControl = new FormControl('', [
    Validators.required,
  ]);
  apellidoFormControl = new FormControl('', [
    Validators.required,
  ]);
  emailFormControl = new FormControl('', [
    Validators.required,
  ]);
  // passwordFormControl = new FormControl('', [
  //   Validators.required
  // ]);
  // confirmpasswordFormControl = new FormControl('', [
  //   Validators.required
  // ]);


  localLogin: Subscription;



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
          this.i = this.i + 1,

          this.p_cadauno.push({
            id:this.i,
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
              this.i=this.i+1

              this.p_cadauno.push({
                id:this.i,
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

  // onFileSelected() {
  //   const inputNode: any = document.querySelector('#file');

  //   if (typeof (FileReader) !== 'undefined') {
  //     const reader = new FileReader();

  //     reader.onload = (e: any) => {
  //       this.srcResult = e.target.result;
  //       // console.log(this.srcResult);

  //     };

  //     reader.readAsArrayBuffer(inputNode.files[0]);
  //   }
  // }
  onFileChange(event) {
    this.imagen = event.target.files;
    // console.log(this.imagen);
  }


  editProd(prod_id) {
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

  enviarRegistro() {


    if ((this.objProduct.prod_nom != '' && this.objProduct.prod_desc != '') &&
      (this.objProduct.prod_precio != '') && this.click == false) {
      var formData = new FormData();
      if (this.imagen == undefined) {
        formData.append('usu_img', "https://firebasestorage.googleapis.com/v0/b/api-project-161182547768.appspot.com/o/usuarios%2Fdefault-forum-user.png?alt=media&token=229b408f-57dd-4e5c-98b0-a4704fda1063")
      } else {
        formData.append('imagen',
          this.imagen[0],
          this.imagen[0].name);
      }
      formData.append('prod_nom', this.objProduct.prod_nom)
      formData.append('prod_desc', this.objProduct.prod_desc)
      formData.append('prod_precio', this.objProduct.prod_precio)
      formData.append('prod_disp', this.objProduct.prod_disp)
      formData.append('rest_id', this.restId)
      console.log(formData);

      let headersRest = {
        method: 'POST',
        body: formData
      };
      this.click = true;
      fetch('https://huariquesback.herokuapp.com/api/producto/crear', headersRest)
        .then(response => {
          // console.log(response)
          return response.json();
        }).then(respuesta => {
          console.log(respuesta);

        })
    }

  }






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
