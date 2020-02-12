import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommandsService {

  constructor(
    private http: HttpClient,
  ) { }

  summarize(from: string) {
    return this.http.get<string[]>(`/api/commands/summarize/${from}`);
  }
}
