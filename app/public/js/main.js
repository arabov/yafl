/**
 * Created by dev on 18.03.14.
 */


$(function() {

    $('#submit').click(function(event) {

        $.ajax({
            type: 'POST',
            url: $('#method').val(),
            data: {
                global: $('#global').val(),
                year: $('#year').val(),
                number: $('#number').val(),
                val: $('#value').val()
            }
        }).done(function(data, textStatus, jqXHR) {
                $('#result').text(data.toString());
                //console.log(data);
            }).fail(function(jqXHR, textStatus, errorThrown) {
                console.error('Ajax error');
            });

        return false;
    });
});