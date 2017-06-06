(function() {
  scheduler.init('scheduler_here', new Date(),"year");
  scheduler.locale.labels.year_tab ="Year";
  var events = [
{id:1, text:"Meeting",   start_date:"04/11/2017 14:00",end_date:"04/11/2017 17:00",type:"shift"},
{id:2, text:"Conference",start_date:"04/15/2017 12:00",end_date:"04/18/2017 19:00",type:"vacation"},
{id:3, text:"Interview", start_date:"04/24/2017 09:00",end_date:"04/24/2017 10:00",type:"vacation"},
{id:1, text:"Meeting",   start_date:"05/11/2017 14:00",end_date:"05/11/2017 17:00",type:"shift"},
{id:2, text:"Conference",start_date:"05/15/2017 12:00",end_date:"05/18/2017 19:00",type:"vacation"},
{id:3, text:"Interview", start_date:"05/24/2017 09:00",end_date:"05/24/2017 10:00",type:"vacation"},
{id:1, text:"Meeting",   start_date:"05/25/2017 14:00",end_date:"05/26/2017 17:00",type:"vacation"},
{id:2, text:"Conference",start_date:"05/26/2017 20:00",end_date:"05/26/2017 22:00",type:"shift"},
{id:3, text:"Interview", start_date:"05/27/2017 09:00",end_date:"05/27/2017 10:00",type:"shift"}
];
scheduler.templates.event_class = function (start, end, event) {
    if (event.type == 'shift') return "shift_event";
    return "vacation_event"; 
};
scheduler.parse(events, "json");//takes the name and format of the data source
})()
