import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles'
import * as React from 'react'
import { IFieldProps } from './IField'

/**
 * ラジオボタンのアイテムリストのインターフェース
 */
export interface IRadioButtonItem {
    id: number
    name: string
}

/**
 * ラジオボタンのプロパティのインターフェース
 */
interface IRadioButtonProps extends IFieldProps {
    label: string
    items: IRadioButtonItem[]
    prefix?: string
}

/**
 * ラジオボタンのスタイル
 *
 * @returns {StyleRules<string>}
 */
const styles = () =>
    createStyles({
        prefix: {
            marginRight: 40
        },
        radioGroup: {
            display: 'inline-table'
        }
    })

/**
 * ラジオボタン
 */
class RadioButton extends React.PureComponent<
    IRadioButtonProps & WithStyles<typeof styles>
> {
    /**
     * レンダリング
     */
    public render() {
        const { classes, field, items, label, prefix, readonly } = this.props

        return (
            <div>
                {prefix ? (
                    <span className={classes.prefix}>{prefix}</span>
                ) : null}
                {readonly ? (
                    <label>
                        {this.getDisplayValue(this.props.field.value)}
                    </label>
                ) : (
                    <RadioGroup
                        className={classes.radioGroup}
                        aria-label={label}
                        name={field.name}
                        value={
                            String(field.value)
                                ? String(field.value)
                                : String(0)
                        }
                        onChange={this.handleChange}
                        row
                    >
                        {items &&
                            items.map((item: IRadioButtonItem) => (
                                <FormControlLabel
                                    control={<Radio />}
                                    key={item.id}
                                    label={item.name}
                                    value={String(item.id)}
                                />
                            ))}
                    </RadioGroup>
                )}
            </div>
        )
    }

    /**
     * ラジオボタンの値が変わった時実行
     */
    private handleChange = (
        _event: React.ChangeEvent<{}>,
        value: string
    ): void => {
        if (this.props.setFieldValue) {
            this.props.setFieldValue(this.props.field.name, value)
        }
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

export default withStyles(styles)(RadioButton)
