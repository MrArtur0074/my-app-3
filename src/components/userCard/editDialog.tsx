import * as React from 'react';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { getId, IRefObject } from 'office-ui-fabric-react/lib/Utilities';
import { ContextualMenu } from 'office-ui-fabric-react/lib/ContextualMenu';
import { classNames } from './classNames'
import { css } from 'office-ui-fabric-react/lib/Utilities';
import { ImageIcon } from 'office-ui-fabric-react/lib/Icon';
import { TextField, MaskedTextField, ITextField } from 'office-ui-fabric-react/lib/TextField';
import {IDocumentCardActivityPerson} from 'office-ui-fabric-react/lib/DocumentCard';
import {editCard} from '../states'

interface IDialogBasicExampleState {
    hideDialog: boolean;
    isDraggable: boolean;
  }

  let newCard:IDocumentCardActivityPerson;

  export class DialogEdit extends React.Component<{}, IDialogBasicExampleState, IDocumentCardActivityPerson> {
    private textFieldRefs: IRefObject<ITextField>[] = [];
    constructor(props: IDocumentCardActivityPerson) {
      super(props);
    }

    public state: IDialogBasicExampleState = {
      hideDialog: true,
      isDraggable: false,
    };

    //public user:
    // Use getId() to ensure that the IDs are unique on the page.
    // (It's also okay to use plain strings without getId() and manually ensure uniqueness.)
    private _labelId: string = getId('dialogLabel');
    private _subTextId: string = getId('subTextLabel');
    private _dragOptions = {
      moveMenuItemText: 'Move',
      closeMenuItemText: 'Close',
      menu: ContextualMenu
    };

    componentDidUpdate(): void {
      this.textFieldRefs.splice(0, this.textFieldRefs.length / 2);
    }
  
    public render() {
      const people:any = this.props;
      newCard = people;
      const { hideDialog, isDraggable} = this.state;
      return (
        <div className = "iconEditStyle">
            <ImageIcon onClick={this._showDialog}
                className={classNames.one  + " ImageIcon"}
                imageProps={{
                    src: "https://img.icons8.com/cotton/2x/edit.png",
                    className: css(classNames.image, classNames.oneImage),
                    height: 44,
                }}
            />
            <Dialog
                hidden={hideDialog}
                onDismiss={this._closeDialog}
                dialogContentProps={{
                  type: DialogType.normal,
                  title: 'Окно редактирования',
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
                    validateOnFocusOut
                    value = {people.lastName}
                    name = "lastName"
                    componentRef={this._onCreateRef(this)}
                    onChanged = {this._editDataLastName}
                />
                <TextField 
                    label="Имя" 
                    required 
                    name = "firstName"
                    onGetErrorMessage={this._getErrorMessageTextName.bind(this,3)} 
                    validateOnFocusOut
                    value = {people.firstName}
                    componentRef={this._onCreateRef(this)}
                />
                <TextField 
                    label="Отчество" 
                    required 
                    onGetErrorMessage={this._getErrorMessageTextName.bind(this,3)}
                    validateOnFocusOut
                    value = {people.patronymic}
                    componentRef={this._onCreateRef(this)}
                />
                <TextField 
                    label="Должность" 
                    required 
                    onGetErrorMessage={this._getErrorMessageTextName.bind(this, 2)}
                    validateOnFocusOut
                    value = {people.position}
                    componentRef={this._onCreateRef(this)}
                />
                <MaskedTextField 
                    label="Телефон" 
                    mask="+7 (999) 999 - 9999" 
                    onGetErrorMessage={this._getErrorMessagePhone}
                    value = {people.phone}
                    componentRef={this._onCreateRef(this)}
                />
                <TextField 
                    label="E-mail" 
                    required 
                    onGetErrorMessage={this._validateEmail.bind(this)} 
                    validateOnFocusOut
                    value = {people.e_mail}
                    componentRef={this._onCreateRef(this)}
                  />
                    
                <DialogFooter>
                <PrimaryButton onClick={this._saveAndClose} text="Сохранить" />
                <DefaultButton onClick={this._closeDialog} text="Отмена" />
                </DialogFooter>
            </Dialog>
        </div>
      );
    }

    private _onCreateRef = (component:any):IRefObject<ITextField> => {
      const ref = React.createRef<ITextField>();
      this.textFieldRefs.push(ref);
      return ref;
    }

    private _editDataLastName = (lastName: string): void => {
      
    };

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
        for (let i=0; i<this.textFieldRefs.length; i++) {
          let newRef:any = this.textFieldRefs[i];
          editCard(newCard.id, newRef.current.value, i);
        }
        this.setState({ hideDialog: true });
      }
    };
  
    private _showDialog = (): void => {
      this.setState({ hideDialog: false });
    };
  
    private _closeDialog = (): void => {
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