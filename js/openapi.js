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



}

