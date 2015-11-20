ESDataProvider = function(){
  template1 = 'curl -XGET \'http://localhost:9200/logstash-2015.11.16,logstash-2015.11.15,logstash-2015.11.14,logstash-2015.11.13,logstash-2015.11.12,logstash-2015.11.11,logstash-2015.11.10,logstash-2015.11.09,logstash-2015.11.08,logstash-2015.11.07,logstash-2015.11.06,logstash-2015.11.05,logstash-2015.11.04,logstash-2015.11.03,logstash-2015.11.02,logstash-2015.11.01,logstash-2015.10.31,logstash-2015.10.30,logstash-2015.10.29,logstash-2015.10.28,logstash-2015.10.27,logstash-2015.10.26,logstash-2015.10.25,logstash-2015.10.24,logstash-2015.10.23,logstash-2015.10.22,logstash-2015.10.21,logstash-2015.10.20,logstash-2015.10.19,logstash-2015.10.18,logstash-2015.10.17/_search\' -d \'{ \
  "query" : { \
    "query_string": {
      "query": "type:\\"rails\\" AND tags:(NOT _jsonparsefailure) AND user_id:>0"
    }
  },
  "aggs": {
    "0": {
      "date_histogram": {
        "field": "@timestamp",
        "interval": "90d"
      },
      "aggs": {
        "distinct_user_id" : {
            "cardinality" : {
              "field" : "user_id"
            }
        }
      }
    }
  }
}\'"';
  this.get_by_hour = function(date, success_handler, failure_handler){
    body_template = {
      "query" : {
        "bool": {
          "must":[
            {
              "query_string": {
                "query": 'type:"rails" AND tags:(NOT _jsonparsefailure) AND user_id:>0'
              }
            },
            {
              "range": {
                "@timestamp" : {
                    "gte" : "2015-10-1",
                    "lt" :  "2015-11-1"
                }
              }
            }
          ]
        }
      },
      "aggs": {
        "0": {
          "date_histogram": {
            "field": "@timestamp",
            "interval": "1h"
          },
          "aggs": {
            "distinct_user_id" : {
                "cardinality" : {
                  "field" : "user_id"
                }
              }
            }
          }
        }
      };
    'logstash-2015.10.16'
    query_template = 'localhost:9200/{{index}}/_search';
    query = 'localhost/logstash-2015.11.16/_search';
    var request = $.ajax({
      url: query,
      method: "GET",
      data: body,
      dataType: "json"
    });
    request.done(function( msg ) {
      success_handler(msg);
    });
    request.fail(function( jqXHR, textStatus ) {
      failure_handler(textStatus);
    });
  };
  return this;
}();
