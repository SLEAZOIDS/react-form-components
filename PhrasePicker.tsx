import * as React from 'react'
import { TextField } from '../../styled/index'
import { IFieldProps } from './IField'
import PickerButton from './PickerButton'

/**
 * 定型分のインターフェース
 */
interface IPhraseItem {
    contents: string
}

/**
 * 定型分ピッカーのPropsインターフェース
 */
interface IProps extends IFieldProps {
    items: IPhraseItem[]
}

/**
 * 定型分ピッカーコンポーネント
 */
export default class PhrasePicker extends React.PureComponent<IProps> {
    /**
     * レンダリング
     */
    public render() {
        const { field, items, readonly } = this.props
        return readonly ? (
            <span>{field.value.join(', ')}</span>
        ) : (
            <div>
                {items.map(
                    (item: IPhraseItem, index: number) =>
                        !field.value.includes(item.contents) && (
                            <PickerButton
                                key={index}
                                handleInsert={this.handleInsert}
                                value={item.contents}
                            />
                        )
                )}
                <TextField
                    multiline={true}
                    rows={3}
                    value={field.value.join('\n')}
                />
            </div>
        )
    }

    /**
     * 挿入ボタンをクリックした際に実行されるイベントハンドラ
     *
     * @param {string} text
     */
    private handleInsert = (text: string) => {
        if (this.props.setFieldValue) {
            this.props.setFieldValue(this.props.field.name, [
                ...this.props.field.value,
                text
            ])
        }
    }
}
