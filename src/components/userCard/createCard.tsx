import * as React from 'react';
import { DefaultButton, PrimaryButton, Stack, IStackTokens } from 'office-ui-fabric-react';
import '../style.css';
import {AddDialog} from './addDialog'
import { rerenderEntireTree } from '../../render';

export interface IButtonExampleProps {
  disabled?: boolean;
  checked?: boolean;
}

export interface IDialogState {
  hideDialog: boolean;
}

// Example formatting
const stackTokens: IStackTokens = { childrenGap: 40 };

export class CreateCard extends React.Component<{}, IDialogState, IButtonExampleProps> {
  //const { disabled, checked } = props;
  constructor(props: IButtonExampleProps) {
    super(props);
  }

 public state: IDialogState = {
    hideDialog: true
  };

  render() {
    const propsButton:any = this.props;
    const {hideDialog} = this.state;
    return (
      <div>
        <Stack horizontal tokens={stackTokens}>
          <DefaultButton className = "navButton"
            text="Добавить сотрудника" 
            onClick={this._openOrCloseDialog} 
            allowDisabledFocus 
            disabled={propsButton.disabled} 
            checked={propsButton.checked} 
          />
        </Stack>
        <AddDialog {...[this.state,this._hideDialog, true]}/>
      </div>
    );
  }

  private _openOrCloseDialog = (): void => {
    this.setState({hideDialog: false});
    //rerenderEntireTree();
    //alert(this.state.hideDialog);
  };

  private _hideDialog = (): void => {
    this.state.hideDialog = true;
    //rerenderEntireTree();
    //alert(this.state.hideDialog);
  };
};
