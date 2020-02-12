import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommandsService } from 'src/app/services/commands.service';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.scss']
})
export class HomeComponent implements OnInit {

  fromMenu: string = '';
  summarized: string[] = [];
  constructor(
    private commands: CommandsService
  ) { }

  ngOnInit(): void {
  }

  async submit(form: NgForm) {
    if (form.invalid) return;
    try {
      this.summarized = await this.commands.summarize(this.fromMenu).toPromise();
    }
    catch (ex) {
      alert(JSON.stringify(ex));
    }
  }
}
