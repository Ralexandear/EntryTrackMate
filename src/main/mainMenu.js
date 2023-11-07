function mainMenu({user, messageText}) {
  let command = messageText.replace(/[^\p{Emoji}]/gu, '')

  switch (command){
    case "↪":
      switch (user.program){
        case 'settings':
          user.openMenu();
          command = '🔧'
          break
        default:
          return
      }
    case '🔄':
      user.setProgram('menu').deleteNextStep()
      
      if (user.dateStart){
        return user
          .deletePreviousKeyboard()
          .setMessageId(
            user.sendMessage( user.messageConstructor('informationMessage')).message_id) 
      } else {
        return user.openMenu(user.textMessages.noSessionFound)
      }
      
    case '🚗':
      user.setProgram('menu').deleteNextStep()
      return checkSession({user})
    case '📅':
      return user
        .deletePreviousKeyboard()
        .setProgram('enterDateManually')
        .sendMessage(user.messageConstructor('enterDateManually'))
    case '🔧':
      return user
        .deletePreviousKeyboard()
        .setProgram('settings')
        .deleteNextStep()
        .setMessageId(
          user.sendMessage(user.messageConstructor('settings')).message_id
        )
    default:
      return
  }
}
