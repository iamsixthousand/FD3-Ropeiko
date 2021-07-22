var Ishop = React.createClass({

    displayName: 'Ishop',

    getDefaultProps: function () {
        return { products: [], tablehead: [] }
    },
    
    propTypes: {
        tablehead: React.PropTypes.array.isRequired,
        products: React.PropTypes.array.isRequired,
        
      },

    render: function () {

        var productArr = [];
        var tableNamesArr = [];
        this.props.tablehead.forEach(headElem => {
            var headItem =
                React.DOM.td({ key: headElem.code, className: "Header" }, headElem.colname);
            tableNamesArr.push(headItem);

        })
        this.props.products.forEach(prodElem => {
            var productItem =
                React.DOM.tr({ key: prodElem.code, className: "Item" },
                    React.DOM.td({ className: "Column" }, prodElem.prodname),
                    React.DOM.td({ className: "Column" }, prodElem.price),
                    React.DOM.td({ className: "Column" }, 
                        React.DOM.a({href: prodElem.photolink, className: "Link"}, prodElem.photolink)
                    ),
                    React.DOM.td({ className: "Column" }, prodElem.count)
                );
            productArr.push(productItem);
        })

        return React.DOM.div({ className: 'Ishop' },
            React.DOM.table({ className: 'Products' },
                React.DOM.thead(
                    { className: 'Header' }, React.DOM.tr({ className: 'HeadColumn' }, tableNamesArr)
                    ),
                React.DOM.tbody({ className: 'Table' }, productArr)
            )
        );
    },

});