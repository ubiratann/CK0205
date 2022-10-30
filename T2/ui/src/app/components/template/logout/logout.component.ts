import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TemplateService } from '@app/components/template.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private router: Router,
    private templateService: TemplateService) { }

  ngOnInit(): void {

    localStorage.clear()
    this.templateService.updateMenu.next();
    this.router.navigate(["/"])
  }

}
