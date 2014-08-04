/**
 * @jsx React.DOM
 */

var React = require('react'),
    Link = require('react-router').Link,
    ActiveState = require('react-router').ActiveState;

var TopNavigation = React.createClass({

  render: function() {

    return (
      <nav id='topnav' role='navigation'>
        <ul className='floats-in'>
          <li className='navSurveys'><Link to='surveys'>Surveys</Link></li>
          <li className='navDevices'><Link to='devices'>Devices</Link></li>
          <li className='navData'><Link to='data'>Data</Link></li>
          <li className='navReports'><Link to='reports'>Reports</Link></li>
          <li className='navMaps'><Link to='maps'>Maps</Link></li>
          <li className='navUsers'><Link to='users'>Users</Link></li>
          <li className='navMessages'><Link to='messages'>Messages</Link></li>
        </ul>
      </nav>
    );
  }
});

var Header = React.createClass({

  render: function() {
    return (
      <header className='floats-in top' id='header' role='banner'>
        <div>
          <div>
            <h1>
              Akvo <abbr title='field level operations watch'>Flow</abbr>
            </h1>
          </div>
          <TopNavigation/>
        </div>
      </header>
    );
  }
});

module.exports = Header;
