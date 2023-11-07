function clearCache(){
  const
    {values, mapping} = getDatabase()

  $.cache.removeAll(values.map(e => e[mapping.get('id')]).flat())
}

function updateKeyboards (){
  clearCache()

  const {mapping, values, notes} = getDatabase()
  const timezonesAndDates = checkTime_();
  const
    updateIx = mapping.get('lastNotification'),
    idIx = mapping.get('id')

  for (let i = values.length - 1; i > -1; i--){
    const row = values[i]
    const user = new User(row[idIx]).loadData()

    if (user.program === 'blocked' || ! user.dateStart) continue;
    
    const now = getCurrentDate_({user}).getTime().toString()
    const status = notes[i][updateIx].toString()

    if (status !== now){
      const response = user.editMessageText(user.messageConstructor('informationMessage').muteExceptions())

      if (response){
        user.setMessageId(response.message_id)
      }
      notes[i][updateIx] = now;
    }

    const lastNotification = row[updateIx]

    if (lastNotification !== now && timezonesAndDates.has(user.timezone)){
      
      if([60,30,15,7].includes(user.daysLeft) || user.daysLeft < 4){
        user
          .deletePreviousKeyboard()
          .setMessageId(
            user.sendMessage(new Message(user.textMessages.notification).setReplyMarkup(user.replyMarkups.informationMessage).muteExceptions())?.message_id 
          )
        user.setNotification(now)
      }
    }
    user.save()
  }

  $.USER_TABLE.getRange(2, 1, notes.length, mapping.size).setNotes(notes)
}


function checkTime_() {
  const
    output = new Map(),
    now = new Date(),
    timezoneSheet = $.getSheet(TIMEZONE_SHEET),
    values = timezoneSheet.getRange(2, 1, timezoneSheet.getLastRow() - 1).getValues()
  
  for (let i = values.length - 1; i > -1; i--){
    const
      timezone = values[i][0],
      [currentDate, hours] = Utilities.formatDate(now, timezone, 'yyyy-MM-dd/HH').split('/')
    
    if (hours > 11 && hours < 24) output.set(timezone, new Date(currentDate))
  }

  return output
}