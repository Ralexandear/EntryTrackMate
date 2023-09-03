function messageHandler(message) {
  if (message.location){
    if(message.location.hasOwnProperty('live_period')) return deleteMessage_(message.from.id, message.message_id);
  } 
  else if(! message.text || message.chat.type !== 'private') return;
  
  let user
  try{
    const
      id = message.from.id,
      messageId = message.messageId,
      messageText = message.text,
      username = message.from.username;

    user = new User(id).loadData().setData('username', username)

    if (! user.language && message.from.hasOwnProperty('language_code')) user.setLanguage(message.from.language_code)
    if (messageText){
      if (messageText === '/start') return start({message, user})
      if (mainMenu({user, messageText})) return
    }
    
    switch (user.program){
      case 'registration':
        switch (user.nextStep){
          case 'selectLanguage':
            return selectLanguage({message, messageText, user});
          case 'getTimezone':
            return setTimezone({message, user})
          case 'selectDuration':
            return selectDuration({message, messageText, user})
        }
      case 'settings':
        switch (user.nextStep){
          case 'editLanguage':
            return selectLanguage({message, messageText, user});
          case 'editTimezone':
            return setTimezone({message, user, messageText})
          case 'editDuration':
            return selectDuration({message, messageText, user})
          default:
            return
        }
     
      case 'enterDateManually':
        var [day, month, year] = messageText.split('.').map(e => Number(e))
        var selectedDate = new Date(year, month - 1, day)
        
        if (isNaN(selectedDate)){
          if (messageText.substring(0,2) === "↩️"){
            return user.openMenu()
          }
          return user.sendMessage(user.messageConstructor('unknownError'))
        }
        else if (getCurrentDate_({user}) - selectedDate < 0 || year < 2021 || month > 11 || day > 31){
          return user.sendMessage(user.messageConstructor('dateIsTooSmall'))
        }
        else {
          log(user.replyMarkups.inline.acceptManualDate(messageText))
          return user.setMessageId(
            user.sendMessage(
              new Message(
                user
                  .textMessages.acceptManualDate(selectedDate))
                  .setReplyMarkup(user.replyMarkups.inline.acceptManualDate(messageText))).message_id)
        }
      case 'editDuration':
        return selectDuration()
      case 'menu':
        return mainMenu({user, messageText})
      case 'getTimezone':
      
      case 'enterDate':
        
    }
  } catch (e) {
    console.error(e)
    const log = BetterLog.useSpreadsheet().log
    
    log(e)
    log(e.stack)

    sendMessage(843444736, err.toString())
  } finally {
    user?.save()
  }
}