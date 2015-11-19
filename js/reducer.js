ESReducer = function(){
  this.max = function(data){
    return math.max(this.extract(data));
  };
  this.min = function(data){
    return math.min(this.extract(data));
  };
  this.avg = function(data){
    return math.ceil(math.mean(this.extract(data)));
  };
  this.std = function(data){
    return math.std(this.extract(data));
  };
  this.extract = function(data){
    formatted_data = [];
    for (var i = 0; i < data.length; i++) {
      formatted_data[i] = data[i][1];
    };
    return formatted_data;
  };

  this.percentile = function(percent, data){
    data = this.extract(data);
    data = data.sort(function (a, b){ return a - b; });
    i = math.ceil(data.length * percent);
    if(i >= data.length){ i = data.length - 1; }
    return data[i];
  };

  return this;
}();
