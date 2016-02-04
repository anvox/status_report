ESDataProvider = function(endpoint){
  this.endpoint = endpoint;
  this.reportdata = {};

  this.get_data = function(date, success_handler){
    $.when(
        this.get_by_hour(date),
        this.get_total(date)
      ).then(function(){
        success_handler();
      });
  };

  this.get_by_hour = function(date){
    var query_template = Handlebars.compile('http://{{endpoint}}/{{index}}/_search');
    var query = query_template({endpoint: this.endpoint, index: this.build_index(date)});
    var body = this.build_body(date, "h");

    var request = $.ajax({
      url: query,
      method: "POST",
      data: JSON.stringify(body),
      dataType: "json",
      context: this
    });
    request.done(function( msg ) {
      this.reportdata["by_hour"] = msg;
    });

    return request;
  };

  this.get_total = function(date){
    var query_template = Handlebars.compile('http://{{endpoint}}/{{index}}/_search');
    var query = query_template({endpoint: this.endpoint, index: this.build_index(date)});
    var body = this.build_body_total(date);

    var request = $.ajax({
      url: query,
      method: "POST",
      data: JSON.stringify(body),
      dataType: "json",
      context: this
    });
    request.done(function( msg ) {
      this.reportdata["total"] = msg;
    });

    return request;
  };

  this.build_index = function(date){
    var first_date = moment(date).startOf('month').subtract(1, 'day');
    var last_date = moment(date).endOf('month').add(1, 'day');
    var cur_date = first_date;

    var indices = [];
    while(cur_date.isBefore(last_date, 'day')){
      console.log(cur_date);
      indices.push("logstash-" + cur_date.format("YYYY.MM.DD"))
      cur_date.add(1,'days');
    }

    indices.push("logstash-" + last_date.format("YYYY.MM.DD"))

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

  this.build_body_total = function(date){
    var end = moment(date).endOf("month");
    var start = moment(date).startOf("month");
    return {
      query: {
        bool: {
          must: [
            { query_string: { query: 'type:\"rails\" AND tags:(NOT _jsonparsefailure) AND user_id:>0' } },
            { range: {"@timestamp": {gte : start.format("YYYY-MM-D"), lt :  end.format("YYYY-MM-D")} } }
          ]
        }
      },
      aggs: {
        distinct_user_id: {cardinality: {field: "user_id"} }
      }
    };
  };

  return this;
};
