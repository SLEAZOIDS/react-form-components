import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import TextField from '@material-ui/core/TextField'
import * as React from 'react'
import { IFieldProps, IItem } from './IField'

/**
 * プロパティのインターフェース
 */
interface ISelectListDialogProps extends IFieldProps {
    items: IItem[]
    dialogLabel: string
}

/**
 * ステートのインターフェース
 */
interface ISelectListDialogState {
    open: boolean
    searchWord: string
    searchResults: IItem[]
}

/**
 * チェックボックスをもつdialog
 */
export default class CheckBoxDialog extends React.PureComponent<
    ISelectListDialogProps,
    ISelectListDialogState
> {
    /**
     * stateの初期化
     */
    public state = {
        open: false,
        searchWord: '',
        searchResults: this.props.items
    }

    /**
     * レンダリング
     */
    public render() {
        const { field, dialogLabel, readonly } = this.props
        const { searchWord, searchResults } = this.state
        return readonly ? (
            <label>{this.getDisplayValue(field.value)}</label>
        ) : (
            <>
                {this.getDisplayValue(field.value)}
                <br />
                <TextField
                    value={searchWord}
                    onChange={this.handleTextChange}
                />
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={this.handleClickOpen}
                >
                    検索
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="simple-dialog-title"
                >
                    <DialogTitle id="simple-dialog-title">
                        {dialogLabel}
                    </DialogTitle>
                    <div>
                        <List>
                            {searchResults &&
                                searchResults.map((item: IItem) => (
                                    <ListItem
                                        button
                                        onClick={() =>
                                            this.handleListItemClick(item)
                                        }
                                        key={item.id}
                                    >
                                        <Checkbox
                                            checked={
                                                field.value.indexOf(item.id) !==
                                                -1
                                            }
                                            tabIndex={-1}
                                            disableRipple
                                        />
                                        <ListItemText
                                            primary={`${item.id} ${item.name}`}
                                        />
                                    </ListItem>
                                ))}
                        </List>
                        <Button onClick={this.handleClose}>閉じる</Button>
                    </div>
                </Dialog>
            </>
        )
    }

    /**
     *  dialogが表示されるときに実行
     */
    private handleClickOpen = () => {
        // 検索
        const matched = this.props.items.filter(item => {
            return item.name.indexOf(this.state.searchWord) >= 0
        })

        this.setState({
            open: true,
            searchResults: matched
        })
    }

    /**
     *  dialogが閉じる際に実行
     */
    private handleClose = () => {
        this.setState({ open: false })
    }

    /**
     * リストのアイテム選択時に実行
     *
     * @param {IItem} item
     */
    private handleListItemClick = (item: IItem) => {
        let result = this.props.field.value
        const currentIndex = result.indexOf(item.id)

        if (currentIndex === -1) {
            result.push(item.id)
        } else {
            result = result.filter((n: number) => n !== item.id)
        }
        result.sort()

        if (this.props.setFieldValue) {
            this.props.setFieldValue(this.props.field.name, result)
        }
    }

    /**
     * テキスト入力の値が変わった時実行
     */
    private handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            searchWord: event.currentTarget.value
        })
    }

    /**
     * 値から画面表示用の文字列を作成する readOnlyの際に使用
     *
     * @param {number[]} ids
     * @returns {string}
     */
    private getDisplayValue = (ids: number[]): string => {
        return this.props.items
            .filter((item: IItem) => ids.includes(item.id))
            .map((item: IItem) => item.name)
            .join(' ')
    }
}
