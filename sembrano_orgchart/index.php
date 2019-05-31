<?php get_header(); ?>

<div id="orgchart"></div>


<script>
	let url = 'http://58.69.15.211:8080/api/user/orgChart/?token=c1f22a6d7f7615cfd890c4507c1f231f';

	var listData = '';
    var arrText = '';
    $.ajax({
        url: url,
        type: 'post',
        xhr: function () {
            var xhr = new window.XMLHttpRequest();
            xhr.addEventListener("progress", function (evt) {
                if (evt.lengthComputable) {
                    var percentComplete = evt.loaded / evt.total;
                    $('.progress .progress-bar').css({
                        width: percentComplete * 100 + '%'
                    });
                    if (percentComplete === 1) {
                    }
                }
            }, false);
            return xhr;
        },
    }).done(function (e) {
		var json = JSON.parse(e);
		// console.log(json);
			var row = '';
			var inArr = [];
			var dataArr = [];
			$.each(json['list'],function(key,val){
				if (val['reporting_manager'] != null && val['reporting_manager'] != "null" && val['reporting_manager'] != NaN) {
					dataArr.push(val['employee_id']);
				}
			});
			setTimeout(function(){
				$.each(json['list'],function(key,val){
					if ($.inArray(val['reporting_manager'],dataArr) >= 0) {
						if (val['reporting_manager']==105)console.log(val['reporting_manager']);
						var eppScore = 0;
						$.each(json['eppList'],function(eppKey,eppVal){
							if (eppVal['employee_id'] == val['employee_id']) {
								eppScore = eppVal['epp_score'];
							}
						});
						if(key == 0){
		                    var temp = '{ "id": "1","position":"'+val['position']+'",';
		                    temp += '"employee_type": "'+val['employee_type']+'",';
		                    
		                      temp += '"img": "/wordpress/wordpress/wp-content/themes/sembrano_orgchart/image/avatar.png",';
		               
		                    temp += '"name": "'+val['first_name'] + " " + val['last_name']+'" }';
		                    arrText = temp;
		                } else {
		                    var temp = ',{ "id": "'+val['employee_id']+'",';
		                    temp += '"pid": "'+val['reporting_manager']+'",';
		           
		                      temp += '"img": "/wordpress/wordpress/wp-content/themes/sembrano_orgchart/image/avatar.png",';
		                
		                    temp += '"position": "'+val['position']+'",';
		                    temp += '"name": "'+val['first_name'] + " " + val['last_name']+'" }';
		                    arrText += temp;
		                }
					}
				})
				console.log(arrText)
			
				var chart = new OrgChart(document.getElementById("orgchart"), {
				template: "luba",
				enableSearch: true,
				nodeBinding:{
					field_0: "name",
					field_1: "position",
					img_0: "img"
				},
				collapse: {
                  level: 2,
                  allChildren: true
              },
				nodes: JSON.parse("["+arrText+"]")

			});
		})
	})
			
</script>

<?php get_footer(); ?>
