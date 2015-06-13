CLASS({
  package: 'bl2.dps.model',
  name: 'Weapon',
  properties: [
    {
      name: 'id',
      hidden: true
    },
    {
      model_: 'foam.core.types.StringEnumProperty',
      name: 'type',
      label: 'Weapon Type',
      defaultValue: 'PISTOL',
      choices: [
        ['PISTOL', 'Pistol'],
        ['SMG', 'SMG'],
        ['ASSAULT', 'Assault Rifle'],
        ['RIFLE', 'Sniper Rifle'],
        ['SHOTGUN', 'Shotgun'],
        ['LAUNCHER', 'Rocket Launcher'],
      ],
      view: 'foam.ui.md.PopupChoiceView',
    },
    {
      model_: 'foam.core.types.StringEnumProperty',
      name: 'manufacturer',
      label: 'Manufacturer',
      defaultValue: 'BANDIT',
      choices: [
        ['BANDIT', 'Bandit'],
        ['DAHL',   'Dahl'],
        ['HYPERION', 'Hyperion'],
        ['JAKOBS', 'Jakobs'],
        ['MALIWAN', 'Maliwan'],
        ['TEDIORE', 'Tediore'],
        ['TORGUE', 'Torgue'],
        ['VLADOF', 'Vladof'],
      ],
      view: 'foam.ui.md.PopupChoiceView'
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
      label: 'Rarity',
      defaultValue: 'WHITE',
      choices: [
        ['WHITE', 'White (common)'],
        ['GREEN', 'Green (uncommon)'],
        ['BLUE',  'Blue (rare)'],
        ['PURPLE', 'Purple (very rare)'],
        ['ORANGE', 'Orange (unique)'],
        ['ETECH', 'Pink (E-tech)'],
      ],
      view: 'foam.ui.md.PopupChoiceView'
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
      defaultValue: 1
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
      help: 'The number of shots fired per second. Clamped at 5 maximum for "Fires as fast as you pull the trigger" weapons (eg. Jakobs pistols).',
    },
    {
      model_: 'FloatProperty',
      name: 'realFireRate',
      hidden: true,
      documentation: 'Adjusted fire rate. Capped at 5 for Jakobs pistols.',
      dynamicValue: function() {
        this.manufacturer; this.type; this.fireRate;
        return this.manufacturer === 'JAKOBS' && this.type === 'PISTOL' ?
            Math.min(5, this.fireRate) : this.fireRate;
      }
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
      name: 'realTimePerMag',
      hidden: true,
      documentation: 'Internal, accurate time per magazine.',
      dynamicValue: function() {
        return Math.ceil(this.shotsPerMag) * (1 / this.realFireRate);
      }
    },
    {
      model_: 'FloatProperty',
      name: 'timePerMag',
      help: 'The total time required to drain a magazine. Rounds shots per mag up to the next whole number, because partial shots take as long as full ones.',
      mode: 'read-only',
      dynamicValue: function() {
        return +(Math.round(this.realTimePerMag * 100) / 100);
      }
    },
    {
      model_: 'FloatProperty',
      name: 'realDpsSingleMag',
      documentation: 'Internal, accurate DPS of a single magazine, without reloading.',
      dynamicValue: function() {
        return this.damagePerMag / this.realTimePerMag;
      }
    },
    {
      model_: 'FloatProperty',
      name: 'dpsSingleMag',
      label: 'DPS (Mag)',
      mode: 'read-only',
      help: 'DPS of a single magazine, without reloading.',
      dynamicValue: function() {
        return +(Math.round(this.realDpsSingleMag * 100) / 100);
      }
    },
    {
      model_: 'FloatProperty',
      name: 'realDpsCyclic',
      label: 'DPS (Cyclic)',
      mode: 'read-only',
      documentation: 'Internal, accurate cyclic DPS.',
      dynamicValue: function() {
        return this.damagePerMag / (this.realTimePerMag + this.reloadSpeed);
      }
    },
    {
      model_: 'FloatProperty',
      name: 'dpsCyclic',
      label: 'DPS (Cyclic)',
      mode: 'read-only',
      help: 'DPS of firing this weapon continuously, across many reloads.',
      dynamicValue: function() {
        return +(Math.round(this.realDpsCyclic * 100) / 100);
      }
    },
  ],
});
