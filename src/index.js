import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import './index.css';

function Contact(props) {
    return(
        <div className="row">
            <div className="row_name">
                {props.name}
            </div>
            <div className="row_phone">
                {props.phone_number}
            </div>
            <div className="row_address">
                {props.address}
            </div>
        </div>
    );
}

class Phonebook extends React.Component {
    constructor() {
        super();
        this.state = {contacts: [], search: ''};
    }

    updateSearch(event) {
        this.setState({search: event.target.value.substr(0,20)});
    } 

    componentWillMount() {
        var proxy = 'https://cors-anywhere.herokuapp.com/';
        $.getJSON(proxy + "http://www.mocky.io/v2/581335f71000004204abaf83", function(data) {
            console.log("contacts = " + data.contacts);
            console.log(data.contacts[1]);
            let contacts = data.contacts;
            this.setState({contacts:contacts}); 
        }.bind(this));
    }

    render() {
        let filteredContacts = this.state.contacts.filter(
            (contact) => {
                return contact.name.indexOf(this.state.search) >= 0;
            }
        );
        return(
            <div>
                <input type="text" 
                    className="input-line" 
                    placeholder="Enter search term..." 
                    value={this.state.search}
                    onChange={this.updateSearch.bind(this)} />
                <p/>
                {filteredContacts.map(contact =>
                 <Contact key={contact.name} name={contact.name} phone_number={contact.phone_number} address={contact.address}></Contact>)}
            </div>
        );
    }
}

ReactDOM.render(
<Phonebook />,
document.getElementById('root')
);
  