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
https://platform.openai.com/docs/api-reference/models/list
```javascript
openAi.listModels().then(function (value) {

    //returns json
    console.log(value);
}, function (error) {

});
```

### Retrieve Model

Retrieves a model instance, providing basic information about the model such as the owner and permissioning.
https://platform.openai.com/docs/api-reference/models/retrieve
```javascript
openAi.retrieveModel(MODELNAME).then(function (value) {

    //returns json
    console.log(value);

}, function (error) {

});
```

### Create Completion 

Creates a completion for the provided prompt and parameters.
https://platform.openai.com/docs/api-reference/completions/create

```javascript
openAi.createCompletion(model, prompt = "<|endoftext|> ", suffix = null, max_tokens = 16, temperature = 1, top_p = 1, n = 1, stream = false, logprobs = null, echo = false, stop = null, presence_penalty = 0, frequency_penalty = 0, best_of = 1,  logit_bias = null, user = null).then(function (value) {

    //returns json
    console.log(value);

}, function (error) {

});

```

### Create Chat Completion

Creates a completion for the chat message.
https://platform.openai.com/docs/api-reference/chat

```javascript

openAi.createChatCompletion(model, messages, temperature = 1, top_p = 1, n = 1, stream = false, stop = null, max_tokens = null,  presence_penalty = 0, frequency_penalty = 0, logit_bias = null, user = null)
.then(function (value) {

    //returns json
    console.log(value);

}, function (error) {

});


```
### Create Edit
Creates a new edit for the provided input, instruction, and parameters.
https://platform.openai.com/docs/api-reference/edits

```javascript

openAi.createEdit(model, input, instruction, n = 1, temperature = 1, top_p = 1)
.then(function (value) {

    //returns json
    console.log(value);

}, function (error) {

});

```

### Create Image

Creates an image given a prompt.
https://platform.openai.com/docs/api-reference/images/create

```javascript

openAi.createImage(prompt, n = 1, size = "1024x1024",  response_format = "url", user = null)
.then(function (value) {

    //returns json
    console.log(value);

}, function (error) {

});

```

### Create Image Edit

Creates an edited or extended image given an original image and a prompt.
https://platform.openai.com/docs/api-reference/images/create-edit

```javascript

openAi.createImageEdit(image, mask = null, prompt, n = 1, size = "1024x1024",  response_format = "url", user = null)
.then(function (value) {

    //returns json
    console.log(value);

}, function (error) {

});

```

### Create Image Variation

Creates a variation of a given image.
https://platform.openai.com/docs/api-reference/images/create-variation

```javascript

openAi.createImageVariation(image, n = 1, size = "1024x1024",  response_format = "url", user = null)
.then(function (value) {

    //returns json
    console.log(value);

}, function (error) {

});
```

### Create Embeddings

Creates an embedding vector representing the input text.
https://platform.openai.com/docs/api-reference/embeddings

```javascript
openAi.createEmbeddings(model,input,  user = null)
.then(function (value) {

    //returns json
    console.log(value);

}, function (error) {

});

```

### Create Transcription

Transcribes audio into the input language.
https://platform.openai.com/docs/api-reference/audio

```javascript

openAi.createTranscription(file, model = Openai.WHISPER_1, prompt = null, response_format = "json", temperature = 0, language = null)
.then(function (value) {

    //returns json
    console.log(value);

}, function (error) {

});

```

### Create Tranlsation

Translates audio into into English.
https://platform.openai.com/docs/api-reference/audio/create

```javascript
openAi.createTranlsation (file, model = Openai.WHISPER_1, prompt = null, response_format = "json", temperature = 0)

.then(function (value) {

    //returns json
    console.log(value);

}, function (error) {

});

```
### List Files

Returns a list of files that belong to the user's organization.
https://platform.openai.com/docs/api-reference/files/list

```javascript
oenAi.listFiles()
.then(function (value) {

    //returns json
    console.log(value);

}, function (error) {

});


```

### Upload File

Upload a file that contains document(s) to be used across various endpoints/features. Currently, the size of all the files uploaded by one organization can be up to 1 GB. Please contact us if you need to increase the storage limit.
https://platform.openai.com/docs/api-reference/files/upload

```javascript
openAi.uploadFile(file, purpose)
.then(function (value) {

    //returns json
    console.log(value);

}, function (error) {

});


```

### Delete File

Delete a file.
https://platform.openai.com/docs/api-reference/files/delete

```javascript
openAi.deleteFile(file_id)
.then(function (value) {

    //returns json
    console.log(value);

}, function (error) {

});

```

### Retrieve File

Returns information about a specific file.
https://platform.openai.com/docs/api-reference/files/retrieve

```javascript
openAi.retrieveFile(file_id)
.then(function (value) {

    //returns json
    console.log(value);

}, function (error) {

});

```

### Retrieve File Content

Returns the contents of the specified file
https://platform.openai.com/docs/api-reference/files/retrieve-content

```javascript
openAi.retrieveFileContent(file_id)
.then(function (value) {

    //returns json
    console.log(value);

}, function (error) {

});

```

### Create Fine Tune

Creates a job that fine-tunes a specified model from a given dataset.
Response includes details of the enqueued job including job status and the name of the fine-tuned models once complete.
https://platform.openai.com/docs/api-reference/fine-tunes/create

```javascript
openAi.createFineTune(training_file, validation_file = null, model = Openai.CURIE, n_epochs = 4, batch_size = null, learning_rate_multiplier = null, prompt_loss_weight = 0.01, compute_classification_metrics = null, classification_n_classes = null, classification_positive_class = null, classification_betas = null, suffix = null)
.then(function (value) {

    //returns json
    console.log(value);

}, function (error) {

});
```

### List Fine Tunes

List your organization's fine-tuning jobs
https://platform.openai.com/docs/api-reference/fine-tunes/list

```javascript
openAi.listFineTunes()
.then(function (value) {

    //returns json
    console.log(value);

}, function (error) {

});

```

### Retrieve Fine Tune

Gets info about the fine-tune job.
https://platform.openai.com/docs/api-reference/fine-tunes/retrieve

```javascript
openAi.retrieveFineTune(fine_tune_id)
.then(function (value) {

    //returns json
    console.log(value);

}, function (error) {

});

```


### Cancel Fine Tune

Immediately cancel a fine-tune job.
https://platform.openai.com/docs/api-reference/fine-tunes/cancel

```javascript
openAi.cancelFineTune(fine_tune_id)
.then(function (value) {

    //returns json
    console.log(value);

}, function (error) {

});

```

### List Fine Tune Events

Get fine-grained status updates for a fine-tune job.
https://platform.openai.com/docs/api-reference/fine-tunes/events

```javascript
openAi.listFineTuneEvents(fine_tune_id, stream = false)
.then(function (value) {

    //returns json
    console.log(value);

}, function (error) {

});

```

### Delete Fine Tune Model

Delete a fine-tuned model. You must have the Owner role in your organization.
https://platform.openai.com/docs/api-reference/fine-tunes/delete-model

```javascript
openAi.deleteFineTunemodel(model)
.then(function (value) {

    //returns json
    console.log(value);

}, function (error) {

});

```

### Create Moderation

Classifies if text violates OpenAI's Content Policy.
https://platform.openai.com/docs/api-reference/moderations/create

```javascript

openAi.createModeration(input, model = null)
.then(function (value) {

    //returns json
    console.log(value);

}, function (error) {

});

```

