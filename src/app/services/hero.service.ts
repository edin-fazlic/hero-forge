import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {delay} from 'rxjs/operators';
import {Hero} from '../models/hero.interface';
import {MOCK_GEAR} from './gear.service';

export const MOCK_HEROES: Hero[] = [
  {id: 1, name: 'Tvrtko I Kotromanić', profession: 'Royal', gear: []},
  {id: 2, name: 'Mak Dizdar', profession: 'Writer', gear: []},
  {id: 3, name: 'Hasanaginica', profession: 'Mystic', gear: []},
  {id: 4, name: 'Ivo Andrić', profession: 'Writer', gear: []},
  {id: 5, name: 'Dervish', profession: 'Mystic', gear: []},
  {id: 6, name: 'Katarina Kosača', profession: 'Royal', gear: []}
];

@Injectable({providedIn: 'root'})
export class HeroService {

  private squad: number[] = [];

  getHeroes(): Observable<Hero[]> {
    return Math.random() > 0.1
      ? of(MOCK_HEROES).pipe(delay(500))
      : throwError(() => ({status: 500, message: 'Failed to fetch heroes'}));
  }

  assignGear(heroId: number, gearId: number): Observable<{ success: boolean; message?: string }> {
    const hero = MOCK_HEROES.find(h => h.id === heroId);
    if (!hero) {
      return throwError(() => ({status: 500, message: 'Hero not found'}));
    }
    const gear = MOCK_GEAR.find(g => g.id === gearId);
    if (!gear) {
      return throwError(() => ({status: 500, message: 'Gear not found'}));
    }
    if (hero.gear.some(id => id === gearId)) {
      return throwError(() => ({status: 500, message: 'Gear already assigned'}));
    }
    if (hero.gear.length >= 3) {
      return throwError(() => ({status: 500, message: 'Gear limit reached'}));
    }
    hero.gear.push(gearId);
    return of({success: true}).pipe(delay(300));
  }

  removeGear(heroId: number, gearId: number): Observable<{ success: boolean; message?: string }> {
    const hero = MOCK_HEROES.find(h => h.id === heroId);
    if (!hero) {
      return throwError(() => ({status: 500, message: 'Hero not found'}));
    }
    const gearIndex = hero.gear.findIndex(id => id === gearId);
    if (gearIndex === -1) {
      return throwError(() => ({status: 500, message: 'Gear not found on hero'}));
    }
    hero.gear.splice(gearIndex, 1);
    const gear = MOCK_GEAR.find(g => g.id === gearId);
    if (!gear) {
      return throwError(() => ({status: 500, message: 'Gear not found'}));
    }
    return of({success: true}).pipe(delay(300));
  }
}
