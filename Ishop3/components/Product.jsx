import React from 'react';
import PropTypes from 'prop-types';

import './Product.css';

class Product extends React.Component {

    static propTypes = {
        prodSelect: PropTypes.func.isRequired,
        prodDelete: PropTypes.func.isRequired,
        cbEdit: PropTypes.func.isRequired,
        isSelected: PropTypes.bool.isRequired,
        isInChangeMode: PropTypes.bool.isRequired,
        workmode: PropTypes.string.isRequired,
        product: PropTypes.shape({
            prodname: PropTypes.string.isRequired,
            price: PropTypes.string.isRequired,
            photolink: PropTypes.string.isRequired,
            count: PropTypes.string.isRequired
        })
    }

    selectItem = (EO) => {
        EO.stopPropagation();
        this.props.prodSelect(EO.target.parentNode.dataset.id, this.props.product)
    }

    editItem = (EO) => {
        EO.stopPropagation();
        this.props.cbEdit(EO.target.dataset.id, this.props.product);
    }

    deleteItem = (EO) => {
        EO.stopPropagation();
        if (confirm('Вы уверены?')) this.props.prodDelete(EO.target.dataset.id);
    }

    render() {
        return (
            <tr data-id={this.props.product.code}
                className={(this.props.isSelected) ? 'Selected' : 'Item'}
                onClick={this.selectItem}>
                <td>{this.props.product.prodname}</td>
                <td>{this.props.product.price}</td>
                <td>
                    <a href={this.props.product.photolink}>{this.props.product.photolink}</a>
                </td>
                <td>{this.props.product.count}</td>
                <td>
                    <button data-id={this.props.product.code}
                        onClick={this.editItem} disabled={this.props.workmode === 'Создать' || this.props.isInChangeMode}>
                        ИЗМЕНИТЬ
                    </button>
                    <button data-id={this.props.product.code}
                        onClick={this.deleteItem} disabled={this.props.workmode === 'Создать' || this.props.isInChangeMode}>
                        УДАЛИТЬ
                    </button>
                </td>
            </tr>
        );
    }
};

export default Product;