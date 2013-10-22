$(function() {
	//Update sharing links
	$('.shareFb').attr('href', 'http://www.facebook.com/sharer/sharer.php?u='+document.URL);	
	$('.shareFb').attr('onclick', "return popitup('http://www.facebook.com/sharer/sharer.php?u="+document.URL+"')");
	$('.shareTw').attr('href', 'http://twitter.com/intent/tweet?url='+document.URL+'&text=Follow%20the%20money%20in%20Oil%20and%20Gas%20with%20Funnel!&related=wr');	
	
    // variable holding the list of years in review.
    var years = [];
    // variable holding the list of amounts within its consecutive year.
    var amounts = [];
    // colors for the nuts in a doughnut chart.
    var nut_colors = ["#F7852B", "#2DB8E9", "#A288D5", "#114F5D", "#EB3E38", "#34C8CA"];
    // the currently active chart-style.
    var chart_style = "line";

    // Draws charts based on a chart-style.
    function draw_chart(chart_style) {
        // create a new chart canvas.
        // var canvas_div = document.createElement('canvas');
        // canvas_div.setAttribute('width', 570);
        // canvas_div.setAttribute('height', 370);
        // $('#chart-div').html('').append(canvas_div);
        $('#chart-div').html($('canvas').attr('width', 570).attr('height', 370).attr('id', 'chart'));

        if (chart_style === "line") {
            var data = {
                labels : years,
                datasets : [
                    {
                        fillColor : "rgba(79,107,181,0.5)",
                        strokeColor : "rgba(57,77,133,1)",
                        pointColor : "rgba(43,60,105,1)",
                        pointStrokeColor : "#fff",
                        data : amounts
                    }
                ]
            }
            // retrieve the canvas' context.
            var ctx = $('#chart').get(0).getContext("2d");
            $('#chart').fadeOut(50, function() {
                 $('#chart').fadeIn();
                // draw the chart.
                new Chart(ctx).Line(data, { showTooltips: true });
            });
        } else if (chart_style === "bar") {
            var data = {
                labels : years,
                datasets : [
                    {
                        fillColor : "rgba(79,107,181,0.5)",
                        strokeColor : "rgba(57,77,133,1)",
                        data : amounts
                    },
                ]
            }
            // retrieve the canvas' context.
            var ctx = $('#chart').get(0).getContext("2d");
            $('#chart').fadeOut(50, function() {
                $('#chart').fadeIn();
                // draw the chart.
                new Chart(ctx).Bar(data);
            });
        } else if (chart_style === "doughnut") {
            var data = [];

            // retrieve all the amounts.
            for (var index in amounts) {
                // the revenue's amount.
                var amount = amounts[index];

                // add more data for the doughnut-chart.
                data.push({
                    "value": amount,
                    "color": nut_colors[index],
                    "label": years[index]
                });
            }
            // retrieve the canvas' context.
            var ctx = $('#chart').get(0).getContext("2d");
            $('#chart').fadeOut(50, function() {
                $('#chart').fadeIn();
                // draw the chart.
                new Chart(ctx).Doughnut(data);
            });
        }
        // $("#chart").width(570).height(370)
    }

    /**
     * Selects a revenue stream based on a revenue stream name.
     */
    function select_revenue_stream(stream_name) {
        years = [];
        amounts = [];

        // iterate through the array of revenue data.
        for (var index in data) {
            var rev = data[index];

            // match selected revenue stream.
            if (rev['stream_name'] === stream_name) {
                // retrieve the actual revenue data.
                if (rev.revenue) {
                    for (var i in rev.revenue) {
                        // revenue data.
                        var revenue = rev.revenue[i];
                        // year series.
                        years.push(revenue.year);
                        // amount values.
                        amounts.push(revenue.amount);
                    }
                }
            }
        }

        // draw a chart only when the chart style is available.
        if (years.length !== -1) {
            draw_chart(chart_style);
        }
    }

    // bind the revenue stream buttons to an appropriate event.
        $('.revenue-stream a').on('click', function(e) {
        	e.preventDefault();
        	
            // retrieve the stream name.
            var stream_name = $(this).parent('li').data('stream');
            // retrieve the short content.
            // var short_content = $(this).data('short-content');
            // retrieve the large content.
            var large_content = $(this).parent('li').data('content');
            select_revenue_stream(stream_name);
            
            //Get explanation
            var exp = $(this).parent('li').data('explanation');
    
            $(".revenue-tabs li").removeClass("active")
            $(this).parent("li").addClass("active")
    
    		if(typeof exp !== 'undefined') {
    			$('.revenue-explanation-cont').fadeOut(50).html('<span class="triangle"></span>'+'<span class="revenue-explanation">'+exp+'</span>').fadeIn(100);
    			$('.revenue-header').css({'text-decoration':'underline'});
    		}
    		else {
    			$('.revenue-explanation-cont').css({'display':'none'});
    			$('.revenue-header').css({'text-decoration':'none'});
    		}
    		
            $('.revenue-header .revenue-span').fadeOut(50).html(stream_name).fadeIn(100);
            $('.revenue-content').fadeOut(50).html(large_content).fadeIn(100);
        });

    // bind the chart-style buttons to an appropriate event.
    $('.chart-style').on('click', function() {
        // retrieve the chart-style name.
        chart_style = $(this).data('chart');
        draw_chart(chart_style);
        return false;
    });
    // select the default revenue stream.
    select_revenue_stream('Sales from Crude Oil and Gas');

    var limitChar = function(string, limit) {
      return string.substring(0, limit) + "..."
    }

    $(".chart-style").on("click", function() {
        var $legend = $(".legend")
        $(this).attr("data-chart") === "doughnut" ? $legend.show() : $legend.hide()
    })
});