import { Component, Input } from '@angular/core'; // Thêm Input ở đây


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  @Input() type: string = 'default'; // Khai báo biến để nhận dữ liệu từ layout
}
