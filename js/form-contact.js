$(document).ready(function() {
    $('form#contact-form').submit(function(e) {
        e.preventDefault(); // Prevent default form submission

        $('form#contact-form .error').remove(); // Remove any existing error messages
        var hasError = false;

        $('.requiredField').each(function() {
            if ($.trim($(this).val()) === '') {
                var labelText = $(this).attr('placeholder');
                $(this).parent().append('<span class="error">You forgot to enter your ' + labelText + '</span>');
                $(this).addClass('inputError');
                hasError = true;
            } else if ($(this).hasClass('email')) {
                var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                if (!emailReg.test($.trim($(this).val()))) {
                    var labelText = $(this).attr('placeholder');
                    $(this).parent().append('<span class="error">You entered an invalid ' + labelText + '</span>');
                    $(this).addClass('inputError');
                    hasError = true;
                }
            }
        });

        if (!hasError) {
            $('form#contact-form input.submit').fadeOut('normal', function() {
                $(this).parent().append('');
            });

            $("#loader").show(); // Show loader

            $.ajax({
                url: "contact.php",
                type: "POST",
                data: new FormData(this),
                contentType: false,
                cache: false,
                processData: false,
                success: function(data) {
                    $('form#contact-form').slideUp("fast", function() {
                        $(this).before('<div class="success">Thank you. Your Email was sent successfully.</div>');
                        $("#loader").hide(); // Hide loader on success
                    });
                },
                error: function(xhr, status, error) {
                    console.error('AJAX error: ' + status + ' - ' + error);
                    $("#loader").hide(); // Hide loader on error
                }
            });

            return false; // Prevent default form submission
        }
    });
});
