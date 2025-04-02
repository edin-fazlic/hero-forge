import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {delay} from 'rxjs/operators';

export const MOCK_GEAR: any[] = [
  {id: 1, name: 'Stećak Shield'},
  {id: 2, name: 'Sarajevo Dagger'},
  {id: 3, name: 'Illyrian Helmet'},
  {id: 4, name: 'Drina River Cloak'},
  {id: 5, name: 'Vučjak Wolf Pelt'},
  {id: 6, name: 'Bogumil Talisman'},
  {id: 7, name: 'Jajce Battle Axe'},
  {id: 8, name: 'Blagaj Monk’s Staff'},
];

@Injectable({providedIn: 'root'})
export class GearService {

  getGear(): Observable<any[]> {
    return Math.random() > 0.1
      ? of(MOCK_GEAR).pipe(delay(500))
      : throwError(() => ({status: 500, message: 'Failed to fetch gear'}));
  }
}

