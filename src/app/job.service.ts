import { Injectable } from '@angular/core';
import {Client} from 'elasticsearch';
import {Observable} from 'rxjs/Observable';
import {Jobs} from "./jobs";
import {Http} from "@angular/http";

@Injectable()
export class JobService {
  private _client: Client;

  constructor(private http: Http) {
    if (!this._client) {
      this._connect();
    }
  }

  private _connect() {
    this._client = new Client({
      host: 'http://localhost:9200'
      //log: 'trace',
      //method: 'get'
    });
  };

  isAvailable(): PromiseLike<String> {
    return this._client.ping({
      requestTimeout: Infinity
    });
  }

  public getAllJobs() {
    /*return this._client.search({
      index: 'vacancy',
      type: 'vacancy',
      body: {
        query: {
          match: {
            body: 'java'
          }
        }, aggs: {
          vacany_over_time: {
            date_histogram: {
              field: 'time', interval: 'month', format: 'yyyy-MM-dd'
            }
          }
        }
      }
    });*/
    return this.http.get('http://localhost:9200/vacancy/vacany/_search?q=body:java');
  }

  public getSomeJobs() {
    return this._client.search({
     index: 'vacancy',
     type: 'vacancy',
     body: {
     query: {
     match: {
     body: 'java'
     }
     },
       aggs: {
      vacany_over_time: {
        date_histogram: {
          field: 'time', interval: 'month', format: 'yyyy-MM-dd'
        }
      }
     }
     }
     });
  }
}

