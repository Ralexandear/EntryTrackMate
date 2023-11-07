function start({message, user}){
  // if (user.program !== 'registration'){
  //   return openMainMenu()
  // }
  user
    .setProgram('registration')
    .setNextStep('selectLanguage')
    .setDuration(null)
    .closeSession()
    .sendMessage(user.messageConstructor('selectLanguage'));
}


/**
 * 
 */
function selectLanguage({message, messageText, botCommand, user}) {
  switch (messageText ?? botCommand){
    case '🇷🇸 Srpski':
      user.setLanguage('rs')
      break
    case '🇬🇧 English':
      user.setLanguage('en')
      break
    case '🇷🇺 Русский':
      user.setLanguage('ru')
      break
    case '🇺🇦 Український':
      user.setLanguage('uk')
      break
    case '🇧🇾 Беларуси':
      user.setLanguage('be')
      break
    default:
      if (user.program === 'settings'){
        user.editMessageText(user.messageConstructor('unknownError'))
        user.setMessageId(
          user.sendMessage(user.messageConstructor('editLanguage')).message_id
        )
      } else {
        user.sendMessage(user.messageConstructor('unknownError'))
        user.sendMessage(user.messageConstructor('selectLanguage'))
      }
      return      
  }
  
  if (user.program === 'settings'){
    user.deletePreviousKeyboard()
    user.openMenu()

    if (user.dateStart){
      user.setMessageId(
        user
          .sendMessage(
            user.messageConstructor('informationMessage')).message_id 
          )
    }
    return
  }
  user
    .setNextStep('getTimezone')
    .sendMessage(user.messageConstructor('getTimezone'))
}


/**
 * 
 */
function setTimezone({messageText, message, user}){
  if (messageText && ['⭐️ Asia/Tbilisi', '⭐️ Europe/Belgrade'].includes(messageText)){
    const timezone = messageText.replace('⭐️ ','');
    user.setTimezone({timezone})
  }
  else if (message.hasOwnProperty('location')){
    const {latitude: lat, longitude: lng} = message.location
    user.setTimezone({lat, lng})
  }
  else{
     user.sendMessage(user.messageConstructor('unknownError'))
    
    if (user.program === 'settings') user.sendMessage(user.messageConstructor('editTimezone'))
    else user.sendMessage(user.messageConstructor('getTimezone'))
    return
  }

  if (user.program === 'settings'){
    user.openMenu(user.textMessages.acceptTimezone)

    if (user.dateStart){
      user.setMessageId(
        user.sendMessage(user.messageConstructor('informationMessage')).message_id
      )
    }
    return
  }
  
  user
    .setNextStep('selectDuration')
    .sendMessage(user.messageConstructor('acceptTimezone'))
  user.sendMessage(user.messageConstructor('selectDuration'))
}


/**
 * 
 */
function selectDuration({message, messageText, botCommand, user}){
  const duration = Number((messageText ?? botCommand).replace(/[^+\d]/g, ''))

  if (! (duration > 1 && duration < 366)){
    user.sendMessage(user.messageConstructor('unknownError'))

    if (user.program === 'registration') return user.sendMessage(user.messageConstructor('selectDuration'))
    return user.deletePreviousKeyboard().setMessageId(user.sendMessage(user.messageConstructor('editDuration')).message_id)
  }
  
  user.setDuration(duration)

  if (user.program === 'registration') return user.openMenu(user.textMessages.acceptDuration)
  
  user.deletePreviousKeyboard().deleteNextStep().setProgram('menu')
  if (botCommand) user.editMessageText(new Message(user.textMessages.saveNewDuration))
  else user.sendMessage(new Message(user.textMessages.saveNewDuration))
  
  if (user.dateStart) user.setMessageId(user.sendMessage(user.messageConstructor('informationMessage')).message_id)
}