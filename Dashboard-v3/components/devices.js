/**
 * @jsx React.DOM
 */

var React = require('react'),
    Routes = require('react-router').Routes,
    Route = require('react-router').Route,
    Link = require('react-router').Link
    ActiveState = require('react-router').ActiveState;
    store = require('../store');

var Devices = React.createClass({

  mixins: [ActiveState],

  getInitialState: function() {
    return {
      isActive: false
    };
  },

  updateActiveState: function() {
    this.setState({
      isActive: Devices.isActive('devices'),
    })
  },

  render: function() {

    return (
      <section className='devicesSection floats-in' id='main' role='main'>
        <div id='tabs'>
          <nav className='tabNav floats-in'>
            <ul>
              <li className={Devices.isActive('devices-list') ? 'active' : ''}>
                <Link to='devices-list'>Devices List</Link>
              </li>
              <li className={Devices.isActive('assignments-list') ? 'active' : ''}>
                <Link to='assignments-list'>Assignments List</Link>
              </li>
              <li className={Devices.isActive('manual-survey-transfer') ? 'active' : ''}>
                <Link to='manual-survey-transfer'>Manual Survey Transfer</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div>
          <this.props.activeRouteHandler/>
        </div>
      </section>
    );
  }
});

var DevicesListRow = React.createClass({
  render: function() {

    var device = this.props.device;

    return (
      <tr>
        <td className="selection"><input type="checkbox"/></td>
        <td className="EMEI">{device.esn}</td>
        <td className="phoneNumber">{device.phoneNumber}</td>
        <td className="deviceId">{device.deviceIdentifier}</td>
        <td className="deviceGroup">{device.deviceGroup}</td>
        <td className="lastBeacon">{device.lastPositionDate}</td>
        <td className="version">{device.gallatinSoftwareManifest}</td>
      </tr>
    );
  }
});

var DevicesListTable = React.createClass({
  render: function() {
    var devices = this.props.data.devices;
    var rows = [];
    devices.forEach(function(device) {
      rows.push(<DevicesListRow device={device}/>)
    });


    return (
      <table className="dataTable" id="surveyDataTable">
        <thead>
          <tr>
            <th><input type="checkbox" checked="checked"/></th>
            <th><a>IMEI</a></th>
            <th><a>Phone number</a></th>
            <th><a>Device id</a></th>
            <th><a>Device group</a></th>
            <th><a>Last contact</a></th>
            <th><a>Version</a></th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }
})

var DevicesList = React.createClass({
  render: function() {
    return (
      <section className='fullWidth' id='devicesList'>
        <div>
          <a className='standardBtn btnAboveTable'>Manage device groups</a>
          <nav className="dataTabMenu">
            <ul>
              <li><a href="#" className="disabled">Add to device group</a></li>
              <li><a href="#" className="disabled">Remove from device group</a></li>
            </ul>
          </nav>
          <DevicesListTable data={store.devicesListData}/>
        </div>
      </section>
    );
  }
});

var AssignmentsList = React.createClass({
  render: function() {
    return <h1>Assignments List</h1>
  }
});

var ManualSurveyTransfer = React.createClass({
  render: function() {
    return <h1>Manual Survey Transfer</h1>
  }
});

exports.Devices = Devices;
exports.DevicesList = DevicesList;
exports.AssignmentsList = AssignmentsList;
exports.ManualSurveyTransfer = ManualSurveyTransfer;
