var MIN_HIT = 1;
var MAX_HIT = 8;
var MIN_SPECIAL_HIT = 1;
var MAX_SPECIAL_HIT = 15;
var MIN_HEAL = 5;
var MAX_HEAL = 15;
var YOUR_TEXT_STYLE_CLASS = 'player-turn';
var MONSTER_TEXT_STYLE_CLASS = 'monster-turn';
var HEAL_TEXT_STYLE_CLASS = 'player-turn';

new Vue({
  el: '#app',
  data: {
    isGameOver: true,
    yourHealth: 100,
    monsterHealth: 100,
    logs: []
  },
  methods: {
    startNewGame: function() {
      this.isGameOver = false;
      this.yourHealth = 100;
      this.monsterHealth = 100;
      this.logs = [];
    },
    randomInt: function(min,max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    },
    attack: function(isSpecial) {
      var hit = this.randomInt(isSpecial ? MIN_SPECIAL_HIT : MIN_HIT,isSpecial ? MAX_SPECIAL_HIT : MAX_HIT);
      this.monsterHealth -= hit;
      this.logMessage('You Hit Monster! He loses ' + hit, [YOUR_TEXT_STYLE_CLASS]);
      this.damage(isSpecial);
      this.checkWin();
    },
    damage: function(isSpecial) {
      var hit = this.randomInt(isSpecial ? MIN_SPECIAL_HIT : MIN_HIT,isSpecial ? MAX_SPECIAL_HIT : MAX_HIT);
      this.yourHealth -= hit;
      this.logMessage('Monster Hits You! You lose ' + hit, [MONSTER_TEXT_STYLE_CLASS]);
    },
    heal: function() {
      var heal = this.randomInt(MIN_HEAL,MAX_HEAL);
      if ((this.yourHealth + heal) > 100) {
        heal = 100 - this.yourHealth;
        this.yourHealth = 100;
      } else {
        this.yourHealth += heal;
      }
      this.logMessage('You Heal ' +  heal + ' of life', [HEAL_TEXT_STYLE_CLASS]);
      this.damage(false);
    },
    logMessage: function(text, textStyleClass) {
      this.logs.unshift({text, textStyleClass});
    },
    giveUp: function() {
      this.isGameOver = true;
    },
    checkWin: function() {
      if (this.yourHealth == 0 && this.monsterHealth == 0) {
        if (confirm('It\'s a tie! New game?')) {
          this.startNewGame();
        } else {
          alert('It\'s a tie!');
          this.isGameOver = true;
        }
      } else if (this.yourHealth <= 0) {
        if(confirm('You lose... Ready for revenge?')) {
          this.startNewGame();
        } else {
          alert('You lose... Be stronger next time!');
          this.isGameOver = true;
        }
      } else if (this.monsterHealth <= 0) {
        if (confirm('You won! Battle again?')) {
          this.startNewGame();
        } else {
          alert('You won! But clean these messy please.');
          this.isGameOver = true;
        }
      }
    }
  }
});
