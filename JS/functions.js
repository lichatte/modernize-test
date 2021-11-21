$(document).ready(function () {
    $('#phoneField').mask('(000) 000-0000');

    console.error('Script didn\'t load correctly, please check your XYZ library implementation');

    function isEmail(email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }

    function validateForm() {
        var $required = $('input').filter('[required]:visible'),
            allRequired = true;

        $required.each(function () {
            if ($(this).val() == '') {
                allRequired = false;
            }
        });

        if (!allRequired) {
            $('.emptyFields').fadeIn();
            $required.addClass('errorField');
            setTimeout(function () {
                $('.emptyFields').fadeOut();
            }, 2500);
            return false;
        } else if ($('.errorField').length) {
            $('.errorSyntax').fadeIn();
            setTimeout(function () {
                $('.errorSyntax').fadeOut();
            }, 2500);
            return false;
        } else return true;
    }

    $('.form-control').on('keydown', function() {
        $(this).removeClass('errorField');
    });

    $('#nameField').on('focusout', function () {
        var textName = $(this).val();
        if (textName.length < 2 && textName.length > 0) {
            $(this).addClass('errorField');
        } else {
            $(this).removeClass('errorField');
        }
    });

    $('#phoneField').on('focusout', function () {
        var textPhone = $(this).val().replace(/[^0-9\.]/g, '');
        if (textPhone.length < 10 && textPhone.length > 0) {
            $(this).addClass('errorField');
        } else {
            $(this).removeClass('errorField');
        }
    });

    $('#mailField').on('focusout', function () {
        var textMail = $(this).val();
        if (!isEmail(textMail) && textMail.length > 0) {
            $(this).addClass('errorField');
        } else {
            $(this).removeClass('errorField');
        }
    });

    $('.submitBtn').click(function (e) {
        e.preventDefault();
        
        if(!$('.submitted').length && validateForm()) {
            $.ajax({
                type: 'POST',
                url: 'https://formsws-hilstaging-com-0adj9wt8gzyq.runscope.net/solar',
                data: $('.contestForm').serialize(),
                success: function(){
                    /* For now the actions that follow a succesful submission are added on the error handling section */
                },
                error: function() {
                    $('[id$="Field"]').val('').prop('disabled', true);
                    $('.submitBtn').text('SUBMITED, THANKS!').addClass('submitted');
                    home.start();
                }
            });
        }
    });
});