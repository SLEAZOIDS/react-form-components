import * as React from 'react'
import { TextField } from '../../styled/index'
import { IFieldProps } from './IField'

/**
 * データピッカー
 */
export default class DatePicker extends React.PureComponent<IFieldProps> {
    /**
     * レンダリング
     */
    public render() {
        const { field, readonly } = this.props

        return (
            <div>
                {!readonly ? (
                    <TextField
                        type="date"
                        value={field.value}
                        onChange={this.handleChange}
                    />
                ) : (
                    <label>{field.value}</label>
                )}
            </div>
        )
    }

    /**
     * テキスト入力の値が変わった時実行
     */
    private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (this.props.setFieldValue) {
            this.props.setFieldValue(
                this.props.field.name,
                event.currentTarget.value
            )
        }
    }
}
