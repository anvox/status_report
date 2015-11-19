ESRenderer = function(){
  this._chart = null;
  this.render = function(container, data, capacity){
    $(container).highcharts({
        chart: {
            zoomType: 'x'
        },
        title: {
            text: 'Workload'
        },
        subtitle: {
            text: document.ontouchstart === undefined ?
                    'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: {
            title: {
                text: 'Request/Active user'
            }
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                },
                marker: {
                    radius: 2
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                // threshold: null
            }
        },
        tooltip: {
            shared: true,
        },
        series: [{
            type: 'area',
            name: 'Active user',
            data: data[0]
        },{
            type: 'area',
            name: 'Total request',
            data: data[1]
        }]
    });
    this._chart = Highcharts.charts[0];
  };

  this.draw_plotline = function(line_options){
    plotLines = line_options.map(function(item){
      return {
        color: item.color,
        width: 2,
        value: item.value,
        label: {
          text: item.label
        }
      };
    });
    options = { title: {text: 'Request/Active user'}, plotLines: plotLines };
    this._chart.yAxis[0].update(options, true);
  };

  return this;
}();
