(function() {
  scheduler.locale.labels.year_tab ="Year";
  scheduler.config.xml_date="%Y-%m-%d %H:%i";
  scheduler.config.details_on_dblclick = true;
  scheduler.config.details_on_create = true;
  scheduler.config.active_link_view = "week";


  var events = [
    {
      id:1,
      text:"MOLE",
      start_date:"2017-05-10 15:00",
      end_date:"2017-05-11 00:00",
      type:"vacation",
      status:"requested"
    },{
      id:10,
      text:"COSH",
      start_date:"2017-05-10 08:00",
      end_date:"2017-05-10 13:00",
      type:"vacation",
      status:"requested"
    },{
      id:2,
      text:"GOGR",
      start_date:"2017-05-10",
      end_date:"2017-05-13",
      type:"vacation",
      status:"approved"
    },{
      id:3,
      text:"RYSW",
      start_date:"2017-05-11",
      end_date:"2017-05-14",
      type:"vacation",
      status:"approved"
    },{
      id:4,
      text:"EOGO",
      start_date:"2017-05-08",
      end_date:"2017-05-13",
      type:"vacation",
      status:"approved"
    },{
      id:5,
      text:"A",
      start_date:"2017-04-29 19:00",
      end_date:"2017-05-02 07:00",
      type:"shift",
      shift:"night",
    },{
      id:6,
      text:"B",
      start_date:"2017-04-30",
      end_date:"2017-05-04",
      type:"shift",
      shift:"day",
    },{
      id:7,
      text:"D",
      start_date:"2017-04-26",
      end_date:"2017-04-30",
      type:"shift",
      shift:"day",
    },{
      id:8,
      text:"C",
      start_date:"2017-04-26",
      end_date:"2017-04-29",
      type:"shift",
      shift:"night",
    }
  ];
  scheduler.init('scheduler_here', new Date(),"year");
  scheduler.templates.event_class = function (start, end, event) {
    var Class = ""
    switch (event.type) {
      case 'shift':
        Class = "shift";
        break;
      case 'vacation':
        if (event.status == 'requested') {
          Class = "requested_req"
        }else {
          Class = "approved_req";
        }
        break;
      default:
      var Class = 'shift'
    }
    return Class
  };
  scheduler.templates.year_tooltip = function(start,end,event) {
    var tooltip = ''
    switch (event.type) {
      case 'shift':
        tooltip += (event.shift == 'night'?
          " <span class='zmdi zmdi-star text-muted'></span> ":
          " <span class='zmdi zmdi-sun text-warning'></span> ") +
          event.text + " " + event.shift
        break;
      case 'vacation':
        tooltip += (event.status == 'approved'?
        " <span class='zmdi zmdi-check text-success'></span> ":
        " <span class='zmdi zmdi-square-o text-primary'></span> ") +
        event.text
        break;
      default:
        tooltip += event.text
    }
    tooltip += "<br/>4 Engineers availeble<br/>"
    return tooltip
  };
  scheduler.templates.event_bar_text = function(start,end,event) {
    switch (event.type) {
      case 'shift':
        var bar = event.text + " " + event.shift + " " + event.type
        break;
      case 'vacation':
      var bar =  event.text + " " + event.status + " " + event.type
        break;
      default:
      var bar = event.text
    }
    return bar
  };
  scheduler.templates.event_bar_text = function(start,end,event) {
    switch (event.type) {
      case 'shift':
        var bar = event.text + " " + event.shift + " " + event.type
        break;
      case 'vacation':
      var bar =  event.text + " " + event.status + " " + event.type
        break;
      default:
      var bar = event.text
    }
    return bar
  };
  scheduler.parse(events, "json");//takes the name and format of the data source

  // Custom form for lightbox
  var html = function(id) { return document.getElementById(id); }; //just a helper

  scheduler.showLightbox = function(id) {
  	var ev = scheduler.getEvent(id);
  	scheduler.startLightbox(id, html("my_form"));

  	html("description").focus();
  	html("description").value = ev.text;
  	html("from").value = ev.start_date || "";
  	html("to").value = ev.end_date || "";
    $('.flatpickr').flatpickr({
        enableTime: true,
        time_24hr: true
    })
  };
  // Functions
  function save_form() {
  	var ev = scheduler.getEvent(scheduler.getState().lightbox_id);
  	ev.text = html("description").value;
  	ev.start_date = html("from").value;
  	ev.end_date = html("to").value;

  	scheduler.endLightbox(true, html("my_form"));
  }
  function close_form() {
  	scheduler.endLightbox(false, html("my_form"));
  }
  function delete_event() {
  	var event_id = scheduler.getState().lightbox_id;
  	scheduler.endLightbox(false, html("my_form"));
  	scheduler.deleteEvent(event_id);
  }

  // Events
  $(document).on('click','#save',function () {
    save_form()
  })
  $(document).on('click','#close',function () {
    close_form()
  })
  $(document).on('click','#delete',function () {
    delete_event()
  })

})()
