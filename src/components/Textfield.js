import React, { Component } from 'react';
import './Textfield.css'
export default class ComponentTextfield extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data
        };
    }

    render() {
        return(
            <div className="ComponentTextfield">
                <input
                    type={this.props.data.security?"password":"text"}
                    placeholder={this.props.data.placeholder}
                    defaultValue={this.props.data.text==null?"":this.props.data.text}
                    ref={(input) => {
                        this.textInput = input;
                    }}
                    onChange={() => {
                        var text = this.textInput.value;

                        if (this.props.textChange!=null) this.props.textChange(text);
                    }}
                    autoComplete=""
                />

            </div>
        );
    };
}
