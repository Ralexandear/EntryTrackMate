function callbackHandler(update) {
  let user

  try{
    const
      callback = update.callback_query,
      id = callback.from.id,
      callbackId = callback.id,
      messageId = callback.message.message_id,
      username = callback.from.username,
      [botCommand, data] = callback.data.split('/');
    
    user = new User(id).loadData().setData('username', username)

    if (! user.language && message.from.hasOwnProperty('language_code')) user.setLanguage(callback.from.language_code)

    if (Freeze.check({user, botCommand})) return Freeze.activate({user, botCommand})
    Freeze.activate({user, botCommand})

    switch (user.program){
      case 'enterDateManually':
        if (botCommand === 'cancel') return user.editMessageText(user.messageConstructor('enterDateManually'))
        else if (botCommand === 'accept'){
          var [day, month, year] = data.split('.')
          var date = new Date(year, month - 1, day, 0, 0,0)
            
          return markEntry(user, date, true)
        }
        else return

      case 'settings':
        if (user.nextStep === 'editLanguage') return selectLanguage({botCommand, user})
        if (user.nextStep === 'editDuration') return selectDuration({user, botCommand})
        else if (botCommand === 'editLanguage'){
          return user
              .setNextStep('editLanguage')
              .editMessageText(user.messageConstructor('editLanguage'))
        }
        else if (botCommand === 'editTimezone'){
          user
            .deletePreviousKeyboard()
            .setNextStep('editTimezone')
            .sendMessage(user.messageConstructor('editTimezone'))
        }
        else if (botCommand === 'editDuration'){
          user
            .setNextStep('editDuration')
            .editMessageText(user.messageConstructor('editDuration'))
        }
        return
            

      default:
        switch (botCommand){
          case 'editDuration':
            var kb = keyboardToInline_(keyboard.SELECT_DURATION);
            editMessageText_(MESSAGE.id, MESSAGE.messageId, commands.ATTENTION_OF_AFFECT + commands.SELECT_DURATION, TELEGRAM.getInlineKeyboard(kb))
            return setUserProperty('status', USER.status = botCommand)
        
          case 'markEntry':
            finishSession(user)
            return markEntry(user)
          case 'cancel':
            if (user.program === 'menu') user.editMessageText(user.messageConstructor('informationMessage'))
            return;
              
          case 'daysLeft':
            return user.editMessageReplyMarkup(undefined, Telegram.getInlineKeyboard(user.replyMarkups.inline.askToCloseSession))
          case 'closeSession':
            return finishSession(user, true)
        }
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

function testytest(){
  log(keyboardToInline_(keyboard.SELECT_DURATION))
}
