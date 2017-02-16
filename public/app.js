$(document).ready(function(){
  function deleteBear(e) {
    e.preventDefault();
    var bearId = $(this).attr('id');

    $.ajax({
      url: '/api/bears/' + bearId,
      method: 'DELETE'
    }).done(function(d){
      console.log(d, "Successfully deleted bear");
      window.location = "/view"
    });
  }

  $(".deleteBtn").on('click', deleteBear)

});
