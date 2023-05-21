# OPen AI JavaScript-SDK
Ths is an unofficial wrapper for the Chat GPT API in Vanilla Javascript

## Getting Started
Works with Javascript ***ES6*** syntax

Ensure that you have generated your **API KEY** from Open AI and **kindly note** 
client side Javascript does not support loading values from environment variables.

### initialize api

```javascript
let openAi = new Openai("API KEY");
```

## Usage

### Models
All models are static and can be accessed using the openAi object
```javascript

    openAi.GPT_4;
    openAi.GPT_4_03014;
    openAi.GPT_4_32K;
    openAi.GPT_4_32K_0314;
    openAi.GPT_3_5_TURBO;
    openAi.GPT_3_5_TURBO_0301;

    ///v1/completions
    openAi.TEXT_DAVINCI_003;
    openAi.TEXT_DAVICNCI_002;
    openAi.TEXT_DAVINCI_001;
    openAi.TEXT_CURIE_001;
    openAi.TEXT_CABBAGE_001;
    openAi.TEXT_ADA_001;

    ///v1/edits
    openAi.TEXT_DAVINCI_EDIT_001;
    openAi.CODE_DAVINCI_EDIT_001;

    ///v1/fine-tunes
    openAi.DAVINCI;
    openAi.CURIE;
    openAi.BABBAGE;
    openAi.ADA;
    ///v1/embeddings
     openAi.TEXT_EMBEDDING_ADA_002;
     openAi.TEXT_SEARCH_ADA_DOC_001;

    ///v1/moderations
    openAi.TEXT_MODERATION_STABLE;
    openAi.TEXT_MODERATION_LATEST;

    /**
    /v1/audio/transcriptions
    /v1/audio/translations*
     */
    openAi.WHISPER_1;

```

### List models

Lists the currently available models, and provides basic information about each one such as the owner and availability.

```javascript
openAi.listModels().then(function (value) {

    //returns json
    console.log(value);
}, function (error) {

});
```

### Retrieve Model

Retrieves a model instance, providing basic information about the model such as the owner and permissioning.
```javascript
openAi.retrieveModel(MODELNAME).then(function (value) {

    //returns json
    console.log(value);

}, function (error) {

});
```

