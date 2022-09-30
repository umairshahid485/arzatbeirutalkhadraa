//$('.alert').delay(2000).fadeOut('slow');

$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

$(document).ready(function(){
    $('.portlet-body .table').DataTable({
        scrollY:        false,
        scrollX:        false,
        scrollCollapse: false,
        paging:         true,
        columnDefs: [
            { width: '20%', targets: 0 }
        ],
        fixedColumns: true
    });
});

$('.openform').click(function(){
    $('.formtoggle').toggleClass('hide','active');
});

function user_delete(uid)
{
      //var conf = confirm("Are you sure want to delete??");
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this !",//imaginary file!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, Delete It!",
            cancelButtonText: "No, Cancel Please!",
            closeOnConfirm: true,
            closeOnCancel: true
        },
        function(isConfirm){
            if ( isConfirm === true ) {
                var user_delete = $("#user_delete").val();
                $.ajax({
                  url: user_delete,
                  type:"GET",
                  data: {"id":uid},
                  success: function(response){
                      swal("Deleted!", ""+response+"", "success");
                    location.reload();
                  }
                });
              }
              else{
                return false;
              }
        });
}


function code_delete(cid)
{
      //var conf = confirm("Are you sure want to delete??");
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this !",//imaginary file!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, Delete It!",
            cancelButtonText: "No, Cancel Please!",
            closeOnConfirm: true,
            closeOnCancel: true
        },
        function(isConfirm){
            if ( isConfirm === true ) {
                var user_delete = $("#code_delete").val();
                $.ajax({
                  url: user_delete,
                  type:"GET",
                  data: {"id":cid},
                  success: function(response){
                      swal("Deleted!", ""+response+"", "success");
                    location.reload();
                  }
                });
              }
              else{
                return false;
              }
        });
}

function getUserDomains(userid) {
    var user_domains = $("#userdomains").val();
    var token = $("#token").val();
    $.ajax({
        url: user_domains,
        type:"POST",
        data: {"user_id":userid,_token: token},
        success: function(response){
            $('#user_domains').html(response.html);
        }
    });
}

function domain_delete(did)
{
    swal({
            title: "Are you sure?",
            text: "You will not be able to recover this !",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, Delete It!",
            cancelButtonText: "No, Cancel Please!",
            closeOnConfirm: true,
            closeOnCancel: true
        },
        function(isConfirm){
            if ( isConfirm === true ) {
                var domain_delete = $("#domain_delete").val();
                $.ajax({
                    url: domain_delete,
                    type:"GET",
                    data: {"id":did},
                    success: function(response){
                        swal("Deleted!", ""+response+"", "success");
                        location.reload();
                    }
                });
            }
            else{
                return false;
            }
        });
}
