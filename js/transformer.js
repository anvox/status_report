ESTransfromer = function(){
  this.transform = function(raw_data){
    raw_data = this.get_buckets(raw_data);
    formatted_data = [];
    for (var i = 0; i < raw_data.length; i++) {
      formatted_data[i] = [ Date.parse(raw_data[i]["key_as_string"]),
        raw_data[i]["doc_count"],
        raw_data[i]["distinct_user_id"]["value"] ];
    };
    return formatted_data;
  };
  this.extract_request = function(raw_data){
    raw_data = this.get_buckets(raw_data);
    formatted_data = [];
    for (var i = 0; i < raw_data.length; i++) {
      formatted_data[i] = [ Date.parse(raw_data[i]["key_as_string"]),
        raw_data[i]["doc_count"] ];
    };
    return formatted_data;
  };
  this.extract_user = function(raw_data){
    raw_data = this.get_buckets(raw_data);
    formatted_data = [];
    for (var i = 0; i < raw_data.length; i++) {
      formatted_data[i] = [ Date.parse(raw_data[i]["key_as_string"]),
        raw_data[i]["distinct_user_id"]["value"] ];
    };
    return formatted_data;
  };
  this.get_buckets = function(data){
    return data["aggregations"]["0"]["buckets"];
  };

  this.extract_total = function(data){
    
  };

  return this;
}();
