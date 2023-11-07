
class Buttons {
  constructor (user){
    this.user = user
    this.language = user.language
    this.inline = new InlineButtons(user)
  }
  get selectLanguage(){
    return [
      [{text: '🇬🇧 English'}],
      [{text: '🇧🇾 Беларуси'}, {text: '🇷🇺 Русский'}],
      [{text: '🇷🇸 Srpski'}, {text: '🇺🇦 Український'}],
    ]
  }
  get getTimezone(){
    let language = this.language
    let text = '📍 ';
    
    if (language === 'ru') text += 'Поделиться геолокацией'
    else if (language === 'uk') text += 'Поділитися геолокацією'
    else if (language === 'be') text += 'Падзяліцца геолокацией'
    else if (language === 'rs') text += 'Deli lokaciju'
    else text += "Share Location"

    return [
      [{text: '⭐️ Asia/Tbilisi'}, {text: '⭐️ Europe/Belgrade'}],
      [{text, request_location: true}],    
    ]
  }
  get editTimezone (){
    const buttons = this.getTimezone;
    buttons.push([this.backButton])
    return buttons
  }
  get editDuration(){
    return this.inline.convertToInline(this.selectDuration)
  }
  get selectDuration(){
    switch (this.language){
      default:
      case 'en':
        return [
          [{text: '🟢 30 Days'},],
          [{text: '🟡 60 Days'}, {text: '🟠 90 Days'}],
          [{text: '🟣 180 Days'}, {text: '🔴 365 Days'}], 
        ]
      case 'ru':
        return [
          [{text: '🟢 30 Дней'}],
          [{text: '🟡 60 Дней'}, {text: '🟠 90 Дней'}],
          [{text: '🟣 180 Дней'}, {text: '🔴 365 Дней'}], 
        ]
      case 'uk':
        return [
          [{text: '🟢 30 Днів'}], 
          [{text: '🟡 60 Днів'}, {text: '🟠 90 Днів'}],
          [{text: '🟣 180 Днів'}, {text: '🔴 365 Днів'}], 
        ]
      case 'be':
        return [
          [{text: '🟢 30 Дзён'}],
          [{text: '🟡 60 Дзён'}, {text: '🟠 90 Дзён'}],
          [{text: '🟣 180 Дзён'}, {text: '🔴 365 Дзён'}], 
        ]
      case 'rs':
        return [
          [{text: '🟢 30 Dana'}],
          [{text: '🟡 60 Dana'}, {text: '🟠 90 Dana'}],
          [{text: '🟣 180 Dana'}, {text: '🔴 365 Dana'}], 
        ]
    }
  }
  get menu (){
    return [
      [this._enterButton], [this._manualButton],
      [this._statusButton, this._settingsButton]
    ]
  }
  get _enterButton(){
    switch (this.language){
      default:
        case 'en':
          return {text: '🚗 Mark entry'};
        case 'ru':
          return {text: '🚗 Отметить въезд'};
        case 'uk':
          return {text: "🚗 Відзначити в'їзд"}
        case 'be':
          return {text: '🚗 Адзначыць уезд'}
        case 'rs':
          return {text: '🚗 Označite unos'}
    }
  }
  get _manualButton(){
    switch (this.language){
      default:
        case 'en':
          return {text: `📅 Manually specify the date of entry`};
        case 'ru':
          return {text: `📅 Вручную указать дату въезда`};
        case 'uk':
          return {text: `📅 Вручну вказати дату в'їзду`}
        case 'be':
          return {text: `📅 Уручную пазначыць дату ўезду`}
        case 'rs':
          return {text: `📅 Ručno odredite datum unosa`}
    }
  }
  get _statusButton(){
    switch (this.language){
      default:
        case 'en':
          return {text: '🔄 Status'};
        case 'ru':
          return {text: '🔄 Статус'};
        case 'uk':
          return {text: '🔄 Статус'}
        case 'be':
          return {text: '🔄 Статус'}
        case 'rs':
          return {text: '🔄 Status'}
    }
  }
  get _settingsButton(){
    switch (this.language){
      default:
        case 'en':
          return {text: '🔧 Settings'};
        case 'ru':
          return {text: '🔧 Настройки'};
        case 'uk':
          return {text: '🔧 Налаштування'}
        case 'be':
          return {text: '🔧 Налады'}
        case 'rs':
          return {text: '🔧 Podešavanja'}
    }
  }
  get activeSession(){
    return [
      [this.inline.newEntry],
      [this.inline.cancel]
    ]
  }
  get informationMessage (){
    return this.inline.daysLeft
  }
  get acceptEntry (){
    return this.inline.daysLeft
  }
  // get enterDateManually (){
  //   return [[this.backButton]]
  // }
  get backButton(){
    switch (this.language){
      default:
        case 'en':
          return {text: '↪️ Back'};
        case 'ru':
          return {text: '↪️ Назад'};
        case 'uk':
          return {text: '↪️ Назад'}
        case 'be':
          return {text: '↪️ Назад'}
        case 'rs':
          return {text: '↪️ Nazad'}
    }
  }
  get settings (){
    return this.inline.settings
  }
  get editLanguage (){
    return this.inline.convertToInline(this.selectLanguage)
  }

   
}

