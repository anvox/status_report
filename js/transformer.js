ESTransfromer = function(){
  this.transform = function(raw_data){
    formatted_data = [];
    for (var i = 0; i < raw_data.buckets.length; i++) {
      formatted_data[i] = [ Date.parse(raw_data.buckets[i]["key_as_string"]),
        raw_data.buckets[i]["doc_count"],
        raw_data.buckets[i]["distinct_user_id"]["value"] ];
    };
    return formatted_data;
  };
  this.extract_request = function(raw_data){
    formatted_data = [];
    for (var i = 0; i < raw_data.buckets.length; i++) {
      formatted_data[i] = [ Date.parse(raw_data.buckets[i]["key_as_string"]),
        raw_data.buckets[i]["doc_count"] ];
    };
    return formatted_data;
  };
  this.extract_user = function(raw_data){
    formatted_data = [];
    for (var i = 0; i < raw_data.buckets.length; i++) {
      formatted_data[i] = [ Date.parse(raw_data.buckets[i]["key_as_string"]),
        raw_data.buckets[i]["distinct_user_id"]["value"] ];
    };
    return formatted_data;
  };

  return this;
}();
