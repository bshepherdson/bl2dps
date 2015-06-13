CLASS({
  package: 'bl2.dps.ui',
  name: 'WeaponDetailView',
  extendsModel: 'foam.ui.md.DetailView',
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
    //function toHTML() {/*
    //  <div id="<%= this.id %>" <%= this.cssClassAttr() %>>
    //    $$type
    //    $$manufacturer
    //    $$name
    //  </div>
    //*/},
  ]
});
