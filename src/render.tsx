import React from 'react';
import ReactDOM from 'react-dom';
import { FluentCustomizations } from '@uifabric/fluent-theme';
import { Customizer, mergeStyles } from 'office-ui-fabric-react';
import EmployeeCard from './components/employeeCard';

export let rerenderEntireTree = () => {
ReactDOM.render(
    <Customizer {...FluentCustomizations}>
      <EmployeeCard />
    </Customizer>,
    document.getElementById('root')
  );
}
  