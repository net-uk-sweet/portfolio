(function() {

    $("[data-portfolio]").fancybox({
        'scrolling'			: 'no',
        'titleShow'			: false,
        'height'			: 'auto',
        'showCloseButton'	: false,
        'showNavArrows'		: false,
        'cyclic'			: true,
        'onStart'			: function() {
            
            $("div.portfolio").show();

            $("div.content").each(function() {
                $this = $(this);
                $retracto = $this.children("a.retracto");
                
                var symbol;
                var y;
                
                if ($hidden) {
                    symbol = "[ ? ]";
                    y = -$this.height() + $retracto.height();
                } else {
                    symbol = "[ v ]";
                    y = 0;						
                }

                $this.css({'bottom': y});
                $retracto.text(symbol);		
            });
                        
            $("div.portfolio").hide();
            $(".pagination").hide();
        }
    });

    $("#form").fancybox({
        'scrolling'			: 'no',
        'titleShow'			: false,
        'height'			: 'auto',
        'showCloseButton'	: false,
        'onClosed'			: function() {
            $(".form_output").hide();
            $(":input").val("").attr('disabled', false);
            $("a.submit").show();
        }
    });

    $(".form_output").hide();

    $("a.submit").click(function() {
        
        var id = "";
        
        var name = $("#contact_name").val(); 
        var email = $("#contact_email").val();
        var message = $("#contact_message").val();
        
        if (name.length < 1) {
            id = "#error_name";
        } else if (email.length < 1) {
            id = "#error_email";
        } else if (message.length < 1) {
            id = "#error_message";
        } 
        
        if (id != "") {
            $(id).fadeIn("slow");
            return false;
        } else {
            //$.fancybox.showActivity();
            var inputs = $(":input");
            inputs.attr('disabled', true);
            $(this).hide();
            $.ajax({
                type	: "POST",
                cache	: false,
                url		: "scripts/Contact.php",
                data	: "name=" + name + "&email=" + email + "&message=" + message,
                success: function(data) {
                    var id = (data == "true") ? "#send_success" : "#send_fail";
                    $.fancybox.hideActivity();
                    $(id).fadeIn("slow");
                    /*inputs.attr('disabled', false);*/
                    inputs.val("");
                }
            });
        
            return false;				
        }
    });

    $(":input").focus(function() {
        $(".form_output").fadeOut("fast");
    });

    var $hidden = true;
    var y; 
    var symbol;

    $('a.retracto').click(function() {
        $this = $(this);
        $hidden = !$hidden;
        y = $hidden ? -$this.parent().height() + $this.height() : 0;
        $('div.content').animate({
            'bottom': y}, 
            "slow",
            function() {
                $this.text($hidden ? "[ ? ]" : "[ v ]");
            }
        );
    });

    $('a.close').click(function() {
        $.fancybox.close();
    });

    $('a.next').click(function() {
        $.fancybox.next();
    });

    $('a.prev').click(function() {
        $.fancybox.prev();
    });	

    $("article.fancy_wrapper").hover(
        function(){
            //console.log("show");
            $('.pagination').show();	
        },
        function(){
            //console.log("hide");
            $('.pagination').hide();			
        }
    );
}());