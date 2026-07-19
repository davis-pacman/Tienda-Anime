import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "../../../core/header/header";
import { Footer } from "../../../core/footer/footer";

@Component({
  selector: 'app-layout-profile',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './layout-profile.html',
  styles: ``,
})
export class LayoutProfile { }
