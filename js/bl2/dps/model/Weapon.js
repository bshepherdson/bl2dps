CLASS({
  package: 'bl2.dps.model',
  name: 'Weapon',
  properties: [
    {
      name: 'id'
    },
    {
      model_: 'foam.core.types.StringEnumProperty',
      name: 'type',
      choices: [
        ['PISTOL', 'Pistol'],
        ['SMG', 'SMG'],
        ['ASSAULT', 'Assault Rifle'],
        ['RIFLE', 'Sniper Rifle'],
        ['SHOTGUN', 'Shotgun'],
        ['LAUNCHER', 'Rocket Launcher'],
      ],
    },
    {
      model_: 'foam.core.types.StringEnumProperty',
      name: 'manufacturer',
      choices: [
        ['JAKOBS', 'Jakobs'],
        ['DAHL',   'Dahl'],
        ['TORGUE', 'Torgue'],
        ['MALIWAN', 'Maliwan'],
        ['BANDIT', 'Bandit'],
        ['TEDIORE', 'Tediore'],
        ['HYPERION', 'Hyperion'],
        ['VLADOF', 'Vladof'],
      ],
    },
    {
      model_: 'StringProperty',
      name: 'name',
    },
    {
      model_: 'IntProperty',
      name: 'level',
      help: 'The minimum level required to use this gun.',
    },
    {
      model_: 'foam.core.types.StringEnumProperty',
      name: 'rarity',
      defaultValue: 'WHITE',
      choices: [
        ['WHITE', 'White (common)'],
        ['GREEN', 'Green (uncommon)'],
        ['BLUE',  'Blue (rare)'],
        ['PURPLE', 'Purple (very rare)'],
        ['ORANGE', 'Orange (unique)'],
        ['ETECH', 'Pink (E-tech)'],
      ],
    },
    {
      model_: 'IntProperty',
      name: 'bulletDamage',
      help: 'The damage for each bullet fired from this gun. Eg. for a gun that deals "34x2", this is 34.',
    },
    {
      model_: 'IntProperty',
      name: 'bulletsPerShot',
      help: 'The number of "bullets" per trigger pull. For a gun that deals "34x2", this is 2. For most guns, it\'s 1.',
    },
    {
      model_: 'IntProperty',
      name: 'ammoPerShot',
      defaultValue: 1,
      help: 'The number of rounds of ammunition expended per trigger pull. For most guns, this is 1. For shotguns, text at the bottom states how many.',
    },
    {
      model_: 'FloatProperty',
      name: 'fireRate',
      help: 'The number of shots fired per second. Clamped at 5 maximum for semiautomatic weapons (eg. Jakobs pistols).',
    },
    {
      model_: 'FloatProperty',
      name: 'reloadSpeed',
      help: 'The number of seconds required to reload this gun when empty.',
    },
    {
      model_: 'IntProperty',
      name: 'magazineSize',
      help: 'The size of each magazine in rounds of ammunition.',
    },

    {
      model_: 'FloatProperty',
      name: 'shotsPerMag',
      mode: 'read-only',
      help: 'The number of shots (ie. notional trigger pulls) per magazine.',
      dynamicValue: function() {
        return this.magazineSize / this.ammoPerShot;
      }
    },
    {
      model_: 'FloatProperty',
      name: 'damagePerMag',
      mode: 'read-only',
      help: 'The total damage per magazine.',
      dynamicValue: function() {
        return this.shotsPerMag * this.damagePerShot;
      }
    },
    {
      model_: 'FloatProperty',
      name: 'damagePerShot',
      mode: 'read-only',
      help: 'Damage per (notional) trigger pull.',
      dynamicValue: function() {
        return this.bulletDamage * this.bulletsPerShot;
      }
    },
    {
      model_: 'FloatProperty',
      name: 'timePerMag',
      help: 'The total time required to drain a magazine. Rounds shots per mag up to the next whole number, because partial shots take as long as full ones.',
      mode: 'read-only',
      dynamicValue: function() {
        return Math.ceil(this.shotsPerMag) * (1 / this.fireRate);
      }
    },
    {
      model_: 'FloatProperty',
      name: 'dpsSingleMag',
      label: 'DPS (Mag)',
      mode: 'read-only',
      help: 'DPS of a single magazine, without reloading.',
      dynamicValue: function() {
        return this.damagePerMag / this.timePerMag;
      }
    },
    {
      model_: 'FloatProperty',
      name: 'dpsCyclic',
      label: 'DPS (Cyclic)',
      mode: 'read-only',
      help: 'DPS of firing this weapon continuously, across many reloads.',
      dynamicValue: function() {
        return this.damagePerMag / (this.timePerMag + this.reloadSpeed);
      }
    },
  ],
});
