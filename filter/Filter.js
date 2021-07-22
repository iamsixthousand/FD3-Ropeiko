var Filter = React.createClass({

    displayName: "Filter",

    propTypes: {
        words: React.PropTypes.arrayOf(
            React.PropTypes.string.isRequired
        ),
    },

    getInitialState: function () {
        return {
            isChecked: false,
            inputText: '',
        };
    },

    toggleCheck: function (EO) {
        this.setState({ isChecked: EO.target.checked });
    },

    changeInputText: function (EO) {
        this.setState({ inputText: EO.target.value })
    },

    resetState: function () {
        this.setState(this.getInitialState());
    },

    render: function () {
        var filteredStrings = this.props.strings.filter(stri => stri.includes(this.state.inputText));
        if (this.state.isChecked)
            filteredStrings.sort();

        var finalValue = filteredStrings.map(stri => React.DOM.span({ key: stri, className: 'String' }, stri));

        return React.DOM.div({ className: 'Filter' },
            React.DOM.div({ className: 'Inputs' },
                React.DOM.input({
                    key: this.state.isChecked, type: 'checkbox', name: 'sort',
                    defaultChecked: this.state.isChecked, onClick: this.toggleCheck
                }),
                React.DOM.input({
                    type: 'text', name: 'textInput',
                    value: this.state.inputText, onChange: this.changeInputText
                }),
                React.DOM.input({ type: 'button', value: 'Cброс', onClick: this.resetState })
            ),
            React.DOM.div({ className: 'Out' }, finalValue)
        );
    },
});