Template.datetimeInputs.created = function() {
  this.dict = new ReactiveDict('datetimeDict' + Random.id());
  this.dict.setDefault('meridian', 'AM');
  this.dict.setDefault('calendar-input-id', 'calendar-' + Random.id());

  if (!this.value && this.defaultValue) {
    if (_.isFunction( this.defaultValue )){
      this.value = this.defaultValue();
    }
    else {
      this.value = moment(this.defaultValue).toDate();
    }
  }
}

Template.datetimeInputs.rendered = function() {
  var dateField = $(this.firstNode).find('[data-datepart="date"]');
  var timeField = $(this.firstNode).find('[data-datepart="time"]');
  dateField.datepicker(this.data.atts.opts);

  timeField.inputmask({
    mask: "9{1,2}:9{2}",
    regex: "[12]?[0-9]:[0-9][0-9]",
    greedy: false
  });
}

Template.datetimeInputs.helpers({
  atts: function () {
    var atts = _.omit(this.atts, 'calendarOpts');
    return atts;
  },

  dataSchemaKey: function() {
    return this.atts['data-schema-key'];
  },

  meridian: function() {
    template = Template.instance();
    return template.dict.get('meridian');
  },

  dateStr: function () {
    if (this.value) {
      return moment(this.value).format("MM/DD/YYYY");
    }
  },

  timeStr: function () {
    template = Template.instance();

    if (this.value) {
      template.dict.set('meridian', moment(this.value).format("A"));
      return moment(this.value).format("h:mm");
    }
  },

  calendarInputId: function() {
    template = Template.instance();
    return template.dict.get('calendar-input-id');
  }
});

Template.datetimeInputs.events({
  "click .meridian-option": function (e, template) {
    var val = $(e.target).data('value');
    template.dict.set('meridian', val);
  }
})

AutoForm.addInputType("datetime-inputs", {
  template: "datetimeInputs",
  valueOut: function () {
    var date = $(this).find('[data-datepart="date"]').val();
    var time = $(this).find('[data-datepart="time"]').val();
    var meridian = $(this).find('[data-datepart="meridian"]').val();

    if (date && date.length && time && time.length) {
      var combined = [ date, time, meridian ].join(' ');
      return moment(combined, "MM/DD/YYYY h:mm A").toDate();
    }
  }
});
