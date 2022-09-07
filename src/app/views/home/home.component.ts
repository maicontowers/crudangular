import { Component, OnInit, ViewChild } from '@angular/core';
import { ElementDialogComponent } from 'src/app/shared/element-dialog/element-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  idcliente: number;
  telefone: number;
  cpf: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {idcliente: 1, name: 'Michael Torres', telefone: 5511980419007, cpf: '00000000000'},
  {idcliente: 2, name: 'Keven Lee', telefone: 5511980419008, cpf: '11111111111'},
  {idcliente: 3, name: 'Thais Cristina', telefone: 5511980419009, cpf: '22222222222'},
  {idcliente: 4, name: 'Maria Zuleide', telefone: 5511980419010, cpf: '33333333333'},
  {idcliente: 5, name: 'Francisco Gonçalves', telefone: 5511980419011, cpf: '44444444444'},
  {idcliente: 6, name: 'Claudia Vieira', telefone: 5511980419012, cpf: '55555555555'},
  {idcliente: 7, name: 'Juan Vieira', telefone: 5511980419013, cpf: '66666666666'},
  {idcliente: 8, name: 'Daniella Veira', telefone: 5511980419014, cpf: '77777777777'},
  {idcliente: 9, name: 'Michelle Torres', telefone: 5511980419015, cpf: '99999999999'},
  {idcliente: 10, name: 'Aparecida Torres', telefone: 5511980419016, cpf: '01010101010'},
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = ['idcliente', 'name', 'telefone', 'cpf','actions'];
  dataSource = ELEMENT_DATA;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  Cadastrar(element:PeriodicElement | null): void {
      
    var qtd_registros = this.dataSource.length + 1;
    const dialogRef = this.dialog.open(ElementDialogComponent, {
        width: '250px',
        data: element === null ? {
          idcliente: qtd_registros,
          name: '',
          cpf: '',
          telefone:''
        } : 
        {
          idcliente: element.idcliente,
          name: element.name,
          cpf: element.cpf,
          telefone: element.telefone
        }
      });

      dialogRef.afterClosed().subscribe(result => {
       if(result){
        if (this.dataSource.map(p => p.idcliente).includes(result.idcliente)) {
          this.dataSource[result.idcliente - 1] = result;
          this.table.renderRows();
        } else{
          this.dataSource.push(result);
          this.table.renderRows();
        }
         
       }
      });
    }

    ExcluirCadastro(idcliente:number): void{
      if(window.confirm('Deseja Excluir o cadastro')){
        this.dataSource = this.dataSource.filter(p => p.idcliente !== idcliente);
      }
    }

    EditarCadastro(element:PeriodicElement): void{
      this.Cadastrar(element);
    }
  

}
