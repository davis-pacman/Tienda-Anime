import { Component } from '@angular/core';
import { Products } from "../products/products";

@Component({
  selector: 'app-filters',
  imports: [Products],
  templateUrl: './filters.html',
  styleUrl: './filters.css',
})
export class Filters {

}
