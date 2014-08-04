/**
 * @jsx React.DOM
 */

var React = require('react');

var Footer = React.createClass({
  render: function() {
    return (
      <div>
        <footer className='floats-in bottomPage' role='contentinfo'>
          <div>
            <nav id='footerNav' className='floats-in'>
              <ul>
                <li><a href="/app" target="_blank">Download FLOW app</a></li>
                <li><a href="https://github.com/akvo/akvo-flow/releases" title="Go to News and Software Updates" target="_blank"> News and software updates</a></li>
                <li><a href="http://flowhelp.akvo.org" title="Support" target="_blank"> Support</a></li>
                <li><a href="http://flow.readthedocs.org/en/latest/index.html" title="Documentation and User Guides" target="_blank">Documentation and user guides</a></li>
                <li><a href="http://akvo.org/help/akvo-policies-and-terms-2/akvo-flow-terms-of-use/" title="Terms of Service" target="_blank">Terms of service</a></li>
                <li><a href="http://www.akvo.org" title="akvo.org" target="_blank" className="akvoDotOrg">akvo.org</a></li>
                <li><a href="/admin/logout.html">Log out</a></li>
              </ul>
            </nav>
          </div>
          <div>
            <small>v1.7.1 - Copyright &copy; 2013 akvo.org</small>
          </div>
        </footer>
      </div>
    );
  }
});


module.exports = Footer;
