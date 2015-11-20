ESDataProvider = function(endpoint){
  this.endpoint = endpoint;

  this.get_by_hour = function(date, success_handler, failure_handler){
    var query_template = Handlebars.compile('http://{{endpoint}}/{{index}}/_search');
    var query = query_template({endpoint: this.endpoint, index: this.build_index(date)});
    var body = this.build_body(date, "h");

    var request = $.ajax({
      url: query,
      method: "POST",
      data: JSON.stringify(body),
      dataType: "json"
    });
    request.done(function( msg ) {
      success_handler(this.extract_result(msg));
    });
    request.fail(function( jqXHR, textStatus ) {
      failure_handler(textStatus);
    });
  };

  this.build_index = function(date){
    var month = date.getMonth();
    var date = new Date(date.getFullYear(), month, 1);
    date.setDate(date.getDate()-1);
    var indices = [];

    while (date.getMonth() <= month) {
      indices.push("logstash-" + moment(date).format("YYYY.MM.DD"))
      date.setDate(date.getDate()+1);
    }
    indices.push("logstash-" + moment(date).format("YYYY.MM.DD"))

    return indices.join(",");
  };

  this.build_body = function(date, resolution){
    var end = moment(date).endOf("month");
    var start = moment(date).startOf("month");
    return {
      query: {
        bool: {
          must:[
            { query_string: {query: 'type:\"rails\" AND tags:(NOT _jsonparsefailure) AND user_id:>0'} },
            { range: {"@timestamp": {gte : start.format("YYYY-MM-D"), lt :  end.format("YYYY-MM-D")} } }
          ]
        }
      },
      aggs: {
        0: {
          date_histogram: {field: "@timestamp", interval: "1" + resolution },
          aggs: {distinct_user_id: {cardinality: {field: "user_id"} } }
        }
      }
    };
  };

  this.extract_result = function(data){
    return data["aggregations"]["0"]["buckets"];
  };

  return this;
};
