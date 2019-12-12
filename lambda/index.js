/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk');


const startVoice = 'Abriendo Skill, buscando tu ritmo. Que tipo de género musical quieres escuchar?';


const helpGame = 'Puedes encontrar estos géneros musicales, por ejemplo; alternativa, rap, pop, blues, salsa, rock and roll, electrónica. ¿Cual te gustaría escuchar?';


const GetNewFactHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest'
      || (request.type === 'IntentRequest'
        && request.intent.name === 'GetNewFactIntent');
  },
  handle(handlerInput) {
    
    return handlerInput.responseBuilder
      .speak(startVoice)
      .reprompt(startVoice)
      .getResponse();
  },
};


const changeGenreHandler = {
  canHandle(handlerInput) {
    
    const request = handlerInput.requestEnvelope.request;
    
    return request.type === 'IntentRequest'
      && request.intent.name === 'changeGenre';
      
  },
  handle(handlerInput) {  
    

      return handlerInput.responseBuilder
      .speak("Que género musical quieres escuchar ahora?")
      .reprompt("Que género musical quieres escuchar ahora?")
      .getResponse();

  },
};


const selectGenreHandler = {
  canHandle(handlerInput) {
    
    const request = handlerInput.requestEnvelope.request;
    
    return request.type === 'IntentRequest'
      && request.intent.name === 'genreMusical';
      
  },
  handle(handlerInput) {  
    

      return handlerInput.responseBuilder
      .speak(searchGenre(handlerInput))
      .reprompt(searchGenre(handlerInput))
      .getResponse();

  },
};


function searchGenre(handlerInput){
    
  const request = handlerInput.requestEnvelope.request;
  const genre = request.intent.slots.genre.value;
  
  return listGenre(genre);
}

function listGenre(genre){
  
  if(genre === 'alternativa'){
    
    
    const alternativa = "<audio src='--LINK STREAM--'/>"; //CHANGE SRC LINK
    return alternativa;
  
  }else if(genre === 'rap'){
    
    const rap = "<audio src='--LINK STREAM--'/>"; //CHANGE SRC LINK
    return rap;
  
  }else if(genre === 'pop'){
    
    const pop = "<audio src='--LINK STREAM--'/>"; //CHANGE SRC LINK
    return pop;
  
  }else if(genre === 'blues'){
    
    const blues = "<audio src='--LINK STREAM--'/>"; //CHANGE SRC LINK
    return blues;
  
  }else if(genre === 'salsa'){
    
    const salsa = "<audio src='--LINK STREAM--'/>"; //CHANGE SRC LINK
    return salsa;
  
  }else if(genre === 'rock and roll'){
    
    const rockandroll = "<audio src='--LINK STREAM--'/>"; //CHANGE SRC LINK
    return rockandroll;
  
  }else if(genre === 'electronica'){
    
    const electronica = "<audio src='--LINK STREAM--'/>"; //CHANGE SRC LINK
    return electronica;
  
  }else{
    
    const ninguno = 'No hemos encontrado este genero musical, puedes pedirme los nombres de música disponible, con el siguiente comando; generos musicales.';
    return ninguno;
  
  }
  
  // Add more stream audio
  
  /*else if(genre === ' **GENRE** '){
      const electronica = "<audio src='--LINK STREAM--'/>"; //CHANGE FILE LINK
      return electronica;
    }*/

}


const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    
    return handlerInput.responseBuilder
      .speak(helpGame)
      .reprompt(startVoice)
      .getResponse();
  },
};


const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {

    return handlerInput.responseBuilder
      .speak('Cerrando la Skill, busca tu ritmo.')
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};



const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Ha ocurrido un error.')
      .reprompt('Ha ocurrido un error.')
      .getResponse();
  },
};


const skillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder
  .addRequestHandlers(
    GetNewFactHandler,
    changeGenreHandler,
    selectGenreHandler,
    HelpHandler,
    ExitHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
