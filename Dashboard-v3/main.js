/**
 * @jsx React.DOM
 */

var React    = require('react'),
    Routes   = require('react-router').Routes,
    Route    = require('react-router').Route,
    Link     = require('react-router').Link,
    Header   = require('./components/header'),
    Footer   = require('./components/footer'),
    Surveys  = require('./components/surveys').Surveys,
    devices  = require('./components/devices'),
    Data     = require('./components/data').Data,
    Reports  = require('./components/reports').Reports,
    Maps     = require('./components/maps').Maps,
    Users    = require('./components/users').Users,
    Messages = require('./components/messages').Messages;

var App = React.createClass({
  render: function() {
    return (
      <div>
        <Header/>
        <div id='pageWrap'>
          <this.props.activeRouteHandler/>
        </div>
        <Footer/>
      </div>
    )
  }
});

var appRoutes = (
  <Routes>
    <Route handler={App}>
      <Route name='surveys' handler={Surveys}/>
      <Route name='devices' handler={devices.Devices}>
        <Route name='devices-list' path='devices/devices-list' handler={devices.DevicesList}/>
        <Route name='assignments-list' path='devices/assignments-list' handler={devices.AssignmentsList}/>
        <Route name='manual-survey-transfer' path='devices/manual-survey-transfer' handler={devices.ManualSurveyTransfer}/>
      </Route>
      <Route name='data' handler={Data}/>
      <Route name='maps' handler={Maps}/>
      <Route name='reports' handler={Reports}/>
      <Route name='users' handler={Users}/>
      <Route name='messages' handler={Messages}/>
    </Route>
  </Routes>
);

React.renderComponent(
  appRoutes,
  document.getElementById('app')
);