class InlineButtons {
  constructor (user){
    this.user = user
    this.language = user.language
  }
  convertToInline(keyboard){
    return keyboard.map(row => row.map(e => ({callback_data: e.text, text: e.text})))
  }
  get daysLeft (){
    const
      user = this.user,
      language = this.language,
      currentDate = getCurrentDate_({user}),
      timeDifference = new Date(user.dateEnd) - currentDate,
      daysLeft = getDayDifference_(timeDifference);
    
    if (daysLeft >= 0){
      var text = daysLeft > 10 ? '⏳ ' : '⌛️ ';
      
      if (language === 'ru') text += 'Осталось дней:'
      else if (language === 'uk') text += 'Залишилось днів:'
      else if (language === 'be') text += 'Засталося дзён:'
      else if (language === 'rs') text += 'Preostali dani:'
      else text += `Days left:`
    } else {
      var text = '❗️ '

      if (language === 'ru') text += 'Опоздание, дней:'
      else if (language === 'uk') text += 'Запізнення, днів:'
      else if (language === 'be') text += 'Спазненне, дзён:'
      else if (language === 'rs') text += 'Kašnjenje, dani:'
      else text += `Delay, days:`
    }
    
    return [[{text: `${text} ${Math.abs(daysLeft)}`, callback_data: 'daysLeft'}]];
  }
  get cancel(){
    let language = this.language
    let text;
    
    if (language === 'ru') text = '❌ Отменить'
    else if (language === 'uk') text = '❌ Скасувати'
    else if (language === 'be') text = '❌ Адмяніць'
    else if (language === 'rs') text = '❌ Otkaži'
    else text = '❌ Cancel'

    return {text, callback_data: 'cancel'}
  }
  get newEntry (){
    let language = this.language
    let text;
    
    if (language === 'ru') text = '✅ Отметить новый въезд'
    else if (language === 'uk') text = `✅ Відзначити новий в'їзд`
    else if (language === 'be') text = '✅ Адзначыць новы ўезд'
    else if (language === 'rs') text = '✅ Označi novi unos'
    else text = '✅ Mark new entry'

    return {text, callback_data: 'markEntry'}
  }
  acceptManualDate (data){
    let language = this.language
    let text;
    
    if (language === 'ru') text = '✅ Подтвердить'
    else if (language === 'uk') text = '✅ Підтвердити'
    else if (language === 'be') text = '✅ Пацвердзіць'
    else if (language === 'rs') text = '✅ Potvrdi'
    else text = '✅ Confirm'

    return [
      [{text, callback_data: `accept/${data}`}],
      [this.cancel]
    ]
  }
  get askToCloseSession (){
    let language = this.language
    let text

    if (language === 'ru') text = '✅ Отметить выезд'
    else if (language === 'uk') text = '✅ Відзначити виїзд'
    else if (language === 'be') text = '✅ Адзначыць выезд'
    else if (language === 'rs') text = '✅ Označi odlazak'
    else text = '✅ Mark departure'

    return [
      [{text, callback_data: 'closeSession'}],
      [this.cancel]
    ]
  }
  get settings (){
    return [
      [this._intervalButton],
      [this._timezoneButton],
      [this._languageButton]
    ]
  }
  get _intervalButton(){
    let language = this.language
    let text;
    
    if (language === 'ru') text = '⏱️ Изменить интервал'
    else if (language === 'uk') text = '⏱️ Змінити інтервал'
    else if (language === 'be') text = '⏱️ Змяніць інтэрвал'
    else if (language === 'rs') text = '⏱️ Interval izmene'
    else text = '⏱️ Change interval'

    return {text, callback_data: 'editDuration'}
  }
  get _timezoneButton(){
    let language = this.language
    let text;
    
    if (language === 'ru') text = '🌍 Изменить часовой пояс'
    else if (language === 'uk') text = '🌍 Змінити часовий пояс'
    else if (language === 'be') text = '🌍 Змяніць гадзінны пояс'
    else if (language === 'rs') text = '🌍 Promeni vremensku zonu'
    else text = '🌍 Change time zone'

    return {text, callback_data: 'editTimezone'}
  }
  get _languageButton(){
    let language = this.language
    let text;
    
    if (language === 'ru') text = '🇷🇺 Изменить язык'
    else if (language === 'uk') text = '🇺🇦 Змінити мову'
    else if (language === 'be') text = '🇧🇾 Змяніць мову'
    else if (language === 'rs') text = '🇷🇸 Промените језик'
    else text = '🇬🇧 Change language'

    return {text, callback_data: 'editLanguage'}
  }
}
 