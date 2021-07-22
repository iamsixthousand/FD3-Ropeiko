var Ishop = React.createClass({

    displayName: "Ishop",

    propTypes: {
        headers: React.PropTypes.array.isRequired,
        products: React.PropTypes.array.isRequired
    },

    getInitialState: function () {
        return {
            prodSelected: null,
            products: this.props.products,
            headers: this.props.headers,
        };
    },

    prodSelect: function (code) {
        this.setState({ prodSelected: code });
    },

    prodDelete: function (code) {
        this.setState({ products: this.state.products.filter(prod => prod.code != code) })
    },

    render: function () {
        var headersArr = this.state.headers.map(header => React.DOM.th({ className: 'Header', key: header }, header));

        var prodElements = this.state.products.map(prod => React.createElement(Product, {
            key: prod.code,
            prodSelect: this.prodSelect,
            prodDelete: this.prodDelete,
            isSelected: this.state.prodSelected == prod.code,
            product: prod,
        }));

        return React.DOM.div({ className: 'Ishop' },
            React.DOM.table({className: 'Products'},
                React.DOM.thead({className: 'Header'},
                    React.DOM.tr(null, headersArr)),
                React.DOM.tbody({className: 'Table'}, prodElements))
        );
    }
});