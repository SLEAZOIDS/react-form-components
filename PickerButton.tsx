import * as React from 'react'
import { Button } from '../../styled/index'

/**
 * 選択ボタンのPropsインターフェース
 */
interface IPickerButtonProps {
    handleInsert: (text: string) => void
    value: string
}
/**
 * 選択ボタンのStateインターフェース
 */
interface IPickerButtonState {
    hidden: boolean
}

/**
 * 選択ボタン
 */
export default class PickerButton extends React.PureComponent<
    IPickerButtonProps,
    IPickerButtonState
> {
    /**
     * Stateを初期化する
     *
     * @type {{hidden: boolean}}
     */
    public state = { hidden: false }

    /**
     * レンダリング
     */
    public render() {
        const { value } = this.props
        const { hidden } = this.state

        return hidden ? null : (
            <div>
                <Button variant="outlined" onClick={this.handleClick}>
                    ↓挿入
                </Button>
                <span>{`※ ${value}`}</span>
            </div>
        )
    }

    /**
     * ボタンをクリックした際に実行されるイベントハンドラ
     */
    private handleClick = () => {
        this.props.handleInsert(this.props.value)
        this.setState({ hidden: true })
    }
}
