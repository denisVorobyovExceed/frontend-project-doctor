import React, { useState } from 'react';
import './FilterBar.scss';
import {
  Container,
  Typography,
  TextField,
  Button 
} from '@material-ui/core';
import DeleteSweepOutlinedIcon from '@material-ui/icons/DeleteSweepOutlined';

export default function Filtertab({ setFilterFromTo, setFilterOn }) {
  const [filterFrom, setFilterFrom] = useState();
  const [filterTo, setFilterTo] = useState();

  return (
    <Container className="filter-bar-container" maxWidth="lg">
      <div className="filter-left">
        <div className="filter-from">
          <Typography className="filter-label">с:</Typography>
          <TextField
            id="date-from"
            type="date"
            placeholder='false'
            defaultValue={filterFrom}
            variant="outlined"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={e => setFilterFrom(e.target.value)}
          />
        </div>
        <div className="filter-to">
          <Typography className="filter-label">по:</Typography>
          <TextField
            id="date-to"
            type="date"
            placeholder='false'
            defaultValue={filterTo}
            variant="outlined"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={e => setFilterTo(e.target.value)}
          />
        </div>
      </div>
      <div className="filter-right">
        <Button 
          variant="outlined"
          size="small"
          className='filter-button'
          onClick={() => setFilterFromTo({from: filterFrom, to: filterTo})}
        >Фильтровать</Button>
        <DeleteSweepOutlinedIcon 
          fontSize="large"
          onClick={() => {
            setFilterFromTo({from: null, to: null});
            setFilterOn(false);
          }}
        />
      </div>  
    </Container>
  );
}