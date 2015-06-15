CLASS({
  package: 'bl2.dps',
  name: 'App',
  extendsModel: 'foam.browser.ui.BrowserView',
  requires: [
    'bl2.dps.model.Weapon',
    'bl2.dps.ui.WeaponCitationView',
    'bl2.dps.ui.WeaponDetailView',
    'foam.browser.BrowserConfig',
    'foam.dao.EasyDAO',
    'foam.dao.IDBDAO',
    'foam.dao.NullDAO',
    'MDAO',
  ],

  exports: [
    'selection$',
    'weaponDAO as dao',
  ],

  properties: [
    {
      name: 'weaponDAO',
      factory: function() {
        return this.EasyDAO.create({
          model: this.Weapon,
          seqNo: true,
          cache: true
        });
      },
      view: 'foam.ui.DAOListView',
    },
    {
      name: 'data',
      factory: function() {
        return this.BrowserConfig.create({
          title: 'DPS Calculator',
          dao: this.weaponDAO,
          model: this.Weapon,
          cannedQueryDAO: this.NullDAO.create(),
          listView: {
            factory_: 'foam.ui.DAOListView',
            mode: 'read-only',
            rowView: 'bl2.dps.ui.WeaponCitationView'
          },
          innerDetailView: 'bl2.dps.ui.WeaponDetailView',
        });
      }
    },
    {
      name: 'selection',
      documentation: 'The currently selected weapon. Viewed in the detail portion.',
    },
  ],
});
