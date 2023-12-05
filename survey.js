$(document).ready(function(){
$("#kerdoiv").validate({
rules: {
    szulev: {
        required: true,
        number: true,
        minlength: 4,
        maxlength: 4,
    },
    email : {
        email: true,
        required: true,
    },
    honnan: "required",
    hova: "required",
    why: "required",
},

messages: {
    szulev: "Kérjük érvényes születési évet adjon meg!",
    email: "Kérjük valós email címet adjon meg!",
    honnan: "Kérjük adjon meg egy országot/várost!",
    hova: "Kérjük adjon meg egy országot/várost!",
    why: "Kérjük indokolja meg röviden, miért ezeket a helyszíneket választotta!",


},
});
});