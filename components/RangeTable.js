import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: 'white',
    fontSize: 16
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(1)': {
    backgroundColor: 'rgb(100,100,100)',
  },
   '&:nth-of-type(2)': {
    backgroundColor: 'rgb(222, 222, 222)',
  },
     '&:nth-of-type(3)': {
    backgroundColor: 'rgb(0,163,0)',
  },
     '&:nth-of-type(4)': {
    backgroundColor: 'rgb(0, 71, 171)',
  },
     '&:nth-of-type(5)': {
    backgroundColor: 'rgb(115, 57, 172)',
  },
     '&:nth-of-type(6)': {
    backgroundColor: 'rgb(218, 165, 32)',
  },
       '&:nth-of-type(7)': {
    backgroundColor: 'rgb(227,216,140)',
  },
       '&:nth-of-type(8)': {
    backgroundColor: 'rgb(0,0,139)',
  },
       '&:nth-of-type(9)': {
    backgroundColor: 'rgb(139,0,0)',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(rarity, range, enchant) {
  return { rarity, range, enchant};
}

export default function RangeTable(varr) {
  const temp = varr.varr.variable.split(' ')
  function en(s){
    let temp;
    switch(varr.varr.cat){
      case('Utility'):
      case('Consumable'):
      case('Material'):
        temp= '-';
      case('Cobalt'):
        temp= 3;
      case('Rubysilver'):
        temp= 4;
      case('Named'):
        temp= 5;
      default:
        temp= s;
    } 
    return temp;
  }
  const Srows = [createData(varr.varr.special, temp[1].split('/')[0], en(0))]
  const rows = (varr.varr.cat != 'Consumable' && varr.varr.cat != 'Ammunition'&& varr.varr.cat != 'Collectibles')?  [ //if consumable or ammunition, .replace('/', '') only
    createData('Poor', temp[1].replace('/', ' ~ '), en(0)),
    createData('Common', temp[2].replace('/', ' ~ '), en(0)),
    createData('Uncommon', temp[3].replace('/', ' ~ '), en(1)),
    createData('Rare', temp[4].replace('/', ' ~ '), en(2)),
    createData('Epic', temp[5].replace('/', ' ~ '), en(3)),
    createData('Legendary', temp[6].replace('/', ' ~ '), en(4)),
    createData('Unique', temp[7].replace('/', ' ~ '), en(5))
  ]:[
  createData((varr.varr.cat != 'Collectibles'? 'Poor':'Cracked'), temp[1].split('/')[0], (varr.varr.cat != 'Collectibles'? en(0):temp[0].split('/')[0])),
  createData((varr.varr.cat != 'Collectibles'? 'Common':'Flawed'), temp[2].split('/')[0],(varr.varr.cat != 'Collectibles'? en(0):temp[0].split('/')[0])),
  createData((varr.varr.cat != 'Collectibles'? 'Uncommon':'Normal'), temp[3].split('/')[0],(varr.varr.cat != 'Collectibles'? en(1):temp[0].split('/')[0])),
  createData((varr.varr.cat != 'Collectibles'? 'Rare':'Exquisite'), temp[4].split('/')[0], (varr.varr.cat != 'Collectibles'? en(2):temp[0].split('/')[0])),
  createData((varr.varr.cat != 'Collectibles'? 'Epic':'Perfect'), temp[5].split('/')[0], (varr.varr.cat != 'Collectibles'? en(3):temp[0].split('/')[0])),
  createData((varr.varr.cat != 'Collectibles'? 'Legendary':'Royal'), temp[6].split('/')[0], (varr.varr.cat != 'Collectibles'? en(4):temp[0].split('/')[0])),
  createData((varr.varr.cat != 'Collectibles'? 'Unique':''), (varr.varr.cat != 'Collectibles'? temp[7].split('/')[0]:''), (varr.varr.cat != 'Collectibles'? en(5):''))
] ;

  return (
    <TableContainer component={Paper} sx={{pt:1,backgroundColor:'black',zIndex:1}}>
      <Table sx={{ width: 330, height:290 }} size="small" aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Rarity</StyledTableCell>
            <StyledTableCell align="center">{varr.varr.cat != 'Collectibles'? 'Range' : 'Value'}</StyledTableCell>
            {varr.varr.cat != 'Consumable'&&varr.varr.cat != 'Utility'&&varr.varr.cat != 'Material'?<StyledTableCell align="center">{varr.varr.cat != 'Collectibles' ? 'Max Enchants' : 'Slots'}</StyledTableCell>:null}
          </TableRow>
        </TableHead>
        <TableBody>
        {varr.varr.special != null&&varr.varr.special !='' ?Srows.map((row, index) => (
          <StyledTableRow key={index}>
            <StyledTableCell align="center">{row.rarity}</StyledTableCell>
            <StyledTableCell align="center">{row.range}</StyledTableCell>
            {varr.varr.cat != "Material"&&varr.varr.cat != 'Consumable'&&varr.varr.cat != 'Utility'?<StyledTableCell align="center">{row.enchant}</StyledTableCell>:null}
          </StyledTableRow>
        )):rows.map((row, index) => (
          <StyledTableRow key={index}>
            <StyledTableCell align="center">{row.rarity}</StyledTableCell>
            <StyledTableCell align="center">{row.range}</StyledTableCell>
            {varr.varr.cat != "Material"&&varr.varr.cat != 'Consumable'&&varr.varr.cat != 'Utility'? <StyledTableCell align="center">{row.enchant}</StyledTableCell>:null}
          </StyledTableRow>
        ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}