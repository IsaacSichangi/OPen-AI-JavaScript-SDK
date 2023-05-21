/**
 * This is an unofficial wrapper of the Chat GPT API in Javascript
 * @Author Isaac Sichangi Wanjala
 * @Date 11/04/2023
 */

/**
 * @description A class which contains the functionality to connect to the Openai APIS
 * @class Openai
 * @author Isaac Sichangi
 */
class Openai {

    baseUrl = "https://api.openai.com";
     ///v1/chat/completions
    static  GPT_4 = "gpt-4";
    static GPT_4_03014 = "gpt-4-0314";
    static GPT_4_32K = "gpt-4-32k";
    static GPT_4_32K_0314 = "gpt-4-32k-0314";
    static GPT_3_5_TURBO = "gpt-3.5-turbo";
    static GPT_3_5_TURBO_0301 = "gpt-3.5-turbo-0301";

    ///v1/completions
    static TEXT_DAVINCI_003 = "text-davinci-003";
    static TEXT_DAVICNCI_002 = "text-davinci-002";
    static TEXT_DAVINCI_001 = "text-davinci-001";
    static TEXT_CURIE_001 = "text-curie-001";
    static  TEXT_CABBAGE_001 = "text-babbage-001";
    static  TEXT_ADA_001 = "text-ada-001";

    ///v1/edits
    static  TEXT_DAVINCI_EDIT_001 = "text-davinci-edit-001";
    static CODE_DAVINCI_EDIT_001 = "code-davinci-edit-001"

    ///v1/fine-tunes
    static DAVINCI = "davinci";
    static CURIE = "curie";
    static BABBAGE = "babbage";
    static ADA = "ada";
    ///v1/embeddings
    static TEXT_EMBEDDING_ADA_002 = "text-embedding-ada-002";
    static TEXT_SEARCH_ADA_DOC_001 =  "text-search-ada-doc-001";

    ///v1/moderations
    static TEXT_MODERATION_STABLE = "text-moderation-stable";
    static TEXT_MODERATION_LATEST = "text-moderation-latest";

    /**
    /v1/audio/transcriptions
    /v1/audio/translations**/
    static  WHISPER_1 = "whisper-1";


    /**
     * @constructor
     * @param apiKey
     */
 constructor(apiKey) {
  this.apiKey = apiKey;


 }

