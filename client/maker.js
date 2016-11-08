$(document).ready(function() {

    const handleError = (message) => {
        $("#errorMessage").text(message);
        alert(message); 
    }
    
    const sendAjax = (action, data) => {
        $.ajax({
            cache: false,
            type: "POST",
            url: action,
            data: data,
            dataType: "json",
            success: (result, status, xhr) => {
                 alert("sucess"); 
                window.location = result.redirect;
            },
            error: (xhr, status, error) => {
                const messageObj = JSON.parse(xhr.responseText);
                handleError(messageObj.error);
            }
        });        
    }
    
    $("#makeMonsterSubmit").on("click", (e) => {
        console.log("clicked");
        e.preventDefault();
        if($("#name").val() == '' || $("#envorment").val() == ''
          || $("#dc").val() == '' || $("#numDie").val() == ''
          || $("#die").val() == '' || $("#plus").val() == ''
          || $("#str").val() == '' || $("#int").val() == ''
          || $("#wis").val() == '' || $("#dex").val() == ''
          || $("#con").val() == '' || $("#cha").val() == '') {
            handleError("RAWR! All fields are required");
            return false;
        }
        sendAjax($("#monsterForm").attr("action"), $("#monsterForm").serialize());
        
        return false;
    });
    
});