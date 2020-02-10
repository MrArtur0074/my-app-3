import * as React from 'react';
import {
  DocumentCard,
  IDocumentCardStyles
} from 'office-ui-fabric-react/lib/DocumentCard';
import {Persona, PersonaInitialsColor, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import './style.css';
import { states, sortByName,} from './states'
import { DialogEdit } from './userCard/editDialog'
import {CreateCard} from './userCard/createCard'
import {DeleteCard } from './userCard/deleteCard';
import { Text } from 'office-ui-fabric-react/lib/Text';
import { IFontStyles } from 'office-ui-fabric-react/lib/Styling';
import {
  DetailsList,
  IColumn,
  DetailsListLayoutMode,
  SelectionMode,
  DetailsRow,
  IDetailsRowProps
} from 'office-ui-fabric-react/lib/DetailsList';

interface ISetting<TType> {
  name: TType;
}

const Variants: ISetting<keyof IFontStyles>[] = [
  { name: 'tiny' },
  { name: 'xSmall' },
  { name: 'small' },
  { name: 'smallPlus' },
  { name: 'medium' },
  { name: 'mediumPlus' },
  { name: 'large' },
  { name: 'xLarge' },
  { name: 'xxLarge' },
  { name: 'mega' }
];

const EmployeeCard: React.StatelessComponent = () => {
  const cardStyles: IDocumentCardStyles = {
    root: { 
      display: 'inline-block', 
      margin: 17, 
      width: 320,
    }
  };

  const personaStyles: IDocumentCardStyles = {
    root: { 
      marginTop: 5,
      marginLeft: 5
    }
  };


  sortByName(states.people);
  const peopleComponents:any = states.people.map(card => {
    
    return (
      <DocumentCard key={card.id}
          aria-label="Document Card with icon. How to make a good design. Last modified by Christian Bergqvist in January 1, 2019."
          styles={cardStyles}
      >
        <Persona  
          initialsColor = {PersonaInitialsColor.magenta}
          size = {PersonaSize.size72}
          text = {card.lastName + " " + card.firstName}
          imageUrl = {card.profileImageSrc}
          imageInitials = {card.initials}
          secondaryText = {card.position}
          tertiaryText = {card.e_mail}
          styles = {personaStyles}
        />
        <Text className = "textInfoCard"
          key={Variants[4].name + 'text'} 
          variant={Variants[4].name} 
          nowrap 
          block
        >
          Телефон: {"+7 " + card.phone}
          <br></br>
          Кабинет: {card.cabinet}
        </Text>
        <DeleteCard {...card}/>
        <DialogEdit {...card}/>
      </DocumentCard>
      )
  });

  return (
    <div className = "testProject">
      <header />
      <div className = "content">
        {peopleComponents}
      </div>
      <nav>
        <CreateCard />
      </nav>
    </div>
  );
};

export default EmployeeCard;
