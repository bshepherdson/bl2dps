CLASS({
  package: 'bl2.dps.ui',
  name: 'WeaponDetailView',
  extendsModel: 'foam.ui.UpdateDetailView',
  requires: [
    'bl2.dps.model.Weapon',
  ],

  properties: [
    {
      name: 'className',
      defaultValue: 'weapon-details'
    },
  ],

  templates: [
    function CSS() {/*
    */},
    function toHTML() {/*
      <div id="<%= this.id %>" <%= this.cssClassAttr() %>>
      </div>
    */},
  ]
});
