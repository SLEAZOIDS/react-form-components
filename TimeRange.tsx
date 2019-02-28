import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import TextField from '@material-ui/core/TextField'
import * as React from 'react'
import { IFieldProps } from './IField'

/**
 * スタイル
 *
 * @param {Spacing} spacing
 * @returns {StyleRules<string>}
 */
const styles = ({ spacing }: Theme) =>
    createStyles({
        separator: {
            display: 'inline-block',
            margin: `${spacing.unit}px ${spacing.unit * 2}px `
        }
    })

/**
 * 時間帯入力
 */
class TimeRange extends React.Component<
    IFieldProps & WithStyles<typeof styles>
> {
    /**
     * レンダリング
     */
    public render() {
        const { classes, field, readonly } = this.props
        return readonly ? (
            <label>{`${field.value.start}〜${field.value.end}`}</label>
        ) : (
            <div>
                <TextField
                    value={field.value.start}
                    type="time"
                    onChange={this.handleStartChange}
                />
                <div className={classes.separator}>〜</div>
                <TextField
                    value={field.value.end}
                    type="time"
                    onChange={this.handleEndChange}
                />
            </div>
        )
    }

    /**
     * 開始時間入力の値が変わった時実行
     * this.props.field.valueは以下のようにセットされる。
     *
     * { start: '12:15', end: '14:15' }
     */
    private handleStartChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (!this.props.setFieldValue) {
            return
        }

        this.props.setFieldValue(this.props.field.name, {
            start: event.currentTarget.value,
            end: this.props.field.value.end
        })
    }

    /**
     * 終了時間入力の値が変わった時実行
     * this.props.field.valueは以下のようにセットされる。
     *
     * { start: '12:15', end: '14:15' }
     */
    private handleEndChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!this.props.setFieldValue) {
            return
        }

        this.props.setFieldValue(this.props.field.name, {
            start: this.props.field.value.start,
            end: event.currentTarget.value
        })
    }
}

export default withStyles(styles)(TimeRange)
