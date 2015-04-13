$(function(){

    $('.go').on('click', function(){

        var origin = $('.origin').val();
        var user   = $('.user').val();
        var repo   = $('.repo').val();
        var path   = $('.path').val();
        vizualize(origin, user, repo, path)
        return false
    });
    //Config you presentation source

    function vizualize(origin, user, repo, path){

      if(origin == 'github'){
        var request = $.getJSON('https://api.github.com/repos/'+user+'/'+repo+'/contents/'+path, function(data) {
            $.each( data, function( key, val ) {
              if(key == 0){
                $('.presenter').append("<li class='is-active'><img src='"+data[key].download_url+"'/></li>");
              } else {
                $('.presenter').append("<li><img src='"+data[key].download_url+"'/></li>");
              }
            });
        })
      } else if(origin == 'bitbucket'){
        var request = $.getJSON('https://api.bitbucket.org/1.0/repositories/'+user+'/'+repo+'/src/master/'+path+'?callback=?', function(data) {
            $.each( data.files, function( key, val ) {
              if(key == 0){
                $('.presenter').append("<li class='is-active'><img src='https://bytebucket.org/"+user+"/"+repo+"/raw/master/"+data.files[key].path+"'/></li>");
              } else {
                $('.presenter').append("<li><img src='https://bytebucket.org/"+user+"/"+repo+"/raw/master/"+data.files[key].path+"'/></li>");
              }
            });
        })
      }

      request.complete(function() {
        $('a.next').on('click', function(){
          next()
          return false
        })
        $('a.prev').on('click', function(){
          prev()
          return false
        })

        $(document).keydown(function(e) {
          switch(e.which) {
            case 37: // left
              prev()
            break;

            case 38: // up
            break;

            case 39: // right
              next()
            break;

            case 40: // down
            break;

            default: return; // exit this handler for other keys
          }
          e.preventDefault(); // prevent the default action (scroll / move caret)
        });

        $('form, .bg, .logo').remove();
      });
    }

    function next(){
      if(!$('.is-active').is(':last-child')){
        $('.is-active').next().addClass('is-active');
        $('.is-active').prev().removeClass('is-active')
      } else {
        $('.is-active').removeClass('is-active')
        $('.presenter li:first-child').addClass('is-active');
      }
      return false
    }

    function prev(){
      if(!$('.is-active').is(':first-child')){
        $('.is-active').prev().addClass('is-active');
        $('.is-active').next().removeClass('is-active')
      } else {
        $('.is-active').removeClass('is-active')
        $('.presenter li:last-child').addClass('is-active');
      }
      return false
    }

    //vizualize("github", "vitormargis", "vizualize", "presenter/ossos")
    //vizualize("bitbucket", "myvizir", "ui-onmove", "apresentacao/wireframes")


    var hash = window.location.hash;
    console.log(hash)

    if (hash == "#ticketcar"){
      vizualize("bitbucket", "myvizir", "ui-ticketcar", "apresentacao")
    } else if (hash == "#onmove"){
      vizualize("bitbucket", "myvizir", "ui-onmove", "apresentacao/wireframes")
    }

});
