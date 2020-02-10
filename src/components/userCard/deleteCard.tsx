import * as React from 'react';
import '../style.css';
import { css } from 'office-ui-fabric-react/lib/Utilities';
import { ImageIcon } from 'office-ui-fabric-react/lib/Icon';
import { classNames } from '../userCard/classNames'
import {deletePerson} from '../states'
import {IDocumentCardActivityPerson} from 'office-ui-fabric-react/lib/DocumentCard';

export class DeleteCard extends React.Component<{}, IDocumentCardActivityPerson> {
    constructor(props: IDocumentCardActivityPerson) {
        super(props);
    }

    public render() {
        return (
                <ImageIcon
                    onClick = {this._closeCard}
                    className={classNames.one + " ImageIcon" + " iconEditStyle"}
                    imageProps={{
                    height: 44,
                    src: "data:image/png;base64,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",
                    className: css(classNames.image, classNames.oneImage),
                    }}
                />
        );
    }

    private _closeCard = (): void => {
        //console.log();
        let user:any = this.props;
        deletePerson(user.id)
      };
}