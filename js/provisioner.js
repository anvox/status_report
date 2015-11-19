ESProvisioner = function(){
  this.provision_by_active_user = function(seed_active_user, provision_active_user, data){
    this._active_user = {};
    this._active_user.seed = seed_active_user;
    this._active_user.provision = provision_active_user;
    return {
      request: {
        max: this.scale_by_active_user(data.request.max),
        min: this.scale_by_active_user(data.request.min),
        average: this.scale_by_active_user(data.request.average),
        std: this.scale_by_active_user(data.request.std),
        percentile_90: this.scale_by_active_user(data.request.percentile_90),
        total: this.scale_by_active_user(data.request.total),
      },
      user: {
        max: this.scale_by_active_user(data.user.max),
        min: this.scale_by_active_user(data.user.min),
        average: this.scale_by_active_user(data.user.average),
        std: this.scale_by_active_user(data.user.std),
        percentile_90: this.scale_by_active_user(data.user.percentile_90),
        total: this.scale_by_active_user(data.user.total),
      }
    };
  };
  this.scale_by_active_user = function(value){
    return math.ceil(math.eval(value + " * " + this._active_user.provision + " / " + this._active_user.seed));
  }
  return this;
}();