$(document).ready(function() {

	var result;
    $.ajax({
        type: "GET",
        url: "contracts.csv",
        dataType: "text",
        success: function(data) {parseToObject(data);}
     });

    $('.contract-name').on("click",function(e)
	{
		console.log(e.delegateTarget.dataset.id);
		//alert("hello");
	});
});

function parseToObject(input){
	//console.log(input);
	var text;
	var lis = '';
	result = $.csv.toObjects(input);
	console.log(result[2].Amount);
	for (i = 0; i < result.length; i++) { 

    	lis += "<li id='"+i+"' class='contract-name' onClick='loadContractData(this.id)'><a href='#'>"+result[i].contractname+"</a></li>"
		}

		 $("#contact-list").append(lis);
    loadContractData(0);
	
}

function loadContractData(id){

	var values = '';
	values += "<li>Contract Name :"+result[id].contractname+"</li>"
	values += "<li>Status :"+result[id].status+"</li>"
	values += "<li>bidPurchaseDeadline :"+result[id].bidPurchaseDeadline+"</li>"
	values += "<li>bidSubmissionDeadline :"+result[id].bidSubmissionDeadline+"</li>"
	values += "<li>bidOpeningDate :"+result[id].bidOpeningDate+"</li>"
	values += "<li>tenderid :"+result[id].tenderid+"</li>"
	values += "<li>publicationDate :"+result[id].publicationDate+"</li>"
	values += "<li>publishedIn :"+result[id].publishedIn+"</li>"
	values += "<li>contractDate :"+result[id].contractDate+"</li>"
	values += "<li>completionDate :"+result[id].completionDate+"</li>"
	values += "<li>awardee :"+result[id].awardee+"</li>"
	values += "<li>awardeeLocation :"+result[id].awardeeLocation+"</li>"
    values += "<li>Amount :"+result[id].Amount+"</li>"


	document.getElementById("contract-detail").innerHTML = "";
	$("#contract-detail").append(values);
	if(result[id].latlon == null || result[id].latlon == '')
	{
			document.getElementById("googleMap").innerHTML = "";
	}
	else{

			var latlon = result[id].latlon;

			var commaPos = latlon.indexOf(',');
			var coordinatesLat = parseFloat(latlon.substring(0, commaPos));
			var coordinatesLong = parseFloat(latlon.substring(commaPos + 1, latlon.length));
             var mapProp = {
                    center:new google.maps.LatLng(28.2639,84.4333),
                    zoom:6,
                    mapTypeId:google.maps.MapTypeId.ROADMAP
                  };
			  var map=new google.maps.Map(document.getElementById("googleMap"), mapProp);
			  var myLatlng = new google.maps.LatLng(coordinatesLat,coordinatesLong);
			  var marker = new google.maps.Marker({
			      position: myLatlng,
			      map: map
			  });

			  google.maps.event.addDomListener(window, 'load',initialize);


	}
				
}

function initialize(){

    var latlon = result[id].latlon;

    var commaPos = latlon.indexOf(',');
    var coordinatesLat = parseFloat(latlon.substring(0, commaPos));
    var coordinatesLong = parseFloat(latlon.substring(commaPos + 1, latlon.length));
    var mapProp = {
        center:new google.maps.LatLng(28.2639,84.4333),
        zoom:6,
        mapTypeId:google.maps.MapTypeId.ROADMAP
    };
    var map=new google.maps.Map(document.getElementById("googleMap"), mapProp);
    var myLatlng = new google.maps.LatLng(coordinatesLat,coordinatesLong);
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map
    });
}