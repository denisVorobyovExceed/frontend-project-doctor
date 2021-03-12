import React, { useState } from 'react';
import './SortBar.scss';
import {
  Container,
  Typography,
  TextField,
  MenuItem
} from '@material-ui/core';

export default function SortBar(props) {
  return (
    <Container className="sort-bar-container" maxWidth="lg">
      <div className="sort-by-block">
        <Typography className="sort-label">Сортировать&nbsp;по:</Typography>
        <TextField
          id="select-sort"
          select
          value={props.howSort}
          onChange={e => props.setHowSort(e.target.value)}
          variant="outlined"
          size="small"
        >
          <MenuItem value='name'>Имя</MenuItem>
          <MenuItem value='doctor'>Врач</MenuItem>
          <MenuItem value='date'>Дата</MenuItem>
          <MenuItem value='none'>нет</MenuItem>
        </TextField>
      </div>
      {props.howSort !== 'none'
        ? <SortDirection {...props}/>
        : false
      }
    </Container>
  );
} 

function SortDirection(props) {
  return (
    <div className="sort-direction-block">
      <Typography className="sort-label">Направление:</Typography>
      <TextField
        id="select-sort-direction"
        select
        value={props.sortDirection}
        onChange={e => props.setSortDirection(e.target.value)}
        variant="outlined"
        size="small"
      >
        <MenuItem value={true}>По возрастанию</MenuItem>
        <MenuItem value={false}>По убыванию</MenuItem>
      </TextField>
    </div>
  );
}