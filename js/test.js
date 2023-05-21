let openApi = new Openai("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");
/**
openApi.listModels().then(function (value) {

    console.log(value);
}, function (error) {

});
 **/

/**
openApi.retrieveModel(Openai.TEXT_DAVINCI_003).then(function (value) {

    alert(JSON.stringify(value));

}, function (error) {

});
 **/


/**
openApi.createCompletion(Openai.TEXT_DAVINCI_001, "capital of uganda is").then(function (value) {


    alert(JSON.stringify(value));
}, function (error) {

});
**/

/**
messages = [{role: "user", content: "Hello!"}];
openApi.createChatCompletion(Openai.GPT_3_5_TURBO, messages).then(function (value) {


    alert(JSON.stringify(value));
}, function (error) {

});
**/

/**
openApi.createEdit(Openai.TEXT_DAVINCI_EDIT_001, "What day of the wek is it?", "Fix the spelling mistakes").then(function (value) {

    alert(JSON.stringify(value));

}, function (error) {

})
 **/

openApi.createImage("nairobi in 2050").then(function (value) {

    let url = value.data[0].url;

    console.log(url);
    alert(url);

}, function (error) {

})

