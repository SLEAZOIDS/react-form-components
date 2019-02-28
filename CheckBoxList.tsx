import { Checkbox, FormControlLabel, FormGroup } from '@material-ui/core'
import * as React from 'react'
import { IFieldProps } from './IField'

/**
 * チェックボックス項目のインターフェース
 */
export interface ICheckBoxItem {
    id: number
    name: string
}

/**
 * チェックボックスリストのPropsインターフェース
 */
interface ICheckBoxProps extends IFieldProps {
    items: ICheckBoxItem[]
}

/**
 * チェックボックスをレンダリングするコンポーネント
 */
export default class CheckBoxList extends React.PureComponent<ICheckBoxProps> {
    /**
     * レンダリング
     */
    public render() {
        const { field, items, readonly } = this.props
        return (
            <>
                {readonly ? (
                    <label>
                        {this.getDisplayValue(this.props.field.value)}
                    </label>
                ) : (
                    <FormGroup row>
                        {items &&
                            items.map((item: ICheckBoxItem) => (
                                <FormControlLabel
                                    label={item.name}
                                    key={item.id}
                                    control={
                                        <Checkbox
                                            checked={
                                                field.value.indexOf(item.id) >=
                                                0
                                            }
                                            onChange={this.handleCheck(item.id)}
                                            // MaterialUIの方でvalueはstring指定になっているため
                                            value={String(item.id)}
                                        />
                                    }
                                />
                            ))}
                    </FormGroup>
                )}
            </>
        )
    }

    /**
     * チェックボックスがクリックされた際のイベントハンドラ
     * リストの値としては以下のような数値をもった配列となる
     * "[1,5,8]"
     */
    private handleCheck = (key: number) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        let result = this.props.field.value

        if (event.currentTarget.checked) {
            // チェックされた時はキーを配列に入れる
            result.push(key)
        } else {
            // チェックが外れた時は配列からキーから削除する
            result = result.filter((n: number) => n !== key)
        }
        result.sort()

        // プロパティの更新
        if (this.props.setFieldValue) {
            this.props.setFieldValue(this.props.field.name, result)
        }
    }

    /**
     * 値から画面表示用の文字列を作成する readOnlyの際に使用
     *
     * @param {number[]} ids
     * @returns {string}
     */
    private getDisplayValue = (ids: number[]): string => {
        return this.props.items
            .filter((item: ICheckBoxItem) => ids.includes(item.id))
            .map((item: ICheckBoxItem) => item.name)
            .join(' ')
    }
}
