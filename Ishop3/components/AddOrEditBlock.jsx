import React from 'react';
import PropTypes from 'prop-types';

import './AddOrEditBlock.css';

class AddOrEditBlock extends React.Component {

    static propTypes = {
        product: PropTypes.shape({
            prodname: PropTypes.string.isRequired,
            price: PropTypes.string.isRequired,
            photolink: PropTypes.string.isRequired,
            count: PropTypes.string.isRequired
        }),
        workmode: PropTypes.string.isRequired,
        cbSave: PropTypes.func.isRequired,
        cbCancel: PropTypes.func.isRequired,
        changeModeToggle: PropTypes.func.isRequired,
    }

    state = {
        prodname: this.props.product.prodname,
        price: this.props.product.price,
        photolink: this.props.product.photolink,
        count: this.props.product.count,
        code: this.props.product.code,
        isInChangeMode: false,
        saveReady: this.props.workmode === 'Изменить',
        //workmode: this.props.workmode,
    }

    editField = (EO) => {
        this.setState({ [EO.target.dataset.input]: EO.target.value, isInChangeMode: true }, this.savePossibility);
        if (!this.state.isInChangeMode) this.props.changeModeToggle(true);
    }

    savePossibility = () => {
        if (!this.state.prodname.length || !this.state.price.length || !this.state.photolink.length || !this.state.count.length) {
            this.setState({ saveReady: false })
        } else this.setState({ saveReady: true });

    }

    saveData = () => this.props.cbSave(this.state.code, this.props.workmode, { ...this.state });

    cancelSaving = () => this.props.cbCancel();

    render() {
        const alertMSG = 'Поле обязательно для заполнения!';
        return (
            (this.props.workmode === 'Создать' || this.props.workmode === 'Изменить') ?
                <div className='Form'>
                    <h2>{this.props.workmode} товар с идентификатором {this.state.code}</h2>
                    <table>
                        <tbody>
                            <tr className='Field'>
                                <td>Наименование</td>
                                <td>
                                    <input data-input='prodname' type='text'
                                        defaultValue={this.state.prodname} onChange={this.editField}>
                                    </input>
                                </td>
                                <td>
                                    <span className={this.state.prodname ? 'hideAlert' : 'showAlert'}>{alertMSG}</span>
                                </td>
                            </tr>
                            <tr className='Field'>
                                <td>Цена</td>
                                <td>
                                    <input data-input='price' type='text'
                                        defaultValue={this.state.price} onChange={this.editField}>
                                    </input>
                                </td>
                                <td>
                                    <span className={this.state.price ? 'hideAlert' : 'showAlert'}>{alertMSG}</span>
                                </td>
                             </tr>
                            <tr className='Field'>
                                <td>Ссылка на фото</td>
                                <td>
                                    <input data-input='photolink' type='text'
                                        defaultValue={this.state.photolink} onChange={this.editField}>
                                    </input>
                                </td>
                                <td>
                                    <span className={this.state.photolink ? 'hideAlert' : 'showAlert'}>{alertMSG}</span>
                                </td>
                            </tr>
                            <tr className='Field'>
                                <td><span>Осталось на складе</span></td>
                                <td>
                                    <input data-input='count' type='text'
                                        defaultValue={this.state.count} onChange={this.editField}>
                                    </input>
                                </td>
                                <td>
                                    <span className={this.state.count ? 'hideAlert' : 'showAlert'}>{alertMSG}</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button onClick={this.saveData} disabled={!this.state.saveReady}>Сохранить</button>
                    <button onClick={this.cancelSaving}>Отмена</button>
                </div>
                :
                <div>
                    <h2>Товар с идентификатором {this.state.code}</h2>
                    <p>Название: {this.state.prodname}</p>
                    <p>Цена: {this.state.price}</p>
                    <p>Ссылка на фото: {this.state.photolink}</p>
                    <p>Осталось на складе: {this.state.count}</p>
                </div>
        );
    }

}

export default AddOrEditBlock;