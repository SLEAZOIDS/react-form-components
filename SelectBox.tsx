import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import * as React from 'react'
import { IFieldProps } from './IField'
import { IRadioButtonItem } from './RadioButton'

/**
 * セレクトボックスのアイテムリストのインターフェース
 */
export interface ISelectBoxItem {
    id: number
    name: string
}

/**
 * セレクトボックスのプロパティのインターフェース
 */
interface ISelectBoxProps extends IFieldProps {
    label: string
    items: ISelectBoxItem[]
}

/**
 * セレクトボックスの状態のインターフェース
 */
interface ISelectBoxState {
    opened: boolean
}

/**
 * 　セレクトボックス
 */
export default class SelectBox extends React.PureComponent<
    ISelectBoxProps,
    ISelectBoxState
> {
    /**
     * コンストラクタ
     */
    public constructor(props: any) {
        super(props)
        this.state = {
            opened: false
        }
    }

    /**
     * レンダリング
     */
    public render() {
        const { field, label, items, readonly } = this.props
        const { opened } = this.state
        return (
            <div>
                {readonly ? (
                    <label>
                        {this.getDisplayValue(this.props.field.value)}
                    </label>
                ) : (
                    <>
                        <InputLabel htmlFor="controlled-open-select">
                            {label}
                        </InputLabel>
                        <Select
                            open={opened}
                            onClose={this.handleClose}
                            onOpen={this.handleOpen}
                            value={field.value}
                            onChange={this.handleChange}
                            inputProps={{
                                name: field.name
                            }}
                        >
                            {items &&
                                items.map((item: ISelectBoxItem) => (
                                    <MenuItem value={item.id} key={item.id}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                        </Select>
                    </>
                )}
            </div>
        )
    }

    /**
     * セレクトアイテム変更ハンドラー
     *
     * @param {React.ChangeEvent<HTMLSelectElement>} event
     */
    private handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (this.props.setFieldValue) {
            this.props.setFieldValue(this.props.field.name, event.target.value)
        }
        this.handleClose()
    }

    /**
     * セレクトボックスの要素非表示時
     */
    private handleClose = () => {
        this.setState({ opened: false })
    }

    /**
     * セレクトボックスの要素表示時
     */
    private handleOpen = () => {
        this.setState({ opened: true })
    }

    /**
     * 値から画面表示用の文字列を作成する readOnlyの際に使用
     *
     * @param {string} id
     * @returns {string}
     */
    private getDisplayValue = (id: string): string => {
        const selectedItem = this.props.items.find(
            (item: IRadioButtonItem) => item.id === Number(id)
        )
        return selectedItem ? selectedItem.name : ''
    }
}
