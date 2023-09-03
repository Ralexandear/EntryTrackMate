// Define a class called "User" that extends the "Telegram" class.
class User extends Telegram {
  constructor(id) {
    super(); // Call the constructor of the parent class (Telegram).

    // Initialize instance properties.
    this.id = id.toString(); // Convert the 'id' parameter to a string and store it.
    this.isEdited = false; // Initialize 'isEdited' to false.
  }

  // Getter for text messages, creating a new instance if it doesn't exist.
  get textMessages() {
    return this['_textMessages'] ?? (this['_textMessages'] = new TextMessages(this));
  }

  // Getter for reply markups, creating a new instance if it doesn't exist.
  get replyMarkups() {
    return this['_replyMarkups'] ?? (this['_replyMarkups'] = new Buttons(this));
  }

  // Method for constructing a message based on data.
  messageConstructor(data) {
    return new Message(this.textMessages[data]).setReplyMarkup(this.replyMarkups[data]);
  }

  // Method for loading user data from cache or a database.
  loadData() {
    // Retrieve data from cache if it exists.
    this.cache = $.cache.get(this.id);

    if (this.cache) {
      this.mapping = $.mapping;
      this.cache = JSON.parse(this.cache);

      // Map cached data to instance properties.
      Object.keys(this.cache).map(key => (this[key] = this.cache[key]));
    } else {
      // Load data from a database if cache is not available.
      const { mapping, values } = getDatabase();
      this.mapping = mapping;

      // Iterate over database values to find the user's data.
      for (let i = values.length - 1; i > -1; i--) {
        const row = values[i];

        if (row[mapping.get('id')] == this.id) {
          for (let [key, iX] of mapping) {
            this[key] = row[iX];
          }
          this.row = i + 2;
          break;
        }
      }
    }
    return this;
  }

  // Method for setting instance property data.
  setData(key, data) {
    if (this[key] !== data) {
      this[key] = data;
      this.isEdited = true;
    }
    return this;
  }

  // Method for saving user data.
  save() {
    if (this.isEdited) {
      const row = new Array(this.mapping.size).fill('');
      this.cache = new Object();

      // Populate the 'row' array and 'cache' object with data.
      for (let [key, iX] of this.mapping) {
        this.cache[key] = row[iX] = this[key];
      }

      // Convert date fields to Date objects if applicable.
      if (row[this.mapping.get('dateStart')]) {
        row[this.mapping.get('dateStart')] = new Date(row[this.mapping.get('dateStart')]);
      }
      if (row[this.mapping.get('dateEnd')]) {
        row[this.mapping.get('dateEnd')] = new Date(row[this.mapping.get('dateEnd')]);
      }
      row[this.mapping.get("daysLeft")] = '';

      // If 'row' is not set, determine a new row number.
      if (!this.row) {
        const lock = LockService.getScriptLock();

        if (lock.tryLock(360000)) {
          this.row = $.USER_TABLE.getLastRow() + 1;
          lock.releaseLock();
        }
      }
      this.cache.row = this.row;

      if (!this.mapping.size) this.mapping = getDatabase().mapping;

      // Update the user's data in the database.
      $.USER_TABLE.getRange(this.row, 1, 1, this.mapping.size).setValues([row]);
    }
    if (this.cache) $.cache.put(this.id, JSON.stringify(this.cache));
  }

  // Method for deleting the previous keyboard.
  deletePreviousKeyboard() {
    this.editMessageReplyMarkup();
    return this;
  }

  // Method for setting the message ID.
  setMessageId(data) {
    this.setData('messageId', data);
    return this;
  }

  // Method for setting the user's language.
  setLanguage(data) {
    this.setData('language', data);
    return this;
  }

  // Method for setting the program.
  setProgram(data) {
    this.setData('program', data);
    return this;
  }

  // Method for setting the next step.
  setNextStep(data) {
    this.setData('nextStep', data);
    return this;
  }

  // Method for setting the duration.
  setDuration(data) {
    this.setData('duration', data);
    return this;
  }

  // Method for setting the start date.
  setDateStart(data) {
    this.setData('dateStart', data);
    return this;
  }

  // Method for setting the end date.
  setDateEnd(data) {
    this.setData('dateEnd', data);
    return this;
  }

  // Method for opening a menu and sending a message.
  openMenu(text) {
    this.deleteNextStep();
    this.sendMessage(new Message(text ?? this.textMessages.menu).setReplyMarkup(this.replyMarkups.menu));
    this.setProgram('menu');
  }

  // Method for closing a user session.
  closeSession() {
    this.isEdited = !(this.dateStart = this.dateEnd = null);
    return this;
  }

  // Method for deleting the next step.
  deleteNextStep() {
    this.isEdited = !(this.nextStep = null);
    return this;
  }

  setNotification(data){
    this.setData('lastNotification', data);
    return this;
  }

  // Method for setting the user's timezone based on latitude and longitude.
  setTimezone(lat, lng) {
    const link = `http://api.timezonedb.com/v2.1/get-time-zone?key=${TZ_TOKEN}&format=json&by=position&lat=${lat}&lng=${lng}`;
    const lock = LockService.getScriptLock();

    if (lock.tryLock(360000)) {
      this.setData('timezone', JSON.parse(UrlFetchApp.fetch(link).getContentText()).zoneName);

      Utilities.sleep(1000);
      lock.releaseLock();
    }
    return this;
  }
}
