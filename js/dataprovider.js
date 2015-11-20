ESDataProvider = function(){
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
