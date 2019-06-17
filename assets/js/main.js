showHashPage = function(){
	$("body, html").animate({scrollTop:0}, 1000, "swing");
	switchPage(location.hash);
};

function switchPage(hash){
	var prev_hash = switchPage.prev;

	if(!hash){
		hash = "#top";
		$('nav').fadeOut(500);
	}

	var showContents = function(){
		$(hash).fadeIn(1000);
		if(hash !== '#top')
			$('nav').fadeIn(1000);
	};

	if(prev_hash)
		$(prev_hash).fadeOut(500, showContents);
	else
		showContents();
	switchPage.prev = hash;
}

function init_activity(json){
	$.getJSON(json, function(data){
		$.each(data, function(i, yitem){
			$("#activity .container ul").append('<li role="presentation"><a href="javascript:void(0)">' + yitem.year + '</a></li>');
			$("#activity .container").append('<div class="activity-panel" id="' + yitem.year + '"></div>');
			$.each(yitem.contents, function(j, mitem){
				if(mitem.length){
					$("#" + yitem.year).append('<div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">' + (j+1) + '月</h3></div><div class="panel-body"><dl></dl></div></div>');
					$.each(mitem, function(k, entry){
						$("#" + yitem.year).find('dl:last').append('<dt>' + entry.title + ' (' + entry.date + ')</dt><dd>' + entry.detail + '</dd>');
					});
				}
			});
		});

		$("#activity .nav-tabs li").click(function(event) {
			$("#activity .nav-tabs li").removeClass("active");
			$(this).addClass('active')

			$(".activity-panel").hide();
			$("#" + event.target.innerText).fadeIn(400);
		});

		$("#activity .nav-tabs li:first").addClass("active")
		$(".activity-panel:first").show()
	});
}

$(function(){
	$("#gnavi .navbar-nav li a:not(.dropdown-toggle), .navbar-brand").click(function(event) {
		$(".navbar-collapse").collapse('hide');
	});

	init_activity("assets/contents/activity.json");

	$(window).bind('hashchange', showHashPage);
	showHashPage();
});
