import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Client, SearchResponse } from 'elasticsearch';

@Injectable()
export class Elasticsearch {
  private clientElasticsearch: Client;
  constructor() {
    this.clientElasticsearch = new Client({
      host: 'http://localhost:9200',
      log: 'trace'
    });
  }

  public test_search(): Observable<SearchResponse<{}>> {
    return Observable.fromPromise(<Promise<SearchResponse<{}>>> this.clientElasticsearch.search( {
      index: 'vacancy',
      type: 'vacancy',
      q: 'body:java'
    }));
  }

  public test_thomas(): Observable<SearchResponse<{}>>{
    return Observable.fromPromise(<Promise<SearchResponse<{}>>> this.clientElasticsearch.search({
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
      }

    ));
  }

}
