var Product = React.createClass({

    displayName: "Product",

    propTypes: {
        prodSelect: React.PropTypes.func.isRequired,
        prodDelete: React.PropTypes.func.isRequired,
        isSelected: React.PropTypes.bool.isRequired,
        product: React.PropTypes.shape({
            prodname: React.PropTypes.string.isRequired,
            price: React.PropTypes.string.isRequired,
            photolink: React.PropTypes.string.isRequired,
            count: React.PropTypes.string.isRequired
        })
    },

    selectItem: function (EO) {
        EO.stopPropagation();
        this.props.prodSelect(EO.target.parentNode.dataset.id)
    },

    deleteItem: function (EO) {
        EO.stopPropagation();
        if (confirm('Вы уверены?')) this.props.prodDelete(EO.target.dataset.id);
    },

    render: function () {
        return React.DOM.tr({ 'data-id': this.props.product.code, onClick: this.selectItem, className: (this.props.isSelected) ? 'Selected' : 'Item' },
            React.DOM.td(null, this.props.product.prodname),
            React.DOM.td(null, this.props.product.price),
            React.DOM.td(null,
                React.DOM.a({ href: this.props.product.photolink }, this.props.product.photolink)),
            React.DOM.td(null, this.props.product.count),
            React.DOM.td(null,
                React.DOM.button({ 'data-id': this.props.product.code, onClick: this.deleteItem }, 'УДАЛИТЬ')
            ));
    }
});