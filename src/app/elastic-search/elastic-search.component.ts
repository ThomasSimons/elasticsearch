import { Component, OnInit } from '@angular/core';
import { Jobs } from "../jobs";
import {JobService} from "../job.service";
import {Response} from "@angular/http";
import {Elasticsearch} from 'C:/Users/TSOAV51/Desktop/Market_Skills/logstash-5.1.2/bin/batman/src/app/home/elasticsearch.service';
import {SearchResponse} from 'elasticsearch';


@Component({
  selector: 'app-elastic-search',
  templateUrl: './elastic-search.component.html',
  styleUrls: ['./elastic-search.component.css'],
  providers:[Elasticsearch]
})
export class ElasticSearchComponent implements OnInit {

  private listOfJobs : Jobs[] = [];
  private listOfObjects: Response;
  private listOfResults: SearchResponse<{}>;
  public lineOptions;
  constructor(public jobService: JobService,public elasticsearch:Elasticsearch ) {this.lineOptions = {};
  }

  ngOnInit() {
    //console.log("WAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    // if consultant/:id needed check routerLink
   /*this.jobService.getAllJobs().subscribe(
      batman => {
        this.listOfObjects = batman;
        console.log(this.listOfObjects);
      }
    );*/
    //this.jobService.getSomeJobs().subscribe();
    //this.jobService.getSomeJobs().subscribe(test => {console.log("log from inside nogoninit");console.log(test)});

    //this.elasticsearch.test_thomas().subscribe((thomas)=>{this.listOfResults=thomas;console.log(thomas);});

    //console.log("done here " +this.listOfResults);


    this.elasticsearch.test_thomas().subscribe((thomas)=>{this.listOfResults=thomas;},error => console.log("Error: " +error),
      () => this.convertToValuePairs(this.listOfResults));
    //var aggregations = this.listOfResults.aggregations;
    //console.log("done here " +this.listOfResults);
      /*.subscribe(t =>{ this.listOfObjects=t;
          this.convertToValuePairs(this.listOfObjects);console.log("ngOnInit "+t);
      },
          error => {
            console.log(error);
    });*/


  }

  public convertToValuePairs(results) {
    var buckets = results.aggregations.vacany_over_time.buckets;
    //console.log(buckets);
    //var test = aggregations.vacany_over_time.buckets;
    //console.log(test);
      for (let i = 0; i < buckets.length; i++) {
        let result = buckets[i];
        //console.log(i);
        //console.log(new Jobs(result.key_as_string, result.doc_count));
        this.listOfJobs.push(new Jobs(result.key_as_string, result.doc_count));
    }
    //console.log("waaaaaaaaaaaaat");
    console.log(this.listOfJobs);
     // this.charCreation();
    //return 23;
  }

  charCreation()
  {
    this.lineOptions = {
      chart: {
        reduceXTicks:false,
        rotateLabels: 45,
        type: 'multiBarChart',
        height: 550,
        margin: {
          top: 20,
          right: 20,
          bottom: 60, // to show the legend
          left: 40
        },
        x: function (d) {
          if (d != undefined) {
            //console.log(d[2]);
            return d[0];
          }
        },
        y: function (d) {
          if (d != undefined) {
            return d[1];
          }
        },
        clipEdge: true,
        duration: 100,
        useInteractiveGuideline: true,
        stacked: true,
        xAxis: {
          showMaxMin: false,
          tickFormat: function (d)  {
            //console.log("xAxis");
            // console.log("xaxis" + d3.time.format('%d/%m/%Y')(new Date(d)));
            //return d3.time.format('%d/%m/%Y')(new Date(d));
            return d
          }
        },
        yAxis: {
          tickFormat: function (d) {
            //console.log("Yaxis");
            // console.log("yxaxis" + d3.time.format('%d/%m/%Y')(new Date(d)));
            //return d3.time.format('%d/%m/%Y')(new Date(d));
            return d;
          }
        }
      }
    };

  }

}
