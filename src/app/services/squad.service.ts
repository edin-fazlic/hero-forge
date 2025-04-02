import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {delay} from 'rxjs/operators';
import {MOCK_HEROES} from './hero.service';

@Injectable({providedIn: 'root'})
export class SquadService {

  private squad: number[] = [];

  getSquad(): Observable<number[]> {
    return Math.random() > 0.1
      ? of(this.squad).pipe(delay(500))
      : throwError(() => ({status: 500, message: 'Failed to fetch squad'}));
  }

  addToSquad(heroId: number): Observable<{ success: boolean; message?: string }> {
    const hero = MOCK_HEROES.find(hero => hero.id === heroId);
    if (!hero) {
      return throwError(() => ({status: 400, message: 'Hero not found'}));
    }
    if (this.squad.length >= 3) {
      return throwError(() => ({status: 400, message: 'Squad limit reached'}));
    }
    if (this.squad.some(id => id === heroId)) {
      return throwError(() => ({status: 400, message: 'Hero already in squad'}));
    }
    this.squad.push(heroId);
    return of({success: true}).pipe(delay(300));
  }

  removeFromSquad(heroId: number): Observable<{ success: boolean; message?: string }> {
    const heroIndex = this.squad.findIndex(id => id === heroId);
    if (heroIndex === -1) {
      return throwError(() => ({status: 404, message: 'Hero not found in squad'}));
    }
    this.squad.splice(heroIndex, 1);
    const hero = MOCK_HEROES.find(hero => hero.id === heroId);
    if (!hero) {
      return throwError(() => ({status: 400, message: 'Hero not found'}));
    }
    return of({success: true}).pipe(delay(300));
  }
}
