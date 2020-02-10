import {IDocumentCardActivityPerson} from 'office-ui-fabric-react/lib/DocumentCard';
import { rerenderEntireTree } from '../render';

interface Istates {
    people: IDocumentCardActivityPerson[];
    lastId: number;
}

export let states: Istates = {
    people : [
        { 
            id: 1,
            firstName : 'Назарий', 
            lastName : 'Мышкин', 
            patronymic : 'Кириллович',
            profileImageSrc: "https://s.pfst.net/2018.05/64189816721031cee5321195f83770bd577a29cc9830_b.jpg" ,
            position : "Директор",
            phone : "9961059976",
            e_mail : "smiteartur01@mail.ru",
            cabinet : "6-207"
          },
          { 
            id: 2,
            firstName : 'Тимофей', 
            lastName : 'Ширяев', 
            patronymic : 'Агафонович',
            profileImageSrc: 'https://s.pfst.net/2018.05/641893367210d842089bae9e3579ba95638f548c1f9f_b.jpg', 
            initials: 'RK' ,
            position : "Заместитель",
            phone : "9233459343",
            e_mail : "testmail@mail.ru",
            cabinet : "4-321"
          },
          { 
            id: 3,
            firstName : 'Тихон', 
            lastName : 'Матвеев', 
            patronymic : 'Гордеевич',
            profileImageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQdMKMtxWiuhH-Gv86mabDB7SNN_1d1wVuqVwCuUArHEbht6Jlh",
            position : "Бухгалтер",
            phone : "9035014467",
            e_mail : "myproject@mail.ru",
            cabinet : "2-123"
          },
          { 
            id: 4,
            firstName : 'Святослав', 
            lastName : 'Сидоров', 
            patronymic : 'Валентинович',
            profileImageSrc: '', 
            initials: 'CB',
            position : "Сотрудник",
            phone : "9035014467",
            e_mail : "helloworld@gmail.com",
            cabinet : "8-212"
          },
          { 
            id: 5,
            firstName : 'Владлен', 
            lastName : 'Котов', 
            patronymic : 'Ильяович',
            profileImageSrc: '', 
            initials: 'CB',
            position : "Сотрудник",
            phone : "9035014467",
            e_mail : "helloworld@gmail.com",
            cabinet : "6-213"
          },
    ],
    lastId : 5
}

export function sortByName(people:IDocumentCardActivityPerson[]):any {
    people.sort(function (a:any, b:any):any {
        if (a.lastName == b.lastName) {
            return a.firstName > b.firstName ? 1 : -1 
        }
        else
           return a.lastName > b.lastName ? 1 : -1
    }
        );
    
}

export function editCard(id:any, attribute:any, number:number):void {  
  for (let i = 0; i < states.people.length; i++)
      if (states.people[i].id == id) {
          switch(number) {
            case 0: {states.people[i].lastName = attribute}
            case 1: {states.people[i].firstName = attribute}
            case 2: {states.people[i].patronymic = attribute}
            case 3: {states.people[i].position = attribute}
            case 4: {states.people[i].phone = attribute}
            case 5: {states.people[i].e_mail = attribute}
          }
      }

  rerenderEntireTree();
}

export function deletePerson(id:any):void {
  for (let i = 0; i < states.people.length; i++)
    if (states.people[i].id == id) {
      console.log(id, i);
      states.people.splice(i,1);
    }

  rerenderEntireTree();
}

export function pushPerson(textFieldRefs:any):void {
  const newCard:IDocumentCardActivityPerson = {
    id: states.lastId + 1,
    firstName : textFieldRefs[1].current.value, 
    lastName : textFieldRefs[0].current.value, 
    patronymic : textFieldRefs[2].current.value,
    profileImageSrc: '', 
    position : textFieldRefs[3].current.value,
    phone : textFieldRefs[4].current.value,
    e_mail : textFieldRefs[5].current.value
  };
  states.lastId++;
  states.people.push(newCard);
  rerenderEntireTree();
}
