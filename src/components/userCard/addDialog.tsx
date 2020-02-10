import * as React from 'react';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { getId, IRefObject } from 'office-ui-fabric-react/lib/Utilities';
import { ContextualMenu } from 'office-ui-fabric-react/lib/ContextualMenu';
import { TextField, MaskedTextField, ITextField } from 'office-ui-fabric-react/lib/TextField';
import {pushPerson} from '../states'

interface IDialogBasicExampleState {
    hideDialog: boolean;
    isDraggable: boolean;
}

interface IAddDialogProps {
  hideDialog : boolean;
  _openOrCloseDialog():void;
  switch : boolean;
}

  export class AddDialog extends React.Component<{}, IDialogBasicExampleState, IAddDialogProps> {
    private textFieldRefs: IRefObject<ITextField>[] = [];
    constructor(props: IAddDialogProps) {
      super(props);
    }
    public props: any = this.props;

    componentDidUpdate(): void {
      this.textFieldRefs.splice(0, this.textFieldRefs.length / 2);
    }

    public state: IDialogBasicExampleState = {
      hideDialog: this.props[0].hideDialog,
      isDraggable: false,
    };

    private _labelId: string = getId('adddialogLabel');
    private _subTextId: string = getId('addsubTextLabel');
    private _dragOptions = {
      moveMenuItemText: 'Move',
      closeMenuItemText: 'Close',
      menu: ContextualMenu
    };

    

    public render() {
      this.state.hideDialog = this.props[0].hideDialog;
      const { hideDialog, isDraggable} = this.state;
     
      return (
            <Dialog
                hidden={hideDialog}
                onDismiss={this._closeDialog}
                dialogContentProps={{
                  type: DialogType.normal,
                  title: 'Новый сотрудник',
                  closeButtonAriaLabel: 'Close',
                }}
                modalProps={{
                  titleAriaId: this._labelId,
                  subtitleAriaId: this._subTextId,
                  isBlocking: false,
                  styles: { main: { maxWidth: 600 } },
                  dragOptions: isDraggable ? this._dragOptions : undefined
                }}
            >
                <TextField 
                    label="Фамилия" 
                    required 
                    onGetErrorMessage={this._getErrorMessageTextName.bind(this, 3)} 
                    name = "lastName"
                    componentRef={this._onCreateRef(this)}
                />
                <TextField 
                    label="Имя" 
                    required 
                    name = "firstName"
                    onGetErrorMessage={this._getErrorMessageTextName.bind(this, 3)} 
                    componentRef={this._onCreateRef(this)}
                />
                <TextField 
                    label="Отчество" 
                    required 
                    onGetErrorMessage={this._getErrorMessageTextName.bind(this, 3)}
                    componentRef={this._onCreateRef(this)}
                />
                <TextField 
                    label="Должность" 
                    required 
                    onGetErrorMessage={this._getErrorMessageTextName.bind(this, 2)}
                    componentRef={this._onCreateRef(this)}
                />
                <MaskedTextField 
                    label="Телефон" 
                    mask="+7 (999) 999 - 9999" 
                    onGetErrorMessage={this._getErrorMessagePhone}
                    componentRef={this._onCreateRef(this)}
                />
                <TextField 
                    label="E-mail" 
                    required 
                    onGetErrorMessage={this._validateEmail.bind(this)} 
                    componentRef={this._onCreateRef(this)}
                  />
                    
                <DialogFooter>
                <PrimaryButton onClick={this._saveAndClose} text="Сохранить" />
                <DefaultButton onClick={this._closeDialog} text="Отмена" />
                </DialogFooter>
            </Dialog>
      );
    }

    private _onCreateRef = (component:any):IRefObject<ITextField> => {
      const ref = React.createRef<ITextField>();
      this.textFieldRefs.push(ref);
      return ref;
    }

    private _saveAndClose = (): void => {
      let close:boolean = true;
      for (let i=0; i<this.textFieldRefs.length; i++) {
        let errorText:string;
        let newRef:any = this.textFieldRefs[i];
        switch (i) {
          case 0:
          case 1:
          case 2:
            errorText = this._getErrorMessageTextName(3, newRef.current.value);
            break;
          case 3:
            errorText = this._getErrorMessageTextName(2, newRef.current.value);
            break;
          case 4:
            errorText = this._getErrorMessagePhone("+7" + newRef.current.value);
            break;
          case 5:
            errorText = this._validateEmail(newRef.current.value);
            break;
          default:
            errorText = '';
            break;
        }
        if (errorText!='') close = false;
      }
      if (close) {
        pushPerson(this.textFieldRefs);
        this.props[1]();
        this.setState({ hideDialog: true });
      }
    };
  
    private _closeDialog = (): void => {
      this.props[1]();
      this.setState({ hideDialog: true });
    };
    
    private _getErrorMessageTextName = (min: number, value: string ): string => {
      return value.length >= min ? '' : `Минимальная длина текста: ` + min;
  };

    private _getErrorMessagePhone = (value: string): string => {
        return (value.length-value.replace(/\d/gm,'').length == 11) ? '' : `Неправильный формат данных`;
    };

    private _validateEmail = (value: string):string => {
      var pattern  = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      return (pattern.test(String(value).toLowerCase())) ? "" : "Неверный формат e-mail";
    }
  }