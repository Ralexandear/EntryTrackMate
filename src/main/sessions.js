function checkSession({user}){
  if (user.dateStart){
    return user
      .deletePreviousKeyboard()
      .setMessageId(
        user.sendMessage(user.messageConstructor('activeSession')).message_id
      )
  } else {
    return markEntry(user)
  }
}

function finishSession(user, editMessage = false){
  if (editMessage) user.editMessageText(user.messageConstructor('sessionClosed'))
  else user.sendMessage(user.messageConstructor('sessionClosed'))

  return user.closeSession().setProgram('menu')
}

function markEntry(user, selectedDate, editMessage = false) {
  user
    .deletePreviousKeyboard()
    .setDateStart(getCurrentDate_({user, currentDate: selectedDate}));
  
  user.dateStart.setHours(0,0,0,0)

  user.setDateEnd(
    new Date(new Date(user.dateStart).setDate(user.dateStart.getDate() + user.duration - 1))
  )
  user.setProgram('menu')

  if (editMessage) return log(user.editMessageText(user.messageConstructor('acceptEntry')))
  return user.setMessageId( user.sendMessage( user.messageConstructor('acceptEntry')).message_id)
}
