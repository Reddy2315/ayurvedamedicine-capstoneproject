import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, forkJoin, Observable, of, tap } from 'rxjs';
import { Medicine } from '../model/Medicine';
import { searchMedicines } from '../model/SearchMedicines';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {
  baseUrl: string = "http://localhost:8081/medicines"

  constructor(private http: HttpClient) { }

  addNewMedicine(medicine: Medicine): Observable<any> {
    const headers = new HttpHeaders();
    headers.set('content-type', 'application/json');
    return this.http.post(this.baseUrl , medicine, { headers: headers });
  }

  getAllMedicines(): Observable<Medicine[]> {
    return this.http.get<Medicine[]>(this.baseUrl);
  }
 
  getMedicineDetails(id:number): Observable<Medicine> {
    return this.http.get<Medicine>(this.baseUrl + "/"+id);
  }

  updateMedicine(medicine: Medicine): Observable<Medicine> {
    return this.http.put<Medicine>(`${this.baseUrl}`, medicine);
  }

  deleteMedicine(id: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
}

   
  findByMedicineName(name: string): Observable<searchMedicines | null> {
    return this.http.get<searchMedicines>(`${this.baseUrl}/medicine/${name}`).pipe(
      tap(data => console.log('Data from service:', data)),
      catchError(error => {
        console.error('Error fetching search results', error);
        return of(null); // Handle errors by returning a null observable
      })
    );
  }
  
  // findByMedicineName(name: string): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.baseUrl}/medicine/${name}`);
  // }
}
