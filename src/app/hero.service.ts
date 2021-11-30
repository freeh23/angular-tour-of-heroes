import { Injectable } from '@angular/core';
import {Hero} from "./Hero";
import {HEROES} from "./mock-heroes";
import {Observable, of} from "rxjs";
import {MessageService} from "./messages.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes';  // URL to web api

  constructor(
    private http : HttpClient,
    private messageService : MessageService) { }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  getHeroes() : Observable<Hero[]> {
    const heroes = of(HEROES);
    this.log("fetched heroes");
    return this.http.get<Hero[]>(this.heroesUrl);
  }

  getHero(id: number) : Observable<Hero> {
    const hero = HEROES.find(h => h.id === id)!;
    this.log(`fetched hero id=${id}`);
    return of(hero);
  }
}
