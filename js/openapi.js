/**
 * This is an unofficial wrapper of the Chat GPT API in Javascript
 * @Author Isaac Sichangi Wanjala
 * @Date 11/04/2023
 */

/**
 * @description A class which contains the functionality to connect to the OpenApi APIS
 * @class OpenApi
 * @author Isaac Sichangi
 */
class OpenApi {

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



}



