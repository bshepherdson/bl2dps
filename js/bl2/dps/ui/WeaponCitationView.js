CLASS({
  package: 'bl2.dps.ui',
  name: 'WeaponCitationView',
  extendsModel: 'foam.ui.View',
  requires: [
    'bl2.dps.model.Weapon'
  ],

  properties: [
    {
      name: 'className',
      defaultValue: 'weapon-citation'
    },
  ],

  templates: [
    function CSS() {/*
      .weapon-citation {
        display: flex;
        flex-direction: column;
        height: 64px;
        justify-content: space-around;
        padding: 8px 16px;
      }
      .weapon-citation-row {
        display: flex;
        justify-content: space-between;
      }
      .weapon-citation-row span.label {
        color: #444;
        font-size: 80%;
        margin-right: 10px;
      }
    */},
    function toHTML() {/*
      <div id="<%= this.id %>" <%= this.cssClassAttr() %>>
        <div class="weapon-citation-row">
          <span style="font-size: 120%">
            $$name{ model_: 'foam.ui.TextFieldView', mode: 'read-only' }
          </span>
          <span>
            <span style="margin-right: 12px;">
              $$manufacturer{ mode: 'read-only' }
              $$type{ mode: 'read-only' }
            </span>
            <span class="label">Level</span>
            $$level{ model_: 'foam.ui.TextFieldView', mode: 'read-only' }
          </span>
        </div>
        <div class="weapon-citation-row">
          <span>
            <span class="label">Cyclic</span>
            $$dpsCyclic{ model_: 'foam.ui.TextFieldView', mode: 'read-only' }
          </span>
          <span>
            <span class="label">Mag</span>
            $$dpsSingleMag{ model_: 'foam.ui.TextFieldView', mode: 'read-only' }
          </span>
          <span>
            <span class="label">Time</span>
            $$timePerMag{ model_: 'foam.ui.TextFieldView', mode: 'read-only' }
          </span>
        </div>
      </div>
    */},
  ]
});
