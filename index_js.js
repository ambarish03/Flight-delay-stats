		/*Plotting function called with map data*/
		function draw(geo_data) {
			"use strict";
        	var margin = 75,
        	padding = 75,
            width = 750 - margin,
            height = 350 - margin;
            var donutWidth = 75;
            var border=1,bordercolor='black';
            
          	/*SVG canvasses are created*/
        	var svg = d3.select(".map_plot")
            .append("svg")
            .attr("width", width + margin)
            .attr("height", height + margin)
            .append('g')
            .attr('class', 'map');
            
            var	barchart = d3.select(".chart_plot")
			.append("svg")
			.attr("width", width+margin)
			.attr("height", height+margin)
			.append("g")
			.attr("class", "bar-chart");
			
			var	volumechart = d3.select(".volume_plot")
			.append("svg")
			.attr("width", width+margin)
			.attr("height", height+margin)
			.append("g")
			.attr("class", "volume-chart");
			
			var	stacked_by_month = d3.select(".stacked_by_month")
			.append("svg")
			.attr("width", width+margin)
			.attr("height", (1.05*height)+margin)
			.append("g")
			.attr("class", "by_month");
			
			var	stacked_by_airport = d3.select(".stacked_by_airport")
			.append("svg")
			.attr("width", width+margin)
			.attr("height", (height)+margin)
			.append("g")
			.attr('transform', 'translate(' + (width / 2) + 
            ',' + ((height / 2)+50) + ')')
			.attr("class", "by_airport");
            
        	var projection = d3.geo.mercator()
                               .scale(550)
                               .translate([width / 0.52, height / 0.485]);

        	var path = d3.geo.path().projection(projection);

        	var map = svg.selectAll('path')
                     .data(geo_data.features)
                     .enter()
                     .append('path')
                     .attr('d', path)
                     .style('fill', 'lightBlue')
                     .style('stroke', 'black')
                     .style('stroke-width', 0.5);
                     
        	d3.csv("augmented_flight_data.csv", function(d) {
        		d['airport'] = d['airport'];
        		d['year'] = parseInt(d['year']);
        		d['month'] = parseInt(d['X.month']);
        		d['arr_flights'] = parseInt(d['arr_flights']);
        		d['arr_del15'] = parseInt(d['arr_del15']);
        		d['carrier_ct'] = parseFloat(d['carrier_ct']);
        		d['weather_ct'] = parseFloat(d['X.weather_ct']);
        		d['nas_ct'] = parseFloat(d['nas_ct']);
        		d['security_ct'] = parseFloat(d['security_ct']);
        		d['late_aircraft_ct'] = parseFloat(d['late_aircraft_ct']);
        		d['X.arr_delay'] = parseFloat(d['X.arr_delay']);
        		d['X.carrier_delay'] = parseFloat(d['X.carrier_delay']);
        		d['weather_delay'] = parseFloat(d['weather_delay']);
        		d['nas_delay'] = parseFloat(d['nas_delay']);
        		d['security_delay'] = parseFloat(d['security_delay']);
        		d['late_aircraft_delay'] = parseFloat(d['late_aircraft_delay']);
        		d['Latitude'] = +d['Latitude'];
        		d['Longitude'] = +d['Longitude'];
        		return d;
      		}, plot_points);
      		
      		/*Function to create the plots*/
      		function plot_points(data) {
      			
      			/* Function that translates the raw data into measures 
      			that will be used in the plots*/
      			
      			function agg_airport_year(leaves) {
      				var avg_percent = d3.mean(leaves, function(d) {
                    	return d['arr_del15']/d['arr_flights'];
                	});
                	
                	var flight_volume = d3.sum(leaves, function(d) {
                    	return d['arr_flights'];
                	});
                	
                	var total_delay_mins = d3.mean(leaves, function(d) {
                    	return d['X.arr_delay']/d['arr_del15'];
                	});
                	
                	var total_delay = d3.mean(leaves, function(d) {
                    	return d['X.arr_delay']/d['arr_flights'];
                	});
                
                	var coords = leaves.map(function(d) {
                    	return projection([+d.Longitude, +d.Latitude]);
                	});
                
                	var center_x = d3.min(coords, function(d) {
                		return d[0];
                	});
                
                	var center_y = d3.min(coords, function(d) {
                		return d[1];
                	});
                	
                	var months_list = d3.set();
                		leaves.forEach(function(d) {
                    	months_list.add(d['month']);
                	});
                
                	return {
                  		'percent_delayed' : avg_percent,
                  		'total_delay' : total_delay,
                  		'total_delay_mins' : total_delay_mins,
                  		'center_x' : center_x,
                  		'center_y' : center_y,
                  		'traffic_vol' : flight_volume,
                  		'normalized_traffic_vol' : flight_volume/months_list.size()
                	};
      			}
      		
      			/*Data is aggregated by airport and year*/
      			var nested = d3.nest()
                           	.key(function(d) {return d['airport'];})
                           	.key(function(d) {return d['year'];})
                           	.rollup(agg_airport_year)
                           	.entries(data);
                
                /*Data is aggregated by year*/        	
                var nested_by_year = d3.nest()
                           	.key(function(d) {return d['year'];})
                           	.rollup(agg_airport_year)
                           	.entries(data);
                
                /*Data is aggregated by year and month*/
                var nested_by_year_month_new = d3.nest()
                			.key(function(d) {return d['year'];})
                			.key(function(d) {return d['month'];})
                           	.rollup(agg_airport_year)
                           	.entries(data);
                
                /*Data is aggregated by airport and month*/
                var nested_by_airport_month_new = d3.nest()
                			.key(function(d) {return d['airport'];})
                			.key(function(d) {return d['month'];})
                           	.rollup(agg_airport_year)
                           	.entries(data);
                           	
                var nested_by_month_new = d3.nest()
                			.key(function(d) {return d['month'];})
                           	.rollup(agg_airport_year)
                           	.entries(data);
            	
            	/*Restricted my working dataset to six airports and define relavant features for these airports*/
            	var airport_list = ["ATL","LAX","ORD","DFW","JFK","DEN"];
            	var city_name = ["Atlanta","Los Angeles","Chicago","Dallas","New York","Denver"]
            	var airport_name = ["Hartsfield–Jackson Atlanta Intl Airport",
            	"Los Angeles Intl Airport","O'Hare Intl Airport",
            	"Dallas/Fort Worth Intl Airport","John F. Kennedy Intl Airport",
            	"Denver Intl Airport"];
            	
            	/*Function definitions to project observed data to 
            	the chart space*/
            	var filtered_nodes = [], filtered_nodes_by_month = [];
            	var filtered_node_scale_calc = [], 
            	filtered_node_scale_calc_by_month = [], new_d, another_d;
            
            	airport_list.forEach(function(node) {
            		filtered_nodes.push(nested.filter(function(d) 
            		{return new String(d['key'])==node;}));
            	});
            	
            	nested.forEach(function(node) {
            		for (var i=0;i<airport_list.length;i++) {
            			if (node.key == airport_list[i]) {
            				filtered_node_scale_calc.push(node);
            			}
            		}
            	});
            	
            	/*List of year values in the dataset*/
            	var years = [];
            	filtered_nodes.forEach(function (d) {
            		d.forEach(function(e) {
            			for (var i=0; i<e.values.length; i++) {
            				if (years.indexOf(+(e.values[i].key)) < 0) 
            					years.push(+(e.values[i].key));
            			}
            		});
            	});
    						
    			var fourSeason = ['Spring','Summer','Fall','Winter'];
            	
            	/*Defined scales for future use in creating projections of the observed data in the chart dimensions*/
            	var radius = Math.min(width, height) / 2;
            	var x = d3.scale.ordinal().rangeRoundBands([padding, width],0.5);
    			var y = d3.scale.linear().range([height, margin]);
    			var y_vol = d3.scale.linear().range([height, margin]);
    			var x_stacked = d3.scale.ordinal().rangeRoundBands([padding, width],0.5);
    			var y_stacked_abs = d3.scale.linear().range([(1.05*height), margin]).domain([0,1]);
    			var x_stacked_airport = d3.scale.ordinal().rangeRoundBands([padding, width],0.5);
    			
    			var new_z = d3.scale.ordinal().range(["#013ADF","#D0A9F5","#8A0868","#DF013A"]);
    			
    			/*Reshaped data to plot the airport locations within the US map*/
    			var filtered_data_mod = [];
            	filtered_nodes.forEach(function(node) {
            		new_d = [];
            		for (var i=0; i<node[0].values.length; i++) {
            			another_d = [];
            			another_d['year'] = +node[0].values[i].key;
            			another_d['percent_delayed'] = node[0].values[i].values['percent_delayed'];
            			another_d['normalized_traffic_vol'] = node[0].values[i].values['normalized_traffic_vol'];
            			another_d['center_x'] = node[0].values[i].values['center_x'];
            			another_d['center_y'] = node[0].values[i].values['center_y'];
            			new_d[i] = another_d;
            		}
            		filtered_data_mod.push({key: node[0].key, value: new_d});
            	});
            	
            	/*Attaching domain information to the defined axes*/
            	x.domain(nested_by_year.map(function (d) { return +d.key; }));
            	x_stacked.domain([2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015]);
            	x_stacked_airport.domain(airport_list);
        		y.domain([
          			d3.min(filtered_data_mod, function (c) { 
            			return d3.min(c.value, function (d) { return d.percent_delayed; })-0.01;
          			}),
          			d3.max(filtered_data_mod, function (c) { 
            			return d3.max(c.value, function (d) { return d.percent_delayed; });
          			})
        		]);
        		y_vol.domain([
          			d3.min(filtered_data_mod, function (c) { 
            			return d3.min(c.value, function (d) { return d.normalized_traffic_vol; })-500;
          			}),
          			d3.max(filtered_data_mod, function (c) { 
            			return d3.max(c.value, function (d) { return d.normalized_traffic_vol; });
          			})
        		]);
        		
    			
    			/*Creation of the axes for the plots*/
            	var xAxis = d3.svg.axis()
    						.scale(x)
    						.orient("bottom")
    						.ticks(19);
    						
    			var xAxisStacked = d3.svg.axis()
    						.scale(x_stacked)
    						.orient("bottom")
    						.ticks(19);
    						
    			var xAxisStackedAirport = d3.svg.axis()
    						.scale(x_stacked_airport)
    						.orient("bottom")
    						.ticks(19);
    						
    			var yAxis = d3.svg.axis()
    						.scale(y)
              				.orient("left")
              				.ticks(6);
              				
              	var yAxisVolume = d3.svg.axis()
    						.scale(y_vol)
              				.orient("left")
              				.ticks(6);
              				
              	var yAxisStacked = d3.svg.axis()
    						.scale(y_stacked_abs)
              				.orient("left")
              				.ticks(6);
              							
              	barchart.append("g")
    				.attr("class", "x axis")
    				.attr("transform", "translate(0," + (height) + ")")
    				.call(xAxis);
    			
    			barchart.append("g")
    				.attr('class', 'y axis')
              		.attr('transform', "translate(" + (margin+0) + ",0)")
              		.call(yAxis);
              	
              	barchart.append("text")
            		.attr("text-anchor", "middle")
            		.attr("transform", "translate("+ (25) +","+(-10+(height+padding)/2)+")rotate(-90)")
            		.text("Annual proportion of delayed flights")
            		.attr("font-size","20px");
            	
            	volumechart.append("g")
    				.attr("class", "x axis")
    				.attr("transform", "translate(0," + (height) + ")")
    				.call(xAxis);
    			
    			volumechart.append("g")
    				.attr('class', 'y axis')
              		.attr('transform', "translate(" + (margin+0) + ",0)")
              		.call(yAxisVolume);
              	
              	volumechart.append("text")
            		.attr("text-anchor", "middle")
            		.attr("transform", "translate("+ (14) +","+(-10+(height+padding)/2)+")rotate(-90)")
            		.text("Average # of monthly arrivals")
            		.attr("font-size","20px");
            	
            	var color = d3.scale.ordinal()
          			.range(["#93FF33", "#33FFA2", "#45C2C1","#33B5FF","#3352FF","#FF3358"]);
          		color.domain(airport_list);
            	
            	var div = d3.select("body").append("div")	
    				.attr("class", "tooltip")				
    				.style("opacity", 0);
            	
            	/*Creation of the map-plot with locations of the airport and tooltip 
            	showing city and airport's full name*/
            	/*Creation of hover functionality to highlight line chart showing delay 
            	statistics across years for each airport*/
            	var circles = [];
				circles = svg.selectAll('circle').data(filtered_data_mod);
				circles.enter()
                .append("circle")
                .attr("class",function(d) {return "circle_"+(d.key);})
                .attr('cx', function(d) { return d.value[0]['center_x']; })
                .attr('cy', function(d) { return d.value[0]['center_y']; })
                .attr('r', 12)
        		.attr('fill',function (d) {return color(d.key);})
                .on("mouseover", function(d) {		
            		div.transition()		
                		.duration(200)		
                		.style("opacity", .9);	
            		div.html("IATA : " + d.key + "<br/>City : " + city_name[airport_list.indexOf(d.key)] + 
            		"<br/>Name : " + airport_name[airport_list.indexOf(d.key)])	
                		.style("left", (d3.event.pageX + 20) + "px")		
                		.style("top", (d3.event.pageY - 28) + "px");
                	d3.selectAll('.line')
                		.transition()
  						.style("stroke-opacity", 0.1);
                	d3.selectAll('.path_'+d3.select(this).attr("class").substring(7))
                		.transition()
  						.style("stroke-opacity", 1);
            	})					
        		.on("mouseout", function(d) {		
            		div.transition()		
                		.duration(500)		
                		.style("opacity", 0);
                	d3.selectAll('.line')
                		.transition()
  						.style("stroke-opacity", 1);
        		});
        		
        		/*Creation of stacked line-chart*/
        		var line = d3.svg.line()
          			.interpolate("cardinal")
          			.x(function (d) { return x(+d.year) + x.rangeBand() / 2; })
          			.y(function (d) { return y(d.percent_delayed); });
        		
        		var series = barchart.selectAll(".series")
            		.data(filtered_data_mod)
          			.enter().append("g")
            		.attr("class", "series");
            		
            	series.append("path")
          			.attr("class", function (d) { return "line path_"+(d.key);})
          			.attr("d", function (d) { return line(d.value); })
          			.style("stroke", function (d) { return color(d.key); })
          			.style("stroke-width", "4px")
          			.style("fill", "none");
          			
          		var linechart_legend = barchart.append("g")
      				.attr("font-family", "sans-serif")
      				.attr("font-size", 15)
      				.attr("text-anchor", "end")
    				.selectAll("g")
    				.data(airport_list.slice().reverse())
    				.enter().append("g")
      				.attr("transform", function(d, i) { return "translate(70," + i * 20 + ")"; });
      									
      			linechart_legend.append("rect")
      				.attr("x", width - 19)
      				.attr("width", 19)
      				.attr("height", 19)
      				.attr("fill", color);

  				linechart_legend.append("text")
      				.attr("x", width - 24)
      				.attr("y", 9.5)
      				.attr("dy", "0.32em")
      				.text(function(d) { return d; });
      				
      			line = d3.svg.line()
          			.interpolate("cardinal")
          			.x(function (d) { return x(+d.year) + x.rangeBand() / 2; })
          			.y(function (d) { return y_vol(d.normalized_traffic_vol); });
        		
        		series = volumechart.selectAll(".series")
            		.data(filtered_data_mod)
          			.enter().append("g")
            		.attr("class", "series");
            		
            	series.append("path")
          			.attr("class", function (d) { return "line path_"+(d.key);})
          			.attr("d", function (d) { return line(d.value); })
          			.style("stroke", function (d) { return color(d.key); })
          			.style("stroke-width", "4px")
          			.style("fill", "none");
          			
          		linechart_legend = volumechart.append("g")
      				.attr("font-family", "sans-serif")
      				.attr("font-size", 15)
      				.attr("text-anchor", "end")
    				.selectAll("g")
    				.data(airport_list.slice().reverse())
    				.enter().append("g")
      				.attr("transform", function(d, i) { return "translate(70," + i * 20 + ")"; });
      									
      			linechart_legend.append("rect")
      				.attr("x", width - 19)
      				.attr("width", 19)
      				.attr("height", 19)
      				.attr("fill", color);

  				linechart_legend.append("text")
      				.attr("x", width - 24)
      				.attr("y", 9.5)
      				.attr("dy", "0.32em")
      				.text(function(d) { return d; });

				/*Reshape data for creation of stacked bar chart showing seasonal statistics across years*/
				var reshaped_d = [], reshaped_d_time = [], total, total_time;
				nested_by_year_month_new.forEach(function(d) {
					if (+d.key != 2003 && +d.key != 2016) {
						total = 0, total_time = 0;
						for (var i=0; i<d.values.length; i++) {
							total += d.values[i].values['percent_delayed'];
							total_time += d.values[i].values['total_delay'];
						}
						new_d = [], another_d = [];
						new_d['Winter'] = 0, new_d['Spring'] = 0, new_d['Summer'] = 0, new_d['Fall'] = 0;
						another_d['Winter'] = 0, another_d['Spring'] = 0, another_d['Summer'] = 0, another_d['Fall'] = 0;
						new_d['year'] = d.key;
						another_d['year'] = d.key;
						for (var i=0; i<d.values.length; i++) {
							if (+d.values[i].key == 1 || +d.values[i].key == 2 || +d.values[i].key == 12) {
								new_d['Winter'] += d.values[i].values['percent_delayed']/total;
								another_d['Winter'] += d.values[i].values['total_delay']/total_time;
							}
							else if (+d.values[i].key == 3 || +d.values[i].key == 4 || +d.values[i].key == 5) {
								new_d['Spring'] += d.values[i].values['percent_delayed']/total;
								another_d['Spring'] += d.values[i].values['total_delay']/total_time;
							}
							else if (+d.values[i].key == 6 || +d.values[i].key == 7 || +d.values[i].key == 8) {
								new_d['Summer'] += d.values[i].values['percent_delayed']/total;
								another_d['Summer'] += d.values[i].values['total_delay']/total_time;
							}
							else if (+d.values[i].key == 9 || +d.values[i].key == 10 || +d.values[i].key == 11) {
								new_d['Fall'] += d.values[i].values['percent_delayed']/total;
								another_d['Fall'] += d.values[i].values['total_delay']/total_time;
							}
						}
						reshaped_d.push(new_d);
						reshaped_d_time.push(another_d);
					}
				});
				
				var reshaped_data = d3.layout.stack()(fourSeason.map(function(c) {
    				return reshaped_d.map(function(d) {
      					return {x: d.year, y: d[c]};
    				});
  				}));
  				
  				var reshaped_data_time = d3.layout.stack()(fourSeason.map(function(c) {
    				return reshaped_d_time.map(function(d) {
      					return {x: d.year, y: d[c]};
    				});
  				}));
  				new_z.domain(fourSeason);
  				
  				/*Creation of stacked bar chart showing proportion of delayed flights 
  				and delay times by month across years*/
  				var layer = stacked_by_month.selectAll(".layer").data(reshaped_data);
  				
  				layer.enter().append("g")
      				.attr("class", "layer")
      				.style("fill", function(d, i) { return new_z(i); });
  				
  				layer.selectAll("rect")
      				.data(function(d) { return d; })
    				.enter().append("rect")
      				.attr("x", function(d) { return x_stacked(d.x); })
      				.attr("y", function(d) { return y_stacked_abs(d.y + d.y0); })
      				.attr("height", function(d) { return y_stacked_abs(d.y0) - y_stacked_abs(d.y + d.y0); })
      				.attr("width", x_stacked.rangeBand())
      				.on("mouseover", function() { tooltip.style("display", null); })
  					.on("mouseout", function() { tooltip.style("display", "none"); })
  					.on("mousemove", function(d) {
    					var xPosition = d3.mouse(this)[0] - 15;
    					var yPosition = d3.mouse(this)[1] - 25;
    					tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
    					tooltip.select("text").text(Math.round((d.y * 10000) / 100)+"%");
  					});
      							
      			stacked_by_month.append("g")
    				.attr("class", "x axis")
    				.attr("transform", "translate(0," + (1.05*height) + ")")
    				.call(xAxisStacked);
    									
    			stacked_by_month.append("g")
      				.attr("class", "y axis")
      				.attr('transform', "translate(" + (margin+0) + ",0)")
      				.call(yAxisStacked);
      				
      			var tooltip = stacked_by_month.append("g")
  					.attr("class", "tooltip_bar")
  					.style("display", "none");
  					
  				tooltip.append("rect")
  					.attr("width", 30)
  					.attr("height", 20)
  					.attr("fill", "white")
  					.style("opacity", 0.5);
  					
  				tooltip.append("text")
  					.attr("x", 15)
  					.attr("dy", "1.2em")
  					.style("text-anchor", "middle")
  					.attr("font-size", "12px")
  					.attr("font-weight", "bold");
      									
    			var text_label = stacked_by_month.append("text");
            	text_label.attr("text-anchor", "middle")
            		.attr("transform", "translate("+ (25) +","+(((1.05*height)+padding)/2)+")rotate(-90)")
            		.text("Proportion of delayed arrivals by season")
            		.attr("font-size","20px");
    									
    			var stacked_legend = stacked_by_month.append("g")
      				.attr("font-family", "sans-serif")
      				.attr("font-size", 15)
      				.attr("text-anchor", "end")
    				.selectAll("g")
    				.data(fourSeason.slice().reverse())
    				.enter().append("g")
      				.attr("transform", function(d, i) { return "translate(70," + i * 20 + ")"; });
      									
      			stacked_legend.append("rect")
      				.attr("x", width - 19)
      				.attr("width", 19)
      				.attr("height", 19)
      				.attr("fill", new_z);

  				stacked_legend.append("text")
      				.attr("x", width - 24)
      				.attr("y", 9.5)
      				.attr("dy", "0.32em")
      				.text(function(d) { return d; });
				
				/*Transitions to proportion of delay time or number of delayed flights 
				based on radio-button selection*/
				function transitionStacked(new_val) {
					if (new_val === "Count") {
						layer = stacked_by_month.selectAll(".layer").data(reshaped_data);
						text_label.text("Proportion of delayed arrivals by season");
					}
					else {
						layer = stacked_by_month.selectAll(".layer").data(reshaped_data_time);
						text_label.text("Proportion of delay by season");
					}
  				
  					layer.selectAll("rect")
      					.data(function(d) { return d; })
      					.attr("y", function(d) { return y_stacked_abs(d.y + d.y0); })
      					.attr("height", function(d) { return y_stacked_abs(d.y0) - y_stacked_abs(d.y + d.y0); })
      					.on("mouseover", function() { tooltip.style("display", null); })
  						.on("mouseout", function() { tooltip.style("display", "none"); })
  						.on("mousemove", function(d) {
    						var xPosition = d3.mouse(this)[0] - 15;
    						var yPosition = d3.mouse(this)[1] - 25;
    						tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
    						tooltip.select("text").text(Math.round((d.y * 10000) / 100)+"%");
  						});
				}
				
				function changed() {
  					transitionStacked(this.value);
				}
				
				d3.selectAll("input")
    				.on("change", changed);
    			
    			/*Creation of stacked bar chart showing number of flight arrivals 
    			by month across years*/
    			reshaped_d = [], total = [], new_d = [];
    			new_d['Winter'] = 0, new_d['Spring'] = 0, new_d['Summer'] = 0, new_d['Fall'] = 0;
    			var total = 0, spring = 0, fall = 0, summer = 0, winter = 0;
    			nested_by_year_month_new.forEach(function(d) {
    				if (+d.key != 2003 && +d.key != 2016) {
						for (var i=0; i<d.values.length; i++) {
							total += d.values[i].values['traffic_vol'];
							if (+d.values[i].key == 1 || +d.values[i].key == 2 || +d.values[i].key == 12) {
								winter += d.values[i].values['traffic_vol'];
							}
							else if (+d.values[i].key == 3 || +d.values[i].key == 4 || +d.values[i].key == 5) {
								spring += d.values[i].values['traffic_vol'];
							}
							else if (+d.values[i].key == 6 || +d.values[i].key == 7 || +d.values[i].key == 8) {
								summer += d.values[i].values['traffic_vol'];
							}
							else if (+d.values[i].key == 9 || +d.values[i].key == 10 || +d.values[i].key == 11) {
								fall += d.values[i].values['traffic_vol'];
							}
						}
						//reshaped_d.push(new_d);
					}
				});
				
				reshaped_d.push({label: 'Winter', count: winter/total});
				reshaped_d.push({label: 'Spring', count: spring/total});
				reshaped_d.push({label: 'Summer', count: summer/total});
				reshaped_d.push({label: 'Fall', count: fall/total});
				
				var legendRectSize = 18, legendSpacing = 4;
				var arc = d3.svg.arc()
          			.innerRadius(radius - donutWidth)
          			.outerRadius(radius);
				
				var pie = d3.layout.pie()
          			.value(function(d) { return d.count; })
          			.sort(null);
          			
          		var tooltip_pie = d3.select('.stacked_by_airport')
          			.append('div')
          			.attr('class', 'tooltip_pie');
          			
          		tooltip_pie.append('div')
          			.attr('class', 'label');

        		tooltip_pie.append('div')
          			.attr('class', 'percent');
				
				var path = stacked_by_airport.selectAll('path')
            		.data(pie(reshaped_d))
            		.enter()
            		.append('path')
            		.attr('d', arc)
            		.attr('fill', function(d, i) { 
              			return new_z(d.data.label); 
            		});

          		path.on('mouseover', function(d) {
            		var total = d3.sum(reshaped_d.map(function(d) {
              			return d.count;
            		}));
            		var percent = Math.round(1000 * d.data.count / total) / 10;
            		tooltip_pie.select('.label').html(d.data.label);
            		tooltip_pie.select('.percent').html(percent + '%');
            		tooltip_pie.style('display', 'block');
          		});
          
          		path.on('mouseout', function() {
            		tooltip_pie.style('display', 'none');
          		});
      				
      			var legend = stacked_by_airport.selectAll('.legend')
            		.data(fourSeason)
            		.enter()
            		.append('g')
            		.attr('class', 'legend')
            		.attr('transform', function(d, i) {
              		var height = legendRectSize + legendSpacing;
              		var offset =  height * fourSeason.length / 2;
              		var horz = -2 * legendRectSize;
              		var vert = i * height - offset;
              		return 'translate(' + horz + ',' + vert + ')';
            	});

          		legend.append('rect')
            		.attr('width', legendRectSize)
            		.attr('height', legendRectSize)                                   
            		.style('fill', new_z)
            		.style('stroke', new_z);
            		
            	legend.append('text')
            		.attr('x', legendRectSize + legendSpacing)
            		.attr('y', legendRectSize - legendSpacing)
            		.text(function(d) { return d; });
            		
            	stacked_by_airport.append("text")
        			.attr("x", (0))             
        			.attr("y", -170)
        			.attr("text-anchor", "middle")  
        			.style("font-size", "20px")
        			.text("Proportion of Total Flight Arrivals by Season");
      		}
		}