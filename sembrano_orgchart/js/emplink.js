
var arr = [];
var chart;
$.ajax({
        url: "http://58.69.15.211:8080/api/user/orgChart/?token=c1f22a6d7f7615cfd890c4507c1f231f",
        type: 'post',
        data: params,
        xhr: function () {
            var xhr = new window.XMLHttpRequest();
            xhr.addEventListener("progress", function (evt) {
                if (evt.lengthComputable) {
                    var percentComplete = evt.loaded / evt.total;
                    $('.progress .progress-bar')({
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
        var row = '';
        //display initial layouts first
        $.each(json['list'],function(key,val){
            var eppScore = 0;
            $.each(json['eppList'],function(eppKey,eppVal){
                if(eppVal['employee_id'] == val['employee_id']) {
                    eppScore = eppVal['epp_score'];
                }
            });
            if(key == 0){
                var temp = '{ "id": "1","position":"'+val['position']+'",';
                temp += '"employee_type": "'+val['employee_type']+'",';
                temp += '"role": "'+val['role']+'",';
                temp += '"eppScore": "'+eppScore+'",';
                if(val['profile_image'] != null || val['profile_image'] != ""){
                  temp += '"img": "'+val['profile_image']+'",';
                }else{
                  temp += '"img": "/wordpress/wp-content/themes/sembrano_orgchart/image/avatar.png",';
                }
                temp += '"employee_id": "'+appendZeros(val['employee_id'])+'",';
                temp += '"name": "'+val['first_name'] + " " + val['last_name']+'" }';
                arrText = temp;
            } else {
                var temp = ',{ "id": "'+val['employee_id']+'",';
                temp += '"pid": "'+val['reporting_manager']+'",';
                if(val['profile_image'] != null || val['profile_image'] != ""){
                  temp += '"img": "'+val['profile_image']+'",';
                }else{
                  temp += '"img": "/wordpress/wp-content/themes/sembrano_orgchart/image/avatar.png",';
                }
                temp += '"position": "'+val['position']+'",';
                temp += '"employee_type": "'+val['employee_type']+'",';
                temp += '"role": "'+val['role']+'",';
                temp += '"eppScore": "'+eppScore+'",';
                temp += '"employee_id": "'+appendZeros(val['employee_id'])+'",';
                temp += '"name": "'+val['first_name'] + " " + val['last_name']+'" }';
                arrText += temp;
                //arrText += ',{ "id": "'+val['employee_id']+'", "employee_id": "'+appendZeros(val['employee_id'])+'", "name": "'+val['first_name'] + " " + val['last_name']+'" }';
               // arrText += ',{ "id": '+val['employee_id']+',"position":"Employee", "pid": '+val['reporting_manager']+', "employee_id": "'+appendZeros(val['employee_id'])+'", "name": "'+val['first_name'] + " " + val['last_name']+'" }';
            }
        });
        var arrNode = [];
        chart = new OrgChart(document.getElementById("tree"), {
            lazyLoading: true,
            enableSearch: false,
            toolbar: false,
            showYScroll: BALKANGraph.scroll.visible, 
            mouseScrool: BALKANGraph.action.yScroll,
            layout: BALKANGraph.tree,
            scaleInitial: BALKANGraph.match.width,
            nodeMouseClick: BALKANGraph.action.none,
            nodeBinding: {
                field_0: "name",
          //      field_1: "employee_id",
                field_2: "position",
          //      field_3: "employee_type",
          //      field_4: "eppScore",
                img_0: "img",
            },
            collapse: {
                level: 2,
                allChildren: true
            },
        });
        $("#tree a").hide();
        //chart.highlightNode();
        chart.center(logged_in_user);
        $("#tree div").remove();
        //chart.zoom(2);
    }).fail(function (e) {
        // Do something
    });