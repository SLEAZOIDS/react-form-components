import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import TextField from '@material-ui/core/TextField'
import * as React from 'react'
import { Button } from '../../styled/index'
import { IFieldProps } from './IField'

/**
 * 時間帯データのインターフェース
 */
interface ITimeRange {
    start: string
    end: string
}

/**
 * 時間帯リストのPropsインターフェース
 */
interface ITimeRangeListProps extends IFieldProps {
    maxItemCount: number
}

/**
 * 時間帯リストのStateインターフェース
 */
interface ITimeRangeListState {
    itemCount: number
}

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
class TimeRangeList extends React.Component<
    ITimeRangeListProps & WithStyles<typeof styles>,
    ITimeRangeListState
> {
    /**
     * Stateを初期化
     *
     * @type {{itemCount: number}}
     */
    public state: ITimeRangeListState = { itemCount: 1 }
    /**
     * <input type="time" />のデフォルトのステップ値
     *
     * @type {number}
     */
    private DEFAULT_STEP: number = 1800

    /**
     * レンダリング
     */
    public render() {
        const { classes, field, maxItemCount, readonly } = this.props
        if (!field.value) {
            return null
        }

        const timeRanges = JSON.parse(field.value)
        return readonly ? (
            <label>
                {timeRanges.map((timeRange: ITimeRange, index: number) => (
                    <React.Fragment key={index}>
                        {index > 0 && <span>{', '}</span>}
                        <span>{`${timeRange.start}〜${timeRange.end}`}</span>
                    </React.Fragment>
                ))}
            </label>
        ) : (
            <div>
                {timeRanges.map((timeRange: ITimeRange, index: number) => (
                    <div key={index}>
                        <TextField
                            value={timeRange.start}
                            type="time"
                            inputProps={{ step: this.DEFAULT_STEP }}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => this.handleStartChange(event, index)}
                        />
                        <div className={classes.separator}>〜</div>
                        <TextField
                            value={timeRange.end}
                            type="time"
                            inputProps={{ step: this.DEFAULT_STEP }}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => this.handleEndChange(event, index)}
                        />
                    </div>
                ))}

                {/* 時間帯入力の個数がmaxItemCountより少なければ、[追加する]ボタンを表示 */}
                {this.state.itemCount < maxItemCount && (
                    <div>
                        <Button
                            variant="outlined"
                            onClick={this.handleInsertClick}
                        >
                            +追加する
                        </Button>
                    </div>
                )}
            </div>
        )
    }

    /**
     * 開始時間入力の値が変わった時実行
     * this.props.field.valueは以下のようにセットされる。
     *
     * '[
     *     { "start": "12:00", "end": "13:00" },
     *     { "start": "13:00", "end": "14:00" }
     * ]'
     */
    private handleStartChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        if (!this.props.setFieldValue) {
            return
        }

        const prevValue = JSON.parse(this.props.field.value)
        const nextValue = [
            ...prevValue.slice(0, index),
            {
                start: event.currentTarget.value,
                end: prevValue[index].end
            },
            ...prevValue.slice(index + 1)
        ]

        this.props.setFieldValue(
            this.props.field.name,
            JSON.stringify(nextValue)
        )
    }

    /**
     * 終了時間入力の値が変わった時実行
     * this.props.field.valueは以下のようにセットされる。
     *
     * '[
     *     { "start": "12:00", "end": "13:00" },
     *     { "start": "13:00", "end": "14:00" }
     * ]'
     */
    private handleEndChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        if (!this.props.setFieldValue) {
            return
        }

        const prevValue = JSON.parse(this.props.field.value)
        const nextValue = [
            ...prevValue.slice(0, index),
            {
                start: prevValue[index].start,
                end: event.currentTarget.value
            },
            ...prevValue.slice(index + 1)
        ]

        this.props.setFieldValue(
            this.props.field.name,
            JSON.stringify(nextValue)
        )
    }

    /**
     * 追加ボタンがクリックされた時実行
     * this.props.field.valueは以下のようにセットされる。
     *
     * '[
     *     { "start": "12:00", "end": "13:00" },
     *     { "start": "13:00", "end": "14:00" },
     *     { "start": "", "end": ""}
     * ]'
     */
    private handleInsertClick = () => {
        const prevValue = JSON.parse(this.props.field.value)
        if (
            !this.props.setFieldValue ||
            prevValue.length >= this.props.maxItemCount
        ) {
            return
        }

        const nextValue = [...prevValue, { start: '', end: '' }]
        this.props.setFieldValue(
            this.props.field.name,
            JSON.stringify(nextValue)
        )
        this.setState({ itemCount: this.state.itemCount + 1 })
    }
}

export default withStyles(styles)(TimeRangeList)
