import { Component, OnInit } from '@angular/core';
import {Hero} from "../Hero";
import {HeroService} from "../hero.service";
import {MessageService} from "../messages.service";



@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes :Hero[] = [];

  constructor(private heroService : HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes() : void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero : Hero) : void {
    this.heroes = this.heroes.filter(h => h !== hero); //delete from the components heroes array, NOT from the server
    this.heroService.deleteHero(hero.id).subscribe();//delete trough the service, actual delete from the server

  }

}