    /**
     * @function listModels
     * @description Lists the currently available models, and provides basic information about each one such as the owner and availability.
     * @returns {Promise<any>}
     */
  async listModels(){

      try {
          let request = new Request(`${this.baseUrl}/v1/models`, {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
                   "Authorization": `Bearer ${this.apiKey}`,
              },
              mode: "cors",
              cache: "default"
          });
          let response = await fetch(request);
          let contentType = response.headers.get("content-type");
          if (!contentType || !contentType.includes("application/json")) {
              throw new TypeError("sorry we haven't got a json response from the server");
          }
          return await response.json();


      } catch (error) {
          console.error("Error:", error);
      }
  }

    /**
     * @function retrieveModel
     * Retrieves a model instance, providing basic information about the model such as the owner and permissioning.
     * @param model
     * @returns {Promise<any>}
     */
    async retrieveModel(model){

        try {
            let request = new Request(`${this.baseUrl}/v1/models/${model}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.apiKey}`,
                },
                mode: "cors",
                cache: "default"
            });
            let response = await fetch(request);
            let contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new TypeError("sorry we haven't got a json response from the server");
            }
            return await response.json();


        } catch (error) {
            console.error("Error:", error);
        }
    }


    /**
     * @function createCompletion
     * creates a completion for the provided prompt and parameters
     * @param model https://platform.openai.com/docs/models/model-endpoint-compatibility
     * @param prompt
     * @param suffix
     * @param max_tokens
     * @param temperature
     * @param top_p
     * @param n
     * @param stream
     * @param logprobs
     * @param echo
     * @param stop
     * @param presence_penalty
     * @param frequency_penalty
     * @param best_of
     * @param logit_bias
     * @param user
     * @returns {Promise<any>}
     */
    async createCompletion(model, prompt = "<|endoftext|> ", suffix = null, max_tokens = 16, temperature = 1, top_p = 1, n = 1, stream = false, logprobs = null, echo = false, stop = null, presence_penalty = 0, frequency_penalty = 0, best_of = 1,  logit_bias = null, user = null){

        try {

            let  body  =   {model :model,  prompt : prompt, suffix : suffix, max_tokens : max_tokens, temperature : temperature, top_p : top_p, n : n, stream : stream, logprobs : logprobs, echo : echo, stop : stop, presence_penalty : presence_penalty, frequency_penalty : frequency_penalty, best_of : best_of,  logit_bias : logit_bias, user : user};

            let parsedbody = {};

            //parse body and add parameters which are none null

            for(let param in body){

                if(body[param] !== null){

                    parsedbody[param] = body[param];
                }

            }

            let request = new Request(`${this.baseUrl}/v1/completions`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.apiKey}`,
                },
                body: JSON.stringify(parsedbody),
                mode: "cors",
                cache: "default"
            });
            let response = await fetch(request);
            let contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new TypeError("sorry we haven't got a json response from the server");
            }
            return await response.json();


        } catch (error) {
            console.error("Error:", error);
        }
    }


    /**
     * Creates a completion for the chat message
     *
     * @param model https://platform.openai.com/docs/models/model-endpoint-compatibility
     * @param messages
     * @param temperature
     * @param top_p
     * @param n
     * @param stream
     * @param stop
     * @param max_tokens
     * @param presence_penalty
     * @param frequency_penalty
     * @param logit_bias
     * @param user
     * @returns {Promise<any>}
     */
    async createChatCompletion(model, messages, temperature = 1, top_p = 1, n = 1, stream = false, stop = null, max_tokens = null,  presence_penalty = 0, frequency_penalty = 0, logit_bias = null, user = null){

        try {

            let  body  =   {model :model,  messages : messages, max_tokens : max_tokens, temperature : temperature, top_p : top_p, n : n, stream : stream, stop : stop, presence_penalty : presence_penalty, frequency_penalty : frequency_penalty,  logit_bias : logit_bias, user : user};

            let parsedbody = {};

            //parse body and add parameters which are none null

            for(let param in body){

                if(body[param] !== null){

                    parsedbody[param] = body[param];
                }

            }

            let request = new Request(`${this.baseUrl}/v1/chat/completions`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.apiKey}`,
                },
                body: JSON.stringify(parsedbody),
                mode: "cors",
                cache: "default"
            });
            let response = await fetch(request);
            let contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new TypeError("sorry we haven't got a json response from the server");
            }
            return await response.json();


        } catch (error) {
            console.error("Error:", error);
        }
    }

    /**
     * Creates a new edit for the provided input, instruction, and parameters.
     * @param model
     * @param input
     * @param instruction
     * @param n
     * @param temperature
     * @param top_p
     * @returns {Promise<any>}
     */
    async createEdit(model, input, instruction, n = 1, temperature = 1, top_p = 1){

        try {

            let  body  =   {model :model,  input : input, instruction: instruction, temperature : temperature, top_p : top_p, n : n};

            let parsedbody = {};

            //parse body and add parameters which are none null

            for(let param in body){

                if(body[param] !== null){

                    parsedbody[param] = body[param];
                }

            }

            let request = new Request(`${this.baseUrl}/v1/edits`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.apiKey}`,
                },
                body: JSON.stringify(parsedbody),
                mode: "cors",
                cache: "default"
            });
            let response = await fetch(request);
            let contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new TypeError("sorry we haven't got a json response from the server");
            }
            return await response.json();


        } catch (error) {
            console.error("Error:", error);
        }
    }

    /**
     * Creates an image given a prompt
     * @param prompt
     * @param n
     * @param size
     * @param response_format
     * @param user
     * @returns {Promise<any>}
     */

    async createImage(prompt, n = 1, size = "1024x1024",  response_format = "url", user = null){

        try {

            let  body  =   {prompt :prompt, n : n, size:size, response_format:response_format, user:user};

            let parsedbody = {};

            //parse body and add parameters which are none null

            for(let param in body){

                if(body[param] !== null){

                    parsedbody[param] = body[param];
                }

            }

            let request = new Request(`${this.baseUrl}/v1/images/generations

`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.apiKey}`,
                },
                body: JSON.stringify(parsedbody),
                mode: "cors",
                cache: "default"
            });
            let response = await fetch(request);
            let contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new TypeError("sorry we haven't got a json response from the server");
            }
            return await response.json();


        } catch (error) {
            console.error("Error:", error);
        }
    }


    /**
     * Creates an edited or extended image given an original image and a prompt.
     * @param image
     * @param mask
     * @param prompt
     * @param n
     * @param size
     * @param response_format
     * @param user
     * @returns {Promise<any>}
     */

    async createImageEdit(image, mask = null, prompt, n = 1, size = "1024x1024",  response_format = "url", user = null){

        try {

            let  body  =   {image:image, mask:mask, prompt :prompt, n : n, size:size, response_format:response_format, user:user};

            let parsedbody = {};

            //parse body and add parameters which are none null

            for(let param in body){

                if(body[param] !== null){

                    parsedbody[param] = body[param];
                }

            }

            let request = new Request(`${this.baseUrl}/v1/images/edits



`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.apiKey}`,
                },
                body: JSON.stringify(parsedbody),
                mode: "cors",
                cache: "default"
            });
            let response = await fetch(request);
            let contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new TypeError("sorry we haven't got a json response from the server");
            }
            return await response.json();


        } catch (error) {
            console.error("Error:", error);
        }
    }


    /**
     * Creates a variation of a given image.
     * @param image
     * @param n
     * @param size
     * @param response_format
     * @param user
     * @returns {Promise<any>}
     */
    async createImageVariation(image, n = 1, size = "1024x1024",  response_format = "url", user = null){

        try {

            let  body  =   {image:image, mask:mask, prompt :prompt, n : n, size:size, response_format:response_format, user:user};

            let parsedbody = {};

            //parse body and add parameters which are none null

            for(let param in body){

                if(body[param] !== null){

                    parsedbody[param] = body[param];
                }

            }

            let request = new Request(`${this.baseUrl}/v1/images/variations`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.apiKey}`,
                },
                body: JSON.stringify(parsedbody),
                mode: "cors",
                cache: "default"
            });
            let response = await fetch(request);
            let contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new TypeError("sorry we haven't got a json response from the server");
            }
            return await response.json();


        } catch (error) {
            console.error("Error:", error);
        }
    }


    /**
     * Creates an embedding vector representing the input text.
     * @param model https://platform.openai.com/docs/api-reference/models/list
     * @param input
     * @param user https://platform.openai.com/docs/guides/safety-best-practices/end-user-ids
     * @returns {Promise<any>}
     */
    async createEmbeddings(model,input,  user = null){

        try {

            let  body  =   {model:model, input:input,user:user};

            let parsedbody = {};

            //parse body and add parameters which are none null

            for(let param in body){

                if(body[param] !== null){

                    parsedbody[param] = body[param];
                }

            }

            let request = new Request(`${this.baseUrl}/v1/embeddings`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.apiKey}`,
                },
                body: JSON.stringify(parsedbody),
                mode: "cors",
                cache: "default"
            });
            let response = await fetch(request);
            let contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new TypeError("sorry we haven't got a json response from the server");
            }
            return await response.json();


        } catch (error) {
            console.error("Error:", error);
        }
    }


    /**
     * Transcribes audio into the input language.
     * https://platform.openai.com/docs/guides/speech-to-text
     * @param file
     * @param model
     * @param prompt
     * @param response_format
     * @param temperature
     * @param language https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
     * @returns {Promise<any>}
     */

    async createTranscription(file, model = Openai.WHISPER_1, prompt = null, response_format = "json", temperature = 0, language = null){

        try {

            let  body  =   {file:file, model:model, prompt:prompt, response_format:response_format, temperature:temperature, language:language};

            let parsedbody = {};

            //parse body and add parameters which are none null

            for(let param in body){

                if(body[param] !== null){

                    parsedbody[param] = body[param];
                }

            }

            let request = new Request(`${this.baseUrl}/v1/audio/transcriptions`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.apiKey}`,
                },
                body: JSON.stringify(parsedbody),
                mode: "cors",
                cache: "default"
            });
            let response = await fetch(request);
            let contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new TypeError("sorry we haven't got a json response from the server");
            }
            return await response.json();


        } catch (error) {
            console.error("Error:", error);
        }
    }


    /**
     * Translates audio into into English.
     * @param file
     * @param model
     * @param prompt
     * @param response_format
     * @param temperature
     * @returns {any}
     */
    async createTranlsation (file, model = Openai.WHISPER_1, prompt = null, response_format = "json", temperature = 0){

        try {

            let  body  =   {file:file, model:model, prompt:prompt,response_format:response_format, temperature:temperature};

            let parsedbody = {};

            //parse body and add parameters which are none null

            for(let param in body){

                if(body[param] !== null){

                    parsedbody[param] = body[param];
                }

            }

            let request = new Request(`${this.baseUrl}/v1/audio/translations`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.apiKey}`,
                },
                body: JSON.stringify(parsedbody),
                mode: "cors",
                cache: "default"
            });
            let response = await fetch(request);
            let contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new TypeError("sorry we haven't got a json response from the server");
            }
            return await response.json();


        } catch (error) {
            console.error("Error:", error);
        }
    }


    /**
     * Returns a list of files that belong to the user's organization.
     * @returns {Promise<any>}
     */
    async listFiles (){

        try {



            let request = new Request(`${this.baseUrl}/v1/files`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.apiKey}`,
                },
                mode: "cors",
                cache: "default"
            });
            let response = await fetch(request);
            let contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new TypeError("sorry we haven't got a json response from the server");
            }
            return await response.json();


        } catch (error) {
            console.error("Error:", error);
        }
    }

    /**
     * Upload a file that contains document(s) to be used across various endpoints/features. Currently, the size of all the files uploaded by one organization can be up to 1 GB. Please contact us if you need to increase the storage limit.
     * @param file
     * @param purpose
     * @returns {Promise<any>}
     */
    async uploadFile(file, purpose){

        try {

            let  body  =   {file:file, purpose:purpose};

            let parsedbody = {};

            //parse body and add parameters which are none null

            for(let param in body){

                if(body[param] !== null){

                    parsedbody[param] = body[param];
                }

            }

            let request = new Request(`${this.baseUrl}/v1/files`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.apiKey}`,
                },
                body: JSON.stringify(parsedbody),
                mode: "cors",
                cache: "default"
            });
            let response = await fetch(request);
            let contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new TypeError("sorry we haven't got a json response from the server");
            }
            return await response.json();


        } catch (error) {
            console.error("Error:", error);
        }
    }


    /**
     * Delete a file.
     * @param file_id
     * @returns {Promise<any>}
     */
    async deleteFile(file_id){

        try {

            let request = new Request(`${this.baseUrl}/v1/files/${file_id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.apiKey}`,
                },
                mode: "cors",
                cache: "default"
            });
            let response = await fetch(request);
            let contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new TypeError("sorry we haven't got a json response from the server");
            }
            return await response.json();


        } catch (error) {
            console.error("Error:", error);
        }
    }


    /**
     * Returns information about a specific file.
     * @param file_id
     * @returns {Promise<any>}
     */
    async retrieveFile(file_id){

        try {



            let request = new Request(`${this.baseUrl}/v1/files/${file_id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.apiKey}`,
                },
                mode: "cors",
                cache: "default"
            });
            let response = await fetch(request);
            let contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new TypeError("sorry we haven't got a json response from the server");
            }
            return await response.json();


        } catch (error) {
            console.error("Error:", error);
        }
    }

    /**
     * Returns the contents of the specified file
     * @param file_id
     * @returns {Promise<any>}
     */
    async retrieveFileContent(file_id){

        try {

            let request = new Request(`${this.baseUrl}/v1/files/${file_id}/content`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.apiKey}`,
                },
                mode: "cors",
                cache: "default"
            });
            let response = await fetch(request);
            let contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new TypeError("sorry we haven't got a json response from the server");
            }
            return await response.json();


        } catch (error) {
            console.error("Error:", error);
        }
    }

    /**
     * Creates a job that fine-tunes a specified model from a given dataset.
     * Response includes details of the enqueued job including job status and the name of the fine-tuned models once complete.
     * @param training_file https://platform.openai.com/docs/guides/fine-tuning/creating-training-data
     * @param validation_file
     * @param model https://platform.openai.com/docs/models
     * @param n_epochs
     * @param batch_size
     * @param learning_rate_multiplier
     * @param prompt_loss_weight
     * @param compute_classification_metrics
     * @param classification_n_classes
     * @param classification_positive_class
     * @param classification_betas
     * @param suffix
     * @returns {Promise<any>}
     */
    async createFineTune(training_file, validation_file = null, model = Openai.CURIE, n_epochs = 4, batch_size = null, learning_rate_multiplier = null, prompt_loss_weight = 0.01, compute_classification_metrics = null, classification_n_classes = null, classification_positive_class = null, classification_betas = null, suffix = null

    ){

        try {

            let  body  =   {training_file:training_file, validation_file:validation_file,model:model, n_epochs:n_epochs, batch_size:batch_size, learning_rate_multiplier:learning_rate_multiplier, prompt_loss_weight:prompt_loss_weight, compute_classification_metrics:compute_classification_metrics, classification_n_classes:classification_n_classes, classification_positive_class:classification_positive_class, classification_betas:classification_betas, suffix:suffix};

            let parsedbody = {};

            //parse body and add parameters which are none null

            for(let param in body){

                if(body[param] !== null){

                    parsedbody[param] = body[param];
                }

            }

            let request = new Request(`${this.baseUrl}/v1/fine-tunes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.apiKey}`,
                },
                body: JSON.stringify(parsedbody),
                mode: "cors",
                cache: "default"
            });
            let response = await fetch(request);
            let contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new TypeError("sorry we haven't got a json response from the server");
            }
            return await response.json();


        } catch (error) {
            console.error("Error:", error);
        }
    }


    /**
     * List your organization's fine-tuning jobs
     * @returns {Promise<any>}
     */
    async listFineTunes(){

        try {

            let request = new Request(`${this.baseUrl}/v1/fine-tunes`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.apiKey}`,
                },
                mode: "cors",
                cache: "default"
            });
            let response = await fetch(request);
            let contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new TypeError("sorry we haven't got a json response from the server");
            }
            return await response.json();


        } catch (error) {
            console.error("Error:", error);
        }
    }

    /**
     * Gets info about the fine-tune job.
     * https://platform.openai.com/docs/guides/fine-tuning
     * @param fine_tune_id
     * @returns {Promise<any>}
     */
    async retrieveFineTune(fine_tune_id){

        try {

            let request = new Request(`${this.baseUrl}/v1/fine-tunes/${fine_tune_id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.apiKey}`,
                },
                mode: "cors",
                cache: "default"
            });
            let response = await fetch(request);
            let contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new TypeError("sorry we haven't got a json response from the server");
            }
            return await response.json();


        } catch (error) {
            console.error("Error:", error);
        }
    }


    /**
     * Immediately cancel a fine-tune job.
     * @param fine_tune_id
     * @returns {Promise<any>}
     */
    async cancelFineTune(fine_tune_id){

        try {

            let request = new Request(`${this.baseUrl}/v1/fine-tunes/${fine_tune_id}/cancel`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.apiKey}`,
                },
                mode: "cors",
                cache: "default"
            });
            let response = await fetch(request);
            let contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new TypeError("sorry we haven't got a json response from the server");
            }
            return await response.json();


        } catch (error) {
            console.error("Error:", error);
        }
    }


    /**
     * Get fine-grained status updates for a fine-tune job.
     * @param fine_tune_id
     * @param stream
     * @returns {Promise<any>}
     */
    async listFineTuneEvents(fine_tune_id, stream = false){

        try {

            let request = new Request(`${this.baseUrl}/v1/fine-tunes/${fine_tune_id}/events?stream=${stream}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.apiKey}`,
                },
                mode: "cors",
                cache: "default"
            });
            let response = await fetch(request);
            let contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new TypeError("sorry we haven't got a json response from the server");
            }
            return await response.json();


        } catch (error) {
            console.error("Error:", error);
        }
    }

    /**
     * Delete a fine-tuned model. You must have the Owner role in your organization.
     * @param model
     * @returns {Promise<any>}
     */
    async deleteFineTunemodel(model){

        try {

            let request = new Request(`${this.baseUrl}/v1/models/${model}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.apiKey}`,
                },
                mode: "cors",
                cache: "default"
            });
            let response = await fetch(request);
            let contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new TypeError("sorry we haven't got a json response from the server");
            }
            return await response.json();


        } catch (error) {
            console.error("Error:", error);
        }
    }

    /**
     *
     * @param input
     * @param model
     * @returns {Promise<any>}
     */
    async createModeration(input, model = null){

        try {

            let  body  =   {input:input,model:model};

            let parsedbody = {};

            //parse body and add parameters which are none null

            for(let param in body){

                if(body[param] !== null){

                    parsedbody[param] = body[param];
                }

            }

            /**
             * Classifies if text violates OpenAI's Content Policy
             * @type {Request}
             */
            let request = new Request(`${this.baseUrl}/v1/moderations`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.apiKey}`,
                },
                body: JSON.stringify(parsedbody),
                mode: "cors",
                cache: "default"
            });
            let response = await fetch(request);
            let contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new TypeError("sorry we haven't got a json response from the server");
            }
            return await response.json();


        } catch (error) {
            console.error("Error:", error);
        }
    }



}



