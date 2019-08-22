/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk');


const startVoice = 'Abriendo Skill, buscando tu ritmo. Que tipo de género musical quieres escuchar?';


const helpGame = 'Puedes encontrar estos generos musicales, por ejemplo; alternativa, rap, pop, blues, salsa, rock and roll, electrónica. Cual te gustaría escuchar?';


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
    
    
    const alternativa = "<audio src='https://s3.amazonaws.com/alexa-projects/you.mp3'/>"; //CHANGE FILE LINK
    return alternativa;
  
  }else if(genre === 'rap'){
    
    const rap = 'Música rap';
    return rap;
  
  }else if(genre === 'pop'){
    
    const pop = 'Música pop';
    return pop;
  
  }else if(genre === 'blues'){
    
    const blues = 'Música blues';
    return blues;
  
  }else if(genre === 'salsa'){
    
    const salsa = 'Música salsa';
    return salsa;
  
  }else if(genre === 'rock and roll'){
    
    const rockandroll = 'Música rock and roll';
    return rockandroll;
  
  }else if(genre === 'electronica'){
    
    const electronica = 'Música electrónica';
    return electronica;
  
  }else{
    
    const ninguno = 'No hemos encontrado este genero musical, puedes pedirme los generos de música que puedo reproducir, solo tienes que decirme; generos de musica.';
    return ninguno;
  
  }
  
  // Add more stream audio
  
  /*else if(genre === ' **GENRE** '){
      const electronica = "<audio src='https://s3.amazonaws.com/alexa-projects/you.mp3'/>"; //CHANGE FILE LINK
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
